"use client";

import { useMemo, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import Image from "next/image";
import { useGetAllReviewsQuery } from "@/redux/features/review/reviewApi";
import { Skeleton } from "@/components/ui/skeleton";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { MessageSquareQuote } from "lucide-react";
import { HomePagination } from "@/components/layout/Home/Shared/HomePagination/HomePagination";

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

export default function Page() {
  const [filters, setFilters] = useState({ page: 1 });

  const { data, isFetching, isLoading } = useGetAllReviewsQuery({
    page: filters?.page,
    limit: 8,
    search: "",
    status: "published",
    isTrash: false,
  });

  const allData: any[] = useMemo(() => data?.data?.data || [], [data]);
  const meta = useMemo(
    () => data?.data?.meta || { page: 1, limit: 10, total: 0, totalPages: 0 },
    [data]
  );

  const skeletonArray = new Array(8).fill(null);

  return (
    <div>
      {/* Hero Section */}
      <section className="px-[5%] py-16 sm:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 font-sans text-gray-900">
        <div className="max-w-screen-xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-[#800020] text-xs font-semibold uppercase tracking-wider">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Client Testimonials</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            What Our Clients Say
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Real experiences from homeowners, investors, and buyers across Bangladesh who found their dream properties with UrbanKeys
          </p>
        </div>
      </section>

      <Breadcrumb />

      {/* Reviews Grid */}
      <div className="px-[5%] py-12 sm:py-16 font-sans text-gray-900">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
            {(isFetching || isLoading)
              ? skeletonArray.map((_, i) => (
                <div key={i} className="bg-gray-200/80">
                  <Skeleton className="w-full h-52 rounded-2xl" />
                </div>
              ))
              : allData?.map((item) => {
                const rating = Number(item?.rating) || 5;

                return (
                  <div
                    key={item?._id}
                    className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-[#800020]/30 transition-all duration-300 flex flex-col justify-between h-full relative group overflow-hidden"
                  >
                    {/* Accent Top Border Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#800020]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Background Quote Watermark */}
                    <FaQuoteRight className="absolute -bottom-2 -right-2 text-6xl text-gray-100/60 pointer-events-none group-hover:text-[#800020]/5 transition-colors duration-300" />

                    <div>
                      {/* Card Header: Avatar, Name, Designation & Social */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3 min-w-0">
                          {item?.image ? (
                            <div className="relative flex-shrink-0">
                              <Image
                                width={48}
                                height={48}
                                src={item?.image}
                                alt={item?.title || item?.name || "Client"}
                                className="w-12 h-12 object-cover rounded-full border-2 border-gray-100 shadow-xs"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-[#800020] border border-gray-200 flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-xs">
                              {(item?.title || item?.name || "C").charAt(0)}
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-bold text-gray-900 leading-tight truncate group-hover:text-[#800020] transition-colors">
                              {item?.title || item?.name}
                            </h3>
                            <p className="text-xs text-[#800020] font-semibold truncate mt-0.5">
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
                            className={`text-xs ${starIndex < rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-gray-200"
                              }`}
                          />
                        ))}
                        <span className="text-xs text-gray-400 font-medium ml-1">
                          {rating}.0
                        </span>
                      </div>

                      {/* Review Description */}
                      <p className="text-sm text-gray-600 leading-relaxed font-normal line-clamp-3 relative z-10 italic">
                        &ldquo;{item?.description}&rdquo;
                      </p>
                    </div>

                  </div>
                );
              })}
          </div>

          <HomePagination
            page={filters.page}
            totalPages={meta.totalPages}
            isFetching={isFetching}
            onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
          />
        </div>
      </div>
    </div>
  );
}
