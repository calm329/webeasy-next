"use client";

import { Dispatch, SetStateAction, useId } from "react";
import Image, { type ImageProps } from "next/image";
// import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";
import { Container } from "@/components/container";
import { TColors, TSection } from "@/types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";

type TProps = {
  services: any[];
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
  // colors:TColors
};

export function Services(props: TProps) {
  const { services, editable, setIsOpen, setSection, setShowForm, showForm } =
    props;
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
  return (
    <section
      id="secondary-features"
      aria-label="Features for simplifying everyday business tasks"
      className="pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32"
    >
      <Container
        className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
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
            <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
              {services?.map((data) => (
                <div
                  key={data.name}
                  className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                  onClick={(e) => {
                    setShowForm &&
                      setShowForm({
                        edit: data.id,
                        form: "Service",
                        show: true,
                      });
                  }}
                >
                  <div className={``}>
                    <div
                      className={clsx(
                        "flex w-9 justify-center rounded-lg",
                        "bg-slate-500",
                      )}
                    >
                      <svg
                        fill="none"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        color="#F7B886"
                      >
                        <path
                          d="M14 16C14 17.77 13.23 19.37 12 20.46C10.94 21.42 9.54 22 8 22C4.69 22 2 19.31 2 16C2 13.9753 3.01397 12.1814 4.5554 11.0973C4.80358 10.9228 5.1393 11.0422 5.27324 11.3145C6.21715 13.2332 7.95419 14.6699 10.02 15.23C10.65 15.41 11.31 15.5 12 15.5C12.4872 15.5 12.9539 15.4538 13.4074 15.3687C13.6958 15.3147 13.9828 15.4995 13.9955 15.7926C13.9985 15.8621 14 15.9314 14 16Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                        ></path>
                        <path
                          d="M18 8C18 8.78 17.85 9.53 17.58 10.21C16.89 11.95 15.41 13.29 13.58 13.79C13.08 13.93 12.55 14 12 14C11.45 14 10.92 13.93 10.42 13.79C8.59 13.29 7.11 11.95 6.42 10.21C6.15 9.53 6 8.78 6 8C6 4.69 8.69 2 12 2C15.31 2 18 4.69 18 8Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                        ></path>
                        <path
                          d="M22 16C22 19.31 19.31 22 16 22C15.2555 22 14.5393 21.8643 13.8811 21.6141C13.5624 21.4929 13.503 21.0851 13.7248 20.8262C14.8668 19.4938 15.5 17.786 15.5 16C15.5 15.66 15.47 15.32 15.42 15C15.3902 14.8155 15.4844 14.6342 15.6478 14.5437C16.9719 13.8107 18.0532 12.6876 18.727 11.3153C18.8609 11.0427 19.1968 10.923 19.4452 11.0978C20.9863 12.1818 22 13.9755 22 16Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <h3
                      className={clsx(
                        "mt-6 text-sm font-medium",
                        "text-slate-600",
                      )}
                    >
                      {data?.name}
                    </h3>
                    <p className="mt-4 text-sm text-slate-600  ">
                      {data?.description}
                    </p>
                  </div>
                  <div className="relative mt-10 pb-10">
                    <div className="absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6" />
                    <div className="relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10"></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {appState?.aiContent?.services?.show && (
          <div className="hidden lg:mt-20 lg:block">
            <div className="grid grid-cols-2  gap-10 ">
              {services?.map((data, featureIndex) => (
                <div
                  className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                  key={featureIndex}
                  onClick={(e) => {
                    setShowForm &&
                      setShowForm({
                        edit: data.id,
                        form: "Service",
                        show: true,
                      });
                  }}
                >
                  <div
                    className={clsx(
                      "flex w-9 justify-center rounded-lg",
                      "bg-slate-500",
                    )}
                  >
                    <svg
                      fill="none"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      color="#F7B886"
                    >
                      <path
                        d="M14 16C14 17.77 13.23 19.37 12 20.46C10.94 21.42 9.54 22 8 22C4.69 22 2 19.31 2 16C2 13.9753 3.01397 12.1814 4.5554 11.0973C4.80358 10.9228 5.1393 11.0422 5.27324 11.3145C6.21715 13.2332 7.95419 14.6699 10.02 15.23C10.65 15.41 11.31 15.5 12 15.5C12.4872 15.5 12.9539 15.4538 13.4074 15.3687C13.6958 15.3147 13.9828 15.4995 13.9955 15.7926C13.9985 15.8621 14 15.9314 14 16Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                      ></path>
                      <path
                        d="M18 8C18 8.78 17.85 9.53 17.58 10.21C16.89 11.95 15.41 13.29 13.58 13.79C13.08 13.93 12.55 14 12 14C11.45 14 10.92 13.93 10.42 13.79C8.59 13.29 7.11 11.95 6.42 10.21C6.15 9.53 6 8.78 6 8C6 4.69 8.69 2 12 2C15.31 2 18 4.69 18 8Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                      ></path>
                      <path
                        d="M22 16C22 19.31 19.31 22 16 22C15.2555 22 14.5393 21.8643 13.8811 21.6141C13.5624 21.4929 13.503 21.0851 13.7248 20.8262C14.8668 19.4938 15.5 17.786 15.5 16C15.5 15.66 15.47 15.32 15.42 15C15.3902 14.8155 15.4844 14.6342 15.6478 14.5437C16.9719 13.8107 18.0532 12.6876 18.727 11.3153C18.8609 11.0427 19.1968 10.923 19.4452 11.0978C20.9863 12.1818 22 13.9755 22 16Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <h3
                    className={clsx(
                      "mt-6 text-sm font-medium",
                      "text-slate-600",
                    )}
                  >
                    {data?.name}
                  </h3>
                  <p className="mt-4 text-sm text-slate-600">
                    {data?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
