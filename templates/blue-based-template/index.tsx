import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Speakers } from "../../components/posts/blue-based-posts";
import { Schedule } from "../../components/services/blue-based-services";
import { TBanner, TColors, TFields, THero, TSection } from "@/types";
import { Header } from "@/components/header/blue-based-header";
import { Hero } from "@/components/hero/blue-based-hero";

type TProps = {
  hero: THero;
  banner: TBanner;
  colors: TColors;
  services: any[];
  posts: any[];
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
};

const BlueBasedTemplate = (props: TProps) => {
  const {
    hero,
    banner,
    colors,
    services,
    posts,
    setIsOpen,
    setSection,
    editable,
    setFocusedField,
  } = props;

  return (
    <>
      <Header banner={banner} colors={colors} />
      <Hero hero={hero} colors={colors} />
      <Schedule services={services} colors={colors} />
      <Speakers posts={posts} colors={colors} />
    </>
  );
};

export default BlueBasedTemplate;
