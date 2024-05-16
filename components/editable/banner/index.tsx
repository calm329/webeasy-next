import TopBar from "@/components/top-bar";
import { TFields, TSection } from "@/types";
import React, { Dispatch, SetStateAction } from "react";

type TProps = {
  logo?: {
    link: string;
    alt: string;
  };
  businessName: string;
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

const EditableBanner = (props: TProps) => {
  const {
    logo,
    businessName,
    colors,
    cta,
    setIsOpen,
    setSection,
    editable,
    setFocusedField,
  } = props;
  return (
    <div
      className={`container mx-auto px-4 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
      onClick={() => {
        if (editable && setIsOpen && setSection) {
          setSection("Banner");
          setIsOpen(true);
        }
      }}
    >
      <TopBar
        logo={logo!}
        businessName={businessName}
        colors={colors}
        cta={cta}
        editable={editable}
        setFocusedField={setFocusedField}
        setSection={setSection}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default EditableBanner;
