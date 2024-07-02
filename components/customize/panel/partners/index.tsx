import RegenerateOptions from "@/components/regenerate-options";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { FiLink } from "react-icons/fi";
import { ImPower, ImSpinner2 } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { RxDragHandleDots2 } from "react-icons/rx";
import CustomContent from "../../../../lib/content/custom";
import { generateCustomServiceTAndD, generatePartnersTAndD } from "@/lib/utils/function";
import Image from "next/image";
import Uploader from "@/components/ui/form/uploader";

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

type TProps = {
  setShowForm: Dispatch<
    SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
};

const PartnersContent = (props: TProps) => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
  const { setShowForm } = props;
  const reorder = (list: any, startIndex: number, endIndex: number): any => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const [loadingDescription, setLoadingDescription] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState(false);

  const [selectedField, setSelectedField] = useState("");

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }

    const updatedItems = reorder(
      appState.aiContent?.partners?.list,
      result.source.index,
      result.destination.index,
    );

    dispatch(
      updateAppState({
        ...appState,
        aiContent: {
          ...appState.aiContent,
          partners: {
            ...appState.aiContent?.partners,
            list: updatedItems,
          },
        },
      }),
    );
  };

  // const handleDeleteService = (id: string) => {
  //   dispatch(
  //     updateAppState({
  //       ...appState,
  //       aiContent: {
  //         ...appState.aiContent?,
  //?         services:? {
  //           ...appState.aiContent?.services?,
  //?           list: appState.aiContent?.services?.list?.filter((service) => {
  //             if (service.id !== id) {
  //               return service;
  //             }
  //           }),
  //         },
  //       },
  //     }),
  //   );
  // };
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (appState.focusedField === "title") {
      inputRef.current?.focus();
    }

    if (appState.focusedField === "description") {
      textareaRef.current?.focus();
    }
  }, [appState]);

  return (
    <div className="h-[55vh] max-h-[600px] overflow-y-auto py-5 transition-all ease-in-out">
      <div className="flex justify-between gap-10 px-5 pb-5">
        <div>
          <h3 className="text-sm font-medium leading-6 text-gray-900 ">
            Partners
          </h3>
          <p className="text-xs text-gray-400 ">
            {/* Add, Update or delete a service */}
          </p>
        </div>
        <Switch
          onCheckedChange={(checked) =>
            dispatch(
              updateAppState({
                ...appState,
                aiContent: {
                  ...appState.aiContent,
                  partners: {
                    ...appState.aiContent?.partners,
                    show: checked,
                  },
                },
              }),
            )
          }
          checked={appState.aiContent?.partners?.show}
        />
      </div>
      <div className="px-5 pb-5">
        <div className="flex flex-col border-t pt-5">
          <div className="flex  justify-between text-sm font-medium leading-6 text-gray-900">
            <label htmlFor={"title"} className="block">
              {"title"}
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center gap-2 "
                onClick={() => {
                  setLoadingTitle(true);
                  setSelectedField("title");
                  generatePartnersTAndD({
                    data: {
                      businessName: appState.aiContent?.banner?.businessName,
                      businessType: appState.aiContent?.businessType ?? "",
                      location: appState.aiContent?.location ?? "",
                    },
                    fieldName: "partnersTitle",
                    type: "",
                    individual: true,
                  }).then(() => {
                    setLoadingTitle(false);
                  });
                }}
              >
                Regenerate
                {loadingTitle ? (
                  <ImSpinner2 className="animate-spin text-lg text-black" />
                ) : (
                  <ImPower className=" text-xs " />
                )}
              </button>
              {/* <RegenerateOptions setType={setType} type={type} /> */}
            </div>
          </div>

          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"title"}
            placeholder={"Enter Title..."}
            onChange={(e) => {
              dispatch(
                updateAppState({
                  ...appState,
                  aiContent: {
                    ...appState.aiContent,
                    partners: {
                      ...appState.aiContent?.partners,
                      title: e.target.value,
                    },
                  },
                }),
              );
            }}
            ref={inputRef}
            value={appState.aiContent?.partners?.title}
          />
        </div>

        <div className="flex flex-col border-t pt-5">
          <div className="flex  justify-between text-sm font-medium leading-6 text-gray-900">
            <label htmlFor={"description"} className="block">
              {"description"}
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center gap-2 "
                onClick={() => {
                  setLoadingDescription(true);
                  setSelectedField("description");
                  generatePartnersTAndD({
                    data: {
                      businessName: appState.aiContent?.banner?.businessName,
                      businessType: appState.aiContent?.businessType ?? "",
                      location: appState.aiContent?.location ?? "",
                    },
                    fieldName: "partnersDescription",
                    type: "",
                    individual: true,
                  }).then(() => {
                    setLoadingDescription(false);
                  });
                }}
              >
                Regenerate
                {loadingDescription ? (
                  <ImSpinner2 className="animate-spin text-lg text-black" />
                ) : (
                  <ImPower className=" text-xs " />
                )}
              </button>
              {/* <RegenerateOptions setType={setType} type={type} /> */}
            </div>
          </div>
          <textarea
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"description"}
            placeholder={"Enter Description"}
            onChange={(e) => {
              dispatch(
                updateAppState({
                  ...appState,
                  aiContent: {
                    ...appState.aiContent,
                    partners: {
                      ...appState.aiContent?.partners,
                      description: e.target.value,
                    },
                  },
                }),
              );
            }}
            ref={textareaRef}
            value={appState.aiContent?.partners?.description}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 border-t p-5 pt-5">
        <form action="" className="flex flex-col gap-5 px-4 sm:px-6">
          {appState.aiContent?.partners?.list?.map((image, i) => (
            <div className="flex flex-col gap-5" key={i}>
              <div className="flex justify-between ">
                <h3 className="flex items-center justify-center text-sm font-medium leading-6 text-gray-900">
                  Image {i + 1}
                </h3>
              </div>
              <div>
                <Uploader
                  defaultValue={image}
                  name={"image" + (i + 1)}
                  label={""}
                  contain={true}
                  onChange={(value) => {
                    dispatch(
                      updateAppState({
                        ...appState,
                        aiContent: {
                          ...appState.aiContent,
                          partners: {
                            ...appState.aiContent?.partners,
                            list: [
                              ...appState.aiContent?.partners?.list?.slice(0, i),
                              value,
                              ...appState.aiContent?.partners?.list?.slice(i + 1),
                            ],
                          },
                        },
                      }),
                    );
                  }}
                />
              </div>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default PartnersContent;
