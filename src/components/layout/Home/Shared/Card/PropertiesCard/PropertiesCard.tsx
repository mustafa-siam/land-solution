/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heart, HeartOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { MdVerifiedUser } from 'react-icons/md'
import { toast } from 'sonner'

export default function PropertiesCard({ item }: { item: any }) {
  const [isSaved, setIsSaved] = useState(false);
  const slug = item?.slug;

  // 1. Check if item is favorited on mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("boomboxFavorites") || "[]");
    setIsSaved(favorites.includes(slug));
  }, [slug]);

  // 2. Toggle Favorite logic
  const handleToggleFavorite = () => {
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

  return (
    <div className="rounded bg-[#F5F5F5] group transition-all duration-300 hover:shadow-lg overflow-hidden">
      <div className="w-full h-60 relative">
        <Image
          width={400} // Increased for better quality
          height={300}
          src={item?.image[0]}
          alt={item?.title}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
        <div className="absolute bottom-2 left-2 flex justify-end items-end gap-2 text-sm">
          {item?.verification && (
            <p className='flex items-center gap-1 bg-[#0F9918] text-white px-3 py-1 rounded-full shadow-sm'>
              <MdVerifiedUser />Verified
            </p>
          )}
          <p className='bg-[#333333] text-white px-3 py-1 rounded-full shadow-sm'>
            For {item?.categoryId?.title}
          </p>
        </div>
      </div>

      <div className="p-5 space-y-2">
        <Link 
          href={`/properties/${item?.slug}`} 
          className='text-xl font-medium font-yanone-kaffeesatz transition-colors duration-300 group-hover:text-ruby-wine block'
        >
          {item?.title}
        </Link>
        
        <p className="flex items-center gap-2 text-gray-600">
          <FaLocationDot className="text-ruby-wine" />
          {item?.location}
        </p>

        <div className="flex justify-between items-center pt-2 border-t border-gray-200 font-medium text-ruby-wine">
          <p className="text-lg">BDT {item?.price}</p>
          
          <div onClick={handleToggleFavorite} className="cursor-pointer p-1 transition-transform active:scale-90">
            {isSaved ? (
              <div className="flex items-center gap-1 text-ruby-wine">
                <HeartOff size={22} fill="currentColor" />
              </div>
            ) : (
              <Heart size={22} className="hover:fill-ruby-wine transition-colors" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}