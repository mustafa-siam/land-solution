"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  isFetching: boolean;
  onPageChange: (page: number) => void;
}

export function GlobalPagination({
  page,
  totalPages,
  isFetching,
  onPageChange,
}: PaginationProps) {
  const goToFirstPage = () => onPageChange(1);
  const goToLastPage = () => onPageChange(totalPages);
  const goToNextPage = () => onPageChange(Math.min(page + 1, totalPages));
  const goToPrevPage = () => onPageChange(Math.max(page - 1, 1));

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1, "...");
        for (let i = page - 1; i <= page + 1; i++) pages.push(i);
        pages.push("...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="border-t border-gray-200 dark:border-slate-700 px-4 py-3 bg-gray-50 dark:bg-slate-900">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 dark:text-slate-400">
          Page {page} of {totalPages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToFirstPage}
            disabled={page === 1 || isFetching}
            className="h-8 w-8 p-0"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevPage}
            disabled={page === 1 || isFetching}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="hidden sm:flex items-center gap-1">
            {getPageNumbers().map((num, idx) => (
              <Button
                key={idx}
                variant={num === page ? "default" : "outline"}
                size="sm"
                onClick={() => typeof num === "number" && onPageChange(num)}
                disabled={typeof num !== "number" || isFetching}
                className={`h-8 min-w-8 ${
                  typeof num !== "number" ? "cursor-default" : ""
                } ${
                  num === page
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : ""
                }`}
              >
                {num}
              </Button>
            ))}
          </div>

          {/* Mobile direct input */}
          <div className="flex sm:hidden items-center gap-2">
            <Input
              type="number"
              min={1}
              max={totalPages}
              value={page}
              onChange={(e) => {
                const newPage = parseInt(e.target.value);
                if (newPage >= 1 && newPage <= totalPages) onPageChange(newPage);
              }}
              className="h-8 w-16 text-center"
              disabled={isFetching}
            />
            <span className="text-sm text-gray-500">/ {totalPages}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={page === totalPages || isFetching}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={goToLastPage}
            disabled={page === totalPages || isFetching}
            className="h-8 w-8 p-0"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
