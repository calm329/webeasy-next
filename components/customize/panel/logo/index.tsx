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

const grid = 2;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: any,
): React.CSSProperties => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({});

const LogoContent = (props: TProps) => {
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();
  const { section, handleChange, subdomain, setShowForm } = props;
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingHeading, setLoadingHeading] = useState(false);
  const [loadingSubHeading, setLoadingSubHeading] = useState(false);

  const [selectedField, setSelectedField] = useState("heading");
  const [isLinkInValid, setIsLinkInValid] = useState(false);
  const onLinkInvalid = () => {
    setIsLinkInValid(true);
  };
  const [type, setType] = useState("");
  const [imageGenerationType, setImageGenerationType] =
    useState("Stored Image");
  const reorder = (list: any, startIndex: number, endIndex: number): any => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }
    // const updatedItems = reorder(
    //   appState.aiContent?.logoClouds?.list,
    //   result.source.index,
    //   result.destination.index,
    // );

    // dispatch(
    //   updateAppState({
    //     ...appState,
    //     aiContent: {
    //       ...appState.aiContent,
    //       logoClouds: {
    //         ...appState.aiContent?.logoClouds,
    //         list: {
    //           ...appState.aiContent?.logoClouds?.list,
    //           list: updatedItems,
    //         },
    //       },
    //     },
    //   }),
    // );
  };

  //   const handleDeleteButton = (name: string) => {
  //     dispatch(
  //       updateAppState({
  //         ...appState,
  //         aiContent: {
  //           ...appState.aiContent,
  //           logoClouds: {
  //             ...appState.aiContent?.logoClouds,
  //             button: {
  //               ...appState.aiContent?.logoClouds?.list,
  //               list: appState.aiContent?.logoClouds?.list?.filter((button: any) => {
  //                 if (button.question !== name) {
  //                   return button;
  //                 }
  //               }),
  //             },
  //           },
  //         },
  //       }),
  //     );
  //   };

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    if (appState.focusedField === "heading") {
      inputRef.current?.focus();
    }

    if (appState.focusedField === "subheading") {
      textareaRef.current?.focus();
    }
  }, [appState]);

  return (
    <div className="h-[55vh] max-h-[600px]  overflow-y-auto py-5 transition-all ease-in-out">
      <form action="" className="flex flex-col gap-5 px-4 sm:px-6">
        {appState.aiContent?.logoClouds &&
          Object.keys(appState.aiContent?.logoClouds).map((data) => (
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
                                  logoClouds: {
                                    ...appState.aiContent?.logoClouds,
                                    title: e.target.value,
                                  },
                                },
                              }),
                            );
                          }}
                          ref={inputRef}
                          value={appState.aiContent?.logoClouds?.title}
                        />
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
                                  logoClouds: {
                                    ...appState.aiContent?.logoClouds,
                                    [data]: e.target.value,
                                  },
                                },
                              }),
                            );
                          }}
                          ref={textareaRef}
                          value={appState.aiContent?.logoClouds?.description}
                        />
                      </div>
                    );
                  case "list":
                    return (
                      <form
                        action=""
                        className="flex flex-col gap-5 px-4 sm:px-6"
                      >
                        {appState.aiContent?.logoClouds?.list?.map(
                          (image:any, i:any) => (
                            <div className="flex flex-col gap-5" key={i}>
                              <div className="flex justify-between ">
                                <h3 className="flex items-center justify-center text-sm font-medium leading-6 text-gray-900">
                                  Image {i + 1}
                                </h3>
                              </div>
                              <div>
                                <Uploader
                                  defaultValue={image.image}
                                  name={"image" + (i + 1)}
                                  label={""}
                                  contain={true}
                                  onChange={(value) => {
                                    const updatedList = [...appState.aiContent?.logoClouds?.list];
                                    const updatedItem = { ...updatedList[i], image: value };
                                    updatedList[i] = updatedItem;

                                    dispatch(
                                      updateAppState({
                                        ...appState,
                                        aiContent: {
                                          ...appState.aiContent,
                                          logoClouds: {
                                            ...appState.aiContent?.logoClouds,
                                            list: updatedList,
                                          },
                                        },
                                      }),
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          ),
                        )}
                      </form>
                    );
                }
              })()}
            </>
          ))}
      </form>
    </div>
  );
};

export default LogoContent;
