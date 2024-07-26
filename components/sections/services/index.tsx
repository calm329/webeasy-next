import React, { Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { TSection, TSectionsType } from "@/types";
import AddSectionButtons from "@/components/add-section/buttons";
import TypewriterEffect from "@/components/typewriter-effect";
import { Skeleton } from "@/components/ui/skeleton";
import ServiceCard from "@/components/ui/card/service-card";
import EditComponent from "@/components/edit-component";
import { sectionsData as SD } from "@/lib/store/slices/section-slice";

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

  id: string;
};

const ServicesSection = ({
  editable,
  setIsOpen,
  setSection,
  setShowForm,
  setSectionModal,
  setTriggerSection,
  showForm,

  id,
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

  const sections = useAppSelector(SD);

  // Find the section by ID and get the variation
  const section = sections.find((section) => section.id === id);
  const variation = section?.variation || 1;

  const styles: {
    [key: number]: {
      container: string;
      listContainer: string;
      listCard: string;
    };
  } = {
    1: {
      container: "mx-auto max-w-7xl rounded-3xl p-8 md:p-12 w-full",
      listContainer: "-m-8 flex flex-wrap justify-center",
      listCard: "",
    },
    2: {
      container: "mx-auto max-w-7xl rounded-3xl p-8 md:p-12 w-full",
      listContainer: "-m-8 flex flex-wrap justify-center gap-5",
      listCard: "bg-white border-2 border-gray-500 rounded-xl shadow",
    },
    3: {
      container: "mx-auto max-w-7xl rounded-3xl p-8 md:p-12 w-full",
      listContainer: "-m-8 flex flex-col gap-5 justify-center",
      listCard: "border-2 border-gray-500 rounded-xl shadow",
    },
    4: {
      container: "mx-auto max-w-7xl rounded-3xl p-8 md:p-12 w-full",
      listContainer: "-m-8 flex flex-col gap-5 justify-center",
      listCard: "bg-white border-2 border-gray-500 rounded-xl shadow",
    },
    5: {
      container: "mx-auto max-w-7xl rounded-3xl p-8 md:p-12 w-full",
      listContainer: "-m-8 flex flex-wrap justify-center",
      listCard: "",
    },
  };

  const { container, listContainer, listCard } = styles[variation];

  return (
    <section className="group relative mt-10 flex items-center justify-center">
      <button
        className={`${container} ${
          editable &&
          "rounded border-2 border-transparent hover:border-indigo-500"
        } group relative bg-gray-100`}
        onClick={handleSectionClick}
      >
        <EditComponent id={id} />
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
                editable &&
                "rounded border-2 border-transparent hover:border-indigo-500"
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
                editable &&
                "rounded border-2 border-transparent hover:border-indigo-500"
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

        <div className={listContainer}>
          {appState.aiContent.services?.show &&
            appState.aiContent.services?.list?.map((service) => (
              <div key={service?.id} className={listCard}>
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
              </div>
            ))}

          {appState?.generate?.generating &&
            Array.from({ length: 6 }).map((_, i) => {
              if (i > (appState.aiContent.services?.list ?? []).length - 1) {
                return (
                  <div
                    key={i}
                    className={`w-full p-8 md:w-1/3 ${
                      editable &&
                      "rounded border-2 border-transparent hover:border-indigo-500"
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
