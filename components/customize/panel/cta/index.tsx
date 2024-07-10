import React, { useEffect, useRef, useState } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { FiLink } from "react-icons/fi";
import { MdModeEditOutline, MdDeleteForever } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { Switch } from "@/components/ui/switch";
import { ImPower, ImSpinner2 } from "react-icons/im";
import Uploader from "@/components/ui/form/uploader";
import { DebouncedState } from "usehooks-ts";
import { FormField, TFields, TSection } from "@/types";
import CustomButton from "@/components/ui/form/custom-button";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateZodSchema } from "@/lib/utils";
import { updateSite } from "@/lib/actions";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";
import { BsThreeDotsVertical } from "react-icons/bs";
import RegenerateOptions from "@/components/regenerate-options";
import {
  regenerateHeroImage,
  regenerateIndividual,
} from "@/lib/utils/function";
import { useSearchParams } from "next/navigation";
type TProps = {
  section: TSection;
  handleChange: (name: string, value: string) => void;
  subdomain: string;
  setShowForm: React.Dispatch<
    React.SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
};

const CtaContent = (props: TProps) => {
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();
  const { section, handleChange, subdomain, setShowForm } = props;
  const [loadingHeading, setLoadingHeading] = useState(false);
  const [loadingSubHeading, setLoadingSubHeading] = useState(false);

  const [type, setType] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    if (appState.focusedField === "title") {
      inputRef.current?.focus();
    }

    if (appState.focusedField === "description") {
      textareaRef.current?.focus();
    }
  }, [appState]);

  return (
    <div className="h-[55vh] max-h-[600px]  overflow-y-auto py-5 transition-all ease-in-out">
      <form action="" className="flex flex-col gap-5 px-4 sm:px-6">
        {appState.aiContent?.cta &&
          Object.keys(appState.aiContent?.cta).map((data) => (
            <>
              {(() => {
                switch (data) {
                  case "title":
                    return (
                      <div className="flex flex-col border-t pt-5">
                        <div className="flex  justify-between text-sm font-medium leading-6 text-gray-900">
                          <label htmlFor={data} className="my-auto">
                            {data}
                          </label>
                          {/* <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                             
                                setLoadingHeading(true);
                                regenerateIndividual({
                                  appState,
                                  dispatch,
                                  searchParams,
                                  fieldName: data,
                                  type,
                                }).then(() => {
                                  setLoadingHeading(false);
                                });
                              }}
                              className="flex items-center gap-2 "
                            >
                              Regenerate
                              {loadingHeading ? (
                                <ImSpinner2 className="animate-spin text-lg text-black" />
                              ) : (
                                <ImPower className=" text-xs " />
                              )}
                            </button>
                            <RegenerateOptions setType={setType} type={type} />
                          </div> */}
                        </div>

                        <input
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          id={data}
                          placeholder={"Enter Title..."}
                          onChange={(e) => {
                            dispatch(
                              updateAppState({
                                ...appState,
                                aiContent: {
                                  ...appState.aiContent,
                                  cta: {
                                    ...appState.aiContent?.cta,
                                    [data]: e.target.value,
                                  },
                                },
                              }),
                            );
                          }}
                          ref={inputRef}
                          value={appState.aiContent?.cta?.title}
                        />
                      </div>
                    );

                  case "button":
                    return (
                      <div>
                        <h1>{data}</h1>
                        <div className="flex flex-col border-t pt-5">
                          <div className="flex  justify-between text-sm font-medium leading-6 text-gray-900">
                            <label htmlFor={"button-label"} className="my-auto">
                              Label
                            </label>
                          </div>

                          <input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id={"button-label"}
                            placeholder={"Enter Label..."}
                            onChange={(e) => {
                              dispatch(
                                updateAppState({
                                  ...appState,
                                  aiContent: {
                                    ...appState.aiContent,
                                    cta: {
                                      ...appState.aiContent?.cta,
                                      [data]: {
                                        ...appState.aiContent?.cta[data],
                                        label: e.target.value,
                                      },
                                    },
                                  },
                                }),
                              );
                            }}
                            
                            value={appState.aiContent?.cta?.button?.label}
                          />
                        </div>
                        <div className="flex flex-col border-t pt-5">
                          <div className="flex  justify-between text-sm font-medium leading-6 text-gray-900">
                            <label htmlFor={"button-link"} className="my-auto">
                              Link
                            </label>
                          </div>

                          <input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id={"button-link"}
                            placeholder={"Enter Link..."}
                            onChange={(e) => {
                              dispatch(
                                updateAppState({
                                  ...appState,
                                  aiContent: {
                                    ...appState.aiContent,
                                    cta: {
                                      ...appState.aiContent?.cta,
                                      [data]: {
                                        ...appState.aiContent?.cta[data],
                                        link: e.target.value,
                                      },
                                    },
                                  },
                                }),
                              );
                            }}
                            
                            value={appState.aiContent?.cta?.button?.link}
                          />
                        </div>
                      </div>
                    );

                    case "link":
                      return (
                        <div>
                          <h1>{data}</h1>
                          <div className="flex flex-col border-t pt-5">
                            <div className="flex  justify-between text-sm font-medium leading-6 text-gray-900">
                              <label htmlFor={"link-label"} className="my-auto">
                                Label
                              </label>
                            </div>
  
                            <input
                              type="text"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              id={"link-label"}
                              placeholder={"Enter Label..."}
                              onChange={(e) => {
                                dispatch(
                                  updateAppState({
                                    ...appState,
                                    aiContent: {
                                      ...appState.aiContent,
                                      cta: {
                                        ...appState.aiContent?.cta,
                                        [data]: {
                                          ...appState.aiContent?.cta[data],
                                          label: e.target.value,
                                        },
                                      },
                                    },
                                  }),
                                );
                              }}
                              
                              value={appState.aiContent?.cta?.link?.label}
                            />
                          </div>
                          <div className="flex flex-col border-t pt-5">
                            <div className="flex  justify-between text-sm font-medium leading-6 text-gray-900">
                              <label htmlFor={"link-link"} className="my-auto">
                                Link
                              </label>
                            </div>
  
                            <input
                              type="text"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              id={"link-link"}
                              placeholder={"Enter Link..."}
                              onChange={(e) => {
                                dispatch(
                                  updateAppState({
                                    ...appState,
                                    aiContent: {
                                      ...appState.aiContent,
                                      cta: {
                                        ...appState.aiContent?.cta,
                                        [data]: {
                                          ...appState.aiContent?.cta[data],
                                          link: e.target.value,
                                        },
                                      },
                                    },
                                  }),
                                );
                              }}
                              
                              value={appState.aiContent?.cta?.link?.link}
                            />
                          </div>
                        </div>
                      );
                  case "description":
                    return (
                      <div className="flex flex-col border-t pt-5">
                        <div className="flex  justify-between text-sm font-medium leading-6 text-gray-900">
                          <label htmlFor={data} className="my-auto">
                            {data}
                          </label>
                          {/* <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setLoadingSubHeading(true);
                                regenerateIndividual({
                                  appState,
                                  dispatch,
                                  searchParams,
                                  fieldName: data,
                                  type,
                                }).then(() => {
                                  setLoadingSubHeading(false);
                                });
                              }}
                              className="flex items-center gap-2 "
                            >
                              Regenerate
                              {loadingSubHeading ? (
                                <ImSpinner2 className="animate-spin text-lg text-black" />
                              ) : (
                                <ImPower className=" text-xs " />
                              )}
                            </button>
                            <RegenerateOptions setType={setType} type={type} />
                          </div> */}
                        </div>
                        <textarea
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          id={data}
                          placeholder={"Enter Sub-heading"}
                          onChange={(e) => {
                            dispatch(
                              updateAppState({
                                ...appState,
                                aiContent: {
                                  ...appState.aiContent,
                                  cta: {
                                    ...appState.aiContent?.cta,
                                    [data]: e.target.value,
                                  },
                                },
                              }),
                            );
                          }}
                          ref={textareaRef}
                          value={appState.aiContent?.cta?.description}
                        />
                      </div>
                    );
                }
              })()}
            </>
          ))}
      </form>
    </div>
  );
};

export default CtaContent;
