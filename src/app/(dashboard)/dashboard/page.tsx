"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  MessageSquare, 
  FileText, 
  ArrowUpRight, 
  Loader2, 
  Clock, 
  CheckCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { useGetAllReviewsQuery } from "@/redux/features/review/reviewApi";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";

export default function DashboardHomePage() {
  const { data: productsRes, isLoading: productsLoading } = useGetAllProductsQuery({ page: 1, limit: 5 });
  const { data: reviewsRes, isLoading: reviewsLoading } = useGetAllReviewsQuery({ page: 1, limit: 5 });
  const { data: blogsRes, isLoading: blogsLoading } = useGetAllBlogsQuery({ page: 1, limit: 5 });

  const stats = useMemo(() => {
    return {
      products: productsRes?.data?.meta?.total || 0,
      reviews: reviewsRes?.data?.meta?.total || 0,
      blogs: blogsRes?.data?.meta?.total || 0,
    };
  }, [productsRes, reviewsRes, blogsRes]);

  const recentProducts = useMemo(() => productsRes?.data?.data || [], [productsRes]);
  const recentReviews = useMemo(() => reviewsRes?.data?.data || [], [reviewsRes]);
  const recentBlogs = useMemo(() => blogsRes?.data?.data || [], [blogsRes]);

  const isLoading = productsLoading || reviewsLoading || blogsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2 className="h-10 w-10 animate-spin text-lime-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-1">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Real-time summary and quick management of your platform assets.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Products</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{stats.products}</p>
          </div>
          <div className="h-12 w-12 bg-lime-50 dark:bg-lime-950/30 rounded-lg flex items-center justify-center text-lime-600 dark:text-lime-400">
            <ShoppingBag className="h-6 w-6" />
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Reviews</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{stats.reviews}</p>
          </div>
          <div className="h-12 w-12 bg-blue-50 dark:bg-blue-950/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
            <MessageSquare className="h-6 w-6" />
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Blogs</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{stats.blogs}</p>
          </div>
          <div className="h-12 w-12 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <FileText className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-slate-50">Recent Products</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Latest item submission status</p>
            </div>
            <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
              <Link href="/dashboard/manage-products">
                View All <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
            {recentProducts.length > 0 ? (
              recentProducts.map((item: any) => (
                <div key={item._id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-900 flex-shrink-0 overflow-hidden border border-slate-200 dark:border-slate-700">
                      {item.image?.[0] ? (
                        <img src={item.image[0]} alt={item.title} className="h-full w-full object-cover" />
                      ) : (
                        <ShoppingBag className="h-5 w-5 text-slate-400 m-auto mt-2.5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">{item.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.location || "No Location"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                      ৳{item.price}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium uppercase border ${
                      item.status === "published"
                        ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30"
                        : "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/30"
                    }`}>
                      {item.status === "published" ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      {item.status || "pending"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
                No recent products found.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-slate-50">Recent Blogs</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Latest publications and drafts</p>
            </div>
            <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
              <Link href="/dashboard/manage-blogs">
                View All <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
            {recentBlogs.length > 0 ? (
              recentBlogs.map((item: any) => (
                <div key={item._id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-900 flex-shrink-0 overflow-hidden border border-slate-200 dark:border-slate-700">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      ) : (
                        <FileText className="h-5 w-5 text-slate-400 m-auto mt-2.5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">{item.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-[240px]">
                        {item.description ? item.description.replace(/<[^>]*>/g, "") : "No description"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium uppercase border ${
                      item.status === "published"
                        ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30"
                        : "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/30"
                    }`}>
                      {item.status || "pending"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
                No recent blogs found.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-slate-50">Latest Customer Feedback</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Reviews submitted across platform channels</p>
          </div>
          <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
            <Link href="/dashboard/manage-reviews">
              View All <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
          {recentReviews.length > 0 ? (
            recentReviews.map((item: any) => (
              <div key={item._id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-900 flex-shrink-0 overflow-hidden border border-slate-200 dark:border-slate-700">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-600 dark:text-slate-300">
                        {item.title ? item.title.charAt(0) : "U"}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{item.title}</p>
                      <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.designation || "User"}</p>
                      {item.social && (
                        <span className="inline-flex px-1.5 py-0.2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] text-slate-500 dark:text-slate-400 font-mono rounded uppercase">
                          {item.social}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 pr-4">
                      {item.description || "No comment content provided."}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 self-end sm:self-center">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase border ${
                    item.status === "published"
                      ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30"
                      : "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/30"
                  }`}>
                    {item.status || "pending"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
              No recent reviews found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}