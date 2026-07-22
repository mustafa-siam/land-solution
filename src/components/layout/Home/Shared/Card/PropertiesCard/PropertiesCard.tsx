/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Bed, Bath, Ruler, Heart, HeartOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { toast } from 'sonner'

export default function PropertiesCard({ item }: { item: any }) {
  const [isSaved, setIsSaved] = useState(false);
  const slug = item?.slug || item?._id;

  // 1. Check if item is favorited on mount
  useEffect(() => {
    if (!slug) return;
    const favorites = JSON.parse(localStorage.getItem("boomboxFavorites") || "[]");
    setIsSaved(favorites.includes(slug));
  }, [slug]);

  // 2. Toggle Favorite logic
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!slug) return;

    const favorites = JSON.parse(localStorage.getItem("boomboxFavorites") || "[]");

    if (isSaved) {
      // Remove logic
      const updatedFavorites = favorites.filter((favSlug: string) => favSlug !== slug);
      localStorage.setItem("boomboxFavorites", JSON.stringify(updatedFavorites));
      setIsSaved(false);
      toast.error("Removed from saved");
    } else {
      // Add logic
      favorites.push(slug);
      localStorage.setItem("boomboxFavorites", JSON.stringify(favorites));
      setIsSaved(true);
      toast.success("Added to saved successfully!");
    }
  };

  // UI Helpers
  const fallbackImage = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=85";
  const displayImage = item?.image?.[0] || item?.images?.[0] || fallbackImage;
  const isRent = item?.purpose?.toLowerCase() === 'rent' || item?.type?.toLowerCase() === 'rent';

  const rawPrice = item?.price || 0;
  const formattedPriceBdt = `৳${rawPrice.toLocaleString()}`;
  const badgeText = item?.badgeText || (item?.verification ? "VERIFIED LISTING" : "EXCLUSIVE LISTING");

  return (
    <div className="group flex flex-col h-full bg-white transition-all relative">
      {/* Image Container with Dark Overlay Badge & Favorite Button */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 mb-3 rounded">
        <Link href={`/properties/${slug}`}>
          <Image
            src={displayImage}
            alt={item?.title || "Property"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Top Left Dark Translucent Badge */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 inline-block">
            {badgeText}
          </span>
        </div>

        {/* Top Right Wishlist / Favorite Icon Button */}
        <button
          onClick={handleToggleFavorite}
          type="button"
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 backdrop-blur-sm transition-all shadow-sm active:scale-90"
        >
          {isSaved ? (
            <HeartOff className="w-4 h-4 text-red-500" fill="currentColor" />
          ) : (
            <Heart className="w-4 h-4 hover:text-red-500 transition-colors" />
          )}
        </button>
      </div>

      {/* Content Block */}
      <div className="flex flex-col flex-grow">
        
        {/* Price Section */}
        <div className="mb-2">
          <div className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
            <Link href={`/properties/${slug}`} className="hover:underline">
              {formattedPriceBdt}
            </Link>
            {isRent && <span className="text-xs text-gray-500 font-normal"> /mo</span>}
          </div>
        </div>

        {/* Title */}
        <Link href={`/properties/${slug}`} className="text-sm font-semibold text-gray-800 line-clamp-1 hover:text-blue-600 transition-colors mb-2">
          {item?.title || "Untitled Property"}
        </Link>

        {/* Specifications Row with Lucide Icons */}
        <div className="flex items-center gap-4 text-xs text-gray-600 mb-2 font-normal border-y border-gray-200 py-2.5">
          <span className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-gray-500 stroke-[1.75]" />
            {item?.beds || item?.bedrooms || 0} beds
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-gray-500 stroke-[1.75]" />
            {item?.baths || item?.bathrooms || 0} baths
          </span>
          <span className="flex items-center gap-1.5">
            <Ruler className="w-4 h-4 text-gray-500 stroke-[1.75]" />
            {item?.area ? Number(item.area).toLocaleString() : 0} sqft
          </span>
        </div>

        {/* Location / Address Line with Location Icon */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 truncate mt-auto">
          <FaLocationDot className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="truncate">
            {item?.location || item?.address || "Location Unavailable"}
          </span>
        </div>

      </div>
    </div>
  )
}