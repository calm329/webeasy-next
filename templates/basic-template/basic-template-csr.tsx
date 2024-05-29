import Image from "next/image";
import PostCard from "@/components/ui/card/post-card";
import ServiceCard from "@/components/ui/card/service-card";
import CTA from "@/components/cta";
import TopBar from "@/components/top-bar";
import { Dispatch, SetStateAction } from "react";
import { TBanner, TColors, TFields, THero, TSection } from "@/types";
import EditableBanner from "@/components/editable/banner";
import EditableHero from "@/components/editable/hero";

type BasicTemplateProps = {
  hero: THero;
  banner: TBanner;
  colors: TColors;
  services: any[];
  posts: any[];
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
  showButtonForm: {
    edit: string;
    show: boolean;
  };
  setShowButtonForm: React.Dispatch<
    React.SetStateAction<{
      edit: string;
      show: boolean;
    }>
  >;
};

export default function BasicTemplate(props: BasicTemplateProps) {
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
    showButtonForm,
    setShowButtonForm,
  } = props;
  return (
    <>
      <section className="bg-white py-6">
        <EditableBanner
          banner={banner}
          colors={colors}
          editable={editable}
          setFocusedField={setFocusedField}
          setIsOpen={setIsOpen}
          setSection={setSection}
          showButtonForm={showButtonForm}
          setShowButtonForm={setShowButtonForm}
        />
      </section>
      <section className=" bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-white px-8 py-16  pb-10">
            <div className="mx-auto max-w-7xl">
              <EditableHero
                colors={colors}
                hero={hero}
                editable={editable}
                setFocusedField={setFocusedField}
                setIsOpen={setIsOpen}
                setSection={setSection}
                showButtonForm={showButtonForm}
                setShowButtonForm={setShowButtonForm}
              />
              <div
                className={`rounded-3xl bg-gray-100 p-8 md:p-12 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                onClick={() => {
                  if (setIsOpen && setSection) {
                    setIsOpen(true);
                    setSection("Services");
                  }
                }}
              >
                <div className="-m-8 flex flex-wrap">
                  {services.map((service) => (
                    <ServiceCard
                      key={service["name"]}
                      name={service["name"]}
                      description={service["description"]}
                      color={colors.primary}
                      editable={editable}
                      setIsOpen={setIsOpen}
                      setSection={setSection}
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
