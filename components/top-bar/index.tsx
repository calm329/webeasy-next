import Link from "next/link";
import CTA from "../cta";
import { Dispatch, SetStateAction } from "react";
import { TBanner, TColors, TFields, TSection } from "@/types";
import Image from "next/image";

type TopBarProps = {
  banner: TBanner;
  colors: TColors;

  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setShowButtonForm?:React.Dispatch<React.SetStateAction<{
    edit:string,
    show: boolean,
  }>>;
};

export default function TopBar(props: TopBarProps) {
  const {
    banner,

    colors,
    setShowButtonForm,
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
            {banner.logo && editable
              ? banner.logo.show && (
                  <Image
                    src={banner.logo.link}
                    alt={banner.logo.alt}
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
                )
              : banner.logo && (
                  <Image
                    src={banner.logo.link}
                    alt={banner.logo.alt}
                    className={`h-8 w-auto `}
                    height={32}
                    width={200}
                  />
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
                {banner.businessName}
              </Link>
            ) : (
              <Link href="#">{banner.businessName}</Link>
            )}
          </div>
        </div>
      </div>
      <div className="w-auto">
        <div className="flex flex-wrap items-center">
          <div className="w-auto lg:block">
            <div className="-m-2 flex flex-wrap">
              {editable ? (
                banner.button.show && (
                  <div
                    className={`w-full p-2 md:w-auto ${editable && "rounded border-2 border-transparent hover:border-indigo-500 flex gap-5"}`}
                    onClick={() => {
                      if (setIsOpen && setSection && setFocusedField) {
                        setSection("Banner");
                        setIsOpen(true);
                        setFocusedField("cta");
                      }
                    }}
                  >
                    {banner.button.list.map((data, i) => (
                      <div key={i} onClick={()=>setShowButtonForm && setShowButtonForm({
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
                )
              ) : (
                <div className={`w-full p-2 md:w-auto flex gap-5`}>
                  {banner.button.list.map((data, i) => (
                    <div key={i}>
                      <CTA
                        text={data.label}
                        bgColor={colors.secondary}
                        link={editable ? "#" : data.value}
                        external={data.type === "External"}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
