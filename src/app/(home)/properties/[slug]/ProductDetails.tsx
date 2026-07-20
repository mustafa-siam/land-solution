/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  Dot, Forward, Heart, Phone, 
  Bed, Bath, Maximize, Layers, 
  ChefHat, Car, Flame, Compass, 
  Zap, Droplets, GraduationCap, 
  Hospital, Bus, 
  MapPin, Globe, UtensilsCrossed, 
  Warehouse, Store, CheckCircle, 
  Building
} from "lucide-react";
import Image from "next/image";
import { Key, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdVerifiedUser } from "react-icons/md";
import Form from "./Form";

// --- Skeleton Component ---
const ProductDetailsSkeleton = () => (
  <div className="flex flex-col lg:flex-row gap-5 animate-pulse">
    <div className="flex-1">
      <div className="h-10 w-3/4 bg-gray-200 rounded mb-5"></div>
      <div className="flex gap-2 mb-5">
        <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
      </div>
      <div className="w-full h-[400px] bg-gray-200 rounded-lg mt-5"></div>
      <div className="h-8 w-48 bg-gray-200 rounded mt-10 mb-5"></div>
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-6 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
    <div className="w-full lg:w-80 space-y-5">
      <div className="h-20 bg-gray-200 rounded"></div>
      <div className="h-20 bg-gray-200 rounded"></div>
      <div className="h-20 bg-gray-200 rounded"></div>
      <div className="h-80 bg-gray-200 rounded"></div>
      <div className="h-[300px] bg-gray-200 rounded"></div>
    </div>
  </div>
);

