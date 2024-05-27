import BasicTemplate from "@/templates/basic-template/basic-template-csr";
import BlueBasedTemplate from "@/templates/blue-based-template";
import PostBasedTemplate from "@/templates/post-based-template";
import React, { Dispatch, SetStateAction } from "react";
import GeneralTemplate from "@/templates/general-template";
import { AppState, TFields, TSection } from "@/types";
import { selectedTemplate as ST } from "@/lib/store/slices/template-slice";
import { useAppSelector } from "@/lib/store/hooks";

type TProps = {
  appState: AppState;
  setSection: Dispatch<SetStateAction<TSection>>;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
  setFocusedField: Dispatch<SetStateAction<TFields>>;
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

const SelectedTemplate = (props: TProps) => {
  const selectedTemplate = useAppSelector(ST);
  const {
    appState,
    setSection,
    setIsSideBarOpen,
    setFocusedField,
    showButtonForm,
    setShowButtonForm,
  } = props;
  return (
    <div className="h-full w-full">
      {selectedTemplate?.name === "Basic template" && (
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
          showButtonForm={showButtonForm}
          setShowButtonForm={setShowButtonForm}
        />
      )}
      {selectedTemplate?.name === "Blue-Based template" && (
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
      {selectedTemplate?.name === "Post-Based template" && (
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
      {selectedTemplate?.name === "General template" && (
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
