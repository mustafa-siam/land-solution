"use client";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import Breadcrumb from "./Breadcrumb";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Page() {
  return (
    <div>
      {/* Hero Section */}
      <section className="px-[5%] py-16 sm:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 font-sans text-gray-900">
        <div className="max-w-screen-xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-[#800020] text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            Contact UrbanKeys
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about buying, selling, or renting? We&apos;re here to help you every step of the way
          </p>
        </div>
      </section>

      <Breadcrumb />

      {/* Contact Section */}
      <div className="px-[5%] py-12 sm:py-16 pb-24 font-sans text-gray-900 mb-20">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column - Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl border border-gray-200/70 bg-white hover:border-[#800020]/30 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 text-[#800020] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-gray-900">Address</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    49/A, Main Road, B-Block, Shahjalal Uposhohor, Sylhet, Bangladesh
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200/70 bg-white hover:border-[#800020]/30 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 text-[#800020] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-gray-900">Phone</h3>
                  <p className="text-sm text-gray-600">+880 1324-443323</p>
                  <p className="text-xs text-gray-500">Mon-Sat, 9AM-6PM</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200/70 bg-white hover:border-[#800020]/30 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 text-[#800020] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-gray-900">Email</h3>
                  <p className="text-sm text-gray-600">contact@urbankeys.com</p>
                  <p className="text-xs text-gray-500">We respond within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200/70 bg-white hover:border-[#800020]/30 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 text-[#800020] shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-gray-900">Social Media</h3>
                  <p className="text-sm text-gray-600">Follow us for updates</p>
                  <div className="flex gap-2 mt-2">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1877F2] text-white hover:scale-110 transition-transform duration-200"
                      aria-label="Facebook"
                    >
                      <FaFacebook className="text-sm" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#E4405F] text-white hover:scale-110 transition-transform duration-200"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="text-sm" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0A66C2] text-white hover:scale-110 transition-transform duration-200"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedinIn className="text-sm" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="lg:col-span-7">
            <div className="h-full min-h-[400px] lg:min-h-[500px] rounded-2xl overflow-hidden border border-gray-200/80 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4526.996667986299!2d90.41561327615845!3d24.01784927848886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755da4eced0c537%3A0x8d54b38a823b5212!2sDhaka%20University%20of%20Engineering%20and%20Technology%20(DUET)!5e1!3m2!1sen!2sbd!4v1764601436951!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
