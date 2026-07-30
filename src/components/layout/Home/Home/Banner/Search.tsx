/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, MapPin } from "lucide-react";

export default function Search({ categories }: { categories?: any[] }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"buy" | "rent" | "all">("all"); // 👈 fixed default
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    }

    if (activeTab !== "all") {
      params.set("purpose", activeTab.toUpperCase());
    }

    params.set("status", "published");

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-2xl overflow-hidden bg-white/95 backdrop-blur-md border border-white/30 transition-all duration-300">
      
      {/* Search Type Tabs (Buy / Rent / All) */}
      <div className="flex bg-gray-100/90 border-b border-gray-200/80 p-1.5 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`flex-1 py-2.5 rounded-xl cursor-pointer text-xs sm:text-sm font-bold transition-all duration-200 ${
            activeTab === "all"
              ? "bg-white text-[#800020] shadow-sm border border-gray-200/60"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
          }`}
        >
          All Listings
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("buy")}
          className={`flex-1 py-2.5 rounded-xl cursor-pointer text-xs sm:text-sm font-bold transition-all duration-200 ${
            activeTab === "buy"
              ? "bg-white text-[#800020] shadow-sm border border-gray-200/60"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
          }`}
        >
          Buy Property
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("rent")}
          className={`flex-1 py-2.5 rounded-xl cursor-pointer text-xs sm:text-sm font-bold transition-all duration-200 ${
            activeTab === "rent"
              ? "bg-white text-[#800020] shadow-sm border border-gray-200/60"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
          }`}
        >
          Rent Property
        </button>
      </div>

      {/* Main Search Input & Action Button */}
      <div className="flex items-center p-2.5 bg-white gap-2">
        <div className="flex items-center flex-1 px-3 bg-gray-50/80 rounded-xl border border-gray-200/60 focus-within:border-[#800020] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#800020]/10 transition-all">
          <MapPin className="w-5 h-5 text-[#800020] shrink-0 mr-2" />
          <Input
            type="text"
            placeholder="Search by City, Neighborhood, Address..."
            className="border-none bg-transparent shadow-none text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 h-12 px-0 text-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
    </div>
  );
}