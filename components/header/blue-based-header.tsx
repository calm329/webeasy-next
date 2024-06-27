import Image from "next/image";
import { Button } from "../ui/button/template-button";
import { Container } from "../container";
import { TBanner, TColors, TFields, TSection } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Skeleton } from "@/components/ui/skeleton";

type TProps = {
  banner: TBanner;
  colors: TColors;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
  showForm?: {
    form: string;
    edit: string;
    show: boolean;
  };
  setShowForm?: React.Dispatch<
    React.SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
};

export function Header(props: TProps) {
  const { banner, colors, editable, setIsOpen, setSection, setShowForm } =
    props;
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
  return (
    <header className={`z-1 relative flex-none lg:pt-20  `}>
      {banner ? (
        <Container
          className={`flex flex-wrap items-center justify-center gap-10 max-sm:flex-col sm:justify-between lg:flex-nowrap  ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
          style={{ color: colors?.primary }}
          onClick={() => {
            if (editable && setIsOpen && setSection && setShowForm) {
              setSection("Banner");
              setIsOpen(true);
              setShowForm({
                show: false,
                edit: "",
                form: "",
              });
              dispatch(
                updateAppState({ ...appState, openedSlide: "Customize" }),
              );
            }
          }}
        >
          <div
            className={`mt-10 flex items-center  gap-2 text-xl lg:mt-0 lg:grow lg:basis-0 `}
          >
            {banner?.logo?.link ? (
              banner?.logo?.show && (
                <Image
                  src={banner.logo.link ?? ""}
                  alt={banner.logo.alt ?? ""}
                  height={100}
                  width={100}
                  className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                  onClick={() => {
                    if (setIsOpen && setSection && setShowForm) {
                      setSection("Banner");
                      setIsOpen(true);
                      // setFocusedField("logo");
                      setShowForm({
                        form: "",
                        edit: "",
                        show: false,
                      });
                    }
                  }}
                />
              )
            ) : (
              <Skeleton className="h-[100px] w-[100px] bg-gray-400" />
            )}

            <span
              className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
              onClick={(e) => {
                e.stopPropagation();
                if (setIsOpen && setSection && setShowForm) {
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
              {banner?.businessName || (
                <Skeleton className="h-14 w-full bg-gray-400" />
              )}
            </span>
          </div>
          {banner.button ? (
            banner?.button?.show && (
              <div
                className={`sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end `}
              >
                <div
                  className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500"} flex gap-5`}
                  onClick={() => {
                    if (setIsOpen && setSection) {
                      setSection("Banner");
                      setIsOpen(true);
                    }
                  }}
                >
                  {banner?.button?.list.map((data, i) => (
                    <div key={i}>
                      <Button
                        href={data.link ?? "#"}
                        text={data.label}
                        bgColor={colors?.secondary}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : (
            <>
              <Skeleton className="h-14 w-44 bg-gray-400" />
            </>
          )}
        </Container>
      ) : (
        <Container
          className={`flex flex-wrap items-center justify-center gap-10 max-sm:flex-col sm:justify-between lg:flex-nowrap`}
        >
          <div
            className={`mt-10 flex items-center  gap-2 text-xl lg:mt-0 lg:grow lg:basis-0 `}
          >
            <Skeleton className="h-[100px] w-[100px] bg-gray-400" />
            <span>
              <Skeleton className="h-10 w-44 bg-gray-400" />
            </span>
          </div>
          <div
            className={`sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end `}
          >
            <div className="flex gap-5">
              <Skeleton className="h-14 w-44 bg-gray-400" />
            </div>
          </div>
        </Container>
      )}
    </header>
  );
}
