import Image, { type ImageProps } from "next/image";
import clsx from "clsx";

import { Button } from "@/components/ui/button/template-button";
import { Card } from "@/components/ui/card/general-card";
import { Container } from "@/components/container/nested-container";
import { Header } from "@/components/header/general-header";
import { Dispatch, SetStateAction } from "react";
import { TBanner, TColors, TFields, THero, TPosts, TSection } from "@/types";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Skeleton } from "@/components/ui/skeleton";

type TPostProps = {
  posts: TPosts;
};

type TProps = {
  hero: THero;
  banner: TBanner;
  colors: TColors;
  services: any[];
  posts: TPosts;
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

export default function General(props: TProps) {
  const {
    banner,
    hero,
    colors,
    services,
    posts,
    setIsOpen,
    setSection,
    editable,
    setFocusedField,
    showForm,
    setShowForm,
  } = props;
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`relative flex w-full flex-col  px-5 ${appState.view === "Desktop" && "mx-auto max-w-7xl"}`}
    >
      <Header
        banner={banner}
        colors={colors}
        editable={editable}
        setIsOpen={setIsOpen}
        setSection={setSection}
        setShowForm={setShowForm}
        showForm={showForm}
      />
      <main className="mt-24 flex flex-col gap-10 ">
        <div className={`flex w-full`}>
          <div
            className={`flex justify-center gap-10 max-lg:flex-col ${editable && "mb-20 rounded border-2 border-transparent hover:border-indigo-500"} ${appState.view === "Tablet" || (appState.view === "Mobile" && "flex-col items-center justify-center")}`}
            onClick={() => {
              if (editable && setIsOpen && setSection && setShowForm) {
                setSection("Hero");
                setIsOpen(true);
                dispatch(
                  updateAppState({ ...appState, openedSlide: "Customize" }),
                );
                setShowForm({
                  show: false,
                  edit: "",
                  form: "",
                });
              }
            }}
          >
            <div className="w-full">
              <h1
                className={`text-4xl  font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                style={{ color: colors?.primary }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (editable && setIsOpen && setSection && setShowForm) {
                    setSection("Hero");
                    setIsOpen(true);
                    setShowForm({
                      form: "",
                      edit: "",
                      show: false,
                    });
                    dispatch(
                      updateAppState({
                        ...appState,
                        focusedField: "heading",
                        openedSlide: "Customize",
                      }),
                    );
                  }
                }}
              >
                {hero?.heading || (
                  <Skeleton className="h-14 w-full bg-gray-400" />
                )}
              </h1>
              <p
                className={`mt-6 text-base text-zinc-600 dark:text-zinc-400 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (editable && setIsOpen && setSection && setShowForm) {
                    setSection("Hero");
                    setIsOpen(true);
                    setShowForm({
                      form: "",
                      edit: "",
                      show: false,
                    });
                    dispatch(
                      updateAppState({
                        ...appState,
                        focusedField: "subheading",
                        openedSlide: "Customize",
                      }),
                    );
                  }
                }}
              >
                {hero?.subheading || (
                  <Skeleton className="h-8 w-full bg-gray-400" />
                )}
              </p>
              <div>
                {hero?.button?.list ? (
                  hero?.button?.show && (
                    <div
                      className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                      onClick={() => {
                        if (editable && setIsOpen && setSection) {
                          setSection("Hero");
                          setIsOpen(true);
                        }
                      }}
                    >
                      {hero?.button?.list?.map((data, i) => (
                        <div key={i}>
                          <Button
                            href={data.link ?? "#"}
                            text={data.label}
                            bgColor={colors?.secondary}
                            className="mt-10  "
                          />
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <>
                    <Skeleton className="h-16 w-full bg-gray-400" />
                  </>
                )}
              </div>
            </div>

            {hero?.image?.imageUrl ? (
              hero?.image?.show && (
                <div>
                  <Image
                    src={hero?.image?.imageUrl}
                    alt=""
                    height={400}
                    width={300}
                    className={`mt-5 rounded-lg object-contain drop-shadow max-lg:mx-auto ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                    onClick={() => {
                      if (editable && setIsOpen && setSection && setShowForm) {
                        setSection("Hero");
                        setIsOpen(true);
                        setShowForm({
                          form: "",
                          edit: "",
                          show: false,
                        });
                      }
                    }}
                  />
                </div>
              )
            ) : (
              <Skeleton className="h-[400px]  w-[300px] bg-gray-400" />
            )}
          </div>
        </div>
        <div className="my-24 md:mt-28">
          <div
            className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500 "} mx-auto  gap-y-20 lg:max-w-none lg:grid-cols-2`}
            onClick={() => {
              if (setIsOpen && setSection) {
                setIsOpen(true);
                setSection("Services");
                dispatch(
                  updateAppState({
                    ...appState,
                    openedSlide: "Customize",
                  }),
                );
              }
            }}
          >
            {appState?.aiContent?.services?.show && (
              <>
                <div className="mx-auto mb-5 flex flex-col gap-3 border-b-2 border-gray-400 pb-5 text-center">
                  <h1
                    className={`text-3xl font-bold ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (editable && setIsOpen && setSection && setShowForm) {
                        setSection("Services");
                        setIsOpen(true);
                        setShowForm({
                          form: "",
                          edit: "",
                          show: false,
                        });
                        dispatch(
                          updateAppState({
                            ...appState,
                            focusedField: "title",
                            openedSlide: "Customize",
                          }),
                        );
                      }
                    }}
                  >
                    {appState?.aiContent?.services.title}
                  </h1>
                  <p
                    className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500"}  `}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (editable && setIsOpen && setSection && setShowForm) {
                        setSection("Services");
                        setIsOpen(true);
                        setShowForm({
                          form: "",
                          edit: "",
                          show: false,
                        });
                        dispatch(
                          updateAppState({
                            ...appState,
                            focusedField: "description",
                            openedSlide: "Customize",
                          }),
                        );
                      }
                    }}
                  >
                    {appState?.aiContent?.services.description}
                  </p>
                </div>
                <div className="flex  flex-wrap justify-center gap-10">
                  {services?.map((data) => (
                    <div
                      className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500 "} max-w-96`}
                      onClick={() => {
                        setShowForm &&
                          setShowForm({
                            edit: data.id,
                            form: "Service",
                            show: true,
                          });
                      }}
                      key={data.id}
                    >
                      <Card.Title>{data.name}</Card.Title>
                      <Card.Description>
                        <p className=" ">{data.description}</p>
                      </Card.Description>
                    </div>
                  ))}

                  {!appState.generate.generating &&
                    Array.from({ length: 6 })?.map(
                      (_, i) =>
                        (services?.length ?? 0) < i && (
                          <div className={`w-96 max-w-96`} key={i}>
                            <Card.Title>
                              <Skeleton className="h-10 w-full bg-gray-400" />
                            </Card.Title>
                            <Card.Description>
                              <Skeleton className="h-8 w-full bg-gray-400" />
                            </Card.Description>
                          </div>
                        ),
                    )}
                </div>
              </>
            )}
          </div>
        </div>
        <div>
          <div
            className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500 "} "mt-16 my-20" sm:mt-20`}
            onClick={() => {
              if (setIsOpen && setSection && setShowForm) {
                setIsOpen(true);
                setSection("Posts");
                dispatch(
                  updateAppState({
                    ...appState,
                    openedSlide: "Customize",
                  }),
                );
                setShowForm({
                  form: "",
                  edit: "",
                  show: false,
                });
              }
            }}
          >
            {appState?.iPosts?.show && (
              <div className="my flex flex-wrap justify-center gap-10 overflow-hidden py-4 ">
                {posts?.list?.map(
                  (data, i) =>
                    posts?.limit > i && (
                      <div className={`flex w-96 flex-col `} key={data.id}>
                        <div
                          className={clsx(
                            "relative aspect-[9/10] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl",
                          )}
                        >
                          <Image
                            src={data.media_url}
                            alt=""
                            className=" inset-0 h-full w-full object-cover"
                            height={300}
                            width={300}
                          />
                        </div>

                        <p>{data.caption}</p>
                      </div>
                    ),
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
