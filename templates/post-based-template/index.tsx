import { Dispatch, SetStateAction } from "react";
import { SecondaryFeatures } from "../../components/services/post-based-services";
import { Testimonials } from "../../components/posts/post-based-posts";
import { TBanner, TColors, TFields, THero, TSection } from "@/types";
import { Header } from "@/components/header/post-based-header";
import { Hero } from "@/components/hero/post-based-hero";
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

export default function PostBasedTemplate(props: TProps) {
  const {
    banner,
    hero,
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
      <main>
        <Hero hero={hero} colors={colors} />
        <SecondaryFeatures services={services} />
        <Testimonials posts={posts} />
      </main>
    </>
  );
}
