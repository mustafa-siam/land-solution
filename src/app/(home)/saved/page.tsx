/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { HeartMinus, HeartOff } from "lucide-react";
import { MdVerifiedUser } from "react-icons/md";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/constants";
import { toast } from "sonner";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

useEffect(() => {
  const fetchSavedProducts = async () => {
    try {
      // Get saved slugs
      let savedSlugs: string[] = JSON.parse(
        localStorage.getItem("boomboxFavorites") || "[]"
      );

      if (savedSlugs.length === 0) {
        setProducts([]);
        setIsLoading(false);
        return;
      }

      // Fetch each product
      const fetchedProducts = await Promise.all(
        savedSlugs.map(async (slug) => {
          try {
            const res = await fetch(`${API_BASE_URL}/product/find-single/${slug}`);

            if (res.status === 404) {
              console.warn(`Product not found for slug: ${slug}, removing from localStorage`);

              // Remove slug from localStorage
              savedSlugs = savedSlugs.filter((s) => s !== slug);
              localStorage.setItem("boomboxFavorites", JSON.stringify(savedSlugs));

              return null;
            }

            if (!res.ok) {
              console.error(`Error fetching slug: ${slug}`);
              return null;
            }

            const data = await res.json();
            return data.data;
          } catch (error) {
            console.error(`Failed to fetch slug ${slug}:`, error);
            return null;
          }
        })
      );

      setProducts(fetchedProducts.filter(Boolean)); // remove nulls
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching saved products:", error);
      setError(true);
      setIsLoading(false);
    }
  };

  fetchSavedProducts();
}, []);

const handleRemovedFavorite = (item: { slug: string }) => {
  const slug = item?.slug;

  // Remove from localStorage
  let favorites: string[] = JSON.parse(
    localStorage.getItem("boomboxFavorites") || "[]"
  );

  if (!favorites.includes(slug)) {
    toast.error("This item is not in your saved list");
    return;
  }

  favorites = favorites.filter((s) => s !== slug);
  localStorage.setItem("boomboxFavorites", JSON.stringify(favorites));

  // Remove from state
  setProducts((prev) => prev.filter((p) => p.slug !== slug));

  toast.success("Removed from saved successfully!");
};



  return (
    <div>
      <div className="px-[5%] py-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 h-fit w-full">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            ) : error ? (
              <div className="col-span-full flex flex-col items-center justify-center text-center p-10 bg-white rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Saved Products Found
                </h3>
                <p className="text-gray-500 text-sm">
                  Your saved list is empty.
                </p>
              </div>
            ) : (
              products.map((item) => (
                <div className="rounded bg-[#F5F5F5]" key={item?._id}>
                  <div className="w-full h-60 relative">
                    <Image
                      width={250}
                      height={200}
                      src={item?.image[0]}
                      alt={item?.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 flex justify-end items-end gap-2 text-sm">
                      <p className="flex items-center gap-1 bg-[#0F9918] text-white px-3 py-1 rounded-full">
                        <MdVerifiedUser />
                        Verified
                      </p>
                      <p className="bg-[#333333] text-white px-3 py-1 rounded-full">
                        For Rent
                      </p>
                    </div>
                  </div>

                  <div className="p-5 space-y-1">
                    <Link
                      href={`/properties/${item?.slug}`}
                      className="text-xl font-medium font-yanone-kaffeesatz"
                    >
                      {item?.title}
                    </Link>

                    <p className="flex items-center gap-2">
                      <FaLocationDot />
                      {item?.location}
                    </p>

                    <div className="flex justify-between items-center gap-5 font-medium text-ruby-wine">
                      <p>BDT {item?.price}</p>
                      <HeartOff 
  onClick={() => handleRemovedFavorite(item)} 
  className="cursor-pointer fill-ruby-wine"
/>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-60 bg-gray-200 rounded"></div>
    </div>
  );
}
