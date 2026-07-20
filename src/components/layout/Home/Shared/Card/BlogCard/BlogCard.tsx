import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BlogCard({item}:{item:any}) {
  return (
       <div className="group flex flex-col sm:flex-row bg-[#F5F5F5] rounded overflow-hidden transform duration-500" key={item?._id}>
                <Image
                  width={300}
                  height={300}
                  src={item?.image}
                  alt={item?.title}
                  className="w-full sm:w-60 h-fit sm:h-full object-cover"
                  
                />
                <div className="p-5">
                  <h1 className="text-xl sm:text-2xl mb-2 font-yanone-kaffeesatz">{item?.title}</h1>
                  <h1 className='flex items-center gap-2 mb-3'>
  <Calendar size={16} />
  {/* Format the date here */}
  {item?.date 
    ? new Date(item.date).toLocaleDateString('en-US', {
        day: '2-digit',      // e.g., 30
        month: 'short',    // e.g., Nov
        year: 'numeric',   // e.g., 2024
      }).replace(/(\d+)\/(\w+)\/(\d+)/, '$2 $1, $3') // Reorder (optional, see explanation below)
    : 'Date Unavailable'}
</h1>
                  <Link href={`/blogs/${item?.slug}`} className="text-ruby-wine hover:underline transform duration-500">Read this Blog</Link>
                </div>
                  
            </div>
  )
}
