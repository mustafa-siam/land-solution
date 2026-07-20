import Image from 'next/image'
import React from 'react'

export default function AboutUs() {
  return (
        <div className="px-[5%] py-16 relative z-20">
                <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row sm:items-center gap-5">
                <Image
                  width={500}
                  height={500}
                  src="/images/aboutUs.png"
                  alt="Our Travel Partners"
                  className="w-full sm:w-80 lg:w-[500px] h-fit"
                  />
                  <div className="flex-1 space-y-5">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-yanone-kaffeesatz mb-5">About Us</h1>
                    <p className='text-medium-dusk'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    <br /><br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>
                </div>
        
              </div>
  )
}
