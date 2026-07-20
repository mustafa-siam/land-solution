/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Loader2, User2, UserCog, Eye, PlusCircle, AlertTriangle } from "lucide-react";

import GlobalDelete from "@/components/layout/dashboard/shared/DeleteGlobal/GlobalDelete";
import TrashGlobal from "@/components/layout/dashboard/shared/TrashGlobal/TrashGlobal";
import GlobalHeaderSection from "@/components/layout/dashboard/shared/GlobalHeaderSection/GlobalHeaderSection";
import { GlobalPagination } from "@/components/layout/dashboard/shared/GlobalPagination/GlobalPagination";
import { IData } from "../type";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import GlobalImagePreview from "@/components/layout/dashboard/shared/GlobalImagePreview/GlobalImagePreview";
import { useDeletePopupMutation, useGetAllPopupsQuery, useUpdatePopupStatusMutation, useUpdatePopupTrashStatusMutation } from "@/redux/features/popup/popupApi";

// Using standard Radix / shadcn Select components for the inline status dropdown
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ManagePage() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    statusProperty: ["all", "pending", "published"],
    isTrash: false,
  });

  const queryParams = useMemo(() => {
    const { page, limit, search, status, isTrash } = filters;
    return { page, limit, ...(search && { search }), ...(status && { status }), ...(isTrash && { isTrash }) };
  }, [filters]);

  const { data, isLoading, isError, isFetching } = useGetAllPopupsQuery(queryParams);
  const [deleteMethod, { isLoading: isDeleting }] = useDeletePopupMutation();
  const [updateTrash, { isLoading: isUpdatingTrash }] = useUpdatePopupTrashStatusMutation();
  const [updateStatus] = useUpdatePopupStatusMutation();

  const allData: IData[] = useMemo(() => data?.data?.data || [], [data]);
  const meta = useMemo(() => data?.data?.meta || { page: 1, limit: 10, total: 0, totalPages: 0 }, [data]);

  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  const toggleUserSelection = useCallback((id: string) => {
    setSelectedUsers(prev => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedUsers(prev => prev.size === allData.length ? new Set() : new Set(allData.map((u: any) => u._id)));
  }, [allData]);

  const handleInlineStatusChange = async (id: string, newStatus: string) => {
    try {
      // Dynamic payload execution mimicking StatusGlobal logic
       await updateStatus({ id, status: newStatus }).unwrap();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 0) return `Today ${time}`;
    if (diffDays === 1) return `Yesterday ${time}`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} ${time}`;
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-lime-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
        <div className="flex items-start gap-3 max-w-xl">
          <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-md text-amber-600 dark:text-amber-400 mt-0.5">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-[14px] font-semibold text-gray-900 dark:text-white">
  Active Popup Limit
</h4>

<p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
  You already have an active popup. Only one popup can be live at a time. Please deactivate or set the current popup to pending before creating a new one.
</p>
          </div>
        </div>
        
        <Link href="/dashboard/add-popup" className="self-start sm:self-center">
          <Button className="bg-lime-600 hover:bg-lime-700 text-white flex items-center gap-2 shadow-sm font-medium transition-colors">
            <PlusCircle className="h-4 w-4" />
            Add Popup
          </Button>
        </Link>
      </div>

      <GlobalHeaderSection
        name="Manage Popup"
        description="View, edit, and manage all Popups in the system"
        meta={meta}
        usersCount={allData.length}
        filters={filters}
        setFilters={setFilters}
        isError={isError}
        isFetching={isFetching}
      />

      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-slate-900">
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedUsers.size === allData.length && allData.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Link</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isFetching && !isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mx-auto" />
                  </TableCell>
                </TableRow>
              ) : allData?.length > 0 && !isError ? (
                allData?.map(item => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.has(item._id)}
                        onCheckedChange={() => toggleUserSelection(item._id)}
                      />
                    </TableCell>
                    <TableCell>
                      <GlobalImagePreview title={item?.title} images={[item.image]} />
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">{item.title}</TableCell>
                    <TableCell>
                      <Link href={item.link} className="flex text-blue-600 gap-1 items-center hover:underline" target="_blank">
                        <Eye size={16} /> View
                      </Link>
                    </TableCell>
                    
                    {/* Inline Status Control Column */}
                    <TableCell>
                      <Select
                        defaultValue={item.status || "pending"}
                        onValueChange={(value) => handleInlineStatusChange(item._id, value)}
                      >
                        <SelectTrigger className="w-[130px] h-9">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">
                            <span className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                              <span className="h-2 w-2 rounded-full bg-amber-500" />
                              Pending
                            </span>
                          </SelectItem>
                          <SelectItem value="published">
                            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                              <span className="h-2 w-2 rounded-full bg-emerald-500" />
                              Published
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(item.createdAt)}
                    </TableCell>
                    
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          {filters?.isTrash || (
                            <>
                              <DropdownMenuItem className="cursor-pointer" asChild>
                                <Link
                                  href={`/dashboard/update-popup/${item.slug}`}
                                  className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 flex w-full h-full px-2 py-1.5"
                                >
                                  <UserCog className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                                  <span>Edit</span>
                                </Link>
                              </DropdownMenuItem>
                            </>
                          )}
                          
                          <DropdownMenuSeparator />
                          <TrashGlobal
                            filters={filters}
                            handleUpdateTrash={updateTrash}
                            isLoadingUpdateTrash={isUpdatingTrash}
                            id={item._id}
                          />

                          {filters.isTrash && (
                            <>
                              <DropdownMenuSeparator />
                              <GlobalDelete
                                onConfirm={() => deleteMethod(item._id)}
                                validator={item.title}
                                loading={isDeleting}
                              />
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <User2 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p>No data found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {meta.totalPages > 1 && (
          <GlobalPagination
            page={filters.page}
            totalPages={meta.totalPages}
            isFetching={isFetching}
            onPageChange={page => setFilters(prev => ({ ...prev, page }))}
          />
        )}
      </div>
    </div>
  );
}