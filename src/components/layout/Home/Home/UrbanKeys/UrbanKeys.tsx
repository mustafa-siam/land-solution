"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';

export default function UrbanKeys() {
  // Static high-end real estate image representing luxury transformation
  const transformationImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85";

  return (
    <section className="px-[5%] pt-16 bg-white overflow-hidden font-sans">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Modern Image Frame Showcase */}
        <div className="lg:col-span-6 relative group">
          <div className="relative aspect-[4/3] w-full  overflow-hidden shadow-xl border border-gray-100">
            <Image
              src={transformationImage}
              alt="Home Staging Luxury Transformation"
              fill
              className="object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Elegant Premium Graphic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            
            {/* Interactive/Visual Label Tag */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-3 flex justify-between items-center shadow-lg border border-white/20">
              <span className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Visual Presentation</span>
              <span className="text-xs font-semibold text-gray-900 tracking-tight">Luxury Transformation Elegance</span>
            </div>
          </div>
          
          {/* Subtle Decorative Background Frame element for premium design texture */}
          <div className="absolute -inset-3 border border-ruby-wine/10 rounded-3xl -z-10 transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
        </div>

        {/* Right Side: Copywriting & Value Propositions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-ruby-wine font-semibold text-xs uppercase tracking-widest block">
              Premium Marketing Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-yanone-kaffeesatz text-gray-950 tracking-tight leading-[1.15]">
              UrbanKeys Concierge
            </h2>
          </div>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
            Concierge helps you sell your home faster and for more money by covering the upfront cost of premium home improvement services — <span className="font-semibold text-gray-900">zero due until closing.</span> From professional architectural styling to elite staging, we transform your property into an exclusive digital asset.
          </p>

          {/* Value Features Checklist */}
          <ul className="space-y-3.5 pt-2">
            {[
              "Professional HDR Photography & Custom Drone Videography",
              "Luxury Home Staging & High-End Interior Design Consultations",
              "Targeted Off-Market Marketing to High-Net-Worth Investors"
            ].map((text, index) => (
              <li key={index} className="flex items-start gap-3 group/item">
                <div className="flex-shrink-0 mt-0.5">
                  <FaCheckCircle className="text-emerald-500 text-lg transition-transform duration-300 group-hover/item:scale-110" />
                </div>
                <span className="text-gray-700 text-sm sm:text-medium font-medium tracking-wide">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}