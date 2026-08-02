/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import Link from "next/link";
import React, { useMemo } from "react";
import PropertiesCard from "../../Shared/Card/PropertiesCard/PropertiesCard";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function VerifiedProperties() {
  const { data: verified, isLoading } = useGetAllProductsQuery({
    page: 1,
    limit: 6,
    search: "",
    status: "published",
    isTrash: false,
    verification: true,
  });

  const allVerifiedData: any[] = useMemo(
    () => verified?.data?.data || [],
    [verified]
  );

  return (
    <section className="px-6 lg:px-12 py-16 bg-gradient-to-b from-white via-gray-50/50 to-white font-sans text-gray-900 relative overflow-hidden">

      {/* Background Decorative Blur */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-[#800020]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pb-2">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-[#800020] text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Properties</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
              Exclusive Listings
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Be the first to browse verified exclusive listings in Bangladesh&apos;s most sought-after neighborhoods before they hit the market.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-sm bg-gray-950 text-white rounded-xl hover:bg-[#800020] active:scale-[0.99] transition-all duration-300 shadow-md group shrink-0"
          >
            <span>View All Listings</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Loading State Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col space-y-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
                <div className="bg-gray-200/80 aspect-[16/10] w-full rounded-xl" />
                <div className="h-6 bg-gray-200/80 rounded-md w-1/2" />
                <div className="h-4 bg-gray-200/80 rounded-md w-3/4" />
                <div className="h-10 bg-gray-100 rounded-lg w-full" />
                <div className="h-4 bg-gray-200/80 rounded-md w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && allVerifiedData.length === 0 && (
          <div className="text-center py-20 bg-gray-50/80 rounded-2xl border border-dashed border-gray-200 p-8 max-w-lg mx-auto">
            <p className="text-gray-500 text-sm font-medium">No verified properties found at the moment.</p>
            <Link
              href="/properties"
              className="mt-4 inline-flex items-center gap-1.5 text-[#800020] hover:underline font-semibold text-xs"
            >
              <span>Browse all properties</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}

        {/* Main Grid using custom PropertiesCard */}
        {!isLoading && allVerifiedData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allVerifiedData.map((item) => (
              <PropertiesCard item={item} key={item?._id} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}