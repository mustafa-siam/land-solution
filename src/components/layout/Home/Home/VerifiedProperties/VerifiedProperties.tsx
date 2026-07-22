/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useGetAllProductsQuery } from '@/redux/features/product/productApi';
import Link from 'next/link';
import React, { useMemo } from 'react';
import PropertiesCard from '../../Shared/Card/PropertiesCard/PropertiesCard';

export default function VerifiedProperties() {
  const { data: verified, isLoading } = useGetAllProductsQuery({
    page: 1,
    limit: 6, 
    search: "",
    status: "published",
    isTrash: false,
    verification: true
  });

  const allVerifiedData: any[] = useMemo(() => verified?.data?.data || [], [verified]);

  return (
    <div className='px-6 lg:px-12 py-12 bg-white min-h-screen font-sans text-gray-900'>
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Exclusives Listing
            </h1>
            <p className="text-gray-500 mt-2 max-w-xl text-xs sm:text-sm leading-relaxed">
              Be the first to browse exclusive listings in Bangladesh&apos;s most sought-after neighborhoods before they hit the market.
            </p>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded text-xs font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
          >
            View All Listings <span className="text-xs">›</span>
          </Link>
        </div>

        {/* Loading State Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col space-y-3">
                <div className="bg-gray-200 aspect-[16/10] w-full rounded" />
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && allVerifiedData.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-200 p-8">
            <p className="text-gray-500 text-sm">No verified properties found at the moment.</p>
            <Link href="/properties" className="mt-4 inline-block text-gray-900 underline font-medium text-xs">
              Browse all properties
            </Link>
          </div>
        )}

        {/* Main Grid using custom PropertiesCard */}
        {!isLoading && allVerifiedData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {allVerifiedData.map((item) => (
              <PropertiesCard item={item} key={item?._id} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}