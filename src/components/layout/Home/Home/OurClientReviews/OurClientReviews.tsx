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
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa';

const SocialIcon = ({ social, className, ...props }: { social: string; className?: string }) => {
  if (!social) return null;

  const normalizedSocial = social.toLowerCase();
  const baseClass = className || "text-xl";

  switch (normalizedSocial) {
    case 'facebook':
      return <FaFacebook className={`${baseClass} text-[#1877F2]`} {...props} />;
    case 'instagram':
      return <FaInstagram className={`${baseClass} text-[#E4405F]`} {...props} />;
    case 'linkedin':
      return <FaLinkedinIn className={`${baseClass} text-[#0A66C2]`} {...props} />;
    case 'twitter':
      return <FaTwitter className={`${baseClass} text-[#1DA1F2]`} {...props} />; 
    case 'tiktok':
      return <FaTiktok className={`${baseClass} text-[#000000]`} {...props} />;
    case 'youtube':
      return <FaYoutube className={`${baseClass} text-[#FF0000]`} {...props} />;
    case 'whatsapp':
      return <FaWhatsapp className={`${baseClass} text-[#25D366]`} {...props} />;
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
    <section className="bg-[#E7ECEF] px-[5%] py-16 font-sans text-gray-900">
      <div className="max-w-screen-xl mx-auto">
        
        {/* Title Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            What Our Clients Say
          </h2>
        </div>

        {/* Carousel Outer Container with relative positioning strictly for the cards */}
        <div className="relative">
          
          {/* Custom Previous Button - Absolute Centered to Cards */}
          <button
            onClick={() => api?.scrollPrev()}
            aria-label="Previous Slide"
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-gray-800 hover:bg-black hover:text-white border border-gray-200 shadow-lg flex items-center justify-center transition-all duration-300 z-30 focus:outline-none cursor-pointer"
          >
            <FaChevronLeft className="text-sm" />
          </button>

          {/* Custom Next Button - Absolute Centered to Cards */}
          <button
            onClick={() => api?.scrollNext()}
            aria-label="Next Slide"
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-gray-800 hover:bg-black hover:text-white border border-gray-200 shadow-lg flex items-center justify-center transition-all duration-300 z-30 focus:outline-none cursor-pointer"
          >
            <FaChevronRight className="text-sm" />
          </button>

          <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {(isFetching || isLoading)
                ? skeletonArray.map((_, i) => (
                    <CarouselItem
                      key={i}
                      className="pl-4 md:basis-1/2 lg:basis-1/3"
                    >
                      <Skeleton className="w-full h-[300px] bg-gray-200 rounded-none" />
                    </CarouselItem>
                  ))
                : allData?.map((item, index) => (
                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <div className="group bg-white p-8 h-full min-h-[300px] flex flex-col justify-between shadow-xs border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div>
                          {/* 5-Star Rating Row */}
                          <div className="flex items-center gap-1 mb-6">
                            {[...Array(5)].map((_, starIndex) => (
                              <FaStar key={starIndex} className="text-black text-xs sm:text-sm" />
                            ))}
                          </div>

                          {/* Quote Body Text */}
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic mb-8">
                            &ldquo;{item?.description}&rdquo;
                          </p>
                        </div>

                        {/* Author Info Footer */}
                        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                          <div className="flex items-center gap-3">
                            {item?.image && (
                              <Image
                                width={100}
                                height={100}
                                src={item?.image}
                                alt={item?.title || "Client"}
                                className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                              />
                            )}
                            <div className="flex flex-col">
                              <h3 className="text-xs font-bold text-gray-900 leading-snug">
                                {item?.title || item?.name}
                              </h3>
                              <p className="text-[11px] text-gray-400 font-normal">
                                {item?.designation || "Homeowner"}
                              </p>
                            </div>
                          </div>

                          {/* Social Icon Hover Effect */}
                          {item?.social && (
                            <div className="flex-shrink-0 transition-transform duration-300 ease-in-out group-hover:scale-125">
                              <SocialIcon social={item?.social} className="text-xl" />
                            </div>
                          )}
                        </div>

                      </div>
                    </CarouselItem>
                  ))}
            </CarouselContent>
          </Carousel>
        </div>

      </div>
    </section>
  );
}