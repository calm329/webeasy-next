import React, { Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { TSection, TSectionsType } from "@/types";
import AddSectionButtons from "@/components/add-section/buttons";
import TypewriterEffect from "@/components/typewriter-effect";
import { Skeleton } from "@/components/ui/skeleton";
import ServiceCard from "@/components/ui/card/service-card";
import EditComponent from "@/components/edit-component";

type TProps = {
  editable?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  setShowForm: React.Dispatch<
    SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
  setSectionModal: React.Dispatch<SetStateAction<boolean>>;
  setTriggerSection: React.Dispatch<
    SetStateAction<{ section: string; position: number }>
  >;
  showForm?: {
    form: string;
    edit: string;
    show: boolean;
  };
  setSections: Dispatch<SetStateAction<TSectionsType[]>>
  sections:TSectionsType[]
  id:string
};

const ServicesSection = ({
  editable,
  setIsOpen,
  setSection,
  setShowForm,
  setSectionModal,
  setTriggerSection,
  showForm,
  sections,
  setSections,
  id
}: TProps) => {
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();

  const handleSectionClick = () => {
    if (setIsOpen && setSection) {
      setIsOpen(true);
      setSection("Services");
      dispatch(
        updateAppState({
          ...appState,
          openedSlide: "Customize",
        }),
      );
    }
  };

  const handleFieldClick = (field: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editable && setIsOpen && setSection && setShowForm) {
      setSection("Services");
      setIsOpen(true);
      setShowForm({
        form: "",
        edit: "",
        show: false,
      });
      dispatch(
        updateAppState({
          ...appState,
          focusedField: field,
          openedSlide: "Customize",
        }),
      );
    }
  };

  return (
    <section className="relative group flex justify-center items-center mt-10">
      <EditComponent id={id} sections={sections} setSections={setSections}/>
      <button
        className={`mx-auto max-w-7xl rounded-3xl p-8 md:p-12 ${
          editable && "rounded border-2 border-transparent hover:border-indigo-500"
        } group relative bg-gray-100`}
        onClick={handleSectionClick}
      >
        <AddSectionButtons
          classNameUp="top-0"
          setSectionModal={setSectionModal}
          setTriggerSection={setTriggerSection}
          id={id}
        />
        <div className="mb-10 flex flex-col">
          {appState.aiContent.services?.title ? (
            <button
              className={`mx-auto w-fit text-center text-2xl font-bold ${
                editable && "rounded border-2 border-transparent hover:border-indigo-500"
              }`}
              onClick={handleFieldClick("title")}
            >
              {appState?.generate?.generating ? (
                <TypewriterEffect text={appState.aiContent.services?.title} />
              ) : (
                appState.aiContent.services?.title
              )}
            </button>
          ) : (
            <Skeleton className="mx-auto h-12 w-40 bg-white" />
          )}
          {appState.aiContent.services?.description ? (
            <button
              className={`mx-auto mb-6 mt-2 w-fit text-center ${
                editable && "rounded border-2 border-transparent hover:border-indigo-500"
              }`}
              onClick={handleFieldClick("description")}
            >
              {appState?.generate?.generating ? (
                <TypewriterEffect
                  text={appState.aiContent.services?.description}
                />
              ) : (
                appState.aiContent.services?.description
              )}
            </button>
          ) : (
            <Skeleton className="mx-auto mb-6 mt-2 h-8 w-96 bg-white" />
          )}
        </div>

        <div className="-m-8 flex flex-wrap justify-center">
          {appState.aiContent.services?.show &&
            appState.aiContent.services?.list?.map((service) => (
              <ServiceCard
                id={service.id}
                key={service.name}
                name={service.name}
                description={service.description}
                color={appState.aiContent.colors?.primary}
                editable={editable}
                setIsOpen={setIsOpen}
                setSection={setSection}
                showForm={showForm}
                setShowForm={setShowForm}
                appState={appState}
              />
            ))}

          {appState?.generate?.generating &&
            Array.from({ length: 6 }).map((_, i) => {
              if (i > (appState.aiContent.services?.list ?? []).length - 1) {
                return (
                  <div
                    key={i}
                    className={`w-full p-8 md:w-1/3 ${
                      editable && "rounded border-2 border-transparent hover:border-indigo-500"
                    }`}
                  >
                    <div className="-m-3 flex flex-wrap">
                      <div className="w-auto p-3 md:w-full lg:w-auto">
                        <div className="flex items-center justify-center rounded-xl">
                          <Skeleton className="h-12 w-12 bg-white" />
                        </div>
                      </div>
                      <div className="flex-1 p-3">
                        <h3 className="font-heading mb-2 text-xl font-black text-gray-900">
                          <Skeleton className="h-10 w-full bg-white" />
                        </h3>
                        <p className="flex flex-col gap-1 text-sm font-bold text-gray-700">
                          <Skeleton className="h-8 w-full bg-white" />
                          <Skeleton className="h-8 w-1/2 bg-white" />
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
        </div>
      </button>
    </section>
  );
};

export default ServicesSection;
