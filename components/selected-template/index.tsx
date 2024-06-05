import BasicTemplate from "@/templates/basic-template/basic-template-csr";
import BlueBasedTemplate from "@/templates/blue-based-template";
import PostBasedTemplate from "@/templates/post-based-template";
import React, { Dispatch, SetStateAction } from "react";
import GeneralTemplate from "@/templates/general-template";
import { AppState, TFields, TSection } from "@/types";
import { selectedTemplate as ST } from "@/lib/store/slices/template-slice";
import { useAppSelector } from "@/lib/store/hooks";
import { usePathname } from "next/navigation";

type TProps = {
  appState: AppState;
  setSection: Dispatch<SetStateAction<TSection>>;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
  setFocusedField: Dispatch<SetStateAction<TFields>>;
  showForm: {
    form: string;
    edit: string;
    show: boolean;
  };
  setShowForm: React.Dispatch<
    React.SetStateAction<{
      form: string;
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
    showForm,
    setShowForm,
  } = props;
  const pathname = usePathname();
  return (
    <div
      className={` mx-auto overflow-auto ${appState.view === "Mobile" && "h-[800px] w-[480px] rounded-xl border-8 border-black"} ${appState.view === "Tablet" && "h-[1024px] w-[768px] rounded-xl border-8  border-black"} ${appState.view === "Desktop" && "h-full w-full"}`}
    >
      {selectedTemplate?.name === "Basic template" && (
        <BasicTemplate
          editable={appState.editable}
          setSection={setSection}
          setIsOpen={setIsSideBarOpen}
          banner={appState.aiContent.banner}
          hero={appState.aiContent.hero}
          colors={appState.aiContent["colors"]}
          services={appState.aiContent.services}
          posts={
            pathname.startsWith("/auth")
              ? appState.iPosts
              : { ...appState.iPosts, list: [] }
          }
          setFocusedField={setFocusedField}
          showForm={showForm}
          setShowForm={setShowForm}
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
          posts={
            pathname.startsWith("/auth")
              ? appState.iPosts
              : { ...appState.iPosts, list: [] }
          }
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
          posts={
            pathname.startsWith("/auth")
              ? appState.iPosts
              : { ...appState.iPosts, list: [] }
          }
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
          posts={
            pathname.startsWith("/auth")
              ? appState.iPosts
              : { ...appState.iPosts, list: [] }
          }
          setFocusedField={setFocusedField}
        />
      )}
    </div>
  );
};

export default SelectedTemplate;
