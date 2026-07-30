/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  Dot, Forward, Heart, Phone, 
  Bed, Bath, Maximize, Layers, 
  ChefHat, Car, Flame, Compass, 
  Zap, Droplets, GraduationCap, 
  Hospital, Bus, 
  Warehouse, Store, CheckCircle, 
  Building, Camera, Video, ShieldCheck,
  UtensilsCrossed, X, ChevronLeft, ChevronRight
} from "lucide-react";
import Image from "next/image";
import { Key, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdVerifiedUser } from "react-icons/md";
import Form from "./Form";
import Link from "next/link";

// --- Skeleton Component ---
const ProductDetailsSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse space-y-8">
    <div className="flex justify-between items-start">
      <div className="space-y-3 w-2/3">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
        <div className="h-10 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
      </div>
      <div className="h-10 w-32 bg-gray-200 rounded"></div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[450px]">
      <div className="lg:col-span-2 bg-gray-200 rounded-lg h-full"></div>
      <div className="grid grid-rows-2 gap-4 h-full">
        <div className="bg-gray-200 rounded-lg"></div>
        <div className="bg-gray-200 rounded-lg"></div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-4 gap-4 h-20 bg-gray-100 rounded-lg p-4"></div>
        <div className="h-40 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="space-y-4">
        <div className="h-60 bg-gray-200 rounded-lg"></div>
        <div className="h-60 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);

