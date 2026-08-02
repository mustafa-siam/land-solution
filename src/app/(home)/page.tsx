import { FAQ } from '@/components/layout/Home/About/FAQ/FAQ'
import Banner from '@/components/layout/Home/Home/Banner/Banner'
import HomeTransformationSection from '@/components/layout/Home/Home/HomeTransformation/HomeTransformation'

import FindNeighborhood from '@/components/layout/Home/Home/neighbourhood/neighborhood'
import OurCategory from '@/components/layout/Home/Home/OurCategory/OurCategory'
import OurClientReviews from '@/components/layout/Home/Home/OurClientReviews/OurClientReviews'
import UrbanKeys from '@/components/layout/Home/Home/UrbanKeys/UrbanKeys'
import VerifiedProperties from '@/components/layout/Home/Home/VerifiedProperties/VerifiedProperties'
import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <div className='space-y-8'>
      <Banner />
      <VerifiedProperties />
      <FindNeighborhood></FindNeighborhood>
      <HomeTransformationSection></HomeTransformationSection>
      <UrbanKeys></UrbanKeys>
      {/* <OurCategory/> */}
      {/* <div className="px-[5%] pt-16">
        <div className="max-w-screen-xl mx-auto">
          <Image
            width={1000}
            height={500}
            src="/images/add2.png"
            alt="add"
            className="w-full h-fit"
          />
        </div>
      </div> */}
      <OurClientReviews />
      <FAQ></FAQ>
    </div>
  )
}
