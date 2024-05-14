import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Speakers } from "../components/posts/blue-based-posts";
import { Schedule } from "../components/services/blue-based-services";
import { TFields, TSection } from "@/types";
import { Header } from "@/components/header/blue-based-header";
import { Hero } from "@/components/hero/blue-based-hero";

type TProps = {
  logo?: string;
  businessName: string;
  hero: {
    heading: string;
    subheading: string;
    imageUrl: string;
  };
  colors: {
    primary: string;
    secondary: string;
  };
  cta: {
    text: string;
    link: string;
  };
  services: any[];
  posts: any[];
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
};

const BlueBasedTemplate = (props: TProps) => {
  const {
    logo,
    businessName,
    hero,
    colors,
    cta,
    services,
    posts,
    setIsOpen,
    setSection,
    editable,
    setFocusedField,
  } = props;

  return (
    <>
      <Header
        logo={logo}
        businessName={businessName}
        cta={cta}
        colors={colors}
      />
      <Hero hero={hero} cta={cta} colors={colors} />
      <Schedule services={services} colors={colors} />
      <Speakers posts={posts} colors={colors} />
    </>
  );
};

export default BlueBasedTemplate;
