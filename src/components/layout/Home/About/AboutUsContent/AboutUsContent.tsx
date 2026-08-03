import Image from 'next/image'
import React from 'react'

export default function AboutUsContent() {
  return (
    <section className="px-[5%] py-16 sm:py-24 bg-white font-sans text-gray-900 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#800020]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Image with Advanced Animation */}
          <div className="relative order-2 lg:order-1 group">
            {/* Animated border container */}
            <div className="relative aspect-[4/3] w-full">
              {/* Main image container */}
              <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/aboutUs.png"
                  alt="About UrbanKeys"
                  fill
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

            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#800020]/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-amber-500/10 rounded-full blur-lg animate-pulse delay-1000" />
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
              <div className="p-4 rounded-xl border border-gray-200/70 bg-white text-center hover:border-[#800020]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
                <p className="text-3xl font-bold text-[#800020]">500+</p>
                <p className="text-sm text-gray-600 mt-1">Properties Listed</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200/70 bg-white text-center hover:border-[#800020]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
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
