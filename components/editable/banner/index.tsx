import TopBar from "@/components/top-bar";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateAppState, appState as AS } from '@/lib/store/slices/site-slice';
import { TBanner, TColors, TFields, TSection } from "@/types";
import React, { Dispatch, SetStateAction } from "react";

type TProps = {
  banner: TBanner;
  colors: TColors;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
  showButtonForm:{
    edit:string,
    show: boolean,
  };
  setShowButtonForm:React.Dispatch<React.SetStateAction<{
    edit:string,
    show: boolean,
  }>>;
};

const EditableBanner = (props: TProps) => {
  const { banner, colors, setIsOpen, setSection, editable, setFocusedField ,setShowButtonForm,showButtonForm} =
    props;
    const dispatch= useAppDispatch()
    const appState = useAppSelector(AS);
  return (
    <div
      className={`container mx-auto px-4 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
      onClick={() => {
        if (editable && setIsOpen && setSection) {
          setSection("Banner");
          setIsOpen(true);
          dispatch(updateAppState({...appState,openedSlide:"Customize"}))
        }
      }}
    >
      <TopBar
        banner={banner}
        colors={colors}
        editable={editable}
        setFocusedField={setFocusedField}
        setSection={setSection}
        setIsOpen={setIsOpen}
        setShowButtonForm={setShowButtonForm}
      />
    </div>
  );
};

export default EditableBanner;
