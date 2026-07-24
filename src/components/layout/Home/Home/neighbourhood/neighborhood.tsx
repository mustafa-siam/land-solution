/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

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

    /*
     * Key   = unique area ID
     * Value = neighborhood information
     */
    const extractedMap = new Map<string, Neighborhood>();

    rawListings.forEach((item: any) => {
      /*
       * areaId can be:
       * 1. An object: { _id, title }
       * 2. A string containing the ID
       */
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

      /*
       * Only add valid API neighborhoods.
       * Using areaId as the Map key prevents duplicate areas.
       */
      if (areaId && primaryName && image && !extractedMap.has(areaId)) {
        extractedMap.set(areaId, {
          name: primaryName,
          image,
          areaId,
        });
      }
    });

    const result = Array.from(extractedMap.values());

    /*
     * Add fallback cards when fewer than five real areas exist.
     * Fallback cards are not clickable because areaId is empty.
     */
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
    <section className="bg-[#E7ECEF] px-[5%] py-16 font-sans text-gray-900">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Find the Neighborhood For You
          </h2>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            The neighborhoods best suited to your lifestyle, and the agents
            who know them best.
          </p>
        </div>

        {isLoading && <NeighborhoodSkeleton />}

        {!isLoading && (
          <div className="flex flex-col gap-4">
            <div className="grid h-auto grid-cols-1 gap-4 md:h-[300px] md:grid-cols-12">
              <div className="group relative h-[280px] overflow-hidden md:col-span-5 md:h-full">
                <NeighborhoodCard item={neighborhoods[0]} />
              </div>

              <div className="group relative h-[280px] overflow-hidden md:col-span-3 md:h-full">
                <NeighborhoodCard item={neighborhoods[1]} />
              </div>

              <div className="group relative h-[280px] overflow-hidden md:col-span-4 md:h-full">
                <NeighborhoodCard item={neighborhoods[2]} />
              </div>
            </div>

            <div className="grid h-auto grid-cols-1 gap-4 md:h-[340px] md:grid-cols-12">
              <div className="group relative h-[280px] overflow-hidden md:col-span-4 md:h-full">
                <NeighborhoodCard item={neighborhoods[3]} />
              </div>

              <div className="group relative h-[280px] overflow-hidden md:col-span-8 md:h-full">
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
    if (!item.areaId) {
      return;
    }

    const params = new URLSearchParams({
      areaId: item.areaId,
    });

    router.push(`/properties?${params.toString()}`);
  };

  const hasValidAreaId = Boolean(item.areaId);

  return (
    <button
      type="button"
      onClick={handleNeighborhoodClick}
      disabled={!hasValidAreaId}
      aria-label={
        hasValidAreaId
          ? `View properties in ${item.name}`
          : `${item.name} properties are unavailable`
      }
      className={`group relative block h-full w-full overflow-hidden text-left ${hasValidAreaId
        ? "cursor-pointer"
        : "cursor-default"
        }`}
    >
      <Image
        src={item.image}
        alt={item.name}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-cover transition-transform duration-500 ${hasValidAreaId ? "group-hover:scale-105" : ""
          }`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="absolute bottom-4 left-4">
        <span className="text-sm font-semibold tracking-wide text-white underline decoration-white underline-offset-4 drop-shadow sm:text-base">
          {item.name}
        </span>
      </div>
    </button>
  );
}

function NeighborhoodSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="grid h-auto grid-cols-1 gap-4 md:h-[300px] md:grid-cols-12">
        <div className="h-[280px] bg-gray-200 md:col-span-5 md:h-full" />
        <div className="h-[280px] bg-gray-200 md:col-span-3 md:h-full" />
        <div className="h-[280px] bg-gray-200 md:col-span-4 md:h-full" />
      </div>

      <div className="grid h-auto grid-cols-1 gap-4 md:h-[340px] md:grid-cols-12">
        <div className="h-[280px] bg-gray-200 md:col-span-4 md:h-full" />
        <div className="h-[280px] bg-gray-200 md:col-span-8 md:h-full" />
      </div>
    </div>
  );
}