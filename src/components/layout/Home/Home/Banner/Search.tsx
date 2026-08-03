/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Constants } from "./constant";
import { Search as SearchIcon, MapPin, ChevronDown, ChevronUp } from "lucide-react";

interface SearchProps {
  categories: any[];
}

export default function Search({ categories }: SearchProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Filters state (Maintained exact original logic)
  const [filters, setFilters] = useState<any>({
    minPrice: undefined,
    maxPrice: undefined,
    categoryId: "",
    verification: "",
    recommendation: "",
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
  });

  const categoryOrder = ["buy", "sell", "rent"];

  const normalizeTitle = (title?: string) =>
    title?.toLowerCase().trim() ?? "";

  const filteredCategories = categories
    ?.filter((item) =>
      categoryOrder.includes(normalizeTitle(item.title))
    )
    .sort(
      (a, b) =>
        categoryOrder.indexOf(normalizeTitle(a.title)) -
        categoryOrder.indexOf(normalizeTitle(b.title))
    );

  // Handle input/select changes
  const handleChange = (key: string, value: any) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  // Reset all filters
  const handleReset = () => {
    setFilters({
      minPrice: undefined,
      maxPrice: undefined,
      categoryId: "",
      verification: "",
      recommendation: "",
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
    });
  };

  // Search Logic
  const handleSearch = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && value !== undefined && value !== null) {
        params.set(key, value.toString());
      }
    });

    router.push(`/properties?${params.toString()}`);
  };

  const renderSelect = (label: string, key: string, options: Record<string, string>) => (
    <div className="flex flex-col space-y-1">
      <label className="text-gray-700 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
        {label}
      </label>
      <select
        value={filters[key] || ""}
        onChange={(e) => handleChange(key, e.target.value)}
        className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200/80 text-sm text-gray-800 focus:outline-[#800020] focus:bg-white transition-all"
      >
        <option value="">All</option>
        {Object.entries(options).map(([_, value]) => (
          <option key={value} value={value}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-2xl overflow-hidden bg-white/95 backdrop-blur-md border border-white/30 transition-all duration-300">
      {/* Category Tabs (Buy / Rent / All) */}
      <div className="flex bg-gray-100/90 border-b border-gray-200/80 p-1.5 gap-1">
        <button
          type="button"
          onClick={() => handleChange("categoryId", "")}
          className={`flex-1 py-2.5 rounded-xl cursor-pointer text-xs sm:text-sm font-bold transition-all duration-200 ${filters.categoryId === ""
            ? "bg-white text-[#800020] shadow-sm border border-gray-200/60"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
            }`}
        >
          All Listings
        </button>

        {filteredCategories?.map((item) => (
          <button
            key={item._id}
            type="button"
            onClick={() => handleChange("categoryId", item._id)}
            className={`flex-1 py-2.5 rounded-xl cursor-pointer text-xs sm:text-sm font-bold transition-all duration-200 ${filters.categoryId === item._id
              ? "bg-white text-[#800020] shadow-sm border border-gray-200/60"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
              }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Main Search Input & Action Controls */}
      <div className="p-2.5 bg-white space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center flex-1 px-3 bg-gray-50/80 rounded-xl border border-gray-200/60 focus-within:border-[#800020] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#800020]/10 transition-all">
            <MapPin className="w-5 h-5 text-[#800020] shrink-0 mr-2" />
            <Input
              type="text"
              placeholder="Search by City, Neighborhood, Keyword..."
              className="border-none bg-transparent shadow-none text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 h-12 px-0 text-gray-900"
              value={filters.search || ""}
              onChange={(e) => handleChange("search", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          <button
            type="button"
            onClick={handleSearch}
            aria-label="Search"
            className="bg-[#800020] hover:bg-[#600018] cursor-pointer text-white h-12 px-6 flex items-center justify-center gap-2 rounded-xl shrink-0 transition-all duration-200 font-semibold shadow-md active:scale-95"
          >
            <SearchIcon size={18} />
            <span className="hidden sm:inline text-sm">Search</span>
          </button>
        </div>

        {/* Toggle Advanced Filters Button */}
        {/* <div className="flex justify-between items-center px-2 pt-1">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#800020] hover:underline cursor-pointer select-none"
          >
            <span>{isOpen ? "Hide Filters" : "Advanced Filters"}</span>
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {(filters.search || filters.minPrice || filters.maxPrice || filters.propertyType) && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-medium text-gray-400 hover:text-gray-600 transition"
            >
              Reset Filters
            </button>
          )}
        </div> */}

        {/* Advanced Filters Drawer Panel */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[2000px] opacity-100 py-3 border-t border-gray-100" : "max-h-0 opacity-0 invisible"
            }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {renderSelect("Property Type", "propertyType", Constants.PropertyType)}
            {renderSelect("Gas", "gas", Constants.Gas)}
            {renderSelect("Facing", "facing", Constants.Facing)}
            {renderSelect("Electricity", "electricity", Constants.ElectricityType)}
            {renderSelect("Water", "water", Constants.WaterSource)}
            {renderSelect("Verification", "verification", { true: "Verified", false: "Not Verified" })}
            {renderSelect("Recommendation", "recommendation", { true: "Recommended", false: "Normal" })}
            {renderSelect("Drawing Space", "drawingSpace", { YES: "YES", NO: "NO" })}
            {renderSelect("Dining Room", "diningRoom", { YES: "YES", NO: "NO" })}
            {renderSelect("Kitchen", "kitchen", { YES: "YES", NO: "NO" })}
            {renderSelect("Parking", "parking", { YES: "YES", NO: "NO" })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Input
              placeholder="Min Price"
              type="number"
              className="bg-gray-50 border-gray-200/80 rounded-xl"
              value={filters.minPrice || ""}
              onChange={(e) => handleChange("minPrice", e.target.value)}
            />
            <Input
              placeholder="Max Price"
              type="number"
              className="bg-gray-50 border-gray-200/80 rounded-xl"
              value={filters.maxPrice || ""}
              onChange={(e) => handleChange("maxPrice", e.target.value)}
            />
            <Input
              placeholder="Bedrooms"
              className="bg-gray-50 border-gray-200/80 rounded-xl"
              value={filters.bedrooms || ""}
              onChange={(e) => handleChange("bedrooms", e.target.value)}
            />
            <Input
              placeholder="Bathrooms"
              className="bg-gray-50 border-gray-200/80 rounded-xl"
              value={filters.bathrooms || ""}
              onChange={(e) => handleChange("bathrooms", e.target.value)}
            />
            <Input
              placeholder="Balcony"
              className="bg-gray-50 border-gray-200/80 rounded-xl"
              value={filters.balcony || ""}
              onChange={(e) => handleChange("balcony", e.target.value)}
            />
            <Input
              placeholder="College/University"
              className="bg-gray-50 border-gray-200/80 rounded-xl"
              value={filters.collegeUniversity || ""}
              onChange={(e) => handleChange("collegeUniversity", e.target.value)}
            />
            <Input
              placeholder="Hospital/Clinic"
              className="bg-gray-50 border-gray-200/80 rounded-xl"
              value={filters.hospitalClinic || ""}
              onChange={(e) => handleChange("hospitalClinic", e.target.value)}
            />
            <Input
              placeholder="Bus/Metro Station"
              className="bg-gray-50 border-gray-200/80 rounded-xl"
              value={filters.busMetroStation || ""}
              onChange={(e) => handleChange("busMetroStation", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}