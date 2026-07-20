"use client";

import React, { useEffect, useState } from "react";
import { ParamsSlug } from "@/Type/IFields";
import Breadcrumb from "./Breadcrumb";
import { useGetSingleProductBySlugQuery } from "@/redux/features/product/productApi";
import ProductDetails from "./ProductDetails";
import MoreProduct from "./MoreProduct";

const DetailsPage: React.FC<{ params: Promise<ParamsSlug> }> = ({ params }) => {
  const [slug, setSlug] = useState<string>("");
  const { data , isLoading} = useGetSingleProductBySlugQuery(slug);
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    resolveParams();
  }, [params]);

  const product = data?.data || {};

  return (
    <div>
      <Breadcrumb />
      <div className="px-[5%] py-16">
        <div className="max-w-screen-xl mx-auto">
         <ProductDetails product={product} isLoading={isLoading}/>
           <MoreProduct/>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
