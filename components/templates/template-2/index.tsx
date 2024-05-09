import { Dispatch, SetStateAction } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { SecondaryFeatures } from "./SecondaryFeatures";
import { Testimonials } from "./Testimonials";
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

export default function Template2(props: TProps) {
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
      <main>
        <Hero hero={hero} cta={cta} colors={colors} />
        <SecondaryFeatures services={services} />
        <Testimonials posts={posts} />
      </main>
    </>
  );
}
