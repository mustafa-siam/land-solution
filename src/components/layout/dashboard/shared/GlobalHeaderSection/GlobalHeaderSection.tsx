/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Search, Loader2, Filter, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UsersHeaderSectionProps {
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
  usersCount: number;
  isError: boolean;
  description: string;
  name: string;
  filters: {
    page: number;
    limit: number;
    search: string;
    status: string;
    statusProperty: string[];
    isTrash: boolean;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  isFetching: boolean;
}

export default function GlobalHeaderSection({
  meta,
  name,
  description,
  usersCount,
  filters,
  setFilters,
  isError,
  isFetching,
}: UsersHeaderSectionProps) {
  const [searchValue, setSearchValue] = useState(filters.search);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev: any) => ({ ...prev, search: searchValue, page: 1 }));
      setIsSearching(false);
    }, 500);
    setIsSearching(true);
    return () => clearTimeout(timer);
  }, [searchValue, setFilters]);

  const hasFilters =
    filters.search || filters.status !== "" || filters.isTrash !== false;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
          {name}
        </h1>
        <p className="text-gray-600 dark:text-slate-400 mt-2">{description}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border">
          <p className="text-sm text-gray-600 dark:text-slate-400">
            Total Data
          </p>
          <p className="text-2xl font-bold text-slate-800 dark:text-indigo-400 mt-1">
            {isError ? 0 : meta.total}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border">
          <p className="text-sm text-gray-600 dark:text-slate-400">
            Current Page
          </p>
          <p className="text-2xl font-bold text-gray-600 dark:text-indigo-400 mt-1">
            {meta.page} / {meta.totalPages}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border">
          <p className="text-sm text-gray-600 dark:text-slate-400">
            Data on Page
          </p>
          <p className="text-2xl font-bold text-gray-600 dark:text-purple-400 mt-1">
            {isError ? 0 : usersCount}
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name or email..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10"
          />
          {(isFetching || isSearching) && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-indigo-600" />
          )}
        </div>

        {/* Status Filter */}
       {filters?.isTrash || <Select
          value={filters.status || "all"}
          onValueChange={(status) =>
            setFilters((prev: any) => ({
              ...prev,
              status: status === "all" ? "" : status,
              page: 1,
            }))
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder="Status" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {filters.statusProperty.map((item, i) => (
              <SelectItem value={item} key={i}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>}

        {/* 🗑️ Trash Filter */}
        <Select
          value={filters.isTrash ? "trash" : "all"}
          onValueChange={(value) =>
            setFilters((prev: any) => ({
              ...prev,
              isTrash: value === "trash",
              status: "", 
              page: 1,
            }))
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <div className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              <SelectValue placeholder="Trash Filter" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="trash">Trash</SelectItem>
          </SelectContent>
        </Select>

        {/* Items per page */}
        <Select
          value={filters.limit.toString()}
          onValueChange={(value) =>
            setFilters((prev: any) => ({
              ...prev,
              limit: parseInt(value),
              page: 1,
            }))
          }
        >
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[2, 5, 10, 20, 50].map((n) => (
              <SelectItem key={n} value={n.toString()}>
                {n} per page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setFilters({
                page: 1,
                limit: 10,
                search: "",
                status: "",
                statusProperty: filters.statusProperty,
                isTrash: false,
              });
              setSearchValue("");
            }}

          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
