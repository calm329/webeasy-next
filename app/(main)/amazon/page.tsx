"use client";
import SiteHeader from "@/components/header";
import ProductTemplate from "@/templates/product-template";
import React, { useState } from "react";
// import { Header } from '../../../components/header/blue-based-header';

const Amazon = () => {
  const [isFontOpen, setIsFontOpen] = useState(false);
  return (
    <>
      <SiteHeader
        showNavigation={false}
        setIsFontOpen={setIsFontOpen}
        isAuth={true}
      />
      <ProductTemplate />
    </>
  );
};

export default Amazon;
