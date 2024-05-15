import Image from "next/image";
import PostCard from "@/components/ui/card/post-card";
import ServiceCard from "@/components/ui/card/service-card";
import CTA from "@/components/cta";
import TopBar from "@/components/top-bar";
import { Dispatch, SetStateAction } from "react";
import { TFields, TSection } from "@/types";
import EditableBanner from "@/components/editable/banner";
import EditableHero from "@/components/editable/hero";

type BasicTemplateProps = {
  logo?: {
    link: string;
    alt: string;
  };
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

export default function BasicTemplate(props: BasicTemplateProps) {
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
  // console.log("onshow",open)
  return (
    <>
      <section className="bg-white py-6">
        <EditableBanner
          businessName={businessName}
          colors={colors}
          cta={cta}
          editable={editable}
          logo={logo}
          setFocusedField={setFocusedField}
          setIsOpen={setIsOpen}
          setSection={setSection}
        />
      </section>
      <section className="overflow-hidden bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-white px-8 py-16">
            <div className="mx-auto max-w-7xl">
              <EditableHero
                colors={colors}
                cta={cta}
                hero={hero}
                editable={editable}
                setFocusedField={setFocusedField}
                setIsOpen={setIsOpen}
                setSection={setSection}
              />
              <div className="rounded-3xl bg-gray-100 p-8 md:p-12">
                <div className="-m-8 flex flex-wrap">
                  {services.map((service) => (
                    <ServiceCard
                      key={service["name"]}
                      name={service["name"]}
                      description={service["description"]}
                      color={colors.primary}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Posts</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              permalink={post.permalink}
              media_url={post.media_url}
              media_type={post.media_type}
              caption={post.caption}
              timestamp={post.timestamp}
            />
          ))}
        </div>
      </div>
    </>
  );
}
