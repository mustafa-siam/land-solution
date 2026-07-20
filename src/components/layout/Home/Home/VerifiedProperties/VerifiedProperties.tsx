/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useGetAllProductsQuery } from '@/redux/features/product/productApi';
import Link from 'next/link';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { FaArrowRight, FaLocationDot, FaBed, FaBath } from "react-icons/fa6";
import { BiArea } from "react-icons/bi";
import { MdVerified } from "react-icons/md";

export default function VerifiedProperties() {
  const { data: verified, isLoading } = useGetAllProductsQuery({
    page: 1,
    limit: 8, 
    search: "",
    status: "published",
    isTrash: false,
    verification: true
  });

  const allVerifiedData: any[] = useMemo(() => verified?.data?.data || [], [verified]);

  return (
    <div className='px-[5%] py-16 bg-gray-50/60 min-h-screen font-sans'>
      <div className="max-w-screen-xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 border-b border-gray-200/60 pb-6">
          <div>
            <span className="text-ruby-wine font-semibold text-xs uppercase tracking-widest block mb-1">
              Exclusive Listings
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-yanone-kaffeesatz text-gray-900 tracking-tight">
              Verified Properties
            </h1>
            <p className="text-gray-500 mt-2 max-w-md text-sm sm:text-base">
              Be the first to browse verified listings before they hit the market.
            </p>
          </div>
        </div>

        {/* Loading State Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse h-[380px]">
                <div className="bg-gray-200 aspect-[4/3] w-full" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && allVerifiedData.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 p-8">
            <p className="text-gray-400 text-lg">No verified properties found at the moment.</p>
            <Link href="/properties" className="mt-4 inline-block text-ruby-wine underline font-medium">
              Browse all properties
            </Link>
          </div>
        )}

        {/* Main Grid */}
        {!isLoading && allVerifiedData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {allVerifiedData.map((item) => {
              const fallbackImage = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=85";
              const displayImage = item?.image?.[0] || item?.images?.[0] || fallbackImage;
              const isRent = item?.purpose?.toLowerCase() === 'rent' || item?.type?.toLowerCase() === 'rent';

              return (
                <div 
                  key={item?._id} 
                  className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Image Section (Untouched Height Aspect) */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={displayImage}
                      alt={item?.title || "Property"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Floating Badges Container */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {/* Rent/Buy Badge */}
                      <span className={`text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-md text-white shadow-sm backdrop-blur-md ${
                        isRent ? 'bg-blue-600/90' : 'bg-emerald-600/90'
                      }`}>
                        For {isRent ? 'Rent' : 'Sale'}
                      </span>

                      {/* Premium Glassmorphism Verified Badge */}
                      <span className="flex items-center gap-1.5 text-emerald-700 font-semibold text-xs tracking-wide uppercase px-2.5 py-1.5 rounded-md shadow-sm backdrop-blur-md bg-white/95 border border-emerald-100/50">
                        <MdVerified className="text-emerald-600 text-base" />
                        <span>Verified</span>
                      </span>
                    </div>
                  </div>

                  {/* Content Container (Reduced vertical spacing and tight layouts) */}
                  <div className="p-4.5 flex flex-col flex-grow justify-between">
                    
                    {/* Top Text Meta Block */}
                    <div className="flex flex-col">
                      {/* Title */}
                      <h3 className="text-gray-950 font-semibold text-base md:text-lg line-clamp-2 leading-snug group-hover:text-ruby-wine transition-colors mb-2">
                        {item?.title || "Exclusive Modern Property"}
                      </h3>

                      {/* Location */}
                      <p className="flex items-center gap-1.5 text-gray-500 text-xs truncate">
                        <FaLocationDot className="text-gray-400 flex-shrink-0" />
                        <span className="truncate">{item?.location || "Location Unavailable"}</span>
                      </p>
                    </div>

                    {/* Bottom Features & Price Block */}
                    <div className="mt-4 pt-3.5 border-t border-gray-100">
                      {/* Specs Row */}
                      <div className="flex items-center justify-between text-gray-600 text-[11px] md:text-xs mb-3.5 bg-gray-50 px-2 py-2 rounded-lg">
                        <span className="flex items-center gap-1 font-medium">
                          <FaBed className="text-gray-400 text-sm" /> {item?.beds || item?.bedrooms || 0} Beds
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <FaBath className="text-gray-400 text-sm" /> {item?.baths || item?.bathrooms || 0} Baths
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <BiArea className="text-gray-400 text-sm" /> {item?.area || 0} sqft
                        </span>
                      </div>

                      {/* Price Tag */}
                      <div className="flex items-baseline justify-between">
                        <span className="text-gray-400 text-xs uppercase tracking-wider font-medium">Price</span>
                        <p className="text-xl font-bold text-gray-900">
                          ${item?.price?.toLocaleString() || "TBD"}
                          {isRent && <span className="text-xs text-gray-500 font-normal"> /mo</span>}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Call to Action Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/properties"
            className="group inline-flex items-center gap-3 bg-black text-white rounded-full px-7 py-3.5 text-base font-medium shadow-sm hover:bg-gray-950 hover:shadow transition-all"
          >
            View All Verified Properties 
            <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}