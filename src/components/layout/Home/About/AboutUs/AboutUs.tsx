import Image from 'next/image'
import React from 'react'
import { Building2 } from 'lucide-react'

export default function AboutUs() {
  return (
    <section className="px-[5%] py-16 sm:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 font-sans text-gray-900 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#800020]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-[#800020] text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>About UrbanKeys</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Your Trusted Real Estate Partner
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl">
            Connecting buyers, sellers, and renters with premium properties across Bangladesh
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Image with Animation */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl group">
              <Image
                src="/images/aboutUs.png"
                alt="About UrbanKeys"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
            </div>

            {/* Decorative Frame */}
            <div className="absolute -inset-2 border border-[#800020]/20 rounded-3xl -z-10 transform translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none" />
          </div>

          {/* Right Side: Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>
                At UrbanKeys, we believe that finding the perfect property should be an exciting journey, not a stressful one. As Bangladesh&apos;s leading real estate platform, we specialize in premium residential and commercial properties across the country&apos;s most sought-after locations.
              </p>
              <p>
                Our team of experienced professionals combines local market knowledge with global best practices to deliver exceptional service. Whether you&apos;re buying your first home, selling a property, or looking for investment opportunities, we&apos;re here to guide you every step of the way.
              </p>
              <p>
                We pride ourselves on transparency, integrity, and a commitment to excellence. Every property in our portfolio undergoes thorough verification to ensure our clients make informed decisions with confidence.
              </p>
            </div>

            {/* Stats/Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl border border-gray-200/70 bg-white text-center hover:border-[#800020]/30 hover:shadow-lg transition-all duration-300">
                <p className="text-3xl font-bold text-[#800020]">500+</p>
                <p className="text-sm text-gray-600 mt-1">Properties Listed</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200/70 bg-white text-center hover:border-[#800020]/30 hover:shadow-lg transition-all duration-300">
                <p className="text-3xl font-bold text-[#800020]">1000+</p>
                <p className="text-sm text-gray-600 mt-1">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
