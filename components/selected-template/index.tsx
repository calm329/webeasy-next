import BasicTemplate from "@/templates/basic-template/basic-template-csr";
import BlueBasedTemplate from "@/templates/blue-based-template";
import PostBasedTemplate from "@/templates/post-based-template";
import React, { Dispatch, SetStateAction } from "react";
import GeneralTemplate from "@/templates/general-template";
import { AppState, TFields, TSection, TTemplateName } from "@/types";

type TProps = {
  selectedTemplate: TTemplateName;
  appState: AppState;
  setSection: Dispatch<SetStateAction<TSection>>;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
  setFocusedField: Dispatch<SetStateAction<TFields>>;
};

const SelectedTemplate = (props: TProps) => {
  const {
    selectedTemplate,
    appState,
    setSection,
    setIsSideBarOpen,
    setFocusedField,
  } = props;
  return (
    <div className="h-full w-full">
      {selectedTemplate === "Basic template" && (
        <BasicTemplate
          editable={appState.editable}
          setSection={setSection}
          setIsOpen={setIsSideBarOpen}
          banner={appState.aiContent.banner}
          hero={appState.aiContent.hero}
          colors={appState.aiContent["colors"]}
          services={appState.aiContent["services"]["list"]}
          posts={appState.iPosts}
          setFocusedField={setFocusedField}
        />
      )}
      {selectedTemplate === "Blue-Based template" && (
        <BlueBasedTemplate
          editable={appState.editable}
          setSection={setSection}
          setIsOpen={setIsSideBarOpen}
          banner={appState.aiContent.banner}
          hero={appState.aiContent.hero}
          colors={appState.aiContent["colors"]}
          services={appState.aiContent["services"]["list"]}
          posts={appState.iPosts}
          setFocusedField={setFocusedField}
        />
      )}
      {selectedTemplate === "Post-Based template" && (
        <PostBasedTemplate
          editable={appState.editable}
          setSection={setSection}
          setIsOpen={setIsSideBarOpen}
          banner={appState.aiContent.banner}
          hero={appState.aiContent.hero}
          colors={appState.aiContent["colors"]}
          services={appState.aiContent["services"]["list"]}
          posts={appState.iPosts}
          setFocusedField={setFocusedField}
        />
      )}
      {selectedTemplate === "General template" && (
        <GeneralTemplate
          editable={appState.editable}
          setSection={setSection}
          setIsOpen={setIsSideBarOpen}
          banner={appState.aiContent.banner}
          hero={appState.aiContent.hero}
          colors={appState.aiContent["colors"]}
          services={appState.aiContent["services"]["list"]}
          posts={appState.iPosts}
          setFocusedField={setFocusedField}
        />
      )}
    </div>
  );
};

export default SelectedTemplate;
