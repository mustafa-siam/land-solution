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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Shadcn / Radix Select Components
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
import { IData } from "../type";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useDeleteProductMutation, useGetAllProductsQuery, useUpdateProductRecommendationStatusMutation, useUpdateProductStatusMutation, useUpdateProductTrashStatusMutation, useUpdateProductVerificationStatusMutation } from "@/redux/features/product/productApi";
import GlobalImagePreview from "@/components/layout/dashboard/shared/GlobalImagePreview/GlobalImagePreview";
import { GlobalDescriptionModal } from "@/components/layout/dashboard/shared/GlobalDescriptionModal/GlobalDescriptionModal";

import { toast } from "sonner";

export default function ManagePage() {
  const createBy = "admin";
  const getFor = "admin";

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
    const { page, limit, search, status, isTrash, createBy, getFor } = filters;
    return { page, limit, createBy, getFor, ...(search && { search }), ...(status && { status }), ...(isTrash && { isTrash }) };
  }, [filters]);

  const { data, isLoading, isError, isFetching } = useGetAllProductsQuery(queryParams);
  const [deleteMethod, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [updateTrash, { isLoading: isUpdatingTrash }] = useUpdateProductTrashStatusMutation();
  const [updateStatus] = useUpdateProductStatusMutation();
  const [updateVerification, { isLoading: isUpdatingVerification }] = useUpdateProductVerificationStatusMutation();
  const [updateRecommendation, { isLoading: isUpdatingRecommendation }] = useUpdateProductRecommendationStatusMutation();

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
      toast.success("Successfully updated publication status!");
    } catch (error: any) {
      toast.error(
        error?.data?.payload?.message ||
        error?.data?.message ||
        "Something went wrong"
      );
    }
  };

  const handleUpdateRecommendationFunction = async (id: string, recommendation: boolean) => {
    try {
      const data = { id, recommendation: !recommendation };
      await updateRecommendation(data).unwrap();
      toast.success("Successfully updated verification status!");
    } catch (error: any) {
      toast.error(
        error?.data?.payload?.message ||
        error?.data?.message ||
        "Something went wrong"
      );
    }
  };

  const handleUpdateVerificationFunction = async (id: string, verification: boolean) => {
    try {
      const data = { id, verification: !verification };
      await updateVerification(data).unwrap();
      toast.success("Successfully updated verification status!");
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
        <Loader2 className="h-12 w-12 animate-spin text-lime-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <GlobalHeaderSection
        name="Manage Product"
        description="View, edit, and manage all products in the system"
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
                <TableHead>Status</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Terms And Conditions</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead>Recommendation</TableHead>
                <TableHead>Video</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isFetching && !isLoading ? (
                <TableRow>
                  <TableCell colSpan={14} className="text-center py-10">
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
                    <TableCell><GlobalImagePreview title={item?.title} images={item.image} /></TableCell>
                    <TableCell className="font-medium max-w-[180px] truncate">{item.title}</TableCell>
                    
                    {/* Inline Status Selection Column */}
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

                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell><GlobalDescriptionModal title={item?.title} description={item?.description} /></TableCell>
                    <TableCell><GlobalDescriptionModal title="Terms And Conditions" description={item?.termsAndConditions} /></TableCell>
                    
                    <TableCell className="uppercase">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className={`cursor-pointer flex w-full h-full px-2 py-1.5 font-medium text-xs rounded border transition-all ${
                              item?.verification
                                ? "text-orange-600 border-orange-200 bg-orange-50/50 hover:bg-orange-100 dark:text-orange-400 dark:border-orange-900/50 dark:bg-orange-950/20"
                                : "text-green-600 border-green-200 bg-green-50/50 hover:bg-green-100 dark:text-green-400 dark:border-green-900/50 dark:bg-green-950/20"
                            }`}
                          >
                            {item?.verification ? (
                              <ShieldOff className="mr-1.5 h-3.5 w-3.5" />
                            ) : (
                              <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                            )}
                            {item?.verification ? "Verified" : "Verify"}
                          </button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="dark:bg-slate-900 dark:text-gray-100">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-lg font-semibold">
                              {item?.verification ? "Revoke verification?" : "Verify this item?"}
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                              {item?.verification
                                ? "This item will no longer be marked as verified."
                                : "This item will be marked as verified and trusted."}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-gray-200 transition-all">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className={`px-4 py-2 text-white transition-all ${
                                item?.verification
                                  ? "bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600"
                                  : "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                              }`}
                              onClick={() => handleUpdateVerificationFunction(item?._id, item?.verification)}
                              disabled={isUpdatingVerification}
                            >
                              {isUpdatingVerification ? "Processing..." : item?.verification ? "Revoke" : "Verify"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>

                    <TableCell className="uppercase">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className={`cursor-pointer flex w-full h-full px-2 py-1.5 font-medium text-xs rounded border transition-all ${
                              item?.recommendation
                                ? "text-orange-600 border-orange-200 bg-orange-50/50 hover:bg-orange-100 dark:text-orange-400 dark:border-orange-900/50 dark:bg-orange-950/20"
                                : "text-green-600 border-green-200 bg-green-50/50 hover:bg-green-100 dark:text-green-400 dark:border-green-900/50 dark:bg-green-950/20"
                            }`}
                          >
                            {item?.recommendation ? (
                              <ShieldOff className="mr-1.5 h-3.5 w-3.5" />
                            ) : (
                              <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                            )}
                            {item?.recommendation ? "Recommended" : "Recommend"}
                          </button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="dark:bg-slate-900 dark:text-gray-100">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-lg font-semibold">
                              {item?.recommendation ? "Remove recommendation?" : "Recommend this item?"}
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                              {item?.recommendation
                                ? "This item will no longer be marked as recommended."
                                : "This item will be marked as recommended and highlighted to users."}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-gray-200 transition-all">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className={`px-4 py-2 text-white transition-all ${
                                item?.recommendation
                                  ? "bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600"
                                  : "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                              }`}
                              onClick={() => handleUpdateRecommendationFunction(item?._id, item?.recommendation)}
                              disabled={isUpdatingRecommendation}
                            >
                              {isUpdatingRecommendation ? "Processing..." : item?.recommendation ? "Remove" : "Recommend"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                    
                    <TableCell>
                      <Link href={item.video || "#"} className="flex text-blue-600 gap-1 items-center hover:underline" target="_blank">
                        <Eye size={16} />View
                      </Link>
                    </TableCell>
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
                          {filters?.isTrash || (
                            <>
                              <DropdownMenuItem className="cursor-pointer" asChild>
                                <Link
                                  href={`/dashboard/update-product/${item.slug}`}
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
                  <TableCell colSpan={14} className="text-center py-12">
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