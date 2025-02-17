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
import ResponsiveDialog from "@/components/ui/responsive-dialog";
import ImagesListing from "@/components/ui/form/images-listing";
import { useResponsiveDialog } from "@/lib/context/responsive-dialog-context";
import { BROKEN_IMAGE } from "@/lib/utils/common-constant";
import ImageFieldContainer from "../../editable-field/image";
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

const HeroContent = (props: TProps) => {
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
    const updatedItems = reorder(
      appState.aiContent?.hero?.button?.list,
      result.source.index,
      result.destination.index,
    );

    dispatch(
      updateAppState({
        ...appState,
        aiContent: {
          ...appState.aiContent,
          hero: {
            ...appState.aiContent?.hero,
            button: {
              ...appState.aiContent?.hero?.button,
              list: updatedItems,
            },
          },
        },
      }),
    );
  };

  const handleDeleteButton = (name: string) => {
    dispatch(
      updateAppState({
        ...appState,
        aiContent: {
          ...appState.aiContent,
          hero: {
            ...appState.aiContent?.hero,
            button: {
              ...appState.aiContent?.hero?.button,
              list: appState.aiContent?.hero?.button?.list?.filter((button) => {
                if (button.name !== name) {
                  return button;
                }
              }),
            },
          },
        },
      }),
    );
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const searchParams = useSearchParams();
  const { openDialog } = useResponsiveDialog();
  useEffect(() => {
    console.log("appState: " + appState.focusedField);
    if (appState.focusedField === "title") {
      inputRef.current?.focus();
    }

    if (appState.focusedField === "description") {
      textareaRef.current?.focus();
    }
  }, [appState]);

  function setImage(data: any) {
    dispatch(
      updateAppState({
        ...appState,
        aiContent: {
          ...appState.aiContent,
          hero: {
            ...appState.aiContent?.hero,
            image: {
              ...appState.aiContent?.hero?.image,
              imageUrl: data.urls.small,
            },
          },
        },
      }),
    );
  }

  return (
    <div className="h-[55vh] max-h-[600px]  overflow-y-auto py-5 transition-all ease-in-out">
      <form action="" className="flex flex-col gap-5 px-4 sm:px-6">
        {appState.aiContent?.hero &&
          Object.keys(appState.aiContent?.hero).map((data) => (
            <>
              {(() => {
                switch (data) {
                  case "image":
                    return (
                      <ImageFieldContainer
                        initialValue={
                          appState?.aiContent?.hero?.image?.imageUrl ||
                          BROKEN_IMAGE
                        }
                        onImageSet={(url) => {
                          console.log("url", url);
                          dispatch(
                            updateAppState({
                              ...appState,
                              aiContent: {
                                ...appState.aiContent,
                                hero: {
                                  ...appState.aiContent?.hero,
                                  image: {
                                    ...appState.aiContent?.hero?.image,
                                    imageUrl: url,
                                  },
                                },
                              },
                            }),
                          );
                        }}
                        onRegenerate={(image) => {
                          dispatch(
                            updateAppState({
                              ...appState,
                              aiContent: {
                                ...appState.aiContent,
                                hero: {
                                  ...appState.aiContent?.hero,
                                  image: {
                                    ...appState.aiContent?.hero?.image,
                                    imageUrl: image,
                                  },
                                },
                              },
                            }),
                          );
                        }}
                        imagePosition={{
                          horizontal:
                            appState?.aiContent?.hero?.image
                              ?.horizontalPosition ?? 0,
                          vertical:
                            appState?.aiContent?.hero?.image
                              ?.verticalPosition ?? 0,
                        }}
                        setImagePosition={({ vertical, horizontal }) => {
                          dispatch(
                            updateAppState({
                              ...appState,
                              aiContent: {
                                ...appState.aiContent,
                                hero: {
                                  ...appState.aiContent?.hero,
                                  image: {
                                    ...appState.aiContent?.hero?.image,
                                    verticalPosition: vertical,
                                    horizontalPosition: horizontal,
                                  },
                                },
                              },
                            }),
                          );
                        }}
                        initialSwitchChecked={
                          appState?.aiContent?.hero?.image?.show
                        }
                        onSwitchChange={(checked) => {
                          dispatch(
                            updateAppState({
                              ...appState,
                              aiContent: {
                                ...appState.aiContent,
                                hero: {
                                  ...appState.aiContent?.hero,
                                  image: {
                                    ...appState.aiContent?.hero?.image,
                                    show: checked,
                                  },
                                },
                              },
                            }),
                          );
                        }}
                      />
                    );
                  case "heading":
                    return (
                      <div className="flex flex-col border-t pt-5">
                        <div className="flex  justify-between text-sm font-medium leading-6 text-gray-900">
                          <label htmlFor={data} className="my-auto">
                            {data}
                          </label>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedField(data);
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
                          </div>
                        </div>

                        <input
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          id={data}
                          placeholder={"Enter heading..."}
                          onChange={(e) => {
                            handleChange(data, e.target.value);
                          }}
                          ref={inputRef}
                          value={appState.aiContent?.hero?.heading}
                        />
                      </div>
                    );
                  case "subheading":
                    return (
                      <div className="flex flex-col border-t pt-5">
                        <div className="flex  justify-between text-sm font-medium leading-6 text-gray-900">
                          <label htmlFor={data} className="my-auto">
                            {data}
                          </label>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedField(data);
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
                          </div>
                        </div>
                        <textarea
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          id={data}
                          placeholder={"Enter Sub-heading"}
                          onChange={(e) => {
                            handleChange(data, e.target.value);
                          }}
                          ref={textareaRef}
                          value={appState.aiContent?.hero?.subheading}
                        />
                      </div>
                    );

                  case "button":
                    return (
                      <div className="flex flex-col gap-5 border-t pt-5">
                        <div className="flex justify-between gap-10">
                          <div>
                            <h3 className="text-sm font-medium leading-6 text-gray-900">
                              Buttons
                            </h3>
                            <p className="text-xs text-gray-400 ">
                              Add a button with a link to a page, phone number,
                              email or section
                            </p>
                          </div>
                          <Switch
                            onCheckedChange={(checked) =>
                              dispatch(
                                updateAppState({
                                  ...appState,
                                  aiContent: {
                                    ...appState.aiContent,
                                    hero: {
                                      ...appState.aiContent?.hero,
                                      button: {
                                        ...appState.aiContent?.hero?.button,
                                        show: checked,
                                      },
                                    },
                                  },
                                }),
                              )
                            }
                            checked={appState.aiContent?.hero?.button?.show}
                          />
                        </div>
                        {appState.aiContent?.hero?.button?.show && (
                          <>
                            <DragDropContext onDragEnd={onDragEnd}>
                              <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                  <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={getListStyle(
                                      snapshot.isDraggingOver,
                                    )}
                                  >
                                    {appState.aiContent?.hero?.button?.list?.map(
                                      (item, index) => (
                                        <Draggable
                                          key={item.name}
                                          draggableId={item.name}
                                          index={index}
                                        >
                                          {(provided, snapshot) => (
                                            <div
                                              className=" flex items-center justify-between"
                                              key={item.name}
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style,
                                              )}
                                            >
                                              <div className="flex items-center gap-2">
                                                <RxDragHandleDots2 />
                                                <FiLink />
                                                <h4>{item.label}</h4>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <MdModeEditOutline
                                                  color="blue"
                                                  size={20}
                                                  onClick={() =>
                                                    setShowForm({
                                                      form: "Button",
                                                      show: true,
                                                      edit: item.name,
                                                    })
                                                  }
                                                />
                                                <MdDeleteForever
                                                  color="red"
                                                  size={20}
                                                  onClick={() =>
                                                    handleDeleteButton(
                                                      item.name,
                                                    )
                                                  }
                                                />
                                              </div>
                                            </div>
                                          )}
                                        </Draggable>
                                      ),
                                    )}
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                            </DragDropContext>
                            {appState.aiContent?.hero?.button?.list?.length !==
                              2 && (
                              <button
                                className="ml-auto mt-5 flex items-center gap-2 text-sm text-indigo-800"
                                onClick={() =>
                                  setShowForm({
                                    form: "Button",
                                    edit: "",
                                    show: true,
                                  })
                                }
                              >
                                Add Button
                                <IoMdAdd size={20} />
                              </button>
                            )}
                          </>
                        )}
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

export default HeroContent;
