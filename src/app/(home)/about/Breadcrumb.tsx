import Link from 'next/link'
import React from 'react'

export default function Breadcrumb() {
  return (
      <div className="px-[5%] pt-10" >
      <div className='max-w-screen-xl mx-auto border-y py-5 px-5 border-r-[#C4C4C4]'>
          <p className=''><Link href={'/'} className='hover:underline '>Home</Link> /  <span className='text-ruby-wine'>About</span></p>
      </div>
    </div>
  )
}
