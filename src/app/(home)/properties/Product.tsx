/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import Breadcrumb from "./Breadcrumb";
import FilterCard from "./FilterCard";
import PropertiesCard from "@/components/layout/Home/Shared/Card/PropertiesCard/PropertiesCard";
import FilterCardMobile from "./FilterCardMobile";

export default function Product() {
  const [isOpen, setIsOpen] = useState(false);
  const params = useSearchParams();

  // 1. Define initial state outside to reuse it
  const initialFilters = {
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    categoryId: "",
    areaId: "",
    verification: undefined as any,
    recommendation: undefined as any,
    condition: "",
    bedrooms: "",
    bathrooms: "",
    balcony: "",
    drawingSpace: "",
    diningRoom: "",
    kitchen: "",
    parking: "",
    gas: "",
    facing: "",
    electricity: "",
    water: "",
    collegeUniversity: "",
    hospitalClinic: "",
    mosque: "",
    supermarketGrocery: "",
    bankATM: "",
    busMetroStation: "",
    propertyType: "",
    search: "",
    status: "published",
    isTrash: false,
    page: 1,
    limit: 10000,
  };

  const [filters, setFilters] = useState(initialFilters);

  // 2. Fetch products
  const { data, isLoading, refetch, error } = useGetAllProductsQuery(filters);
  const products: any[] = data?.data?.data || [];

  // 3. EFFECT: Sync URL Params to State
  useEffect(() => {
    const newFilters: any = { ...initialFilters };
    
    // Iterate through all keys in initialFilters to see if they exist in URL
    Object.keys(initialFilters).forEach((key) => {
      const value = params.get(key);
      if (value !== null) {
        // Handle numeric values
        if (["minPrice", "maxPrice", "page", "limit"].includes(key)) {
          newFilters[key] = Number(value);
        } 
        // Handle boolean values (if your API expects true/false instead of strings)
        else if (["isTrash", "verification", "recommendation"].includes(key)) {
          newFilters[key] = value === "true" || value === "Verified" || value === "Recommended";
        }
        // Handle strings
        else {
          newFilters[key] = value;
        }
      }
    });

    setFilters(newFilters);
  }, [params]); // Trigger every time the URL changes

  // 4. Refetch whenever filters state changes
  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  return (
    <div>
      <Breadcrumb />
      <div className="px-[5%]">
        <div className="mt-10 mb-20 max-w-screen-xl mx-auto">
          <div
            className="mb-5 font-medium text-forest-green flex gap-2 items-center sm:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            Filter
            <FaAngleRight
              className={`text-forest-green mt-1 text-xl transform duration-300 ${
                isOpen ? "rotate-90" : "rotate-0"
              }`}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Sidebar Filters */}
            <div className="w-full sm:w-1/4">
              <span className="sm:hidden">
                <FilterCardMobile
                  isOpen={isOpen}
                  refetch={refetch}
                  filters={filters}
                  setFilters={setFilters}
                  setIsOpen={setIsOpen}
                />
              </span>
              <span className="hidden sm:block">
                <FilterCard
                  isOpen={isOpen}
                  refetch={refetch}
                  filters={filters}
                  setFilters={setFilters}
                />
              </span>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-fit w-full">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              ) : error || products.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center text-center p-10 bg-white rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
                  <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                products.map((item) => <PropertiesCard item={item} key={item?._id} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-60 bg-gray-200 rounded-lg"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mt-3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
    </div>
  );
}