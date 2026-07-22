import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white font-sans" id="footer">
      
      {/* Top Section matching screenshot structure */}
      <div className="py-24 px-6 text-center border-b border-gray-800/80">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Are you want to Property Owner?
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Let us know your requirement to receive curated, high-value property options.
          </p>
          
          <div className="pt-4 flex justify-center">
            <Button 
              asChild 
              className="bg-ruby-wine text-white hover:text-black hover:bg-gray-200 font-semibold text-xs sm:text-sm px-8 py-6 rounded-none uppercase tracking-wider transition-all"
            >
              <Link href="/contact">
                Contact With Us
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Branding Layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-wider text-white">
              Land Solution
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Connecting buyers, sellers, and renters with premium real estate properties across Bangladesh with architectural precision.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4">
              <Link href="#" className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all">
                <FaFacebookF size={12} />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all">
                <FaInstagram size={12} />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all">
                <RiTwitterXFill size={12} />
              </Link>
            </div>
          </div>

          {/* Company Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-white transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-white transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/blogs" className="hover:text-white transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <p className="text-gray-400">+1 800-525-54-589</p>
              </li>
              <li>
                <p className="text-gray-400">info@wdesignkit.com</p>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Legal Disclaimers
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Metadata */}
        <div className="pt-12 mt-12 border-t border-gray-800/80 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Al Qibla. All rights reserved.</p>
          <p>
            Design & Develop By{" "}
            <Link href="https://www.qrinux.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors font-medium">
              Qrinux Inc
            </Link>
          </p>
        </div>

      </div>
    </footer>
  );
}