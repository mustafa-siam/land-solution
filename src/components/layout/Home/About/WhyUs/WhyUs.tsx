import { SquareCheckBig } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function WhyUs() {
  return (
      <div className="px-[5%] py-16 relative z-20">
                        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row-reverse sm:items-center gap-5 bg-[#F5F5F5] p-5 sm:p-10">
                        <Image
                          width={500}
                          height={500}
                          src="/images/aboutUs.png"
                          alt="Our Travel Partners"
                          className="w-full sm:w-80 lg:w-[500px] h-fit"
                          />
                          <div className="flex-1 space-y-5">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-yanone-kaffeesatz mb-5">Why Us ? </h1>
                           <div className='flex gap-2'>
                            <div className="w-6">
                                <SquareCheckBig className='text-ruby-wine' size={20}/>
                            </div>
                            <p className='flex-1 text-[#44525E]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco </p>
                           </div>
                           <div className='flex gap-2'>
                            <div className="w-6">
                                <SquareCheckBig className='text-ruby-wine' size={20}/>
                            </div>
                            <p className='flex-1 text-[#44525E]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco </p>
                           </div>
                           <div className='flex gap-2'>
                            <div className="w-6">
                                <SquareCheckBig className='text-ruby-wine' size={20}/>
                            </div>
                            <p className='flex-1 text-[#44525E]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco </p>
                           </div>
                          </div>
                        </div>
                
                      </div>
  )
}
