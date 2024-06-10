"use client"
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useSearchParams } from "next/navigation";
import { getSiteDataById } from "@/lib/fetchers";
import Loader from "@/components/ui/loader";
import ProductTemplate from '@/templates/product-template';
import { fetchSiteById, appState as AS, loading as LD } from '@/lib/store/slices/site-slice';

const PreviewAmazon = () => {
  const appState = useAppSelector(AS)
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const loading = useAppSelector(LD)
  useEffect(()=>{
    if(searchParams.get('preview_site')){
      // setLoading(true)
      dispatch(fetchSiteById({id: searchParams.get('preview_site')??""}))
      // getSiteDataById(searchParams.get('preview_site') as string).then((data)=>
      // {
        
      //   // const updatedData = 
      //   dispatch(
      //     updateAmazonSite(JSON.parse(data?.aiResult??""))
      //   )
      //   setLoading(false)
      // })
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
