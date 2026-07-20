"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useGetAllReviewsQuery } from "@/redux/features/review/reviewApi";
import { Skeleton } from "@/components/ui/skeleton"; // 👈 import skeleton
import Link from "next/link";
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

export default function OurClientReviews() {
  const [filters] = useState({ page: 1 });

  const { data, isFetching, isLoading } = useGetAllReviewsQuery({
    page: filters?.page,
    limit: 6,
    search: "",
    status: "published",
    isTrash: false,
  });

  // Extract all review data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allData: any[] = useMemo(() => data?.data?.data || [], [data]);

  const skeletonArray = new Array(6).fill(null);

  return (
    <div className="px-[5%] py-16">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center gap-5 my-5 ">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-yanone-kaffeesatz">
            What people says about us
          </h1>
          <Link href={"/testimonials"} className="text-ruby-wine text-xl">See All</Link>
        </div>

        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {(isFetching || isLoading)
              ? skeletonArray.map((_, i) => (
                  <CarouselItem
                    key={i}
                    className="md:basis-1/2 animate-pulse"
                  >
                      <Skeleton className="w-full h-80" /> {/* description */}
                  </CarouselItem>
                ))
              : allData?.map((item, index) => (
                  <CarouselItem key={index} className="md:basis-1/2">
                    <div className="bg-white p-5 border-t-2 border-ruby-wine">
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
                  </CarouselItem>
                ))}
          </CarouselContent>

          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>

      </div>
    </div>
  );
}
