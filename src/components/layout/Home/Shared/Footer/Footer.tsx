"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn
} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Send
} from "lucide-react";
import Image from "next/image";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

export default function Footer() {
  // 1. Same exact logic as Banner
  const { data, isLoading } = useGetAllCategoriesQuery({
    page: 1,
    limit: 1000,
    search: "",
  });

  const categories: any[] = data?.data?.data || [];

  return (
    <footer className="bg-[#0f0f11] text-gray-300 font-sans border-t border-gray-800/60" id="footer">

      {/* Top Banner / Call To Action */}
      <div className="border-b border-gray-800/80 bg-gradient-to-r from-[#141417] via-[#0f0f11] to-[#141417]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Ready to find your next property?
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Connect with our estate experts to explore off-market listings across Bangladesh.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/contact">
              <Button className="bg-[#800020] hover:bg-[#66001a] text-white px-6 py-2.5 text-xs font-semibold rounded-lg transition-all shadow-md flex items-center gap-2">
                <span>Contact With Us</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-5">
            <div className="space-y-2">
              {/* <span className="text-xs font-semibold uppercase tracking-widest text-[#ffff]">
                Real Estate Partner
              </span> */}
              <Link href="/" className="relative z-50">
                <Image
                  width={160}
                  height={40}
                  src="images/urbanKeyslogo1.png"
                  alt="logo"
                  className={`h-18 md:h-14 w-auto transition-all `}
                />
              </Link>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Connecting buyers, sellers, and renters with premium residential and commercial properties across Bangladesh with architectural precision.
            </p>

            <div className="pt-2">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                Follow Our Journey
              </p>
              <div className="flex items-center gap-2.5">
                {[
                  { icon: FaFacebookF, href: "#" },
                  { icon: FaInstagram, href: "#" },
                  { icon: RiTwitterXFill, href: "#" },
                  { icon: FaLinkedinIn, href: "#" },
                ].map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={idx}
                      href={social.href}
                      className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#800020] hover:bg-[#800020]/10 transition-all duration-300"
                    >
                      <Icon size={14} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-gray-800 pb-2 inline-block border-r-2 pr-4 border-r-[#800020]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { name: "About Us", href: "/about" },
                { name: "Our Properties", href: "/properties" },
                { name: "Blog & Insights", href: "/blogs" },
                { name: "Contact Us", href: "/contact" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Dynamic Categories using RTK Query */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-gray-800 pb-2 inline-block border-r-2 pr-4 border-r-[#800020]">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { name: "Buy Property", href: "/properties?type=buy" },
                { name: "Sell Property", href: "/contact?intent=sell" },
                { name: "Rent Homes", href: "/properties?type=rent" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-gray-800 pb-2 inline-block border-r-2 pr-4 border-r-[#800020]">
              Newsletter
            </h4>

            <p className="text-xs text-gray-400 leading-relaxed">
              Subscribe to get exclusive off-market listing updates directly to your inbox.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-gray-900/90 border border-gray-800 text-xs text-white placeholder-gray-500 rounded-lg px-3.5 py-3 pr-10 focus:outline-none focus:border-[#800020] transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 p-2 bg-[#800020] text-white rounded-md hover:bg-[#66001a] transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="pt-2 space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#800020]" />
                <span>+880 1324-443323</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#800020]" />
                <span>contact@boomboxesolutions.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#800020]" />
                <span>49/A, Main Road, B-Block, Shahjalal uposhohor, Sylhet</span>
              </div>
            </div>

          </div>

        </div>

        {/* Legal Links Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800/60 flex flex-wrap justify-between items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/disclaimer" className="hover:text-gray-300 transition-colors">
              Legal Disclaimers
            </Link>
          </div>

          <p className="text-gray-500 text-[11px]">
            Licensed Real Estate Agency in Bangladesh
          </p>
        </div>

        {/* Footer Bottom Metadata */}
        <div className="mt-6 pt-6 border-t border-gray-800/40 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} UrbanKeys. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>made by</span>
            <Link
              href="https://www.boomboxesolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white font-medium underline underline-offset-4 decoration-gray-700 hover:decoration-white transition-all"
            >
              boombox e solutions
            </Link>
          </p>
        </div>

      </div>
    </footer>
  );
}