"use client";

import Breadcrumb from "@/app/(home)/blogs/[slug]/Breadcrumb";
import { useGetAllBlogsQuery, useGetSingleBlogBySlugQuery } from "@/redux/features/blog/blogApi";
import { useMemo } from "react";
import BlogCard from "../Shared/Card/BlogCard/BlogCard";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"; // 👈 import skeleton
import { Calendar } from "lucide-react";

export default function BlogDetails({ slug }: { slug: string }) {
  const { data: singleBlog, isFetching: isFetchingSingle } = useGetSingleBlogBySlugQuery(slug);
  const { data, isFetching: isFetchingBlogs } = useGetAllBlogsQuery({
    page: 1,
    limit: 2,
    search: "",
    status: "published",
    isTrash: false,
  });

  // Extract all blog data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allData: any[] = useMemo(() => data?.data?.data || [], [data]);
  const skeletonArray = new Array(2).fill(null);

  return (
    <div>


      <Breadcrumb />

      <div className="px-[5%] py-16 relative z-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1">
            {isFetchingSingle ? (
              <div className="space-y-5">
                <Skeleton className="w-full h-96 rounded-lg" /> {/* image */}
                <Skeleton className="w-3/4 h-10 rounded" /> {/* title */}
                <Skeleton className="w-full h-6 rounded" /> {/* description */}
                <Skeleton className="w-full h-6 rounded" /> {/* description */}
                <Skeleton className="w-full h-6 rounded" /> {/* description */}
                <Skeleton className="w-full h-6 rounded" /> {/* description */}
                <Skeleton className="w-full h-6 rounded" /> {/* description */}
                <Skeleton className="w-full h-6 rounded" /> {/* description */}
                <Skeleton className="w-full h-6 rounded" /> {/* description */}
                <Skeleton className="w-full h-6 rounded" /> {/* description */}
                <Skeleton className="w-full h-6 rounded" /> {/* description */}
                <Skeleton className="w-full h-6 rounded" /> {/* description */}
                <Skeleton className="w-full h-6 rounded" /> {/* description */}
                <Skeleton className="w-full h-6 rounded" /> {/* description */}
              </div>
            ) : (
              <>
                <Image
                  width={1000}
                  height={500}
                  src={singleBlog?.data?.image}
                  alt={singleBlog?.data?.title}
                  className="w-full h-fit"
                />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-yanone-kaffeesatz mt-10">
                  {singleBlog?.data?.title}
                </h1>
                                    <h1 className='flex items-center gap-2 mt-2 mb-3'>
                    <Calendar size={16} />
                    {/* Format the date here */}
                    {singleBlog?.data?.date 
                      ? new Date(singleBlog?.data.date).toLocaleDateString('en-US', {
                          day: '2-digit',      // e.g., 30
                          month: 'short',    // e.g., Nov
                          year: 'numeric',   // e.g., 2024
                        }).replace(/(\d+)\/(\w+)\/(\d+)/, '$2 $1, $3') // Reorder (optional, see explanation below)
                      : 'Date Unavailable'}
                  </h1>
                <p
                  className="text-medium-dusk"
                  dangerouslySetInnerHTML={{ __html: singleBlog?.data?.description }}
                />
              </>
            )}
          </div>
          <div className="space-y-5 w-full sm:w-60 lg:w-80">
            <Image
                  width={1000}
                  height={500}
                  src="/images/add.png"
                  alt="add"
                  className="w-full h-fit"
                />
                <Image
                  width={1000}
                  height={500}
                  src="/images/add.png"
                  alt="add"
                  className="w-full h-fit"
                />
          </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-yanone-kaffeesatz mt-16 mb-10">
            More Blogs
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10">
            {isFetchingBlogs
              ? skeletonArray.map((_, i) => (
                   <div key={i} className="bg-white rounded-md overflow-hidden shadow p-4 animate-pulse">
                  <Skeleton className="w-full h-48 mb-4 rounded-md" /> {/* image placeholder */}
                  <Skeleton className="w-full h-5 mb-1 rounded" /> {/* description placeholder */}
                  <Skeleton className="w-1/2 h-4 rounded" /> {/* small line placeholder */}
                </div>
                ))
              : allData?.map((item) => <BlogCard key={item?._id} item={item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
