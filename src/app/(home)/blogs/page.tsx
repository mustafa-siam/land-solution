"use client";

import { useMemo, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import { HomePagination } from "@/components/layout/Home/Shared/HomePagination/HomePagination";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import BlogCard from "@/components/layout/Home/Shared/Card/BlogCard/BlogCard";
import { Skeleton } from "@/components/ui/skeleton"; // 👈 Import skeleton

export default function Page() {
  const [filters, setFilters] = useState({ page: 1 });

  const { data, isFetching, isLoading } = useGetAllBlogsQuery({
    page: filters?.page,
    limit: 8,
    search: "",
    status: "published",
    isTrash: false,
  });

  // Extract all blog data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allData: any[] = useMemo(() => data?.data?.data || [], [data]);
  const meta = useMemo(
    () => data?.data?.meta || { page: 1, limit: 10, total: 0, totalPages: 0 },
    [data]
  );

  const skeletonArray = new Array(8).fill(null);

  return (
    <div>
      <Breadcrumb />

      <div className="px-[5%] py-16 relative z-20">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10">
          {(isFetching || isLoading)
            ? skeletonArray.map((_, i) => (
                <div key={i} className="bg-white rounded-md overflow-hidden shadow animate-pulse">
                  <Skeleton className="w-full h-60 rounded-md" /> {/* image placeholder */}
                </div>
              ))
            : allData?.map((item) => <BlogCard key={item?._id} item={item} />)}
        </div>

        <HomePagination
          page={filters.page}
          totalPages={meta.totalPages}
          isFetching={isFetching}
          onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        />
      </div>
    </div>
  );
}
