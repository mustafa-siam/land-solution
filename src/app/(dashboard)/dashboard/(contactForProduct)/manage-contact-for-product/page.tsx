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
import { MoreHorizontal, Loader2, User2, Eye, Pin, PinOff } from "lucide-react";

// Import shadcn UI Select Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import GlobalDelete from "@/components/layout/dashboard/shared/DeleteGlobal/GlobalDelete";
import TrashGlobal from "@/components/layout/dashboard/shared/TrashGlobal/TrashGlobal";
import GlobalHeaderSection from "@/components/layout/dashboard/shared/GlobalHeaderSection/GlobalHeaderSection";
import { GlobalPagination } from "@/components/layout/dashboard/shared/GlobalPagination/GlobalPagination";
import { GlobalDescriptionModal } from "@/components/layout/dashboard/shared/GlobalDescriptionModal/GlobalDescriptionModal";
import { IData } from "../type";
import { useDeleteContactForProductMutation, useGetAllContactForProductsQuery, useUpdateContactForProductStatusMutation, useUpdateContactForProductTrashStatusMutation } from "@/redux/features/contactForProduct/contactForProductApi";
import Link from "next/link";
import { toast } from "sonner";

export default function ManagePage() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    statusProperty: ["all", "pin", "unpin"],
    isTrash: false,
  });

  const queryParams = useMemo(() => {
    const { page, limit, search, status, isTrash } = filters;
    return { page, limit, ...(search && { search }), ...(status && { status }), ...(isTrash && { isTrash }) };
  }, [filters]);

  const { data, isLoading, isError, isFetching } = useGetAllContactForProductsQuery(queryParams);
  const [deleteMethod, { isLoading: isDeleting }] = useDeleteContactForProductMutation();
  const [updateTrash, { isLoading: isUpdatingTrash }] = useUpdateContactForProductTrashStatusMutation();
  const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateContactForProductStatusMutation();

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
      await updateStatus({ id, status: newStatus }).unwrap();
      toast.success(`Successfully updated status to ${newStatus}!`);
    } catch (error: any) {
      toast.error(
        error?.data?.payload?.message ||
        error?.data?.message ||
        "Something went wrong"
      );
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
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <GlobalHeaderSection
        name="Manage Contact For Product"
        description="View, edit, and manage all Contacts for product in the system"
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
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isFetching && !isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
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
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    
                    {/* Inline Dropdown Status Column using Shadcn UI Select */}
                    <TableCell>
                      <Select
                        defaultValue={item.status || "unpin"}
                        disabled={isUpdatingStatus}
                        onValueChange={(value) => handleInlineStatusChange(item._id, value)}
                      >
                        <SelectTrigger className="w-[120px] h-9 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
                          <SelectItem value="pin" className="cursor-pointer focus:bg-gray-100 dark:focus:bg-slate-800">
                            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium text-xs uppercase">
                              <Pin size={12} className="text-emerald-500" />
                              Pinned
                            </span>
                          </SelectItem>
                          <SelectItem value="unpin" className="cursor-pointer focus:bg-gray-100 dark:focus:bg-slate-800">
                            <span className="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400 font-medium text-xs uppercase">
                              <PinOff size={12} className="text-gray-400" />
                              Unpinned
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    <TableCell>
                      <Link href={`/properties/${item.productId}`}>
                        <Button variant="ghost" className="text-blue-600 hover:underline hover:text-blue-700">
                          <Eye className="mr-1 h-4 w-4" /> View
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell><GlobalDescriptionModal title={item?.title} description={item?.message} /></TableCell>
                    <TableCell className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
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
                  <TableCell colSpan={8} className="text-center py-12">
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