"use client";

import { useMemo, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import Image from "next/image";
import { HomePagination } from "@/components/layout/Home/Shared/HomePagination/HomePagination";
import { useGetAllReviewsQuery } from "@/redux/features/review/reviewApi";
import { Skeleton } from "@/components/ui/skeleton"; // 👈 import skeleton

import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa'; // Assuming you use react-icons/fa

const SocialIcon = ({ social, className, ...props }: { social: string; className?: string }) => {
  if (!social) return null;

  const normalizedSocial = social.toLowerCase();
  
  // Base classes for icons
  const baseClass = className || "text-2xl";

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
export default function Page() {
  const [filters, setFilters] = useState({ page: 1 });

  const { data, isFetching, isLoading } = useGetAllReviewsQuery({
    page: filters?.page,
    limit: 8,
    search: "",
    status: "published",
    isTrash: false,
  });

  // Extract all image data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allData: any[] = useMemo(() => data?.data?.data || [], [data]);
  const meta = useMemo(
    () => data?.data?.meta || { page: 1, limit: 10, total: 0, totalPages: 0 },
    [data]
  );

  const skeletonArray = new Array(8).fill(null);

  return (
    <div >


      <Breadcrumb />

      <div className="px-[5%] py-16">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10 lg:gap-16 pb-16">
          {(isFetching || isLoading)
            ? skeletonArray.map((_, i) => (
                <div key={i} className="bg-pale-mint ">
                  <Skeleton className="w-full h-52 mb-5" />
                </div>
              ))
            : allData?.map((item) => (
                   <div className="bg-white" key={item?._id}>
                                      <h1>“ {item?.description} ”</h1>
                                      <div className="mt-5 flex items-center gap-5">
                                        <Image
                                          width={300}
                                          height={300}
                                          src={item?.image}
                                          alt={item?.title}
                                          className="w-12 h-12 object-cover rounded-full"
                                        />
                                        <div className="flex justify-between items-center gap-5 w-full">
                                        <div>
                                          <h1>{item?.title}</h1>
                                          <h1 className="text-sm text-medium-dusk">
                                            {item?.designation}
                                          </h1>
                                        </div>
                                        <div className="">
                  {/* The 'item?.social' value is passed as the 'social' prop */}
                        <SocialIcon social={item?.social} className="text-3xl" />
                </div>
                                        </div>
                                      </div>
                                    </div>
              ))}
        </div>

        <HomePagination
          page={filters.page}
          totalPages={meta.totalPages}
          isFetching={isFetching}
          onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        />
      </div>
    </div>
  );
}
