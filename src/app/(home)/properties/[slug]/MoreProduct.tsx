
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
            <div className='mb-8'>
                <h2 className="text-xl  sm:text-2xl  font-bold text-gray-900">Comparable Listings</h2>
                <p className="text-sm text-gray-400 mt-1">Curated selection of similar luxury assets in Bashundhara.</p>
              </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pb-10">
                  {allData?.map((item) => (
                         <PropertiesCard item={item} key={item?._id}/>
                                                       
                  ))}
                </div>
    </div>
  )
}
