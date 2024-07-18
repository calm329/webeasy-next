import React, { Dispatch, SetStateAction } from "react";
import TopBar from "@/components/top-bar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";
import { TBanner, TColors, TFields, TSection, TSectionsType } from "@/types";
import EditComponent from "@/components/edit-component";

type TProps = {
  banner: TBanner;
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
  setShowForm: React.Dispatch<React.SetStateAction<{ form: string; edit: string; show: boolean }>>;
  setSections: Dispatch<SetStateAction<TSectionsType[]>>
  sections:TSectionsType[]
  id:string
};

const EditableBanner: React.FC<TProps> = ({
  banner,
  colors,
  setIsOpen,
  setSection,
  editable,
  setFocusedField,
  showForm,
  setShowForm,
  sections,
  setSections,
  id
}) => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);


  const handleClick = () => {
    if (editable && setIsOpen && setSection) {
      setSection("Banner");
      setIsOpen(true);
      setShowForm({ show: false, edit: "", form: "" });
      dispatch(updateAppState({ ...appState, openedSlide: "Customize" }));
    }
  };

  return (
    <section className="bg-white py-6 flex justify-center group relative">
      <EditComponent id={id} sections={sections} setSections={setSections}/>
      <button
        className={`container mx-auto px-4 ${editable ? "rounded border-2 border-transparent hover:border-indigo-500" : ""}`}
        onClick={handleClick}
       
      >
        {appState.aiContent?.banner ? (
          <TopBar
            banner={banner}
            colors={colors}
            editable={editable}
            setFocusedField={setFocusedField}
            setSection={setSection}
            setIsOpen={setIsOpen}
            setShowForm={setShowForm}
          />
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-5 rounded-full border border-gray-100 bg-gray-100 px-6 py-3.5 max-sm:flex-col max-sm:gap-5">
            <div className={`w-auto ${appState.view === "Mobile" ? "mx-auto" : ""}`}>
              <div className="flex flex-wrap items-center">
                <div className="text-black-300 flex w-auto items-center gap-2 text-xl font-medium" style={{ color: colors?.primary }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <Skeleton className="h-8 w-8 bg-white" />
                  <Skeleton className="h-10 w-40 bg-white" />
                </div>
              </div>
            </div>
            <div className={`w-auto ${appState.view === "Mobile" ? "mx-auto" : ""}`}>
              <div className="flex flex-wrap items-center">
                <div className="w-auto lg:block">
                  <div className="-m-2 flex flex-wrap">
                    <div className="flex w-full gap-5 p-2 md:w-auto">
                      <button className="block w-full rounded-full px-8 text-center">
                        <Skeleton className="h-12 w-40 bg-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </button>
    </section>
  );
};

export default EditableBanner;
