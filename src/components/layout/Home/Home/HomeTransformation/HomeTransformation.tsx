"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MoveHorizontal, Paintbrush } from "lucide-react";
import { useState } from "react";

export default function HomeDecorationSection() {
  const [sliderPosition, setSliderPosition] = useState(55);

  return (
    <section className="px-[5%] py-16 sm:py-24 ">
      <div className="mx-auto max-w-screen-xl">
        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-[#800020] text-xs font-semibold uppercase tracking-wider">
              <Paintbrush className="h-4 w-4" />
              Home Transformation
            </div>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              See the difference a thoughtful transformation can make
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm leading-7 text-gray-600 sm:text-base">
              Decoration, renovation and professional painting services
              designed to make your home feel fresh again.
            </p>

            <Link
              href="/contact"
              className="group mt-5 inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-sm bg-gray-950 text-white rounded-xl hover:bg-[#800020] active:scale-[0.99] transition-all duration-300 shadow-md group"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Interactive Before / After */}
        <div className="relative aspect-[16/9] min-h-[420px] overflow-hidden rounded-[28px] bg-gray-200 shadow-xl shadow-black/10">
          {/* Before Image */}
          <Image
            src="/images/before.jpg"
            alt="Home before decoration and renovation"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          {/* After Image */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            }}
          >
            <Image
              src="/images/after.jpg"
              alt="Home after decoration and renovation"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Subtle Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

          {/* Before Label */}
          <div className="pointer-events-none absolute bottom-5 right-5 rounded-full border border-white/30 bg-black/30 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
            Before
          </div>

          {/* After Label */}
          <div className="pointer-events-none absolute bottom-5 left-5 rounded-full border border-white/30 bg-white/90 px-4 py-2 text-xs font-semibold text-gray-950 backdrop-blur-md">
            After
          </div>

          {/* Slider Line */}
          <div
            className="pointer-events-none absolute bottom-0 top-0 z-20 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.35)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[#800020] text-white shadow-xl">
              <MoveHorizontal className="h-5 w-5" />
            </div>
          </div>

          {/* Invisible Interactive Range */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(event) =>
              setSliderPosition(Number(event.target.value))
            }
            aria-label="Compare the home before and after renovation"
            className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
          />

          {/* Small Service Label */}
          <div className="pointer-events-none absolute left-1/2 top-5 z-20 -translate-x-1/2 rounded-full border border-white/25 bg-black/30 px-5 py-2 text-center text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            Decoration · Renovation · Painting
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500">
          Drag the slider to explore the transformation
        </p>
      </div>
    </section>
  );
}