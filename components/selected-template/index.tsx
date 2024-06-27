import BasicTemplate from "@/templates/basic-template/basic-template-csr";
import BlueBasedTemplate from "@/templates/blue-based-template/blue-based-template-csr";
import PostBasedTemplate from "@/templates/post-based-template/post-based-template-csr";
import React, { Dispatch, SetStateAction } from "react";
import GeneralTemplate from "@/templates/general-template/general-template-csr";
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
  const isInstagramPage = pathname.startsWith("/auth");
  return (
    <div
      className={` mx-auto overflow-auto ${appState.view === "Mobile" && "no-scrollbar h-[800px] w-[480px] rounded-xl border-8 border-black"} ${appState.view === "Tablet" && "no-scrollbar h-[1024px] w-[768px] rounded-xl  border-8 border-black"} ${appState.view === "Desktop" && "h-full w-full"}`}
    >
      {selectedTemplate?.name === "Basic template" && (
        <BasicTemplate
          editable={appState.editable}
          setSection={setSection}
          setIsOpen={setIsSideBarOpen}
          banner={appState.aiContent?.banner}
          hero={appState.aiContent?.hero}
          colors={appState.aiContent?.colors}
          services={appState.aiContent?.services}
          posts={
            isInstagramPage ? appState.iPosts : { ...appState.iPosts, list: [] }
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
          banner={appState.aiContent?.banner}
          hero={appState.aiContent?.hero}
          colors={appState.aiContent?.colors}
          services={appState.aiContent?.services.list}
          posts={
            isInstagramPage ? appState.iPosts : { ...appState.iPosts, list: [] }
          }
          setFocusedField={setFocusedField}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      )}
      {selectedTemplate?.name === "Post-Based template" && (
        <PostBasedTemplate
          editable={appState.editable}
          setSection={setSection}
          setIsOpen={setIsSideBarOpen}
          banner={appState.aiContent?.banner}
          hero={appState.aiContent?.hero}
          colors={appState.aiContent?.colors}
          services={appState.aiContent?.services.list}
          posts={
            isInstagramPage ? appState.iPosts : { ...appState.iPosts, list: [] }
          }
          setFocusedField={setFocusedField}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      )}
      {selectedTemplate?.name === "General template" && (
        <GeneralTemplate
          editable={appState.editable}
          setSection={setSection}
          setIsOpen={setIsSideBarOpen}
          banner={appState.aiContent?.banner}
          hero={appState.aiContent?.hero}
          colors={appState.aiContent?.colors}
          services={appState.aiContent?.services.list}
          posts={
            isInstagramPage ? appState.iPosts : { ...appState.iPosts, list: [] }
          }
          setFocusedField={setFocusedField}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      )}
    </div>
  );
};

export default SelectedTemplate;