export default function ProductDetails({ product, isLoading }: { product: any, isLoading?: boolean }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Check if product is saved in localStorage on mount
  useEffect(() => {
    if (product?._id) {
      const savedItems = JSON.parse(localStorage.getItem("savedProperties") || "[]");
      setIsSaved(savedItems.includes(product._id));
    }
  }, [product?._id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.title,
          text: `Check out this property: ${product?.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleSave = () => {
    const savedItems = JSON.parse(localStorage.getItem("savedProperties") || "[]");
    let updatedItems;

    if (isSaved) {
      updatedItems = savedItems.filter((id: string) => id !== product._id);
      setIsSaved(false);
    } else {
      updatedItems = [...savedItems, product._id];
      setIsSaved(true);
    }

    localStorage.setItem("savedProperties", JSON.stringify(updatedItems));
  };

  if (isLoading) return <ProductDetailsSkeleton />;

  // Image Fallbacks & Array extraction
  const allImages = product?.image?.length > 0 ? product.image : ["/images/placeholder.jpg"];
  const mainImage = allImages[0];
  const galleryImages = allImages.slice(1, 3);

  // Helper to convert standard youtube watch urls to embed format
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    try {
      if (url.includes("embed/")) return url;
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 
        ? `https://www.youtube.com/embed/${match[2]}` 
        : url;
    } catch {
      return url;
    }
  };

  const handlePrevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? allImages.length - 1 : (prev as number) - 1));
    }
  };

  const handleNextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev as number) === allImages.length - 1 ? 0 : (prev as number) + 1));
    }
  };

  return (
    <div className="w-full overflow-x-hidden font-sans text-gray-800  px-6 ">
      <div className="max-w-7xl mx-autopy-6 space-y-8">
        
        {/* HEADER SECTION */}
        <div>
          {/* Verification & Category Tags */}
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold tracking-wider uppercase">
            {product?.verification && (
              <span className="flex items-center gap-1 bg-black text-white px-2.5 py-0.5 rounded-sm">
                <MdVerifiedUser className="text-white" /> VERIFIED LISTING
              </span>
            )}
            {product?.categoryId?.title && (
              <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-sm">
                FOR {product?.categoryId?.title}
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                {product?.title || "Property Details"}
              </h1>
              <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
                <FaLocationDot className="text-gray-400" />
                {product?.location || "Location not specified"}
              </p>
            </div>

            {/* Price Header */}
            <div className="text-left md:text-right">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-medium block">
                GUIDE PRICE
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold">৳</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                  {product?.price ? Number(product.price).toLocaleString() : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-[300px] sm:h-[420px] lg:h-[480px]">
          {/* Main Image */}
          <div 
            onClick={() => setLightboxIndex(0)}
            className="lg:col-span-2 relative rounded-lg overflow-hidden bg-gray-100 group cursor-pointer"
          >
            <Image
              src={mainImage}
              alt={product?.title || "Main Property Image"}
              fill
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              priority
            />
            {/* Gallery Overlay Badges */}
            <div className="absolute bottom-4 left-4 flex gap-2" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setLightboxIndex(0)}
                className="flex items-center gap-1.5 bg-white/90 hover:bg-white backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded shadow-sm transition cursor-pointer"
              >
                <Camera size={14} /> {allImages.length} Photos
              </button>
              {product?.video && (
                <button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="flex items-center gap-1.5 bg-white/90 hover:bg-white backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded shadow-sm transition cursor-pointer"
                >
                  <Video size={14} /> Virtual Tour
                </button>
              )}
            </div>
          </div>

          {/* Side Thumbnails */}
          <div className="hidden lg:grid grid-rows-2 gap-3 h-full">
            <div 
              onClick={() => setLightboxIndex(allImages.length > 1 ? 1 : 0)}
              className="relative rounded-lg overflow-hidden bg-gray-100 group cursor-pointer"
            >
              <Image
                src={galleryImages[0] || mainImage}
                alt="Property Preview 1"
                fill
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div 
              onClick={() => setLightboxIndex(allImages.length > 2 ? 2 : 0)}
              className="relative rounded-lg overflow-hidden bg-gray-100 group cursor-pointer"
            >
              <Image
                src={galleryImages[1] || mainImage}
                alt="Property Preview 2"
                fill
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* MAIN CONTENT + SIDEBAR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT COLUMN - OVERVIEW & AMENITIES */}
          <div className="lg:col-span-2 space-y-10">

            {/* KEY STATS BAR */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50/50 text-center">
              <div className="border-r border-gray-200 last:border-none p-2">
                <span className="text-xs uppercase text-gray-400 font-semibold block">BEDROOMS</span>
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <Bed size={16} className="text-gray-600" />
                  <span className="text-base font-bold">{product?.bedrooms || "N/A"} Beds</span>
                </div>
              </div>
              <div className="border-r border-gray-200 last:border-none p-2">
                <span className="text-xs uppercase text-gray-400 font-semibold block">BATHROOMS</span>
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <Bath size={16} className="text-gray-600" />
                  <span className="text-base font-bold">{product?.bathrooms || "N/A"} Baths</span>
                </div>
              </div>
              <div className="border-r border-gray-200 last:border-none p-2">
                <span className="text-xs uppercase text-gray-400 font-semibold block">AREA</span>
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <Maximize size={16} className="text-gray-600" />
                  <span className="text-base font-bold">{product?.sizeSqft ? `${product.sizeSqft} sqft` : "N/A"}</span>
                </div>
              </div>
              <div className="p-2">
                <span className="text-xs uppercase text-gray-400 font-semibold block">PARKING</span>
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <Car size={16} className="text-gray-600" />
                  <span className="text-base font-bold">{product?.parking || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* PROPERTY OVERVIEW / DESCRIPTION */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Property Overview</h2>
              <div 
                className="prose prose-gray max-w-none text-gray-600 leading-relaxed text-sm"
                dangerouslySetInnerHTML={{ __html: product?.description || "No description provided." }} 
              />
            </div>

            {/* MARKET TRENDS */}
            <div className="p-6 bg-gray-50 border border-gray-100 rounded-xl space-y-6">
              <h3 className="text-xs font-extrabold tracking-wider text-gray-400 uppercase">
                BASHUNDHARA MARKET TRENDS (Q4 2024)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <span className="text-xs text-gray-400 block mb-1">Avg. Price Per Sqft</span>
                  <p className="text-lg font-bold text-gray-900">৳ 11,200</p>
                  <span className="text-[10px] text-green-600 font-medium">↑ +4.2% YoY</span>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <span className="text-xs text-gray-400 block mb-1">Demand Rating</span>
                  <p className="text-lg font-bold text-gray-900">Institutional</p>
                  <span className="text-[10px] text-gray-400">High Absorption Rate</span>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <span className="text-xs text-gray-400 block mb-1">Rental Yield</span>
                  <p className="text-lg font-bold text-gray-900">5.8%</p>
                  <span className="text-[10px] text-blue-600 font-medium">Top Tier in Dhaka</span>
                </div>
              </div>
              <div className="flex items-end gap-2 h-16 pt-2">
                <div className="bg-gray-200 h-1/3 flex-1 rounded-t"></div>
                <div className="bg-gray-200 h-1/2 flex-1 rounded-t"></div>
                <div className="bg-gray-300 h-2/3 flex-1 rounded-t"></div>
                <div className="bg-gray-300 h-3/4 flex-1 rounded-t"></div>
                <div className="bg-gray-400 h-4/5 flex-1 rounded-t"></div>
                <div className="bg-black h-full flex-1 rounded-t"></div>
              </div>
            </div>

            {/* EXECUTIVE AMENITIES */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Executive Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50/70 border border-gray-100 rounded-lg">
                  <div className="p-2 bg-gray-200/60 rounded text-gray-700">
                    <CheckCircle size={18}/>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Corridor</span>
                    <span className="text-xs font-bold text-gray-900">{product?.condition || "N/A"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50/70 border border-gray-100 rounded-lg">
                  <div className="p-2 bg-gray-200/60 rounded text-gray-700">
                    <Bed size={18}/>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Bedrooms</span>
                    <span className="text-xs font-bold text-gray-900">{product?.bedrooms || "N/A"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50/70 border border-gray-100 rounded-lg">
                  <div className="p-2 bg-gray-200/60 rounded text-gray-700">
                    <Bath size={18}/>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Bathrooms</span>
                    <span className="text-xs font-bold text-gray-900">{product?.bathrooms || "N/A"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50/70 border border-gray-100 rounded-lg">
                  <div className="p-2 bg-gray-200/60 rounded text-gray-700">
                    <Maximize size={18}/>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Size</span>
                    <span className="text-xs font-bold text-gray-900">{product?.sizeSqft ? `${product.sizeSqft} sqft` : "N/A"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50/70 border border-gray-100 rounded-lg">
                  <div className="p-2 bg-gray-200/60 rounded text-gray-700">
                    <Warehouse size={18}/>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Balcony</span>
                    <span className="text-xs font-bold text-gray-900">{product?.balcony || "N/A"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50/70 border border-gray-100 rounded-lg">
                  <div className="p-2 bg-gray-200/60 rounded text-gray-700">
                    <Layers size={18}/>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Floor Level</span>
                    <span className="text-xs font-bold text-gray-900">{product?.floorLevel || "N/A"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50/70 border border-gray-100 rounded-lg">
                  <div className="p-2 bg-gray-200/60 rounded text-gray-700">
                    <Layers size={18}/>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Total Floors</span>
                    <span className="text-xs font-bold text-gray-900">{product?.totalFloor || "N/A"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50/70 border border-gray-100 rounded-lg">
                  <div className="p-2 bg-gray-200/60 rounded text-gray-700">
                    <Store size={18}/>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Drawing Space</span>
                    <span className="text-xs font-bold text-gray-900">{product?.drawingSpace || "N/A"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50/70 border border-gray-100 rounded-lg">
                  <div className="p-2 bg-gray-200/60 rounded text-gray-700">
                    <UtensilsCrossed size={18}/>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Dining Room</span>
                    <span className="text-xs font-bold text-gray-900">{product?.diningRoom || "N/A"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50/70 border border-gray-100 rounded-lg">
                  <div className="p-2 bg-gray-200/60 rounded text-gray-700">
                    <ChefHat size={18}/>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Kitchen</span>
                    <span className="text-xs font-bold text-gray-900">{product?.kitchen || "N/A"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50/70 border border-gray-100 rounded-lg">
                  <div className="p-2 bg-gray-200/60 rounded text-gray-700">
                    <Car size={18}/>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Parking</span>
                    <span className="text-xs font-bold text-gray-900">{product?.parking || "N/A"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50/70 border border-gray-100 rounded-lg">
                  <div className="p-2 bg-gray-200/60 rounded text-gray-700">
                    <Flame size={18}/>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Gas</span>
                    <span className="text-xs font-bold text-gray-900">{product?.gas || "N/A"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50/70 border border-gray-100 rounded-lg">
                  <div className="p-2 bg-gray-200/60 rounded text-gray-700">
                    <Compass size={18}/>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Facing</span>
                    <span className="text-xs font-bold text-gray-900">{product?.facing || "N/A"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50/70 border border-gray-100 rounded-lg">
                  <div className="p-2 bg-gray-200/60 rounded text-gray-700">
                    <Zap size={18}/>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Electricity</span>
                    <span className="text-xs font-bold text-gray-900">{product?.electricity || "N/A"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50/70 border border-gray-100 rounded-lg">
                  <div className="p-2 bg-gray-200/60 rounded text-gray-700">
                    <Droplets size={18}/>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Water</span>
                    <span className="text-xs font-bold text-gray-900">{product?.water || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN - SIDEBAR AGENT & ACTIONS */}
          <div className="space-y-6">
            {/* AGENT CARD */}
            <div className="border border-gray-200 rounded-xl p-5 bg-white space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden relative bg-gray-200 flex-shrink-0">
                  <Image 
                    src="/images/agent.jpg" 
                    alt="Agent" 
                    fill 
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">Ahmed Zubayer</h3>
                  <p className="text-xs text-gray-400">SENIOR PORTFOLIO MANAGER</p>
                  <span className="inline-flex items-center text-[10px] text-gray-500 gap-1 mt-0.5">
                    <ShieldCheck size={12} className="text-emerald-600"/> Institutional Portfolio
                  </span>
                </div>
              </div>
              <Link href={"/contact"}>
              <button className="w-full cursor-pointer bg-black hover:bg-gray-800 text-white text-xs font-bold py-3 px-4 rounded transition uppercase tracking-wider">
                Request Full Prospectus
              </button>
              </Link>
              

              <div className="border border-gray-200 rounded-md py-2.5 px-3 text-center flex items-center justify-center gap-2 text-sm font-semibold text-gray-800">
                <Phone size={16} /> 
                {product?.phone ? product.phone : "+880 1711-000000"}
              </div>

              {/* Save & Share Bar */}
              <div className="flex items-center justify-around pt-2 border-t border-gray-100 text-xs font-medium text-gray-600">
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-1.5 hover:text-black transition cursor-pointer"
                >
                  <Forward size={14} /> Share
                </button>
                <Dot className="text-gray-300" />
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-1.5 hover:text-black transition cursor-pointer"
                >
                  <Heart 
                    size={14} 
                    className={isSaved ? "fill-red-500 text-red-500" : ""} 
                  /> 
                  {isSaved ? "Saved" : "Save"}
                </button>
              </div>
            </div>

            {/* DYNAMIC FORM COMPONENT INTEGRATION */}
            <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
              <Form productId={product?._id} />
            </div>

            {/* ESTIMATED MORTGAGE CARD */}
            <div className="bg-black text-white p-6 rounded-xl space-y-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                ESTIMATED MORTGAGE
              </span>
              <div>
                <p className="text-xs text-gray-400">Starting from</p>
                <p className="text-2xl font-extrabold mt-0.5">৳ 2,45,000 / mo</p>
              </div>

              <div className="space-y-2 text-xs pt-2 border-t border-gray-800">
                <div className="flex justify-between">
                  <span className="text-gray-400">Interest Rate</span>
                  <span className="font-semibold">8.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Down Payment</span>
                  <span className="font-semibold">20%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tenure</span>
                  <span className="font-semibold">25 Years</span>
                </div>
              </div>

              <Link href={"/contact"} className="inline-block text-xs text-gray-300 underline font-medium pt-2 hover:text-white">
                Speak to a Finance Advisor →
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* FULL-WIDTH STRATEGIC LOCATION SECTION */}
      <div className="w-full px-4  mb-12">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Strategic Location</h2>
        </div>

        <div className="relative w-full border-y border-gray-200 bg-gray-100 h-[450px] sm:h-[500px]">
          {/* Nearby Landmarks Card */}
          <div className="absolute top-6 left-4 sm:left-6 lg:left-[calc(max(0px,(100vw-80rem)/2+1rem))] z-20 bg-white/95 backdrop-blur p-5 rounded-xl border border-gray-100 shadow-xl max-w-xs w-[calc(100%-2rem)] sm:w-full space-y-4">
            <h4 className="text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">
              NEARBY LANDMARKS
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <GraduationCap size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-gray-900">College/University</p>
                  <p className="text-gray-500 text-[11px]">{product?.collegeUniversity || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Hospital size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-gray-900">Hospital/Clinic</p>
                  <p className="text-gray-500 text-[11px]">{product?.hospitalClinic || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Building size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-gray-900">Mosque & Bank/ATM</p>
                  <p className="text-gray-500 text-[11px]">
                    {product?.mosque || "Mosque N/A"} • {product?.bankATM || "Bank N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Bus size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-gray-900">Transport & Supermarket</p>
                  <p className="text-gray-500 text-[11px]">
                    {product?.busMetroStation || "Transport N/A"} • {product?.supermarketGrocery || "Grocery N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Rendering Container */}
          {product?.googleMap ? (
            <div 
              className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
              dangerouslySetInnerHTML={{ __html: product.googleMap }} 
            />
          ) : (
            <iframe
              title="Property Location Map"
              className="w-full h-full border-0"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                product?.location || "Dhaka, Bangladesh"
              )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              allowFullScreen
              loading="lazy"
            ></iframe>
          )}
        </div>
      </div>

      {/* FOOTER SECTION DETAILS (Features & Terms) */}
      <div className="max-w-7xl mx-auto px-4  space-y-8">
        {product?.feature?.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Extra Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              {product?.feature?.map((list: any, i: Key) => (
                <li className="flex items-center gap-2 text-gray-700" key={i}>
                  <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
                  <span>{list}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {product?.termsAndConditions && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Terms and Conditions</h2>
            <div 
              className="prose prose-gray max-w-none text-gray-600 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product?.termsAndConditions }} 
            />
          </div>
        )}
      </div>

      {/* VIRTUAL TOUR VIDEO MODAL */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl aspect-video">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition cursor-pointer"
            >
              <X size={20} />
            </button>
            <iframe
              src={getEmbedUrl(product?.video)}
              title="Virtual Tour Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* IMAGE LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition cursor-pointer"
          >
            <X size={24} />
          </button>

          <button
            onClick={handlePrevImage}
            className="absolute left-4 md:left-8 z-10 p-3 bg-white/10 hover:bg-white/25 text-white rounded-full transition cursor-pointer"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center">
            <Image
              src={allImages[lightboxIndex]}
              alt={`Property image ${lightboxIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={handleNextImage}
            className="absolute right-4 md:right-8 z-10 p-3 bg-white/10 hover:bg-white/25 text-white rounded-full transition cursor-pointer"
          >
            <ChevronRight size={28} />
          </button>

          <div className="absolute bottom-6 bg-black/60 text-white text-xs font-semibold px-4 py-2 rounded-full">
            {lightboxIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
}