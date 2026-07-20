
import PropertiesCard from '@/components/layout/Home/Shared/Card/PropertiesCard/PropertiesCard';
import { useGetAllProductsQuery } from '@/redux/features/product/productApi';
import React, { useMemo } from 'react'

export default function MoreProduct() {

  const { data } = useGetAllProductsQuery({
    page: 1,
    limit: 4,
    search: "",
    status: "published",
    isTrash: false,
  });

  // Extract all image data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allData: any[] = useMemo(() => data?.data?.data || [], [data]);

  return (
    <div className='max-w-screen-xl mx-auto pt-16'>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-yanone-kaffeesatz leading-tight mb-10">
              More Properties
            </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pb-10">
                  {allData?.map((item) => (
                         <PropertiesCard item={item} key={item?._id}/>
                                                       
                  ))}
                </div>
    </div>
  )
}
