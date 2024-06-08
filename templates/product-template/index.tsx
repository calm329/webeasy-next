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

const ProductTemplate = () => {
  const amazonData = useAppSelector(AD);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (searchParams.get("site_id")) {
      setLoading(true);
      getSiteDataById(searchParams.get("site_id") as string).then((data) => {
        // const updatedData =
        dispatch(updateAmazonSite(JSON.parse(data?.aiResult ?? "")));
        setLoading(false);
      });
    }
  }, [searchParams]);
  return (
    <div className="bg-white">
      {loading && <Loader text="Loading" />}
      <ProductCategory />
      <main className="pt-10 sm:pt-16">
        {/* <ProductBreadCrumbs /> */}
        {amazonData && (
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
