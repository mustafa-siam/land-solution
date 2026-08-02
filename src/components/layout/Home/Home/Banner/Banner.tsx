"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Redux & Search Imports
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import Search from "./Search";
import { ChevronLeft, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function Banner() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const { data } = useGetAllCategoriesQuery({
    page: 1,
    limit: 1000,
    search: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categories: any[] = data?.data?.data || [];

  return (
    <div className="relative w-full h-[600px] sm:h-[650px] lg:h-[720px] overflow-hidden bg-gray-950 font-sans">
      {/* Custom Navigation Controls - Desktop: Side Centered */}
      <button
        ref={prevRef}
        type="button"
        aria-label="Previous Slide"
        className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-[#800020] border border-white/20 text-white items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95 shadow-lg group"
      >
        <span className="text-xl font-bold group-hover:-translate-x-0.5 transition-transform"><ChevronLeftIcon></ChevronLeftIcon> </span>
      </button>

      <button
        ref={nextRef}
        type="button"
        aria-label="Next Slide"
        className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-[#800020] border border-white/20 text-white items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95 shadow-lg group"
      >
        <span className="text-xl font-bold group-hover:translate-x-0.5 transition-transform"><ChevronRightIcon></ChevronRightIcon></span>
      </button>

      {/* Mobile Navigation - Bottom Right (Side by Side) */}
      <div className="sm:hidden absolute bottom-6 right-4 z-30 flex flex-row gap-2">
        <button
          ref={prevRef}
          type="button"
          aria-label="Previous Slide"
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-[#800020] border border-white/20 text-white flex items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95 shadow-lg"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          ref={nextRef}
          type="button"
          aria-label="Next Slide"
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-[#800020] border border-white/20 text-white flex items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95 shadow-lg"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* 1. Background Swiper Slider */}
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !w-2.5 !h-2.5 !bg-white/60 !opacity-60 !mx-1 !rounded-full !transition-all !duration-300 hover:!opacity-100",
          bulletActiveClass:
            "swiper-pagination-bullet-active !w-8 !bg-[#800020] !opacity-100 !rounded-full",
        }}
        onBeforeInit={(swiper: SwiperClass) => {
          if (typeof swiper.params.navigation !== "boolean" && swiper.params.navigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full absolute inset-0 z-0"
      >
        <SwiperSlide>
          <img
            className="w-full h-full object-cover"
            src="https://i.ibb.co.com/d0PztQ1y/out.jpg"
            alt="Property Banner 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-full object-cover"
            src="https://i.ibb.co.com/4wQ83ZJP/apa.jpg"
            alt="Property Banner 2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-full object-cover scale-105"
            src="https://i.ibb.co.com/7xTwDsGW/dhaka.jpg"
            alt="Property Banner 3"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-full object-cover scale-105"
            src="https://i.ibb.co.com/5XbdWX8q/tv.jpg"
            alt="Property Banner 4"
          />
        </SwiperSlide>
      </Swiper>

      {/* 2. Dark Gradient Overlay & 3. Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 via-black/45 to-black/30 px-[5%] text-center pt-12 pointer-events-none">
        
        {/* Top Tagline */}
        <div className="pointer-events-auto inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium tracking-wider uppercase mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#800020] animate-ping" />
          <span>Premier Real Estate in Bangladesh</span>
        </div>

        {/* Title */}
        <h1 className="pointer-events-auto text-4xl sm:text-5xl lg:text-6xl text-white font-light max-w-3xl leading-tight mb-8 drop-shadow-lg tracking-tight">
          <b className="font-extrabold text-white">Buy</b>, <b className="font-extrabold text-white">Sell</b> & Rent with Ease
        </h1>

        {/* Search Widget Container */}
        <div className="pointer-events-auto w-full max-w-2xl transform transition-transform duration-300 hover:scale-[1.01]">
          <Search categories={categories} />
        </div>
      </div>
    </div>
  );
}