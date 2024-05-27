"use client";
import BasicTemplate from "@/templates/basic-template";
import React from "react";
import { appState as AS } from "@/lib/store/slices/site-slice";
import { useAppSelector } from "@/lib/store/hooks";
import { TemplatesData as TD, selectedTemplate  as ST } from '@/lib/store/slices/template-slice';
import BlueBasedTemplate from "@/templates/blue-based-template";
import PostBasedTemplate from "@/templates/post-based-template";
import General from "@/templates/general-template";

type TProps = {
  params: { template: string };
};

const Preview = (props: TProps) => {
  const appState = useAppSelector(AS);
  const templates = useAppSelector(TD);
  const selectedTemplate = useAppSelector(ST);
  return templates?.map((template) => {
    switch (selectedTemplate?.name) {
      case "Basic template":
        return (
          <BasicTemplate
            banner={appState.aiContent["banner"]}
            hero={appState.aiContent["hero"]}
            colors={appState.aiContent["colors"]}
            services={appState.aiContent["services"]["list"]}
            posts={appState.iPosts}
          />
        );
      case "Blue-Based template":
        return (
          <BlueBasedTemplate
            banner={appState.aiContent["banner"]}
            hero={appState.aiContent["hero"]}
            colors={appState.aiContent["colors"]}
            services={appState.aiContent["services"]["list"]}
            posts={appState.iPosts}
          />
        );
      case "Post-Based template":
        return (
          <PostBasedTemplate
            banner={appState.aiContent["banner"]}
            hero={appState.aiContent["hero"]}
            colors={appState.aiContent["colors"]}
            services={appState.aiContent["services"]["list"]}
            posts={appState.iPosts}
          />
        );
      case "General template":
        return (
          <General
            banner={appState.aiContent["banner"]}
            hero={appState.aiContent["hero"]}
            colors={appState.aiContent["colors"]}
            services={appState.aiContent["services"]["list"]}
            posts={appState.iPosts}
          />
        );
        default:
            return <BasicTemplate
            banner={appState.aiContent["banner"]}
            hero={appState.aiContent["hero"]}
            colors={appState.aiContent["colors"]}
            services={appState.aiContent["services"]["list"]}
            posts={appState.iPosts}
          />

    }
  });
};

export default Preview;
