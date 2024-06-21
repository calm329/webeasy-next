import Link from "next/link";
import CTA from "../cta";
import { Dispatch, SetStateAction } from "react";
import { TBanner, TColors, TFields, TSection } from "@/types";
import Image from "next/image";
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Skeleton } from "../ui/skeleton";
import TypewriterEffect from "../typewriter-effect";

type TopBarProps = {
  banner: TBanner;
  colors: TColors;

  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setShowForm?: React.Dispatch<
    React.SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
};

export default function TopBar(props: TopBarProps) {
  const {
    banner,

    colors,
    setShowForm,
    editable,
    setFocusedField,
    setIsOpen,
    setSection,
  } = props;
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
  return (
    <div className="flex flex-wrap items-center justify-between gap-5 rounded-full border border-gray-100 bg-gray-100 px-6 py-3.5 max-sm:flex-col max-sm:gap-5">
      <div
        className={`w-auto max-sm:mx-auto ${appState.view === "Mobile" && "mx-auto"}`}
      >
        <div className="flex flex-wrap items-center">
          <div
            className="text-black-300 flex w-auto items-center gap-2 text-xl font-medium"
            style={{ color: colors?.primary }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {banner.logo ? (
              editable ? (
                banner.logo.show && (
                  <Image
                    src={banner.logo.link}
                    alt={banner.logo.alt}
                    className={`h-8 w-auto ${editable && "border-2 border-transparent hover:border-indigo-500 "} `}
                    onClick={() => {
                      if (
                        setIsOpen &&
                        setSection &&
                        setFocusedField &&
                        setShowForm
                      ) {
                        setSection("Banner");
                        setIsOpen(true);
                        setFocusedField("logo");
                        setShowForm({
                          form: "",
                          edit: "",
                          show: false,
                        });
                      }
                    }}
                    height={32}
                    width={200}
                  />
                )
              ) : (
                banner.logo && (
                  <Image
                    src={banner.logo.link}
                    alt={banner.logo.alt}
                    className={`h-8 w-auto `}
                    height={32}
                    width={200}
                  />
                )
              )
            ) : (
              <Skeleton className="h-8 w-8 bg-white" />
            )}

            {banner.businessName ? (
              editable ? (
                <button
                  className={` ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      setIsOpen &&
                      setSection &&
                      setFocusedField &&
                      setShowForm
                    ) {
                      setSection("Banner");
                      setIsOpen(true);
                      setShowForm({
                        form: "",
                        edit: "",
                        show: false,
                      });
                      dispatch(
                        updateAppState({
                          ...appState,
                          focusedField: "businessName",
                          openedSlide: "Customize",
                        }),
                      );
                    }
                  }}
                >
                  {banner.businessName}
                </button>
              ) : (
                <Link href="#">
                  {appState.generate.generating ? (
                    <TypewriterEffect text={banner.businessName ?? ""} />
                  ) : (
                    banner.businessName
                  )}
                </Link>
              )
            ) : (
              <Skeleton className="h-10 w-40 bg-white" />
            )}
          </div>
        </div>
      </div>
      <div
        className={`w-auto max-sm:mx-auto ${appState.view === "Mobile" && "mx-auto"}`}
      >
        <div className="flex flex-wrap items-center">
          <div className="w-auto lg:block">
            <div className="-m-2 flex flex-wrap">
              {banner.button ? (
                editable ? (
                  banner.button.show && (
                    <div
                      className={`w-full p-2 md:w-auto ${editable && "flex gap-5 rounded border-2 border-transparent hover:border-indigo-500"}`}
                      onClick={() => {
                        if (setIsOpen && setSection && setFocusedField) {
                          setSection("Banner");
                          setIsOpen(true);
                          setFocusedField("cta");
                        }
                      }}
                    >
                      {banner.button.list.map((data, i) => (
                        <div
                          key={i}
                          onClick={() =>
                            setShowForm &&
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
                            external={
                              editable ? false : data.type === "External"
                            }
                            appState={appState}
                          />
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <div className={`flex w-full gap-5 p-2 md:w-auto`}>
                    {banner.button.list.map((data, i) => (
                      <div key={i}>
                        <CTA
                          text={data.label}
                          bgColor={colors?.secondary}
                          link={editable ? "#" : data.link ?? ""}
                          external={data.type === "External"}
                        />
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className={`flex w-full gap-5 p-2 md:w-auto`}>
                  <button className="block w-full rounded-full px-8 text-center">
                    <Skeleton className="h-12 w-40 bg-white" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
