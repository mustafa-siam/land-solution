/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FaAngleRight } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { Constants } from "./constant";
import { FaUndo } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGetAllAreasQuery } from "@/redux/features/area/areaApi";

const FilterCard: React.FC<any> = ({ isOpen, filters, setFilters, refetch }) => {
  const { data } = useGetAllCategoriesQuery({ page: 1, limit: 100, search: "", status: "published", isTrash: false });
  const categories: any[] = data?.data?.data || [];
  const { data: area } = useGetAllAreasQuery({ page: 1, limit: 100, search: "", status: "published", isTrash: false });
  const areas: any[] = area?.data?.data || [];

  const router = useRouter();

  // Default filter values
  const defaultFilters = {
    purpose: "", // 👈 ADDED
    minPrice: undefined,
    maxPrice: undefined,
    categoryId: "",
    areaId: "",
    verification: undefined,
    recommendation: undefined,
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
    status: "",
    isTrash: false,
    page: 1,
    limit: 10000,
  };

  const handleChange = (key: string, value: any) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
    refetch();
  };

  const handleReset = () => {
    // 1. Reset the local state to initial/default values
    setFilters(defaultFilters);

    // 2. Clear the URL by navigating to the path without parameters
    router.push("/properties");

    // 3. Manually trigger a refetch of the data
    refetch();
  };

  const renderInput = (label: string, key: string, type: string = "text") => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        placeholder={`Enter ${label}`}
        type={type}
        value={filters[key] || ""}
        onChange={(e) => handleChange(key, type === "number" ? Number(e.target.value) : e.target.value)}
      />
    </div>
  );

  const renderSelect = (label: string, key: string, options: Record<string, string>) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <select
        value={filters[key] || ""}
        onChange={(e) => handleChange(key, e.target.value)}
        className="w-full border border-gray-300 rounded p-2 cursor-pointer"
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

  console.log({ filters });
  return (
    <div className={`w-80 space-y-5 h-fit hidden sm:block`}>
      {/* Category */}
      <div className="bg-white space-y-5 rounded">
        <h1 className="flex justify-between items-center gap-5 text-forest-green text-xl font-medium">
          Category <FaAngleRight className="text-forest-green" />
        </h1>
        <div className="w-full h-px bg-[#C4C4C4]" />
        <select
          value={filters.categoryId || ""}
          onChange={(e) => handleChange("categoryId", e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-white space-y-5 rounded pt-5">
        <h1 className="flex justify-between items-center gap-5 text-forest-green text-xl font-medium">
          Area <FaAngleRight className="text-forest-green" />
        </h1>
        <div className="w-full h-px bg-[#C4C4C4]" />
        <select
          value={filters.areaId || ""}
          onChange={(e) => handleChange("areaId", e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="">All</option>
          {areas.map((area) => (
            <option key={area._id} value={area._id}>
              {area.title}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="bg-white space-y-5 rounded">
        <h1 className="flex justify-between items-center gap-5 text-forest-green text-xl font-medium">
          Price Range <FaAngleRight className="text-forest-green" />
        </h1>
        <div className="w-full h-px bg-[#C4C4C4]" />
        {renderInput("Minimum Price", "minPrice", "number")}
        {renderInput("Maximum Price", "maxPrice", "number")}
      </div>

      {/* Property Type */}
      <div className="bg-white space-y-5 rounded">
        <h1 className="flex justify-between items-center gap-5 text-forest-green text-xl font-medium">
          Property Type <FaAngleRight className="text-forest-green" />
        </h1>
        <div className="w-full h-px bg-[#C4C4C4]" />
        {renderSelect("Property Type", "propertyType", Constants.PropertyType)}
      </div>

      {/* Utilities */}
      <div className="bg-white space-y-5 rounded">
        <h1 className="flex justify-between items-center gap-5 text-forest-green text-xl font-medium">
          Utilities <FaAngleRight className="text-forest-green" />
        </h1>
        <div className="w-full h-px bg-[#C4C4C4]" />
        {renderSelect("Gas", "gas", Constants.Gas)}
        {renderSelect("Facing", "facing", Constants.Facing)}
        {renderSelect("Electricity", "electricity", Constants.ElectricityType)}
        {renderSelect("Water", "water", Constants.WaterSource)}
      </div>

      {/* Boolean Filters */}
      <div className="bg-white space-y-5 rounded">
        <h1 className="flex justify-between items-center gap-5 text-forest-green text-xl font-medium">
          Options <FaAngleRight className="text-forest-green" />
        </h1>
        <div className="w-full h-px bg-[#C4C4C4]" />
        {renderSelect("Verification", "verification", { "true": "Verified", "false": "Not Verified" })}
        {renderSelect("Recommendation", "recommendation", { "true": "Recommended", "false": "General" })}
      </div>

      {/* Other text fields */}
      <div className="bg-white space-y-5 rounded">
        <h1 className="flex justify-between items-center gap-5 text-forest-green text-xl font-medium">
          Property Details <FaAngleRight className="text-forest-green" />
        </h1>
        <div className="w-full h-px bg-[#C4C4C4]" />
        {renderSelect("Drawing Space", "drawingSpace", { "YES": "YES", "NO": "NO" })}
        {renderSelect("Dining Room", "diningRoom", { "YES": "YES", "NO": "NO" })}
        {renderSelect("Kitchen", "kitchen", { "YES": "YES", "NO": "NO" })}
        {renderSelect("Parking", "parking", { "YES": "YES", "NO": "NO" })}
        {renderInput("Condition", "condition")}
        {renderInput("Bedrooms", "bedrooms")}
        {renderInput("Bathrooms", "bathrooms")}
        {renderInput("Balcony", "balcony")}
        {renderInput("College/University", "collegeUniversity")}
        {renderInput("Hospital/Clinic", "hospitalClinic")}
        {renderInput("Mosque", "mosque")}
        {renderInput("Supermarket/Grocery", "supermarketGrocery")}
        {renderInput("Bank/ATM", "bankATM")}
        {renderInput("Bus/Metro Station", "busMetroStation")}
      </div>

      {/* Reset Button */}
      <div className="flex justify-center">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 w-full px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 cursor-pointer"
        >
          <FaUndo /> Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterCard;