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
import { MoreHorizontal, Loader2, User2, UserCog, Eye, ShieldOff, ShieldCheck } from "lucide-react";

import GlobalDelete from "@/components/layout/dashboard/shared/DeleteGlobal/GlobalDelete";
import TrashGlobal from "@/components/layout/dashboard/shared/TrashGlobal/TrashGlobal";
import GlobalHeaderSection from "@/components/layout/dashboard/shared/GlobalHeaderSection/GlobalHeaderSection";
import { GlobalPagination } from "@/components/layout/dashboard/shared/GlobalPagination/GlobalPagination";
import { IData } from "../../../dashboard/(product)/type";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useDeleteProductMutation, useGetAllProductsQuery, useUpdateProductTrashStatusMutation } from "@/redux/features/product/productApi";
import GlobalImagePreview from "@/components/layout/dashboard/shared/GlobalImagePreview/GlobalImagePreview";
import { GlobalDescriptionModal } from "@/components/layout/dashboard/shared/GlobalDescriptionModal/GlobalDescriptionModal";

export default function ManagePage() {
    const  createBy = "user";
    const  getFor = "user";
  
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    statusProperty: ["all", "pending", "published"],
    isTrash: false,
    createBy,
    getFor
  });

  const queryParams = useMemo(() => {
    const { page, limit, search, status, isTrash,createBy,getFor } = filters;
    return { page, limit,createBy,getFor,  ...(search && { search }), ...(status && { status }), ...(isTrash && { isTrash }) };
  }, [filters]);

  const { data, isLoading, isError, isFetching } = useGetAllProductsQuery(queryParams);
  const [deleteMethod, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [updateTrash, { isLoading: isUpdatingTrash }] = useUpdateProductTrashStatusMutation();

  const allData : IData[] = useMemo(() => data?.data?.data || [], [data]);
  const meta = useMemo(() => data?.data?.meta || { page: 1, limit: 10, total: 0, totalPages: 0 }, [data]);

  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  const toggleUserSelection = useCallback((id: string) => {
    setSelectedUsers(prev => {
      const updated = new Set(prev);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedUsers(prev => prev.size === allData.length ? new Set() : new Set(allData.map((u: any) => u._id)));
  }, [allData]);

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
      <GlobalHeaderSection
        name="Manage Product"
        description="View, edit, and manage all  products in the system"
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
                <TableHead>Phone</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Terms And Conditions</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead>Recommendation</TableHead>
                <TableHead>Video</TableHead>
                <TableHead className="">Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isFetching && !isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
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
                    <TableCell className=""><GlobalImagePreview title={item?.title} images={item.image}/></TableCell>
                    <TableCell className="">{item.title}</TableCell>
                    <TableCell className="">{item.phone}</TableCell>
                    <TableCell className="">{item.price}</TableCell>
                    <TableCell className="">{item.location}</TableCell>
                    <TableCell className=""><GlobalDescriptionModal title={item?.title} description={item?.description}/></TableCell>
                    <TableCell className=""><GlobalDescriptionModal title="Terms And Conditions" description={item?.termsAndConditions}/></TableCell>
                    <TableCell className="uppercase">
                      <button
                        className={`cursor-pointer flex w-full h-full px-2 py-1.5
                          ${
                            item?.verification
                              ? "text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30"
                              : "text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30"
                          }
                        `}
                      >
                        {item?.verification ? (
                          <ShieldOff className="mr-2 mt-1 h-4 w-4" />
                        ) : (
                          <ShieldCheck className="mr-2 mt-1 h-4 w-4" />
                        )}
                        {item?.verification ? "Remove Verification" : "Verify Item"}
                      </button>
                    </TableCell>
                    <TableCell className="uppercase">
                      <button
                        className={`cursor-pointer flex w-full h-full px-2 py-1.5
                          ${
                            item?.recommendation
                              ? "text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30"
                              : "text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30"
                          }
                        `}
                      >
                        {item?.recommendation ? (
                          <ShieldOff className="mr-2 mt-1 h-4 w-4" />
                        ) : (
                          <ShieldCheck className="mr-2 mt-1 h-4 w-4" />
                        )}
                        {item?.recommendation ? "Remove Recommendation" : "Recommend Item"}
                      </button>
                    </TableCell>
                    
                    <TableCell className=""><Link href={item.video} className="flex text-blue-600 gap-1 items-center" target="_blank"><Eye size={16}/>View</Link></TableCell>
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
                          <DropdownMenuItem className="cursor-pointer">
                            <Link
                              href={`/user-dashboard/update-product-for-user/${item.slug}`}
                              className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 flex w-full h-full px-2 py-1.5"

                            >
                              <UserCog className="mr-2 mt-1 h-4 w-4 text-blue-600 dark:text-blue-400" />
                              <span>Edit</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
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
                  <TableCell colSpan={20} className="text-center py-12">
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
