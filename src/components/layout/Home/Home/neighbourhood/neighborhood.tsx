/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useGetAllProductsQuery } from '@/redux/features/product/productApi';
import Link from 'next/link';
import Image from 'next/image';
import React, { useMemo } from 'react';

export default function FindNeighborhood() {
  const { data: propertiesData, isLoading } = useGetAllProductsQuery({
    page: 1,
    limit: 20, 
    status: "published",
    isTrash: false,
  });

  const rawListings: any[] = useMemo(() => propertiesData?.data?.data || [], [propertiesData]);

  // Extract unique neighborhoods/locations with their corresponding images
  const neighborhoods = useMemo(() => {
    const fallbackImages = [
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    ];

    const defaultNames = ["Gulshan", "Banani", "Dhanmondi", "Bashundhara", "Uttara"];

    const extractedMap = new Map<string, string>();

    rawListings.forEach((item) => {
      const rawLocation = item?.location || item?.address || "";
      const primaryName = rawLocation.split(',')[0]?.replace(/\d+/g, '').trim() || rawLocation.trim();
      const img = item?.image?.[0] || item?.images?.[0];

      if (primaryName && img && !extractedMap.has(primaryName)) {
        extractedMap.set(primaryName, img);
      }
    });

    const result = Array.from(extractedMap.entries()).map(([name, image]) => ({
      name,
      image,
    }));

    while (result.length < 5) {
      const idx = result.length;
      result.push({
        name: defaultNames[idx] || `Neighborhood ${idx + 1}`,
        image: fallbackImages[idx] || fallbackImages[0],
      });
    }

    return result.slice(0, 5);
  }, [rawListings]);

  return (
    <div className=' bg-[#E7ECEF] px-[5%] py-16 font-sans text-gray-900'>
      <div className="max-w-screen-xl mx-auto">
        
        {/* Header Section (Restored identical styling to verified section) */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Find the Neighborhood For You
          </h2>
          <p className="text-gray-500 mt-2 text-xs sm:text-sm">
            The neighborhoods best suited to your lifestyle, and the agents who know them best.
          </p>
        </div>

        {/* Loading State Skeleton */}
        {isLoading && (
          <div className="space-y-4 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[320px]">
              <div className="md:col-span-5 bg-gray-200" />
              <div className="md:col-span-3 bg-gray-200" />
              <div className="md:col-span-4 bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[320px]">
              <div className="md:col-span-4 bg-gray-200" />
              <div className="md:col-span-8 bg-gray-200" />
            </div>
          </div>
        )}

        {/* Asymmetrical Neighborhood Grid with Increased Image Heights */}
        {!isLoading && (
          <div className="flex flex-col gap-4">
            
            {/* Top Row (Increased height to 300px) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[300px]">
              {/* Item 0: Gulshan */}
              <div className="md:col-span-5 relative h-[280px] md:h-full overflow-hidden group">
                <NeighborhoodCard item={neighborhoods[0]} />
              </div>

              {/* Item 1: Banani */}
              <div className="md:col-span-3 relative h-[280px] md:h-full overflow-hidden group">
                <NeighborhoodCard item={neighborhoods[1]} />
              </div>

              {/* Item 2: Dhanmondi */}
              <div className="md:col-span-4 relative h-[280px] md:h-full overflow-hidden group">
                <NeighborhoodCard item={neighborhoods[2]} />
              </div>
            </div>

            {/* Bottom Row (Increased height to 340px) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[340px]">
              {/* Item 3: Bashundhara */}
              <div className="md:col-span-4 relative h-[280px] md:h-full overflow-hidden group">
                <NeighborhoodCard item={neighborhoods[3]} />
              </div>

              {/* Item 4: Uttara */}
              <div className="md:col-span-8 relative h-[280px] md:h-full overflow-hidden group">
                <NeighborhoodCard item={neighborhoods[4]} />
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

// Card sub-component with underline styling matching screenshot
function NeighborhoodCard({ item }: { item: { name: string; image: string } }) {
  return (
    <Link 
      href={`/properties?search=${encodeURIComponent(item.name)}`} 
      className="block w-full h-full relative group overflow-hidden"
    >
      <Image
        src={item.image}
        alt={item.name}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      {/* Location Text with Underline */}
      <div className="absolute bottom-4 left-4">
        <span className="text-white text-sm sm:text-base font-semibold tracking-wide underline underline-offset-4 decoration-white drop-shadow">
          {item.name}
        </span>
      </div>
    </Link>
  );
}