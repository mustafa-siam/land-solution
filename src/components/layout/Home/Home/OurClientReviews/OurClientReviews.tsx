/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useGetAllReviewsQuery } from "@/redux/features/review/reviewApi";
import { Skeleton } from "@/components/ui/skeleton";
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { MessageSquareQuote, CheckCircle2 } from "lucide-react";

const SocialIcon = ({ social, className = "text-base", ...props }: { social: string; className?: string }) => {
  if (!social) return null;

  const normalizedSocial = social.toLowerCase();

  switch (normalizedSocial) {
    case "facebook":
      return <FaFacebook className={`${className} text-[#1877F2]`} {...props} />;
    case "instagram":
      return <FaInstagram className={`${className} text-[#E4405F]`} {...props} />;
    case "linkedin":
      return <FaLinkedinIn className={`${className} text-[#0A66C2]`} {...props} />;
    case "twitter":
    case "x":
      return <FaTwitter className={`${className} text-[#1DA1F2]`} {...props} />;
    case "tiktok":
      return <FaTiktok className={`${className} text-black`} {...props} />;
    case "youtube":
      return <FaYoutube className={`${className} text-[#FF0000]`} {...props} />;
    case "whatsapp":
      return <FaWhatsapp className={`${className} text-[#25D366]`} {...props} />;
    default:
      return null;
  }
};

export default function OurClientReviews() {
  const [api, setApi] = useState<CarouselApi>();
  const [filters] = useState({ page: 1 });

  const { data, isFetching, isLoading } = useGetAllReviewsQuery({
    page: filters?.page,
    limit: 10,
    search: "",
    status: "published",
    isTrash: false,
  });

  const allData: any[] = useMemo(() => data?.data?.data || [], [data]);
  const skeletonArray = new Array(3).fill(null);

  return (
    <section className="bg-gradient-to-b from-gray-50 via-white to-gray-50 px-4 sm:px-8 py-20 font-sans text-gray-900 border-t border-b border-gray-200/60 relative overflow-hidden">
      
      {/* Decorative Subtle Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#800020]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        
        {/* Title & Subheading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-[#800020] text-xs font-semibold uppercase tracking-wider">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Client Testimonials</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            What Our Clients Say
          </h2>
          
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Real experiences from homeowners, investors, and buyers across Bangladesh who found their dream properties with Land Solution.
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative px-2 sm:px-8">
          
          {/* Custom Navigation Controls */}
          <button
            onClick={() => api?.scrollPrev()}
            aria-label="Previous Slide"
            className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-gray-800 shadow-md border border-gray-200 flex items-center justify-center transition-all duration-300 hover:bg-[#800020] hover:text-white hover:border-[#800020] hover:scale-105 active:scale-95 z-30 focus:outline-none cursor-pointer group"
          >
            <FaChevronLeft className="text-xs transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            onClick={() => api?.scrollNext()}
            aria-label="Next Slide"
            className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-gray-800 shadow-md border border-gray-200 flex items-center justify-center transition-all duration-300 hover:bg-[#800020] hover:text-white hover:border-[#800020] hover:scale-105 active:scale-95 z-30 focus:outline-none cursor-pointer group"
          >
            <FaChevronRight className="text-xs transition-transform group-hover:translate-x-0.5" />
          </button>

          <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4 py-4">
              {isFetching || isLoading
                ? skeletonArray.map((_, i) => (
                    <CarouselItem
                      key={i}
                      className="pl-4 md:basis-1/2 lg:basis-1/3"
                    >
                      <Skeleton className="w-full h-[240px] bg-gray-200/80 rounded-2xl" />
                    </CarouselItem>
                  ))
                : allData?.map((item, index) => {
                    const rating = Number(item?.rating) || 5;

                    return (
                      <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 flex">
                        
                        {/* Compact Elegant Card */}
                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-[#800020]/30 transition-all duration-300 flex flex-col justify-between w-full h-[240px] relative group overflow-hidden">
                          
                          {/* Accent Top Border Line */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#800020]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Background Quote Watermark */}
                          <FaQuoteRight className="absolute -bottom-2 -right-2 text-6xl text-gray-100/60 pointer-events-none group-hover:text-[#800020]/5 transition-colors duration-300" />

                          <div>
                            {/* Card Header: Avatar, Name, Designation & Social */}
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className="flex items-center gap-3 min-w-0">
                                {item?.image ? (
                                  <div className="relative flex-shrink-0">
                                    <Image
                                      width={44}
                                      height={44}
                                      src={item?.image}
                                      alt={item?.title || item?.name || "Client"}
                                      className="w-11 h-11 object-cover rounded-full border-2 border-gray-100 shadow-xs"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-[#800020] border border-gray-200 flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-xs">
                                    {(item?.title || item?.name || "C").charAt(0)}
                                  </div>
                                )}

                                <div className="min-w-0 flex-1">
                                  <h3 className="text-sm font-bold text-gray-900 leading-tight truncate group-hover:text-[#800020] transition-colors">
                                    {item?.title || item?.name}
                                  </h3>
                                  <p className="text-[11px] text-[#800020] font-semibold truncate mt-0.5">
                                    {item?.designation || "Homeowner"}
                                  </p>
                                </div>
                              </div>

                              {item?.social && (
                                <div className="flex-shrink-0 p-1.5 rounded-lg bg-gray-50 border border-gray-100 shadow-2xs group-hover:bg-white transition-colors">
                                  <SocialIcon social={item?.social} />
                                </div>
                              )}
                            </div>

                            {/* Star Rating */}
                            <div className="flex items-center gap-1 mb-3">
                              {[...Array(5)].map((_, starIndex) => (
                                <FaStar
                                  key={starIndex}
                                  className={`text-xs ${
                                    starIndex < rating
                                      ? "text-amber-400 fill-amber-400"
                                      : "text-gray-200"
                                  }`}
                                />
                              ))}
                              <span className="text-[10px] text-gray-400 font-medium ml-1">
                                {rating}.0
                              </span>
                            </div>

                            {/* Review Description */}
                            <p className="text-xs text-gray-600 leading-relaxed font-normal line-clamp-3 relative z-10 italic">
                              &ldquo;{item?.description}&rdquo;
                            </p>
                          </div>

                        </div>
                      </CarouselItem>
                    );
                  })}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Footer Rating Banner */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-gray-500 border-t border-gray-200/60 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-emerald-100 border border-white flex items-center justify-center text-[10px] font-bold text-emerald-700">✓</div>
              <div className="w-6 h-6 rounded-full bg-amber-100 border border-white flex items-center justify-center text-[10px] font-bold text-amber-700">★</div>
            </div>
            <span className="font-medium text-gray-700">100% Verified Reviews</span>
          </div>

          <div className="h-3 w-[1px] bg-gray-300 hidden sm:block" />

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-gray-900">4.9 / 5.0</span>
            <span>Average Satisfaction Score</span>
          </div>
        </div>

      </div>
    </section>
  );
}