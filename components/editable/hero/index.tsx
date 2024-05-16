import Image from "next/image";
import TopBar from "@/components/top-bar";
import { TFields, TSection } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import CTA from "@/components/cta";

type TProps = {
  hero: {
    heading: string;
    subheading: string;
    imageUrl: string;
  };
  colors: {
    primary: string;
    secondary: string;
  };
  cta: {
    text: string;
    link: string;
  };
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
};

const EditableHero = (props: TProps) => {
  const {
    hero,
    colors,
    cta,
    setIsOpen,
    setSection,
    editable,
    setFocusedField,
  } = props;
  return (
    <div
      className={`-m-8 mb-10 flex flex-wrap ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
      onClick={() => {
        if (editable && setIsOpen && setSection) {
          setSection("Hero");
          setIsOpen(true);
        }
      }}
    >
      <div className="w-full p-8 md:w-1/2">
        <div className="md:max-w-lg">
          <h2
            className={`font-heading mb-6 text-4xl font-black tracking-tight text-gray-300 md:text-5xl ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
            style={{ color: colors.primary }}
            onClick={() => {
              if (editable && setIsOpen && setSection && setFocusedField) {
                setSection("Hero");
                setIsOpen(true);
                setFocusedField("heading");
              }
            }}
          >
            {hero.heading}
          </h2>
          <p
            className={`mb-8 text-xl font-bold ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
            onClick={() => {
              if (editable && setIsOpen && setSection && setFocusedField) {
                setSection("Hero");
                setIsOpen(true);
                setFocusedField("subheading");
              }
            }}
          >
            {hero.subheading}
          </p>
          <div className="-m-2 flex flex-wrap">
            <div
              className={`w-full p-2 md:w-auto ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
              onClick={() => {
                if (editable && setIsOpen && setSection && setFocusedField) {
                  setSection("Hero");
                  setIsOpen(true);
                  setFocusedField("cta");
                }
              }}
            >
              <CTA
                text={cta.text}
                bgColor={colors.secondary}
                link={editable ? "#" : cta.link}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`w-full p-8 md:w-1/2  `}>
        <Image
          src={hero.imageUrl}
          width={256}
          height={256}
          alt="Hero Image"
          className={`mx-auto rounded-3xl object-contain md:mr-0 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
          onClick={() => {
            if (editable && setIsOpen && setSection && setFocusedField) {
              setSection("Hero");
              setIsOpen(true);
              setFocusedField("imageUrl");
            }
          }}
        />
      </div>
    </div>
  );
};

export default EditableHero;
