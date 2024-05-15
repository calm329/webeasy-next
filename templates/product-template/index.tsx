import ImageGallery from "@/components/image-gallery";
import ProductBreadCrumbs from "@/components/product-breadcrumbs";
import ProductInfo from "@/components/product-info";
import SuggestedProducts from "@/components/suggested-products";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductCategory from "../../components/product-category/index";

const ProductTemplate = () => {
  return (
    <div className="bg-white">
      <ProductCategory />
      <main className="pt-10 sm:pt-16">
        <ProductBreadCrumbs />

        <ImageGallery />

        <ProductInfo />

        <SuggestedProducts />
      </main>
    </div>
  );
};

export default ProductTemplate;
