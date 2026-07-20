
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
export default function Footer() {
  return (
    <footer className="bg-[#262626] text-white px-[5%]" id="footer">
      <div className="max-w-screen-xl mx-auto pt-16 pb-10 space-y-8">



        <div className="text-white flex flex-col sm:flex-row justify-between sm:space-x-3 bg-[#1F1F1F] p-5">
            <div className="text-white">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-yanone-kaffeesatz">Get <span className="text-ruby-wine">matching Properties</span> at your inbox</h1>
              <p>Let us know your requirement</p>
            </div>
             <div className="flex items-center gap-2">
                       <Input
      className="rounded max-w-xl bg-white"
      />
                                  <Button className="bg-ruby-wine text-white hover:bg-ruby-wine">Search</Button>
                    </div>
        </div>

        <div className="text-white flex flex-col sm:flex-row justify-between sm:space-x-3">
            <ul className="flex items-center gap-5 text-white">
              <li>
                <Link href="/properties" className="hover:text-white">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-white">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-white">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
             <div className="flex items-center gap-2">
                        <div className="flex gap-3">
                                    <Phone className="text-[#A62F5A] mt-1" size={18} />
                                      <p> +1 800-525-54-589</p>
                                  </div>
                                  <div className="flex gap-3">
                                    <Mail className="text-[#A62F5A] mt-1" size={18} />
                                      <p>info@wdesignkit.com</p>
                                  </div>
                    </div>
        </div>

        <hr />
           {/* Copyright */}
        <div className="text-center text-sm text-white flex flex-col sm:flex-row justify-between sm:space-x-3">
          <div className="flex items-center gap-5">
          <p>
            Copyright@<span className="text-white font-bold">Al Qibla</span>
          </p>
          <p>
            Design & Develop By{" "}
            <Link href="https://www.qrinux.com/" className="text-white font-bold">Qrinux Inc</Link>
          </p>
          </div>
             <div className="flex items-center gap-2">
                      <FaFacebookF className="border rounded-full p-1.5 w-8 h-8 cursor-pointer hover:bg-white hover:text-dark-slate transform transition duration-500" />
                      <FaInstagram  className="border rounded-full p-1.5 w-8 h-8 cursor-pointer hover:bg-white hover:text-dark-slate transform transition duration-500" />
                      <RiTwitterXFill  className="border rounded-full p-1.5 w-8 h-8 cursor-pointer hover:bg-white hover:text-dark-slate transform transition duration-500" />
                    </div>
        </div>
      </div>
    </footer>
  );
}
