"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Camera, 
  Sofa, 
  Target, 
  CheckCircle2, 
  Sparkles,
  Building2 
} from "lucide-react";

export default function LandSolutionAbout() {
  const [activeTab, setActiveTab] = useState<"after" | "before">("after");

  const images = {
    after: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    before: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=85",
  };

  const services = [
    {
      icon: Camera,
      title: "HDR Photography & Drone",
      desc: "Architectural imagery and drone videography that grab buyer attention instantly.",
    },
    {
      icon: Sofa,
      title: "Luxury Staging",
      desc: "Bespoke interior styling tailored to attract higher-value offers.",
    },
    {
      icon: Target,
      title: "Targeted Marketing",
      desc: "Direct positioning to qualified buyers and off-market investment networks.",
    },
  ];

  return (
    <section className="px-[5%] py-16 sm:py-24 bg-gradient-to-b from-white via-gray-50/30 to-white font-sans text-gray-900 overflow-hidden relative">
      
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#800020]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-[#800020] text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Why Choose Land Solution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
              Where Dreams Live
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              Be the first to browse exclusive listings in Bangladesh&apos;s most sought-after neighborhoods before they hit the open market.
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Side: Interactive Image Showcase */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-xl border border-gray-200/80 bg-gray-50">
              <Image
                src={images[activeTab]}
                alt={`Land Solution Staging - ${activeTab}`}
                fill
                priority
                className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Upfront Cost Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-gray-200/80 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-sm shadow-2xs">
                  $0
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Upfront Cost</p>
                  <p className="text-xs font-bold text-gray-900">Paid at Closing</p>
                </div>
              </div>

              {/* Before / Staged Interactive Controls */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md border border-gray-200/80 p-1.5 rounded-xl flex gap-1.5 shadow-xl">
                <button
                  onClick={() => setActiveTab("before")}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 ${
                    activeTab === "before"
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Original
                </button>
                <button
                  onClick={() => setActiveTab("after")}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 ${
                    activeTab === "after"
                      ? "bg-[#800020] text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Staged
                </button>
              </div>
            </div>

            {/* Decorative Frame */}
            <div className="absolute -inset-2 border border-[#800020]/20 rounded-3xl -z-10 transform translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none" />
          </div>

          {/* Right Side: Features Stack */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              {services.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={index}
                    className="p-4 rounded-xl border border-gray-200/70 bg-white hover:border-[#800020]/30 hover:shadow-md transition-all duration-300 group/card"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gray-50 border border-gray-200/80 text-[#800020] group-hover/card:bg-[#800020] group-hover/card:text-white group-hover/card:border-[#800020] transition-all duration-300 shrink-0 shadow-2xs">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-gray-900 group-hover/card:text-[#800020] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 space-y-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-sm bg-gray-950 text-white rounded-xl hover:bg-[#800020] active:scale-[0.99] transition-all duration-300 shadow-md group"
              >
                <span>Learn More About Land Solution</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-medium">Zero interest or hidden upfront fees</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}