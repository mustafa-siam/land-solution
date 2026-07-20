import Link from 'next/link'
import React from 'react'

export default function Breadcrumb() {
  return (
    <div className="px-[5%] pt-10">
      <div className='max-w-screen-xl mx-auto border-y py-5 px-5 border-r-[#C4C4C4]'>
          <p className='text-sm'>
            <Link href={'/'} className='hover:underline '>Home </Link> / 
            <Link href={'/blogs'} className='hover:underline '> Blogs</Link> /   
            <span className='text-ruby-wine'> Blog Details</span>
          </p>
      </div>
    </div>
  )
}
