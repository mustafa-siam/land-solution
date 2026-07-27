/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"buy" | "rent" | "all">("buy");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    // Add search term if available
    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    }

    // Pass tab intent as propertyType or listingType filter (adjust parameter name based on backend requirements)
    if (activeTab !== "all") {
      params.set("propertyType", activeTab);
    }

    // Default active listing criteria
    params.set("status", "published");

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-md overflow-hidden bg-white">
      {/* Search Type Tabs (Buy / Rent / All) */}
      <div className="flex bg-gray-100/80 border-b border-gray-200">
      <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`px-6 py-3.5 cursor-pointer text-sm font-semibold transition-colors duration-150 ${
            activeTab === "all"
              ? "bg-white text-black border-t-2 border-black"
              : "text-gray-600 hover:text-black"
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("buy")}
          className={`px-6 py-3.5 text-sm cursor-pointer font-semibold transition-colors duration-150 ${
            activeTab === "buy"
              ? "bg-white text-black border-t-2 border-black"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Buy
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("rent")}
          className={`px-6 py-3.5 text-sm cursor-pointer font-semibold transition-colors duration-150 ${
            activeTab === "rent"
              ? "bg-white text-black border-t-2 border-black"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Rent
        </button>
      </div>

      {/* Main Search Input & Icon Button */}
      <div className="flex items-center p-2 bg-white">
        <Input
          type="text"
          placeholder="City, Neighborhood, Address..."
          className="border-none shadow-none text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 h-12 px-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          type="button"
          onClick={handleSearch}
          aria-label="Search"
          className="bg-black hover:bg-neutral-800 cursor-pointer text-white h-12 w-12 flex items-center justify-center rounded shrink-0 transition-colors"
        >
          <SearchIcon size={20} />
        </button>
      </div>
    </div>
  );
}