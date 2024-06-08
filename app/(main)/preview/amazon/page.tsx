"use client"
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { amazonData as AD, updateAmazonSite } from '@/lib/store/slices/amazon-slice';
import { useSearchParams } from "next/navigation";
import { getSiteDataById } from "@/lib/fetchers";
import Loader from "@/components/ui/loader";
import ProductTemplate from '@/templates/product-template';

const PreviewAmazon = () => {
  const amazonData = useAppSelector(AD)
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    if(searchParams.get('site_id')){
      setLoading(true)
      getSiteDataById(searchParams.get('site_id') as string).then((data)=>
      {
        // const updatedData = 
        dispatch(
          updateAmazonSite(JSON.parse(data?.aiResult??""))
        )
        setLoading(false)
      })
    }
  },[searchParams])
  return (
    <div className="bg-white">
      {loading && <Loader text="Loading"/>}
      <ProductTemplate/>
    </div>
  );
};

export default PreviewAmazon;
