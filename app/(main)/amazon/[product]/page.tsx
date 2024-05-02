import SiteHeader from "@/components/header";
import ProductTemplate from "@/components/templates/product-template";
import React from "react";

const page = () => {
  return (
    <>
      <SiteHeader showNavigation={true} />
      <ProductTemplate />
    </>
  );
};

export default page;
