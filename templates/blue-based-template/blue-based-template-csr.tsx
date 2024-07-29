import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Posts } from "../../components/posts/blue-based-posts";
import { Services } from "../../components/services/blue-based-services";
import { TBanner, TColors, TFields, THero, TPosts, TSection } from "@/types";
import { Header } from "@/components/header/blue-based-header";
import { Hero } from "@/components/hero/blue-based-hero";

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
    showForm,
    setShowForm,
  } = props;

  return (
    <>
      <Header
        banner={banner}
        colors={colors}
        editable={editable}
        setFocusedField={setFocusedField}
        setIsOpen={setIsOpen}
        setSection={setSection}
        showForm={showForm}
        setShowForm={setShowForm}
      />
      <Hero
        hero={hero}
        colors={colors}
        editable={editable}
        setFocusedField={setFocusedField}
        setIsOpen={setIsOpen}
        setSection={setSection}
        showForm={showForm}
        setShowForm={setShowForm}
      />
      <Services
        services={services}
        colors={colors}
        editable={editable}
        setFocusedField={setFocusedField}
        setIsOpen={setIsOpen}
        setSection={setSection}
        showForm={showForm}
        setShowForm={setShowForm}
      />
      <Posts
        posts={posts}
        colors={colors}
        editable={editable}
        setFocusedField={setFocusedField}
        setIsOpen={setIsOpen}
        setSection={setSection}
        showForm={showForm}
        setShowForm={setShowForm}
      />
    </>
  );
};

export default BlueBasedTemplate;
