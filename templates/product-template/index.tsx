"use client";
import ImageGallery from "@/components/image-gallery";
import ProductBreadCrumbs from "@/components/product-breadcrumbs";
import ProductInfo from "@/components/product-info";
import SuggestedProducts from "@/components/suggested-products";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductCategory from "../../components/product-category/index";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  amazonData as AD,
  updateAmazonSite,
} from "@/lib/store/slices/amazon-slice";
import { useSearchParams } from "next/navigation";
import { getSiteDataById } from "@/lib/fetchers";
import Loader from "@/components/ui/loader";
import { appState as AS, fetchSiteById, loading as LD } from '@/lib/store/slices/site-slice';
const ProductTemplate = () => {
  const appState = useAppSelector(AS);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(LD);
  useEffect(() => {
    if (searchParams.get("site_id")) {
      // setLoading(true);
      dispatch(fetchSiteById({id:searchParams.get("site_id")??""}))
    }
  }, [searchParams]);
  return (
    <div className={` mx-auto overflow-auto ${appState.view === "Mobile" && "h-[800px] w-[480px] rounded-xl border-8 border-black no-scrollbar"} ${appState.view === "Tablet" && "h-[1024px] w-[768px] rounded-xl border-8  border-black no-scrollbar"} ${appState.view === "Desktop" && "h-full w-full"}`}>
      {loading && <Loader text="Loading" />}
      <ProductCategory />
      <main className="">
        {/* <ProductBreadCrumbs /> */}
        {appState && (
          <>
            <ImageGallery />

            <ProductInfo />
          </>
        )}
        {/* 
        <SuggestedProducts /> */}
      </main>
    </div>
  );
};

export default ProductTemplate;
