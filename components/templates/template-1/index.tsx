import React, { Dispatch, SetStateAction } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Speakers } from "./Speakers";
import { Schedule } from "./Schedule";
import { TFields, TSection } from "@/types";

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

const Template1 = (props: TProps) => {
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

export default Template1;
