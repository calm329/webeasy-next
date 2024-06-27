"use client";

import Link from "next/link";

import { Button } from "../ui/button/template-button";
import Image from "next/image";
import { Container } from "@/components/container";
import { TBanner, TColors, TSection } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

type TProps = {
  banner: TBanner;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  editable?: boolean;
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
  colors: TColors;
};

export function Header(props: TProps) {
  const {
    banner,
    colors,
    editable,
    setIsOpen,
    setSection,
    setShowForm,
    showForm,
  } = props;
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
  return (
    <header className="py-10">
      <Container>
        <nav
          className={`z-1 relative flex items-center justify-between gap-10 max-sm:flex-col ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
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
            className="flex items-center md:gap-x-12 "
            style={{ color: colors?.primary }}
          >
            <Link
              href="#"
              aria-label="Home"
              className="flex items-center gap-5"
            >
              {banner?.logo?.show && (
                <Image
                  src={banner?.logo?.link ?? ""}
                  alt={banner?.logo?.alt ?? ""}
                  height={100}
                  width={100}
                />
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
                {banner?.businessName}
              </span>
            </Link>
          </div>
          {banner?.button?.show && (
            <div
              className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500"} flex items-center gap-x-5 md:gap-x-8`}
              onClick={() => {
                if (setIsOpen && setSection) {
                  setSection("Banner");
                  setIsOpen(true);
                }
              }}
            >
              {banner?.button?.list?.map((data, i) => (
                <div key={i}>
                  <Button
                    href={data.link ?? "#"}
                    text={data.label}
                    bgColor={colors?.secondary}
                  />
                </div>
              ))}
              <div className="-mr-1 md:hidden">
                {/* <MobileNavigation /> */}
              </div>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}
