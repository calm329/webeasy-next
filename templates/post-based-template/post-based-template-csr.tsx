import { Dispatch, SetStateAction } from "react";
import { Services } from "../../components/services/post-based-services";
import { Posts } from "../../components/posts/post-based-posts";
import { TBanner, TColors, TFields, THero, TPosts, TSection } from "@/types";
import { Header } from "@/components/header/post-based-header";
import { Hero } from "@/components/hero/post-based-hero";
type TProps = {
  hero: THero;
  banner: TBanner;
  colors: TColors;
  services: any[];
  posts: TPosts;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
  showForm?: {
    form: string;
    edit: string;
    show: boolean;
  };
  setShowForm?: React.Dispatch<
    React.SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
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
    setShowForm,
    showForm,
  } = props;
  return (
    <>
      <Header
        banner={banner}
        colors={colors}
        editable={editable}
        setIsOpen={setIsOpen}
        setSection={setSection}
        setShowForm={setShowForm}
        showForm={showForm}
      />
      <main>
        <Hero
          hero={hero}
          colors={colors}
          editable={editable}
          setIsOpen={setIsOpen}
          setSection={setSection}
          setShowForm={setShowForm}
          showForm={showForm}
        />
        <Services
          services={services}
          editable={editable}
          setIsOpen={setIsOpen}
          setSection={setSection}
          setShowForm={setShowForm}
          showForm={showForm}
        />
        <Posts
          posts={posts}
          editable={editable}
          setIsOpen={setIsOpen}
          setSection={setSection}
          setShowForm={setShowForm}
          showForm={showForm}
        />
      </main>
    </>
  );
}
