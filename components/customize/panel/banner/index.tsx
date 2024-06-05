import Uploader from "@/components/ui/form/uploader";
import { Switch } from "@/components/ui/switch";
import { updateSite } from "@/lib/actions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";
import { generateZodSchema } from "@/lib/utils";
import { FormField, TFields, TSection } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FiLink } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { RxDragHandleDots2 } from "react-icons/rx";
import { toast } from "sonner";
import { DebouncedState } from "usehooks-ts";
import { appState } from "../../../../lib/store/slices/site-slice";
import { useSelector } from "react-redux";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { ImPower } from "react-icons/im";
import { BsThreeDotsVertical } from "react-icons/bs";
import RegenerateOptions from "@/components/regenerate-options";
import { regenerateIndividual } from "@/lib/utils/function";
import { useSearchParams } from "next/navigation";
type TProps = {
  section: TSection;
  handleChange: DebouncedState<(name: string, value: string) => void>;
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

const BannerContent = (props: TProps) => {
  const appState = useAppSelector(AS);
  const [selectedField, setSelectedField] = useState("businessName");
  const { section, handleChange, subdomain, setShowForm } = props;
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [type, setType] = useState("");
  const [isLinkInValid, setIsLinkInValid] = useState(false);
  const onLinkInvalid = () => {
    setIsLinkInValid(true);
  };
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
      appState.aiContent.banner.button.list,
      result.source.index,
      result.destination.index,
    );

    dispatch(
      updateAppState({
        ...appState,
        aiContent: {
          ...appState.aiContent,
          banner: {
            ...appState.aiContent.banner,
            button: {
              ...appState.aiContent.banner.button,
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
          banner: {
            ...appState.aiContent.banner,
            button: {
              ...appState.aiContent.banner.button,
              list: appState.aiContent.banner.button.list.filter((button) => {
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
  useEffect(() => {
    if (appState.focusedField === "businessName") {
      inputRef.current?.focus();
    }
  }, [appState]);
  return (
    <div className="max-h-[calc(-194px + 80vh)] h-[548px] overflow-y-auto py-5 transition-all ease-in-out">
      <form action="" className="flex flex-col gap-5 px-5">
        {Object.keys(appState.aiContent.banner).map((data) => (
          <>
            {(() => {
              switch (data) {
                case "logo":
                  return (
                    <div className="flex flex-col gap-5">
                      <div className="flex justify-between ">
                        <h3 className="block text-sm font-medium leading-6 text-gray-900">
                          {data}
                        </h3>
                        <div className="flex gap-5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedField(data)
                              setLoading(true);
                              regenerateIndividual({
                                appState,
                                dispatch,
                                searchParams,
                                fieldName: data,
                                // type,
                              }).then(() => {
                                setLoading(false);
                              });
                            }}
                            className="flex items-center gap-2 "
                          >
                            Regenerate
                            {loading && data === selectedField ? (
                              <ImSpinner2 className="animate-spin text-lg text-black" />
                            ) : (
                              <ImPower className=" text-xs " />
                            )}
                          </button>
                          <Switch
                            onCheckedChange={(checked) =>
                              dispatch(
                                updateAppState({
                                  ...appState,
                                  aiContent: {
                                    ...appState.aiContent,
                                    banner: {
                                      ...appState.aiContent.banner,
                                      logo: {
                                        ...appState.aiContent.banner.logo,
                                        show: checked,
                                      },
                                    },
                                  },
                                }),
                              )
                            }
                            checked={appState.aiContent.banner.logo.show}
                          />
                        </div>
                      </div>
                      {appState.aiContent.banner.logo.show && (
                        <div>
                          <Uploader
                            defaultValue={appState.aiContent.banner.logo.link}
                            name={data as "logo" | "image"}
                            label={""}
                            onChange={(value) => {
                              handleChange(data, value);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                case "businessName":
                  return (
                    <div className="flex flex-col border-t pt-5">
                      <div className="flex  items-center justify-between text-sm font-medium leading-6 text-gray-900 ">
                        <label htmlFor="businessName" className="block">
                          {data}
                        </label>
                      </div>

                      <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder={"Enter Business Name"}
                        onChange={(e) => {
                          handleChange(data, e.target.value);
                        }}
                        ref={inputRef}
                        value={appState.aiContent.banner.businessName}
                      />
                    </div>
                  );

                case "button":
                  return (
                    <div className="flex flex-col gap-5 border-t pt-5">
                      <div className="flex justify-between gap-10">
                        <div>
                          <h3 className="block text-sm font-medium leading-6 text-gray-900">
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
                                  banner: {
                                    ...appState.aiContent.banner,
                                    button: {
                                      ...appState.aiContent.banner.button,
                                      show: checked,
                                    },
                                  },
                                },
                              }),
                            )
                          }
                          checked={appState.aiContent.banner.button.show}
                        />
                      </div>
                      {appState.aiContent.banner.button.show && (
                        <>
                          <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                              {(provided, snapshot) => (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  style={getListStyle(snapshot.isDraggingOver)}
                                >
                                  {appState.aiContent.banner.button.list.map(
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
                                                  handleDeleteButton(item.name)
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
                          {appState.aiContent.banner.button.list.length !==
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

        {/* <button
          type="submit"
          className={`ml-auto  flex gap-2 rounded-md px-3 py-2 text-sm  font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "bg-indigo-500" : "bg-indigo-600 hover:bg-indigo-500 "}`}
          disabled={loading}
        >
          {loading && (
            <ImSpinner2 className="animate-spin text-lg text-white" />
          )}
          Save
        </button> */}
      </form>
    </div>
  );
};

export default BannerContent;
