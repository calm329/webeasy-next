import Image from "next/image";
import TopBar from "@/components/top-bar";
import { TColors, TFields, THero, TSection } from "@/types";
import React, { Dispatch, SetStateAction, useState } from "react";
import CTA from "@/components/cta";
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import FontPicker from "@/components/font-picker";
import { appState } from "../../../lib/store/slices/site-slice";
import { Skeleton } from "@/components/ui/skeleton";
import TypewriterEffect from "@/components/typewriter-effect";
import AddSectionButtons from "@/components/add-section/buttons";
import SectionModal from "@/components/ui/modal/section-modal";

type TProps = {
  hero: THero;
  colors: TColors;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
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
  setSectionModal: Dispatch<SetStateAction<boolean>>;
  setTriggerSection: Dispatch<SetStateAction<number>>;
};

const EditableHero = (props: TProps) => {
  const {
    hero,
    colors,
    setIsOpen,
    setSection,
    editable,
    setFocusedField,
    showForm,
    setShowForm,
    setSectionModal,
    setTriggerSection
  } = props;

  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
  return appState.aiContent?.hero ? (
    <div
      className={`relative -m-8 mb-10 flex flex-wrap justify-between pr-2 ${editable && "group rounded border-2 border-transparent hover:border-indigo-500"}`}
      onClick={() => {
        if (editable && setIsOpen && setSection) {
          setSection("Hero");
          setIsOpen(true);
          dispatch(updateAppState({ ...appState, openedSlide: "Customize" }));
          setShowForm({
            show: false,
            edit: "",
            form: "",
          });
        }
      }}
    >
      
      <AddSectionButtons setSectionModal={setSectionModal} index={1} setTriggerSection={setTriggerSection}/>
      <div
        className={`p-8 max-sm:w-full ${appState.view === "Mobile" ? "w-full" : " w-2/3"}`}
      >
        <div className="md:max-w-lg">
          {appState.aiContent?.hero?.heading ? (
            <h2
              className={`font-heading mb-6 text-4xl font-black tracking-tight text-gray-300 md:text-5xl ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
              style={{ color: colors?.primary }}
              onClick={(e) => {
                e.stopPropagation();
                if (
                  editable &&
                  setIsOpen &&
                  setSection &&
                  setFocusedField &&
                  setShowForm
                ) {
                  setSection("Hero");
                  setIsOpen(true);
                  setShowForm({
                    form: "",
                    edit: "",
                    show: false,
                  });
                  dispatch(
                    updateAppState({
                      ...appState,
                      focusedField: "heading",
                      openedSlide: "Customize",
                    }),
                  );
                }
              }}
            >
              {appState?.generate?.generating ? (
                <TypewriterEffect text={hero.heading ?? ""} />
              ) : (
                hero.heading
              )}
            </h2>
          ) : (
            <h2
              className={`font-heading mb-6 flex flex-col gap-2 text-4xl font-black tracking-tight text-gray-300 md:text-5xl`}
            >
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-1/2" />
            </h2>
          )}

          {appState.aiContent?.hero?.subheading ? (
            <p
              className={`mb-8 text-xl font-bold ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
              onClick={(e) => {
                e.stopPropagation();
                if (
                  editable &&
                  setIsOpen &&
                  setSection &&
                  setFocusedField &&
                  setShowForm
                ) {
                  setSection("Hero");
                  setIsOpen(true);
                  setShowForm({
                    form: "",
                    edit: "",
                    show: false,
                  });
                  dispatch(
                    updateAppState({
                      ...appState,
                      focusedField: "subheading",
                      openedSlide: "Customize",
                    }),
                  );
                }
              }}
            >
              {appState?.generate?.generating ? (
                <TypewriterEffect text={hero.subheading ?? ""} />
              ) : (
                hero.subheading
              )}
            </p>
          ) : (
            <p className={`mb-8 flex flex-col gap-1 text-xl font-bold`}>
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-1/2" />
            </p>
          )}

          {appState.aiContent.hero.button ? (
            hero.button.show && (
              <div className="-m-2 flex flex-wrap">
                <div
                  className={`w-full p-2 md:w-auto ${editable && "flex gap-5 rounded border-2 border-transparent  hover:border-indigo-500 max-sm:flex-col"}`}
                  onClick={() => {
                    if (
                      editable &&
                      setIsOpen &&
                      setSection &&
                      setFocusedField
                    ) {
                      setSection("Hero");
                      setIsOpen(true);
                      setFocusedField("cta");
                    }
                  }}
                >
                  {hero.button.list.map((data, i) => (
                    <div
                      key={i}
                      onClick={() =>
                        setShowForm({
                          form: "Button",
                          edit: data.name,
                          show: true,
                        })
                      }
                    >
                      <CTA
                        text={data.label}
                        bgColor={colors?.secondary}
                        link={editable ? "#" : data.link}
                        external={editable ? false : data.type === "External"}
                        appState={appState}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="-m-2 flex flex-wrap">
              <div className={`w-full p-2 md:w-auto`}>
                <button className="block w-full rounded-full px-8 py-3.5 text-center text-lg font-bold ">
                  <Skeleton className="h-14 w-36" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {appState.aiContent.hero.image.imageUrl ? (
        hero.image.show && (
          <div
            className={`max-h-96 max-w-96 overflow-hidden py-2  max-sm:w-full ${appState.view === "Mobile" ? "w-full" : "w-1/4"}`}
          >
            <Image
              src={hero.image.imageUrl}
              width={256}
              height={256}
              alt="Hero Image"
              className={`${appState.view === "Mobile" ? "" : "mx-auto "} h-full w-full rounded-3xl object-cover md:mr-0 ${editable && "rounded border-2 border-transparent hover:border-indigo-500 "}`}
              onClick={() => {
                if (
                  editable &&
                  setIsOpen &&
                  setSection &&
                  setFocusedField &&
                  setShowForm
                ) {
                  setSection("Hero");
                  setIsOpen(true);
                  setFocusedField("imageUrl");
                  setShowForm({
                    form: "",
                    edit: "",
                    show: false,
                  });
                }
              }}
            />
          </div>
        )
      ) : (
        <div
          className={` min-w-72 p-8  max-sm:w-full ${appState.view === "Mobile" ? "w-full" : "w-1/4"}`}
        >
          <Skeleton className="h-[256px] w-[256px]" />
        </div>
      )}
    </div>
  ) : (
    <div
      className={`-m-8 mb-10 flex flex-wrap justify-between pr-2 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
      onClick={() => {
        if (editable && setIsOpen && setSection) {
          setSection("Hero");
          setIsOpen(true);
          dispatch(updateAppState({ ...appState, openedSlide: "Customize" }));
          setShowForm({
            show: false,
            edit: "",
            form: "",
          });
        }
      }}
    >
      <div
        className={`p-8 max-sm:w-full ${appState.view === "Mobile" ? "w-full" : " w-2/3"}`}
      >
        <div className="md:max-w-lg">
          <h2
            className={`font-heading mb-6 flex flex-col gap-2 text-4xl font-black tracking-tight text-gray-300 md:text-5xl`}
          >
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-1/2" />
          </h2>

          <p className={`mb-8 flex flex-col gap-1 text-xl font-bold`}>
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-1/2" />
          </p>

          <div className="-m-2 flex flex-wrap">
            <div className={`w-full p-2 md:w-auto`}>
              <button className="block w-full rounded-full px-8 py-3.5 text-center text-lg font-bold ">
                <Skeleton className="h-16 w-36" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={` min-w-72 p-8  max-sm:w-full ${appState.view === "Mobile" ? "w-full" : "w-1/4"}`}
      >
        <Skeleton className="h-[256px] w-[256px]" />
      </div>
    </div>
  );
};

export default EditableHero;
