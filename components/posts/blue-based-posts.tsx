"use client";

import { Dispatch, SetStateAction, useEffect, useId, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { Container } from "@/components/container";
import { TColors, TFields, TPosts, TSection } from "@/types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { BROKEN_IMAGE } from "@/lib/utils/common-constant";

function ImageClipPaths({
  id,
  ...props
}: React.ComponentPropsWithoutRef<"svg"> & { id: string }) {
  return (
    <svg aria-hidden="true" width={0} height={0} {...props}>
      <defs>
        <clipPath id={`${id}-0`} clipPathUnits="objectBoundingBox">
          <path d="M0,0 h0.729 v0.129 h0.121 l-0.016,0.032 C0.815,0.198,0.843,0.243,0.885,0.243 H1 v0.757 H0.271 v-0.086 l-0.121,0.057 v-0.214 c0,-0.032,-0.026,-0.057,-0.057,-0.057 H0 V0" />
        </clipPath>
        <clipPath id={`${id}-1`} clipPathUnits="objectBoundingBox">
          <path d="M1,1 H0.271 v-0.129 H0.15 l0.016,-0.032 C0.185,0.802,0.157,0.757,0.115,0.757 H0 V0 h0.729 v0.086 l0.121,-0.057 v0.214 c0,0.032,0.026,0.057,0.057,0.057 h0.093 v0.7" />
        </clipPath>
        <clipPath id={`${id}-2`} clipPathUnits="objectBoundingBox">
          <path d="M1,0 H0.271 v0.129 H0.15 l0.016,0.032 C0.185,0.198,0.157,0.243,0.115,0.243 H0 v0.757 h0.729 v-0.086 l0.121,0.057 v-0.214 c0,-0.032,0.026,-0.057,0.057,-0.057 h0.093 V0" />
        </clipPath>
      </defs>
    </svg>
  );
}

type TProps = {
  posts: TPosts;
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

export function Posts(props: TProps) {
  const {
    posts,
    colors,
    editable,
    setFocusedField,
    setIsOpen,
    setSection,
    setShowForm,
    showForm,
  } = props;
  let id = useId();
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
  return (
    <section
      id="speakers"
      aria-labelledby="speakers-title"
      className="py-20 sm:py-32"
    >
      <ImageClipPaths id={id} />
      <Container
        className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500"} flex`}
        onClick={() => {
          if (setIsOpen && setSection && setShowForm) {
            setIsOpen(true);
            setSection("Posts");
            setShowForm({
              form: "",
              edit: "",
              show: false,
            });
            dispatch(
              updateAppState({
                ...appState,
                openedSlide: "Customize",
              }),
            );
          }
        }}
      >
        <div className="mt-14 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:mt-16 sm:gap-y-16 lg:mt-24 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <div
              className={`ui-not-focus-visible:outline-none grid  gap-x-8 gap-y-10 sm:gap-y-16  ${appState.view === "Tablet" && "grid-cols-2"}   ${appState.view === "Mobile" && "grid-cols-1"} ${appState.view === "Desktop" && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"} `}
            >
              {appState?.iPosts?.show &&
                posts.list?.map(
                  (data, i) =>
                    posts.limit > i && (
                      <div key={data.id}>
                        <div className="rounded-4xl group relative h-96 transform overflow-hidden">
                          <div
                            className={clsx(
                              "rounded-4xl absolute bottom-6 left-0 right-4 top-0 border transition duration-300 group-hover:scale-95 xl:right-6",
                              [
                                "border-blue-300",
                                "border-indigo-300",
                                "border-sky-300",
                              ][i % 3],
                            )}
                          />
                          <div
                            className="absolute inset-0 bg-indigo-50"
                            style={{ clipPath: `url(#${id}-${i % 3})` }}
                          >
                            <Image
                              className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110"
                              src={data.media_url || BROKEN_IMAGE}
                              alt=""
                              priority
                              sizes="(min-width: 1280px) 17.5rem, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                              height={400}
                              width={400}
                            />
                          </div>
                        </div>

                        <p className="mt-1 text-base tracking-tight text-slate-500">
                          {data.caption}
                        </p>
                      </div>
                    ),
                )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
