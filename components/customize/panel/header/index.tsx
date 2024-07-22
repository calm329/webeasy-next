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
import CustomContent from "@/lib/content/custom";
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

const HeaderContent = (props: TProps) => {
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
      appState.aiContent?.header?.list,
      result.source.index,
      result.destination.index,
    );

    dispatch(
      updateAppState({
        ...appState,
        aiContent: {
          ...appState.aiContent,
          header: {
            ...appState.aiContent?.header,
            list: updatedItems,
          },
        },
      }),
    );
  };

  const handleDeleteCard = (id: string) => {
    dispatch(
      updateAppState({
        ...appState,
        aiContent: {
          ...appState.aiContent,
          header: {
            ...appState.aiContent?.header,
            list: appState.aiContent?.header?.list?.filter((card: any) => {
              if (card.id !== id) {
                return card;
              }
            }),
          },
        },
      }),
    );
  };

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
        {appState.aiContent?.header &&
          Object.keys(appState.aiContent?.header).map((data) => (
            <>
              {(() => {
                switch (data) {
                  case "bg":
                    return (
                      <div className="flex flex-col gap-5">
                        <div className="flex justify-between ">
                          <h3 className=" flex items-center justify-center text-sm font-medium leading-6 text-gray-900">
                            background Image
                          </h3>
                        </div>
                        
                          <div>
                            <Uploader
                              defaultValue={
                                appState.aiContent?.header?.bg
                              }
                              name={data}
                              label={""}
                              onChange={(value) => {
                                console.log("Upload:", data, value);
                                dispatch(
                                  updateAppState({
                                    ...appState,
                                    aiContent: {
                                      ...appState.aiContent,
                                      header: {
                                        bg: value,
                                        ...appState.aiContent?.header,
                                      },
                                    },
                                  }),
                                );
                                // field.onChange(value);
                              }}
                            />
                          </div>
                      
                      </div>
                    );
                  case "title":
                    return (
                      <div className="flex flex-col border-t pt-5">
                        <div className="flex  justify-between text-sm font-medium leading-6 text-gray-900">
                          <label htmlFor={data} className="my-auto">
                            {data}
                          </label>
                          <div className="flex items-center gap-2 text-sm">
                          <button
                            type="button"
                            onClick={() => {
                              setLoadingHeading(true);
                              CustomContent.getHeader({
                                data: {
                                  location: appState?.aiContent?.location ?? "",
                                  businessName:
                                    appState?.aiContent?.banner?.businessName,
                                  businessType:
                                    appState?.aiContent?.businessType ?? "",
                                },
                                fieldName: "header" + data,
                                individual: true,
                                type,
                              }).then((res: any) => {
                                dispatch(
                                  updateAppState({
                                    ...appState,
                                    aiContent: {
                                      ...appState.aiContent,
                                      header: {
                                        ...appState.aiContent?.header,
                                        [data]: res[data],
                                      },
                                    },
                                  }),
                                );
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
                          placeholder={"Enter Title..."}
                          onChange={(e) => {
                            dispatch(
                              updateAppState({
                                ...appState,
                                aiContent: {
                                  ...appState.aiContent,
                                  header: {
                                    ...appState.aiContent?.header,
                                    title: e.target.value,
                                  },
                                },
                              }),
                            );
                          }}
                          ref={inputRef}
                          value={appState.aiContent?.header?.title}
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
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setLoadingSubHeading(true);
                                CustomContent.getHeader({
                                  data: {
                                    location:
                                      appState?.aiContent?.location ?? "",
                                    businessName:
                                      appState?.aiContent?.banner?.businessName,
                                    businessType:
                                      appState?.aiContent?.businessType ?? "",
                                  },
                                  fieldName: "header" + data,
                                  individual: true,
                                  type,
                                }).then((res: any) => {
                                  dispatch(
                                    updateAppState({
                                      ...appState,
                                      aiContent: {
                                        ...appState.aiContent,
                                        header: {
                                          ...appState.aiContent?.header,
                                          [data]: res[data],
                                        },
                                      },
                                    }),
                                  );
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
                            dispatch(
                              updateAppState({
                                ...appState,
                                aiContent: {
                                  ...appState.aiContent,
                                  header: {
                                    ...appState.aiContent?.header,
                                    [data]: e.target.value,
                                  },
                                },
                              }),
                            );
                          }}
                          ref={textareaRef}
                          value={appState.aiContent?.header?.description}
                        />
                      </div>
                    );
                  case "list":
                    return (
                      <div className="flex flex-col gap-5 border-t pt-5">
                        <div className="flex justify-between gap-10">
                          <div>
                            <h3 className="text-sm font-medium leading-6 text-gray-900">
                              Cards
                            </h3>
                            <p className="text-xs text-gray-400 ">Add a Card</p>
                          </div>
                          {/* <Switch
                            onCheckedChange={(checked) =>
                              dispatch(
                                updateAppState({
                                  ...appState,
                                  aiContent: {
                                    ...appState.aiContent,
                                    header: {
                                      ...appState.aiContent?.header,
                                      button: {
                                        ...appState.aiContent?.header?.list,
                                        show: checked,
                                      },
                                    },
                                  },
                                }),
                              )
                            }
                            checked={appState.aiContent?.header?.list?.show}
                          /> */}
                        </div>

                        <DragDropContext onDragEnd={onDragEnd}>
                          <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                              >
                                {appState.aiContent?.header?.list?.map(
                                  (item: any, index: any) => (
                                    <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          className=" flex items-center justify-between"
                                          key={item.id}
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
                                            <h4>{item.name}</h4>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <MdModeEditOutline
                                              color="blue"
                                              size={20}
                                              onClick={() =>
                                                setShowForm({
                                                  form: "Card",
                                                  show: true,
                                                  edit: item.id,
                                                })
                                              }
                                            />
                                            <MdDeleteForever
                                              color="red"
                                              size={20}
                                              onClick={() =>
                                                handleDeleteCard(item.id)
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

                        <button
                          className="ml-auto mt-5 flex items-center gap-2 text-sm text-indigo-800"
                          onClick={() =>
                            setShowForm({
                              form: "Card",
                              edit: "",
                              show: true,
                            })
                          }
                        >
                          Add Card
                          <IoMdAdd size={20} />
                        </button>
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

export default HeaderContent;
