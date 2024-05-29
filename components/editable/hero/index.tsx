import Image from "next/image";
import TopBar from "@/components/top-bar";
import { TColors, TFields, THero, TSection } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import CTA from "@/components/cta";
import { updateAppState, appState as AS } from '@/lib/store/slices/site-slice';
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import FontPicker from "@/components/font-picker";

type TProps = {
  hero: THero;
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

const EditableHero = (props: TProps) => {
  const { hero, colors, setIsOpen, setSection, editable, setFocusedField,showButtonForm,setShowButtonForm } =
    props;

    const dispatch = useAppDispatch();
    const appState = useAppSelector(AS);
  return (
    <div
      className={`-m-8 mb-10 flex flex-wrap ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
      onClick={() => {
        if (editable && setIsOpen && setSection) {
          setSection("Hero");
          setIsOpen(true);
          dispatch(updateAppState({...appState,openedSlide:"Customize"}))
        }
      }}
    >

      <div className="w-full p-8 md:w-1/2">
        <div className="md:max-w-lg">
          <h2
            className={`font-heading mb-6 text-4xl font-black tracking-tight text-gray-300 md:text-5xl ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
            style={{ color: colors.primary }}
            onClick={(e) => {
               e.stopPropagation()
              if (editable && setIsOpen && setSection && setFocusedField && setShowButtonForm) {
                setSection("Hero");
                setIsOpen(true);
                setShowButtonForm({
                  edit:"",
                  show:false
                })
                dispatch(updateAppState({
                  ...appState,
                  focusedField:"heading",
                  openedSlide:"Customize"
                }))
              }
            }}
          >
            {hero.heading}
          </h2>
          <p
            className={`mb-8 text-xl font-bold ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
            onClick={(e) => {
              e.stopPropagation()
              if (editable && setIsOpen && setSection && setFocusedField && setShowButtonForm) {
                setSection("Hero");
                setIsOpen(true);
                setShowButtonForm({
                  edit:"",
                  show:false
                })
                dispatch(updateAppState({
                  ...appState,
                  focusedField:"subheading",
                  openedSlide:"Customize"
                }))
              }
            }}
          >
            {hero.subheading}
          </p>
          {hero.button.show && (
            <div className="-m-2 flex flex-wrap">
              <div
                className={`w-full p-2 md:w-auto ${editable && "rounded border-2 border-transparent flex gap-5  max-sm:flex-col hover:border-indigo-500"}`}
                onClick={() => {
                  if (editable && setIsOpen && setSection && setFocusedField) {
                    setSection("Hero");
                    setIsOpen(true);
                    setFocusedField("cta");
                  }
                }}
              >
                {hero.button.list.map((data, i) => (
                  <div key={i} onClick={()=>setShowButtonForm({
                    edit:data.name,
                    show:true,
                  })}>
                    <CTA
                      text={data.label}
                      bgColor={colors.secondary}
                      link={editable ? "#" : data.value}
                      external={editable?false:data.type === "External"}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {hero.image.show && (
        <div className={`w-full p-8 md:w-1/2  `}>
          <Image
            src={hero.image.imageUrl}
            width={256}
            height={256}
            alt="Hero Image"
            className={`mx-auto rounded-3xl object-contain md:mr-0 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
            onClick={() => {
              if (editable && setIsOpen && setSection && setFocusedField && setShowButtonForm) {
                setSection("Hero");
                setIsOpen(true);
                setFocusedField("imageUrl");
                setShowButtonForm({
                  edit:"",
                  show:false
                })
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EditableHero;
