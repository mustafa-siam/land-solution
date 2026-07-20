/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // 1. Import useRouter
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Constants } from "./constant";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SearchProps {
  categories: any[];
}

export default function Search({ categories }: SearchProps) {
  const router = useRouter(); // 2. Initialize router
  const [isOpen, setIsOpen] = useState(false);

  // Filters state
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

  // 3. Updated Search Logic
  const handleSearch = () => {
    const params = new URLSearchParams();

    // Loop through every field in the filters object
    Object.entries(filters).forEach(([key, value]) => {
      // Only add to URL if value is not empty, null, or undefined
      if (value !== "" && value !== undefined && value !== null) {
        params.set(key, value.toString());
      }
    });

    // Redirect to /properties with the full query string
    router.push(`/properties?${params.toString()}`);
  };

  const renderSelect = (label: string, key: string, options: Record<string, string>) => (
    <div className="flex flex-col space-y-1">
      <label className="text-dark-slate flex items-center gap-2 text-sm font-medium">{label}</label>
      <select
        value={filters[key] || ""}
        onChange={(e) => handleChange(key, e.target.value)}
        className="w-full p-2 rounded bg-[#F5F5F5] border border-gray-300 focus:outline-ruby-wine transition"
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
    <div className="bg-white max-w-5xl mx-auto p-5 lg:px-10 relative z-20 shadow-xl rounded-lg space-y-5">
      {/* Categories */}
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={() => handleChange("categoryId", "")}
          className={`px-3 py-1 hover:opacity-90 transition cursor-pointer rounded-full border border-[#333333] ${
            filters.categoryId === "" ? "bg-[#333333] text-white" : ""
          }`}
        >
          All
        </button>
        {categories?.map((item) => (
          <button
            key={item._id}
            onClick={() => handleChange("categoryId", item._id)}
            className={`px-3 py-1 hover:opacity-90 transition cursor-pointer rounded-full border border-[#333333] ${
              filters.categoryId === item._id ? "bg-[#333333] text-white" : ""
            }`}
          >
            {item.title}
          </button>
        ))}
        <p
          className="flex items-center gap-2 ml-auto text-ruby-wine font-medium text-lg cursor-pointer select-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          Advanced
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </p>
      </div>

      {/* Main Search Bar */}
      <div className="flex flex-col sm:flex-row gap-5">
        <Input
          placeholder="Search by keyword"
          className="bg-[#F5F5F5]"
          value={filters.search || ""}
          onChange={(e) => handleChange("search", e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Search on Enter
        />
        <div className="flex flex-wrap sm:flex-nowrap gap-5">
          <Button
            className="bg-ruby-wine text-white px-6 py-2 rounded hover:opacity-90 transition cursor-pointer"
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button
            className="bg-gray-200 text-dark-slate hover:bg-gray-300"
            onClick={handleReset}
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5 pt-5 border-t">
          {renderSelect("Property Type", "propertyType", Constants.PropertyType)}
          {renderSelect("Gas", "gas", Constants.Gas)}
          {renderSelect("Facing", "facing", Constants.Facing)}
          {renderSelect("Electricity", "electricity", Constants.ElectricityType)}
          {renderSelect("Water", "water", Constants.WaterSource)}
          {renderSelect("Verification", "verification", { true: "Verified", false: "Not Verified" })}
          {renderSelect("Recommendation", "recommendation", { true: "Recommended", false: "Normal" })}
        {renderSelect("Drawing Space", "drawingSpace", { "YES": "YES", "NO": "NO" })}
        {renderSelect("Dining Room", "diningRoom", { "YES": "YES", "NO": "NO" })}
        {renderSelect("Kitchen", "kitchen", { "YES": "YES", "NO": "NO" })}
        {renderSelect("Parking", "parking", { "YES": "YES", "NO": "NO" })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            placeholder="Min Price"
            type="number"
            value={filters.minPrice || ""}
            onChange={(e) => handleChange("minPrice", e.target.value)}
          />
          <Input
            placeholder="Max Price"
            type="number"
            value={filters.maxPrice || ""}
            onChange={(e) => handleChange("maxPrice", e.target.value)}
          />
          <Input
            placeholder="Bedrooms"
            value={filters.bedrooms || ""}
            onChange={(e) => handleChange("bedrooms", e.target.value)}
          />
          <Input
            placeholder="Bathrooms"
            value={filters.bathrooms || ""}
            onChange={(e) => handleChange("bathrooms", e.target.value)}
          />
          <Input
            placeholder="Balcony"
            value={filters.balcony || ""}
            onChange={(e) => handleChange("balcony", e.target.value)}
          />
          {/* Proximity/Infrastructure fields */}
          <Input
            placeholder="College/University"
            value={filters.collegeUniversity || ""}
            onChange={(e) => handleChange("collegeUniversity", e.target.value)}
          />
          <Input
            placeholder="Hospital/Clinic"
            value={filters.hospitalClinic || ""}
            onChange={(e) => handleChange("hospitalClinic", e.target.value)}
          />
          <Input
            placeholder="Bus/Metro Station"
            value={filters.busMetroStation || ""}
            onChange={(e) => handleChange("busMetroStation", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}