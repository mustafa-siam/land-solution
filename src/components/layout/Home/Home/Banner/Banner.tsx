"use client"

import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import Search from "./Search";

export default function Banner() {
  const { data } = useGetAllCategoriesQuery({
    page: 1,
    limit: 1000,
    search: "",
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categories: any[] = data?.data?.data || [];

  return (
    <div
      className="relative w-full h-[600px] sm:h-[650px] lg:h-[720px] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/banner.png')" }}
    >
      {/* dark overlay so white navbar + text stay readable over the photo */}
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-[5%] text-center pt-24">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-yanone-kaffeesatz font-light max-w-2xl leading-tight mb-8">
          Find <b>buy, sell</b> & <b>rent</b> with ease
        </h1>
        <div className="w-full max-w-2xl">
          <Search categories={categories} />
        </div>
      </div>
    </div>
  );
}