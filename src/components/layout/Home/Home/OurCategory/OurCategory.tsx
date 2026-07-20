"use client"

import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import Image from "next/image";

export default function OurCategory() {
       const { data } = useGetAllCategoriesQuery({
          page: 1, // Current page for pagination
          limit: 100, // Number of items per page
          search: "", // The search text to filter data
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const categories: any[] = data?.data?.data || []
  return (
    <div className='bg-[#E7ECEF] px-[5%] py-16'>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
            {
                categories?.map(item=>
                    <div className="bg-white p-5" key={item?._id}>
                        <h1 className="flex items-center gap-2 text-2xl sm:text-3xl font-medium font-yanone-kaffeesatz">
                            <Image
                            width={100}
                            height={100}
                            src="/images/category.svg"
                            alt={item?.title}
                            className="w-14 h-14"
                            />
                            {item?.title}</h1>
                    </div>
                )
            }
        </div>
    </div>
  )
}
