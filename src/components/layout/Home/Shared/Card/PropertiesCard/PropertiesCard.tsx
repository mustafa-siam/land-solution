/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Bed, Bath, Ruler, Heart, HeartOff, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "sonner";

export default function PropertiesCard({ item }: { item: any }) {
  const [isSaved, setIsSaved] = useState(false);
  const slug = item?.slug || item?._id;

  // Check if item is favorited on mount
  useEffect(() => {
    if (!slug) return;
    const favorites = JSON.parse(localStorage.getItem("boomboxFavorites") || "[]");
    setIsSaved(favorites.includes(slug));
  }, [slug]);

  // Toggle Favorite logic
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!slug) return;

    const favorites = JSON.parse(localStorage.getItem("boomboxFavorites") || "[]");

    if (isSaved) {
      const updatedFavorites = favorites.filter((favSlug: string) => favSlug !== slug);
      localStorage.setItem("boomboxFavorites", JSON.stringify(updatedFavorites));
      setIsSaved(false);
      toast.error("Removed from saved properties");
    } else {
      favorites.push(slug);
      localStorage.setItem("boomboxFavorites", JSON.stringify(favorites));
      setIsSaved(true);
      toast.success("Added to saved properties!");
    }
  };

  // UI Helpers
  const fallbackImage =
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=85";
  const displayImage = item?.image?.[0] || item?.images?.[0] || fallbackImage;
  const isRent =
    item?.purpose?.toLowerCase() === "rent" || item?.type?.toLowerCase() === "rent";

  const rawPrice = item?.price || 0;
  const formattedPriceBdt = `৳${rawPrice.toLocaleString()}`;
  const badgeText =
    item?.badgeText || (item?.verification ? "VERIFIED LISTING" : "EXCLUSIVE LISTING");

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-[#800020]/30 transition-all duration-300 overflow-hidden">
      
      {/* Full Card Link Wrapper */}
      <Link href={`/properties/${slug}`} className="flex flex-col h-full w-full">
        
        {/* Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
          <Image
            src={displayImage}
            alt={item?.title || "Property"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Top Left Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border border-white/10 shadow-xs">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              {badgeText}
            </span>
          </div>

          {/* Top Right Wishlist Button */}
          <button
            onClick={handleToggleFavorite}
            type="button"
            aria-label="Add to wishlist"
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-[#800020] backdrop-blur-md transition-all cursor-pointer shadow-md active:scale-90"
          >
            {isSaved ? (
              <HeartOff className="w-4 h-4 text-red-500" fill="currentColor" />
            ) : (
              <Heart className="w-4 h-4 transition-colors" />
            )}
          </button>
        </div>

        {/* Content Block */}
        <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
          <div>
            {/* Price */}
            <div className="flex items-baseline gap-1 text-2xl font-extrabold text-gray-900 group-hover:text-[#800020] transition-colors">
              <span>{formattedPriceBdt}</span>
              {isRent && <span className="text-xs text-gray-500 font-normal"> /month</span>}
            </div>

            {/* Title */}
            <h3 className="text-sm font-bold text-gray-800 line-clamp-1 mt-1 group-hover:text-[#800020] transition-colors">
              {item?.title || "Untitled Property"}
            </h3>
          </div>

          {/* Specifications Row */}
          <div className="flex items-center justify-between text-xs text-gray-600 font-medium border-y border-gray-100 py-3 my-2 bg-gray-50/50 rounded-lg px-2">
            <span className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-[#800020]/70 stroke-[1.75]" />
              {item?.beds || item?.bedrooms || 0} Beds
            </span>
            <span className="h-3 w-[1px] bg-gray-200" />
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-[#800020]/70 stroke-[1.75]" />
              {item?.baths || item?.bathrooms || 0} Baths
            </span>
            <span className="h-3 w-[1px] bg-gray-200" />
            <span className="flex items-center gap-1.5">
              <Ruler className="w-4 h-4 text-[#800020]/70 stroke-[1.75]" />
              {item?.area ? Number(item.area).toLocaleString() : 0} sqft
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 truncate pt-1">
            <FaLocationDot className="w-3.5 h-3.5 text-[#800020] shrink-0" />
            <span className="truncate font-medium">
              {item?.location || item?.address || "Location Unavailable"}
            </span>
          </div>
        </div>

      </Link>
    </div>
  );
}