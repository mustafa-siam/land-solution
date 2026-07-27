/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useMemo } from "react";
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MoreHorizontal,
  Search,
  Trash2,
  Loader2,
  User2,
  Filter,
  X,
  Shield,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/userApi";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

interface User {
  _id: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string;
  role: "user" | "admin";
  isActive: boolean;
  createdAt: string;
}

interface MetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Format date to realistic format with time
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));

  const timeString = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays === 0) {
    return `Today ${timeString}`;
  } else if (diffDays === 1) {
    return `Yesterday ${timeString}`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    const dateStr = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return `${dateStr} ${timeString}`;
  }
};

export default function UsersPage() {
  // Pagination and filter states
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search query
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
      setIsSearching(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      setIsSearching(false);
    };
  }, [searchQuery]);

  // Build query params
  const queryParams = useMemo(() => {
    const params: any = {
      page,
      limit,
    };

    if (debouncedSearch) {
      params.search = debouncedSearch;
    }

    if (roleFilter !== "all") {
      params.role = roleFilter;
    }

    return params;
  }, [page, limit, debouncedSearch, roleFilter]);

  // RTK Query hooks
  const {
    data: usersData,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetAllUsersQuery(queryParams);

  const [updateUserRole, { isLoading: isUpdatingRole }] =
    useUpdateUserRoleMutation();

  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [roleTarget, setRoleTarget] = useState<{
    userId: string;
    newRole: "user" | "admin";
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Extract users and meta from API response
  const users: User[] = useMemo(
    () => usersData?.data?.users || [],
    [usersData]
  );

  const meta: MetaData = useMemo(
    () =>
      usersData?.data?.meta || {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      },
    [usersData]
  );

  // Clear selection when page changes or filters change
  useEffect(() => {
    setSelectedUsers(new Set());
  }, [page, limit, debouncedSearch, roleFilter]);

  // Handle user selection
  const toggleUserSelection = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  // Select all users on current page
  const toggleSelectAll = () => {
    if (selectedUsers.size === users.length && users.length > 0) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map((u) => u._id)));
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery("");
    setRoleFilter("all");
    setPage(1);
  };

  const hasActiveFilters = searchQuery || roleFilter !== "all";

  // Pagination handlers
  const goToFirstPage = () => setPage(1);
  const goToLastPage = () => setPage(meta.totalPages);
  const goToNextPage = () =>
    setPage((prev) => Math.min(prev + 1, meta.totalPages));
  const goToPrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (meta.totalPages <= maxVisible) {
      for (let i = 1; i <= meta.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(meta.totalPages);
      } else if (page >= meta.totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = meta.totalPages - 3; i <= meta.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(meta.totalPages);
      }
    }

    return pages;
  };

  const { getToken } = useAuth();
  // Delete single user (only from Clerk - webhook will handle DB)
  const handleDeleteUser = async (userId: string) => {
    const token = await getToken();
    setIsDeleting(true);
    try {
      const userToDelete = users.find((u) => u._id === userId);
      console.log(userToDelete);
      if (!userToDelete) {
        toast.error("User not found");
        return;
      }

      // Call your Express backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/delete-from-clerk`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ clerkId: userToDelete.clerkId }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log(errorData);
        return toast.error(
          errorData.message ||
            `Failed to delete user: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      toast.success(
        data.message ||
          "User deleted from Clerk. Database will be updated automatically."
      );

      // Wait for webhook to process
      setTimeout(() => refetch(), 1500);
    } catch (error: any) {
      console.error("Failed to delete user:", error);
      toast.error(error || "Failed to delete user from Clerk");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
    }
  };

  // Bulk delete users (only from Clerk - webhook will handle DB)
  const handleBulkDelete = async () => {
    setIsDeleting(true);
    try {
      const token = await getToken();

      const selectedUserIds = Array.from(selectedUsers);
      const usersToDelete = users.filter((u) =>
        selectedUserIds.includes(u._id)
      );

      let successCount = 0;
      let failCount = 0;

      // Only delete from Clerk - webhook will handle DB deletion
      for (const user of usersToDelete) {
        console.log(user);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/delete-from-clerk`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ clerkId: user.clerkId }),
              credentials: "include",
            }
          );
          console.log(response);
          if (response.ok) {
            successCount++;
          } else {
            failCount++;
            const errorData = await response.json().catch(() => ({}));
            console.error(
              `Failed to delete ${user.email}:`,
              errorData.message || response.status
            );
          }
        } catch (clerkError) {
          failCount++;
          console.error(`Failed to delete ${user.email}:`, clerkError);
        }
      }

      if (successCount > 0) {
        toast.success(
          `${successCount} user(s) deleted from Clerk. Database will be updated automatically.`
        );
      }

      if (failCount > 0) {
        toast.error(
          `Failed to delete ${failCount} user(s). Check console for details.`
        );
      }

      setSelectedUsers(new Set());

      // Wait for webhook to process (increased timeout for multiple users)
      setTimeout(() => refetch(), 2000);
    } catch (error: any) {
      console.error("Failed to bulk delete users:", error);
      toast.error(error.message || "Failed to delete users from Clerk");
    } finally {
      setIsDeleting(false);
      setBulkDeleteDialogOpen(false);
    }
  };

  // Update user role
  const handleRoleUpdate = async () => {
    if (!roleTarget) return;

    try {
      await updateUserRole({
        id: roleTarget.userId,
        role: roleTarget.newRole,
      }).unwrap();

      toast.success("User role updated successfully");
      refetch();
    } catch (error) {
      console.error("Failed to update user role:", error);
      toast.error("Failed to update user role");
    } finally {
      setRoleDialogOpen(false);
      setRoleTarget(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-slate-400 font-medium">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load users</p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          User Management
        </h1>
        <p className="text-gray-600 dark:text-slate-400 mt-2">
          Manage all users in the system
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
          <p className="text-sm text-gray-600 dark:text-slate-400">
            Total Users
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {meta.total}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
          <p className="text-sm text-gray-600 dark:text-slate-400">
            Current Page
          </p>
          <p className="text-2xl font-bold text-gray-600 dark:text-indigo-400 mt-1">
            {meta.page} / {meta.totalPages}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
          <p className="text-sm text-gray-600 dark:text-slate-400">
            Users on Page
          </p>
          <p className="text-2xl font-bold text-gray-600 dark:text-purple-400 mt-1">
            {users.length}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {(isFetching || isSearching) && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-indigo-600" />
            )}
          </div>

          {/* Role Filter */}
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Role" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>

          {/* Items per page */}
          <Select
            value={limit.toString()}
            onValueChange={(value) => {
              setLimit(parseInt(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 per page</SelectItem>
              <SelectItem value="2">2 per page</SelectItem>
              <SelectItem value="3">3 per page</SelectItem>
              <SelectItem value="5">5 per page</SelectItem>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="icon"
              onClick={clearFilters}
              className="shrink-0 text-red-600"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Selection Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {selectedUsers.size > 0 && (
              <>
                <div className="text-sm font-medium text-gray-700 dark:text-slate-300">
                  {selectedUsers.size} user{selectedUsers.size !== 1 ? "s" : ""}{" "}
                  selected
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setBulkDeleteDialogOpen(true)}
                  className="h-8"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                  Delete Selected
                </Button>
              </>
            )}
          </div>
          <div className="text-sm text-gray-500 dark:text-slate-500">
            Showing {users.length > 0 ? (page - 1) * limit + 1 : 0} to{" "}
            {Math.min(page * limit, meta.total)} of {meta.total} users
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-slate-900">
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedUsers.size === users.length && users.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="text-gray-700 dark:text-slate-300">
                  User
                </TableHead>
                <TableHead className="text-gray-700 dark:text-slate-300 hidden md:table-cell">
                  Email
                </TableHead>
                <TableHead className="text-gray-700 dark:text-slate-300">
                  Role
                </TableHead>
                <TableHead className="text-gray-700 dark:text-slate-300 hidden lg:table-cell">
                  Joined
                </TableHead>
                <TableHead className="text-gray-700 dark:text-slate-300 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching && !isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
                      <p className="text-gray-500 dark:text-slate-400 font-medium">
                        Loading users...
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <TableRow
                    key={user._id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.has(user._id)}
                        onCheckedChange={() => toggleUserSelection(user._id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.imageUrl} />
                          <AvatarFallback className="bg-indigo-600 text-white text-sm">
                            {user.firstName[0]}
                            {user.lastName && user.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-slate-400 md:hidden">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-gray-600 dark:text-slate-300">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === "admin" ? "default" : "secondary"
                        }
                        className={
                          user.role === "admin"
                            ? "bg-purple-600 hover:bg-purple-700 cursor-pointer"
                            : "bg-gray-200 text-gray-800 dark:bg-slate-700 dark:text-slate-200 cursor-pointer"
                        }
                        onClick={() => {
                          setRoleTarget({
                            userId: user._id,
                            newRole: user.role === "admin" ? "user" : "admin",
                          });
                          setRoleDialogOpen(true);
                        }}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-gray-600 dark:text-slate-400 text-sm">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-slate-700"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52">
                          <DropdownMenuLabel className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider px-2 py-1.5">
                            User Actions
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          <DropdownMenuItem className="cursor-pointer group">
                            <div className="flex items-center w-full">
                              <User2 className="mr-3 h-4 w-4 text-gray-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                              <span className="text-sm font-medium text-gray-700 dark:text-slate-300 group-hover:text-gray-900 dark:group-hover:text-white">
                                View Profile
                              </span>
                            </div>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => {
                              setRoleTarget({
                                userId: user._id,
                                newRole:
                                  user.role === "admin" ? "user" : "admin",
                              });
                              setRoleDialogOpen(true);
                            }}
                            className="cursor-pointer group"
                          >
                            <div className="flex items-center w-full">
                              <Shield className="mr-3 h-4 w-4 text-gray-500 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                              <span className="text-sm font-medium text-gray-700 dark:text-slate-300 group-hover:text-gray-900 dark:group-hover:text-white">
                                {user.role === "admin"
                                  ? "Make User"
                                  : "Make Admin"}
                              </span>
                            </div>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="my-1" />

                          <DropdownMenuItem
                            onClick={() => {
                              setDeleteTarget(user._id);
                              setDeleteDialogOpen(true);
                            }}
                            className="cursor-pointer group focus:bg-red-50 dark:focus:bg-red-950/20"
                          >
                            <div className="flex items-center w-full">
                              <Trash2 className="mr-3 h-4 w-4 text-gray-500 dark:text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors" />
                              <span className="text-sm font-medium text-gray-700 dark:text-slate-300 group-hover:text-red-700 dark:group-hover:text-red-400">
                                Remove User
                              </span>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <User2 className="h-12 w-12 text-gray-300 dark:text-slate-600" />
                      <p className="text-gray-500 dark:text-slate-400 font-medium">
                        No users found
                      </p>
                      {hasActiveFilters && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearFilters}
                          className="mt-2"
                        >
                          Clear filters
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {meta.totalPages > 1 && (
          <div className="border-t border-gray-200 dark:border-slate-700 px-4 py-3 bg-gray-50 dark:bg-slate-900">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Pagination Info */}
              <div className="text-sm text-gray-600 dark:text-slate-400">
                Page {meta.page} of {meta.totalPages}
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-2">
                {/* First Page */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToFirstPage}
                  disabled={page === 1 || isFetching}
                  className="h-8 w-8 p-0"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>

                {/* Previous Page */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevPage}
                  disabled={page === 1 || isFetching}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page Numbers */}
                <div className="hidden sm:flex items-center gap-1">
                  {getPageNumbers().map((pageNum, idx) => (
                    <Button
                      key={idx}
                      variant={pageNum === page ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        typeof pageNum === "number" && setPage(pageNum)
                      }
                      disabled={typeof pageNum !== "number" || isFetching}
                      className={`h-8 min-w-8 ${
                        typeof pageNum !== "number" ? "cursor-default" : ""
                      } ${
                        pageNum === page
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : ""
                      }`}
                    >
                      {pageNum}
                    </Button>
                  ))}
                </div>

                {/* Mobile: Direct page input */}
                <div className="flex sm:hidden items-center gap-2">
                  <Input
                    type="number"
                    min={1}
                    max={meta.totalPages}
                    value={page}
                    onChange={(e) => {
                      const newPage = parseInt(e.target.value);
                      if (newPage >= 1 && newPage <= meta.totalPages) {
                        setPage(newPage);
                      }
                    }}
                    className="h-8 w-16 text-center"
                    disabled={isFetching}
                  />
                  <span className="text-sm text-gray-500">
                    / {meta.totalPages}
                  </span>
                </div>

                {/* Next Page */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={page === meta.totalPages || isFetching}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Last Page */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToLastPage}
                  disabled={page === meta.totalPages || isFetching}
                  className="h-8 w-8 p-0"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this user from Clerk? The database
              will be automatically updated via webhook. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTarget && handleDeleteUser(deleteTarget)}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Removing...
                </>
              ) : (
                "Remove User"
              )}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Role Update Dialog */}
      <AlertDialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update User Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change this users role to{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {roleTarget?.newRole}
              </span>
              ? This will update their permissions in the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel disabled={isUpdatingRole}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRoleUpdate}
              disabled={isUpdatingRole}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isUpdatingRole ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Role"
              )}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Dialog */}
      <AlertDialog
        open={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Multiple Users</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedUsers.size} user
              {selectedUsers.size !== 1 ? "s" : ""} from Clerk? The database
              will be automatically updated via webhook. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting {selectedUsers.size} users...
                </>
              ) : (
                `Delete ${selectedUsers.size} User${
                  selectedUsers.size !== 1 ? "s" : ""
                }`
              )}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
