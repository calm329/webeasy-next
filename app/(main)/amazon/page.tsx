import SiteHeader from "@/components/header";
import ProductTemplate from "@/templates/product-template";
import React from "react";
// import { Header } from '../../../components/header/blue-based-header';

const page = () => {
  return <><SiteHeader showNavigation={false}/><ProductTemplate /></>;
};

export default page;
