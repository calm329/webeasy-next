import Image from "next/image";
import TopBar from "@/components/top-bar";
import { TColors, TFields, THero, TSection, TSectionsType } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import Cta from "@/components/cta";
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import FontPicker from "@/components/font-picker";
import { Skeleton } from "@/components/ui/skeleton";
import TypewriterEffect from "@/components/typewriter-effect";
import AddSectionButtons from "@/components/add-section/buttons";
import SectionModal from "@/components/ui/modal/section-modal";
import { isImage } from "@/components/ui/form/uploader";
import EditComponent from "@/components/edit-component";

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
  setTriggerSection: Dispatch<
    SetStateAction<{
      section: string;
      position: number;
    }>
  >;
  setSections: Dispatch<
    SetStateAction<
    TSectionsType[]
    >
  >;
  sections: TSectionsType[];
  id: string;
};

const EditableHero = ({
  hero,
  colors,
  setIsOpen,
  setSection,
  editable,
  setFocusedField,
  showForm,
  setShowForm,
  setSectionModal,
  setTriggerSection,
  setSections,
  sections,
  id,
}: TProps) => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);

  const handleClick = (field: TFields) => {
    if (editable && setIsOpen && setSection && setFocusedField) {
      setSection("Hero");
      setIsOpen(true);
      setFocusedField(field);
      setShowForm({ form: "", edit: "", show: false });
      dispatch(
        updateAppState({
          ...appState,
          focusedField: field,
          openedSlide: "Customize",
        }),
      );
    }
  };

  const renderSkeleton = () => (
    <>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-1/2" />
    </>
  );

  const renderButtonSkeleton = () => (
    <div className="-m-2 flex flex-wrap">
      <div className="w-full p-2 md:w-auto">
        <button className="block w-full rounded-full px-8 py-3.5 text-center text-lg font-bold ">
          <Skeleton className="h-14 w-36" />
        </button>
      </div>
    </div>
  );

  return (
    <section className="bg-gray-50 py-10">
      <div className="group container relative mx-auto px-4">
        <EditComponent sections={sections} setSections={setSections} id={id} />
        <div className="rounded-3xl bg-white px-8 py-16 pb-10">
          <div className="mx-auto flex max-w-7xl flex-col justify-center">
            {appState.aiContent?.hero ? (
              <button
                className={`relative mb-10 flex items-center justify-between pr-2 max-md:flex-col ${editable && "group rounded border-2 border-transparent hover:border-indigo-500"}`}
                onClick={() => handleClick("Hero")}
              >
                <AddSectionButtons
                  setSectionModal={setSectionModal}
                  id={id}
                  setTriggerSection={setTriggerSection}
                />
                <div
                  className={`p-8 max-sm:w-full ${appState.view === "Mobile" ? "w-full" : "w-2/3"}`}
                >
                  <div className="flex flex-col md:max-w-lg">
                    {appState.aiContent?.hero?.heading ? (
                      <button
                        className={` font-heading mb-6 text-left text-4xl font-black tracking-tight text-gray-300 md:text-5xl ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                        style={{ color: colors?.primary }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClick("heading");
                        }}
                      >
                        {appState?.generate?.generating ? (
                          <TypewriterEffect
                            text={appState.aiContent.hero.heading ?? ""}
                          />
                        ) : (
                          appState.aiContent.hero.heading
                        )}
                      </button>
                    ) : (
                      <h2 className="font-heading mb-6 flex flex-col gap-2 text-4xl font-black tracking-tight text-gray-300 md:text-5xl">
                        {renderSkeleton()}
                      </h2>
                    )}

                    {appState.aiContent?.hero?.subheading ? (
                      <button
                        className={` mb-8 text-left text-xl font-bold ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClick("subheading");
                        }}
                      >
                        {appState?.generate?.generating ? (
                          <TypewriterEffect
                            text={appState.aiContent.hero.subheading ?? ""}
                          />
                        ) : (
                          appState.aiContent.hero.subheading
                        )}
                      </button>
                    ) : (
                      <p className="mb-8 flex flex-col gap-1 text-xl font-bold">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-1/2" />
                      </p>
                    )}

                    {appState.aiContent.hero.button
                      ? appState.aiContent.hero.button.show && (
                          <div className="-m-2 flex flex-wrap">
                            <div
                              className={`w-full p-2 md:w-auto ${editable && "flex gap-5 rounded border-2 border-transparent hover:border-indigo-500 max-sm:flex-col"}`}
                            >
                              {appState.aiContent.hero.button.list.map(
                                (data, i) => (
                                  <button
                                    key={data.name}
                                    onClick={() =>
                                      setShowForm({
                                        form: "Button",
                                        edit: data.name,
                                        show: true,
                                      })
                                    }
                                  >
                                    <Cta
                                      text={data.label}
                                      bgColor={colors?.secondary}
                                      link={editable ? "#" : data.link}
                                      external={
                                        editable
                                          ? false
                                          : data.type === "External"
                                      }
                                      appState={appState}
                                    />
                                  </button>
                                ),
                              )}
                            </div>
                          </div>
                        )
                      : renderButtonSkeleton()}
                  </div>
                </div>

                {appState.aiContent.hero.image.imageUrl ? (
                  appState.aiContent.hero?.image?.show && (
                    <div
                      className={`right-2 h-full max-w-96 overflow-hidden py-2 max-md:w-full md:absolute ${appState.view === "Mobile" ? "w-full" : "w-1/4"}`}
                    >
                      {isImage(appState.aiContent.hero.image.imageUrl) ? (
                        <Image
                          src={appState.aiContent.hero.image.imageUrl}
                          width={500}
                          height={500}
                          alt="Hero Image"
                          style={{
                            objectPosition: `${appState.aiContent.hero?.image?.horizontalPosition}% ${appState.aiContent.hero?.image?.verticalPosition}%`,
                          }}
                          className={`${appState.view === "Mobile" ? "" : "mx-auto"} h-full w-full rounded-3xl object-cover md:mr-0 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                          onClick={() => handleClick("imageUrl")}
                        />
                      ) : (
                        <video
                          src={appState.aiContent.hero.image.imageUrl}
                          controls
                          className={`${appState.view === "Mobile" ? "" : "mx-auto"} h-full w-full rounded-3xl object-cover md:mr-0 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                          onClick={() => handleClick("imageUrl")}
                        />
                      )}
                    </div>
                  )
                ) : (
                  <div
                    className={`min-w-72 p-8 max-sm:w-full ${appState.view === "Mobile" ? "w-full" : "w-1/4"}`}
                  >
                    <Skeleton className="h-[256px] w-[256px]" />
                  </div>
                )}
              </button>
            ) : (
              <button
                className={`-m-8 mb-10 flex flex-wrap justify-between pr-2 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
              >
                <div
                  className={`p-8 max-sm:w-full ${appState.view === "Mobile" ? "w-full" : "w-2/3"}`}
                >
                  <div className="md:max-w-lg">
                    <h2 className="font-heading mb-6 flex flex-col gap-2 text-4xl font-black tracking-tight text-gray-300 md:text-5xl">
                      {renderSkeleton()}
                    </h2>
                    <p className="mb-8 flex flex-col gap-1 text-xl font-bold">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-1/2" />
                    </p>
                    {renderButtonSkeleton()}
                  </div>
                </div>
                <div
                  className={`min-w-72 p-8 max-sm:w-full ${appState.view === "Mobile" ? "w-full" : "w-1/4"}`}
                >
                  <Skeleton className="h-[256px] w-[256px]" />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditableHero;