export default function ProductDetails({ product, isLoading }: { product: any, isLoading?: boolean }) {
   const [isSaved, setIsSaved] = useState(false);

  // Check if product is already saved in localStorage on mount
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
      // Fallback: Copy to clipboard
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

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <div className="flex-1">
        <p className="text-2xl sm:text-3xl lg:text-4xl font-yanone-kaffeesatz mb-5">{product?.title}</p>
        <div className="flex gap-2 text-sm">
          <p className="flex items-center gap-2"><FaLocationDot />{product?.location}</p>
          {product?.verification && <p className='flex items-center gap-1 bg-[#0F9918] text-white px-3 py-1 rounded-full'><MdVerifiedUser />Verified</p>}
          <p className=' bg-[#333333] text-white px-3 py-1 rounded-full'>For {product?.categoryId?.title}</p>
        </div>

        {product?.image && (
          <Image
            width={1000}
            height={500}
            src={product?.image[0]}
            alt={product?.title || "Product Image"}
            className='w-full h-fit object-cover mt-5'
          />
        )}

        <p className="text-xl sm:text-2xl font-yanone-kaffeesatz mt-10">Property Details</p>
        <hr className="my-5" />
        <p dangerouslySetInnerHTML={{ __html: product?.description }} />

        <p className="text-xl sm:text-2xl font-yanone-kaffeesatz mt-10">Property Features</p>
        <hr className="my-5" />
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
  <h1 className="flex items-center gap-2"><CheckCircle size={18} className="text-gray-600"/> Corridor: {product?.condition ? product?.condition : "N/A"}</h1>
  
  <h1 className="flex items-center gap-2"><Bed size={18} className="text-gray-600"/> Bedrooms: {product?.bedrooms ? product?.bedrooms : "N/A"}</h1>
  
  <h1 className="flex items-center gap-2"><Bath size={18} className="text-gray-600"/> Bathrooms: {product?.bathrooms ? product?.bathrooms : "N/A"}</h1>
  
  <h1 className="flex items-center gap-2"><Maximize size={18} className="text-gray-600"/> Size: {product?.sizeSqft ? `${product.sizeSqft} sqft` : "N/A"}</h1>
  
  <h1 className="flex items-center gap-2"><Warehouse size={18} className="text-gray-600"/> Balcony: {product?.balcony ? product?.balcony : "N/A"}</h1>
  
  <h1 className="flex items-center gap-2"><Layers size={18} className="text-gray-600"/> Floor Level: {product?.floorLevel ? product?.floorLevel : "N/A"}</h1>
  
  <h1 className="flex items-center gap-2"><Layers size={18} className="text-gray-600"/> Total Floors: {product?.totalFloor ? product?.totalFloor : "N/A"}</h1>
  
  <h1 className="flex items-center gap-2"><Store size={18} className="text-gray-600"/> Drawing Space: {product?.drawingSpace ? product?.drawingSpace : "N/A"}</h1>
  
  <h1 className="flex items-center gap-2"><UtensilsCrossed size={18} className="text-gray-600"/> Dining Room: {product?.diningRoom ? product?.diningRoom : "N/A"}</h1>
  
  <h1 className="flex items-center gap-2"><ChefHat size={18} className="text-gray-600"/> Kitchen: {product?.kitchen ? product?.kitchen : "N/A"}</h1>
  
  <h1 className="flex items-center gap-2"><Car size={18} className="text-gray-600"/> Parking: {product?.parking ? product?.parking : "N/A"}</h1>
  
  <h1 className="flex items-center gap-2"><Flame size={18} className="text-gray-600"/> Gas: {product?.gas ? product?.gas : "N/A"}</h1>
  
  <h1 className="flex items-center gap-2"><Compass size={18} className="text-gray-600"/> Facing: {product?.facing ? product?.facing : "N/A"}</h1>
  
  <h1 className="flex items-center gap-2"><Zap size={18} className="text-gray-600"/> Electricity: {product?.electricity ? product?.electricity : "N/A"}</h1>
  
  <h1 className="flex items-center gap-2"><Droplets size={18} className="text-gray-600"/> Water: {product?.water ? product?.water : "N/A"}</h1>
</div>

        <p className="text-xl sm:text-2xl font-yanone-kaffeesatz mt-10">Outdoor Facilities</p>
        <hr className="my-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
  <h1 className="flex items-center gap-2">
    <GraduationCap size={18} className="text-gray-600"/> 
    College/University: {product?.collegeUniversity ? product?.collegeUniversity : "N/A"}
  </h1>

  <h1 className="flex items-center gap-2">
    <Hospital size={18} className="text-gray-600"/> 
    Hospital/Clinic: {product?.hospitalClinic ? product?.hospitalClinic : "N/A"}
  </h1>

  <h1 className="flex items-center gap-2">
    <Building size={18} className="text-gray-600"/> 
    Mosque: {product?.mosque ? product?.mosque : "N/A"}
  </h1>

  <h1 className="flex items-center gap-2">
    <Store size={18} className="text-gray-600"/> 
    Supermarket: {product?.supermarketGrocery ? product?.supermarketGrocery : "N/A"}
  </h1>

  <h1 className="flex items-center gap-2">
    <Building size={18} className="text-gray-600"/> 
    Bank/ATM: {product?.bankATM ? product?.bankATM : "N/A"}
  </h1>

  <h1 className="flex items-center gap-2">
    <Bus size={18} className="text-gray-600"/> 
    Transport: {product?.busMetroStation ? product?.busMetroStation : "N/A"}
  </h1>

  {/* <h1 className="flex items-center gap-2">
    <MapPin size={18} className="text-gray-600"/> 
    Full Address: {product?.fullAddress ? product?.fullAddress : "N/A"}
  </h1> */}
</div>
{product?.feature?.length > 0 &&
<>
        <p className="text-xl sm:text-2xl font-yanone-kaffeesatz mt-10">Extra Features</p>
        <hr className="my-5" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {product?.feature?.map((list: any, i: Key) =>
            <li className="flex items-center gap-2" key={i}><CheckCircle size={16} className="text-green-600" />{list}</li>
          )}
        </ul>
</>}
{/* 
        <p className="text-xl sm:text-2xl font-yanone-kaffeesatz mt-10">Address</p>
        <hr className="my-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {product?.country && <h1 className="flex items-center gap-2"><Globe size={18} className="text-gray-600"/> Country: {product?.country}</h1>}
          {product?.city && <h1 className="flex items-center gap-2"><MapPin size={18} className="text-gray-600"/> City: {product?.city}</h1>}
          {product?.state && <h1 className="flex items-center gap-2"><MapPin size={18} className="text-gray-600"/> State: {product?.state}</h1>}
        </div> */}

        {product?.googleMap && <div className="p-5 bg-[#333333] text-white mt-10">
          <p className="text-xl sm:text-2xl font-yanone-kaffeesatz mb-5">Map view</p>
          <div dangerouslySetInnerHTML={{ __html: product?.googleMap }} />
        </div>}

        {product?.termsAndConditions && 
        <>
        <p className="text-xl sm:text-2xl font-yanone-kaffeesatz mt-10">Terms and Conditions</p>
        <hr className="my-5" />
        <p dangerouslySetInnerHTML={{ __html: product?.termsAndConditions }} />
        </>
        }
      </div>

      <div className="w-full lg:w-80 space-y-5">
        <div className="p-5 bg-[#F5F5F5] text-sm text-center">
          <span className="text-xl sm:text-2xl">BDT <span className="font-medium text-ruby-wine">{product?.price}</span> </span>Per month / <span className="text-xl sm:text-2xl">Negotiable</span>
        </div>
        <div className="p-5 bg-[#F5F5F5]">
          <div className="flex items-center justify-center gap-2 font-medium">
            <Phone size={20} /> {product?.phone?.slice(0,6)}...
          </div>
          {/* <p className="text-sm text-ruby-wine text-center mt-2">Click to show phone number</p> */}
        </div>
      <div className="p-5 bg-[#F5F5F5] flex items-center justify-center gap-2">
      <button 
        onClick={handleShare}
        className="flex items-center justify-center gap-2 hover:text-ruby-wine transition-colors cursor-pointer"
      >
        <Forward size={16} /> Share
      </button>
      
      <Dot />
      
      <button 
        onClick={handleSave}
        className="flex items-center justify-center gap-2 hover:text-ruby-wine transition-colors cursor-pointer"
      >
        <Heart 
          size={16} 
          className={isSaved ? "fill-ruby-wine text-ruby-wine" : ""} 
        /> 
        {isSaved ? "Saved" : "Save"}
      </button>
    </div>

        <Form productId={product?._id} />
        <Image
          width={1000}
          height={500}
          src="/images/add.png"
          alt="add"
          className="w-full h-fit"
        />
      </div>
    </div>
  );
}