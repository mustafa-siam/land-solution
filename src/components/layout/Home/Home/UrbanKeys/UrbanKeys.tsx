"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Shield,
  Users,
  Award,
  CheckCircle2
} from "lucide-react";

export default function UrbanKeysAbout() {
  const features = [
    {
      icon: Shield,
      title: "Verified Properties",
      desc: "Every listing undergoes thorough legal verification for clear titles.",
    },
    {
      icon: Users,
      title: "Expert Guidance",
      desc: "Our experienced team provides personalized support throughout.",
    },
    {
      icon: Award,
      title: "Trusted Service",
      desc: "Bangladesh's premier real estate partner since inception.",
    },
  ];

  return (
    <section className="px-[5%] py-20 sm:py-28 bg-white font-sans text-gray-900 relative overflow-hidden">

      <div className="max-w-screen-xl mx-auto relative z-10">

        {/* Top Header (Centered) */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-[#800020] text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>About UrbanKeys</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Your Trusted Real Estate Partner
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

          {/* Left Side: Image */}
          <div className="relative order-2 lg:order-1 flex items-center group">
            {/* Animated border container */}
            <div className="relative aspect-[4/3] w-full">
              {/* Main image container */}
              <div className="relative h-full w-full rounded-2xl shadow-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                  alt="Premium Properties by UrbanKeys"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#800020]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </div>

              {/* Animated corner accents - appear on hover */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#800020]/40 rounded-tl-xl transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-top-4 group-hover:-left-4" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#800020]/40 rounded-tr-xl transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-top-4 group-hover:-right-4" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#800020]/40 rounded-bl-xl transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-bottom-4 group-hover:-left-4" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#800020]/40 rounded-br-xl transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-bottom-4 group-hover:-right-4" />
            </div>

            {/* Floating Badge - Positioned Inside Image */}
            <div className="absolute bottom-6 left-6 bg-[#800020] text-white p-5 rounded-2xl shadow-xl z-10">
              <p className="text-3xl font-bold">500+</p>
              <p className="text-xs opacity-90">Properties Listed</p>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="order-1 lg:order-2 flex flex-col justify-center space-y-6">

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Connecting buyers, sellers, and renters with premium properties across Bangladesh. We make property transactions simple, transparent, and secure.
            </p>

            {/* Features Card List */}
            <div className="space-y-3">
              {features.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="p-4 rounded-xl border border-gray-200/70 bg-white hover:border-[#800020]/30 hover:shadow-md transition-all duration-300 group/card"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gray-50 border border-gray-200/80 text-[#800020] group-hover/card:bg-[#800020] group-hover/card:text-white group-hover/card:border-[#800020] transition-all duration-300 shrink-0">
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

            {/* CTA Section */}
            <div className="pt-2 space-y-3">
              <Link
                href="/about"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-sm bg-gray-950 text-white rounded-xl hover:bg-[#800020] active:scale-[0.99] transition-all duration-300 shadow-md group"
              >
                <span>Learn More About Us</span>
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
