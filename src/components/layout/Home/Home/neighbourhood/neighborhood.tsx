/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Compass, ArrowUpRight, MapPin } from "lucide-react";

interface Neighborhood {
  name: string;
  image: string;
  areaId: string;
}

export default function FindNeighborhood() {
  const { data: propertiesData, isLoading } = useGetAllProductsQuery({
    page: 1,
    limit: 20,
    status: "published",
    isTrash: false,
  });

  const rawListings: any[] = useMemo(
    () => propertiesData?.data?.data ?? [],
    [propertiesData]
  );

  const neighborhoods = useMemo<Neighborhood[]>(() => {
    const fallbackImages = [
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    ];

    const defaultNames = [
      "Gulshan",
      "Banani",
      "Dhanmondi",
      "Bashundhara",
      "Uttara",
    ];

    const extractedMap = new Map<string, Neighborhood>();

    rawListings.forEach((item: any) => {
      const areaId =
        typeof item?.areaId === "string"
          ? item.areaId
          : item?.areaId?._id ?? "";

      const rawLocation =
        item?.areaId?.title ??
        item?.location ??
        item?.address ??
        "";

      const primaryName =
        rawLocation
          .split(",")[0]
          ?.replace(/\d+/g, "")
          .trim() || rawLocation.trim();

      const image =
        item?.image?.[0] ??
        item?.images?.[0] ??
        item?.featuredImage ??
        "";

      if (areaId && primaryName && image && !extractedMap.has(areaId)) {
        extractedMap.set(areaId, {
          name: primaryName,
          image,
          areaId,
        });
      }
    });

    const result = Array.from(extractedMap.values());

    while (result.length < 5) {
      const index = result.length;

      result.push({
        name: defaultNames[index] ?? `Neighborhood ${index + 1}`,
        image: fallbackImages[index] ?? fallbackImages[0],
        areaId: "",
      });
    }

    return result.slice(0, 5);
  }, [rawListings]);

  return (
    <section className="bg-gradient-to-b from-gray-50 via-gray-100/70 to-gray-50 px-[5%] py-20 font-sans text-gray-900 border-t border-b border-gray-200/60 relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full pointer-events-none opacity-30">
        <div className="absolute top-10 right-10 w-80 h-80 bg-[#800020]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-screen-xl relative z-10 space-y-12">
        
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-[#800020] text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Explore Locations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
            Find the Neighborhood For You
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            The neighborhoods best suited to your lifestyle, and the local agents who know them best.
          </p>
        </div>

        {/* Dynamic Neighborhood Bento Grid */}
        {isLoading ? (
          <NeighborhoodSkeleton />
        ) : (
          <div className="flex flex-col gap-4">
            
            {/* Top Grid Row */}
            <div className="grid h-auto grid-cols-1 gap-4 md:h-[320px] md:grid-cols-12">
              <div className="h-[280px] md:col-span-5 md:h-full">
                <NeighborhoodCard item={neighborhoods[0]} />
              </div>

              <div className="h-[280px] md:col-span-3 md:h-full">
                <NeighborhoodCard item={neighborhoods[1]} />
              </div>

              <div className="h-[280px] md:col-span-4 md:h-full">
                <NeighborhoodCard item={neighborhoods[2]} />
              </div>
            </div>

            {/* Bottom Grid Row */}
            <div className="grid h-auto grid-cols-1 gap-4 md:h-[350px] md:grid-cols-12">
              <div className="h-[280px] md:col-span-4 md:h-full">
                <NeighborhoodCard item={neighborhoods[3]} />
              </div>

              <div className="h-[280px] md:col-span-8 md:h-full">
                <NeighborhoodCard item={neighborhoods[4]} />
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

function NeighborhoodCard({ item }: { item: Neighborhood }) {
  const router = useRouter();

  const handleNeighborhoodClick = () => {
    if (item.areaId) {
      const params = new URLSearchParams({
        areaId: item.areaId,
      });
      router.push(`/properties?${params.toString()}`);
    } else {
      router.push(`/properties`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleNeighborhoodClick}
      aria-label={`View properties in ${item.name}`}
      className="group relative h-full w-full overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-900 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-[#800020]/40 text-left cursor-pointer"
    >
      {/* Background Image */}
      <Image
        src={item.image}
        alt={item.name}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />


      {/* Bottom Content Header */}
      <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-3">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm group-hover:text-[#800020]  transition-colors">
            {item.name}
          </h3>
          <p className="text-xs text-gray-300 font-normal mt-0.5 opacity-90">
            Explore available listings
          </p>
        </div>

        {/* Hover Icon Action Pill */}
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[#800020] group-hover:border-[#800020] group-hover:scale-110 shadow-md">
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </button>
  );
}

function NeighborhoodSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="grid h-auto grid-cols-1 gap-4 md:h-[320px] md:grid-cols-12">
        <div className="h-[280px] bg-gray-200/80 rounded-2xl md:col-span-5 md:h-full" />
        <div className="h-[280px] bg-gray-200/80 rounded-2xl md:col-span-3 md:h-full" />
        <div className="h-[280px] bg-gray-200/80 rounded-2xl md:col-span-4 md:h-full" />
      </div>

      <div className="grid h-auto grid-cols-1 gap-4 md:h-[350px] md:grid-cols-12">
        <div className="h-[280px] bg-gray-200/80 rounded-2xl md:col-span-4 md:h-full" />
        <div className="h-[280px] bg-gray-200/80 rounded-2xl md:col-span-8 md:h-full" />
      </div>
    </div>
  );
}