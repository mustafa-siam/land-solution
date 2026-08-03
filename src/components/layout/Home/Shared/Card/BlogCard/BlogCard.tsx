import { Calendar, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BlogCard({item}: {item: any}) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-[#800020]/30 transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <Link href={`/blogs/${item?.slug}`} className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <Image
          width={400}
          height={250}
          src={item?.image}
          alt={item?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
      </Link>

      {/* Content Block */}
      <div className="p-5 flex flex-col flex-grow space-y-3">
        {/* Date */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="w-3.5 h-3.5 text-[#800020]/70" />
          <span>
            {item?.date
              ? new Date(item.date).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                }).replace(/(\d+)\/(\w+)\/(\d+)/, '$2 $1, $3')
              : 'Date Unavailable'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-[#800020] transition-colors">
          {item?.title}
        </h3>

        {/* Read More Link */}
        <Link
          href={`/blogs/${item?.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#800020] hover:underline group-hover:gap-2 transition-all"
        >
          <span>Read More</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
