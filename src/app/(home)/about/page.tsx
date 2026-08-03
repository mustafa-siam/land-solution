"use client";
import WhyUs from "@/components/layout/Home/About/WhyUs/WhyUs";
import Breadcrumb from "./Breadcrumb";
import AboutUsContent from "@/components/layout/Home/About/AboutUsContent/AboutUsContent";
import { FAQ } from "@/components/layout/Home/About/FAQ/FAQ";
import OurClientReviews from "@/components/layout/Home/Home/OurClientReviews/OurClientReviews";
import { Building2 } from "lucide-react";

export default function Page() {
  return (
    <div>
      {/* Hero Section */}
      <section className="px-[5%] py-16 sm:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 font-sans text-gray-900">
        <div className="max-w-screen-xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-[#800020] text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>About Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            Your Trusted Real Estate Partner
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Connecting buyers, sellers, and renters with premium properties across Bangladesh
          </p>
        </div>
      </section>

      <Breadcrumb />
      <AboutUsContent />
      <WhyUs />
      <FAQ />
      <OurClientReviews />
    </div>
  );
}
