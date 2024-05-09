import Link from "next/link";
import CTA from "./cta";
import { Dispatch, SetStateAction } from "react";
import { TFields, TSection } from "@/types";
import Image from "next/image";

type TopBarProps = {
  logo: string;
  businessName: string;
  colors: {
    primary: string;
    secondary: string;
  };
  cta: {
    text: string;
    link: string;
    external?: boolean;
  };
  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
};

export default function TopBar(props: TopBarProps) {
  const {
    logo,
    businessName,
    colors,
    cta,
    editable,
    setFocusedField,
    setIsOpen,
    setSection,
  } = props;
  return (
    <div className="flex items-center justify-between rounded-full border border-gray-100 bg-gray-100 px-6 py-3.5 max-sm:flex-col max-sm:gap-5">
      <div className="w-auto">
        <div className="flex flex-wrap items-center">
          <div
            className="text-black-300 flex w-auto items-center gap-2 text-xl font-medium"
            style={{ color: colors.primary }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {logo && editable ? (
              <Image
                src={logo}
                alt="logo"
                className={`h-8 w-auto ${editable && "border-2 border-transparent hover:border-indigo-500 "} `}
                onClick={() => {
                  if (setIsOpen && setSection && setFocusedField) {
                    setSection("Banner");
                    setIsOpen(true);
                    setFocusedField("logo");
                  }
                }}
                height={32}
                width={200}
              />
            ) : (
              logo && (
                <Image
                  src={logo}
                  alt="logo"
                  className={`h-8 w-auto `}
                  height={32}
                  width={200}
                />
              )
            )}
            {editable ? (
              <Link
                href="#"
                className={` ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                onClick={() => {
                  if (setIsOpen && setSection && setFocusedField) {
                    setSection("Banner");
                    setIsOpen(true);
                    setFocusedField("businessName");
                  }
                }}
              >
                {businessName}
              </Link>
            ) : (
              <Link href="#">{businessName}</Link>
            )}
          </div>
        </div>
      </div>
      <div className="w-auto">
        <div className="flex flex-wrap items-center">
          <div className="w-auto lg:block">
            <div className="-m-2 flex flex-wrap">
              {editable ? (
                <div
                  className={`w-full p-2 md:w-auto ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                  onClick={() => {
                    if (setIsOpen && setSection && setFocusedField) {
                      setSection("Banner");
                      setIsOpen(true);
                      setFocusedField("cta");
                    }
                  }}
                >
                  <CTA
                    text={cta.text}
                    bgColor={colors.secondary}
                    link={editable ? "#" : cta.link}
                    external={cta.external}
                  />
                </div>
              ) : (
                <div className={`w-full p-2 md:w-auto`}>
                  <CTA
                    text={cta.text}
                    bgColor={colors.secondary}
                    link={editable ? "#" : cta.link}
                    external={cta.external}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
