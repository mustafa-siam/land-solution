"use client";

import { useMemo, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import { HomePagination } from "@/components/layout/Home/Shared/HomePagination/HomePagination";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import BlogCard from "@/components/layout/Home/Shared/Card/BlogCard/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Newspaper } from "lucide-react";

export default function Page() {
  const [filters, setFilters] = useState({ page: 1 });

  const { data, isFetching, isLoading } = useGetAllBlogsQuery({
    page: filters?.page,
    limit: 8,
    search: "",
    status: "published",
    isTrash: false,
  });

  const allData: any[] = useMemo(() => data?.data?.data || [], [data]);
  const meta = useMemo(
    () => data?.data?.meta || { page: 1, limit: 10, total: 0, totalPages: 0 },
    [data]
  );

  const skeletonArray = new Array(8).fill(null);

  return (
    <div>
      {/* Hero Section */}
      <section className="px-[5%] py-16 sm:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 font-sans text-gray-900">
        <div className="max-w-screen-xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-[#800020] text-xs font-semibold uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Insights & News</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            Latest from UrbanKeys
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Stay updated with real estate trends, market insights, and expert advice from our team
          </p>
        </div>
      </section>

      <Breadcrumb />

      {/* Blogs Grid */}
      <div className="px-[5%] py-12 sm:py-16 font-sans text-gray-900">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
            {(isFetching || isLoading)
              ? skeletonArray.map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow animate-pulse">
                    <Skeleton className="w-full h-60 rounded-2xl" />
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
    </div>
  );
}
