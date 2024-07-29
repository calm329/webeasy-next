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
import {
  generateCustomServiceTAndD,
  generatePartnersTAndD,
} from "@/lib/utils/function";
import Image from "next/image";
import Uploader from "@/components/ui/form/uploader";
import { useResponsiveDialog } from "@/lib/context/responsive-dialog-context";
import ResponsiveDialog from "@/components/ui/responsive-dialog";
import DeleteContent from "../../../delete-content/index";
import { BROKEN_IMAGE } from "@/lib/utils/common-constant";

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
  const { openDialog } = useResponsiveDialog();
  const [selectedField, setSelectedField] = useState("");
  const [showLinks, setShowLinks] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState("");
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

  const handleDeleteLogo = (id: string) => {
    dispatch(
      updateAppState({
        ...appState,
        aiContent: {
          ...appState.aiContent,
          partners: {
            ...appState.aiContent?.partners,
            list: appState.aiContent?.partners?.list?.filter(
              (partner) => partner.id !== id,
            ),
          },
        },
      }),
    );
  };

  return (
    <div className="h-[55vh] max-h-[600px] overflow-y-auto py-5 transition-all ease-in-out">
      <ResponsiveDialog id="delete">
        <DeleteContent
          action={() => handleDeleteLogo(selectedLogo)}
          data="logo"
        />
      </ResponsiveDialog>
      <div className="px-5 pb-5">
        <div className="flex flex-col  pt-5">
          <div className="flex  justify-between text-sm font-medium leading-6 text-gray-900">
            <label htmlFor={"title"} className="block">
              {"Title"}
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
              {"Description"}
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center gap-2"
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
      <div className="flex flex-col gap-5  p-5 pt-5">
        <div className="flex flex-col gap-5 border-t pt-5">
          <div className="flex justify-between gap-10">
            <div>
              <h3 className="text-sm font-medium leading-6 text-gray-900">
                Logos
              </h3>
              <p className="text-xs text-gray-400 ">
                Add , update, or delete Logo
              </p>
            </div>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {appState?.aiContent?.partners?.list?.map((item, index) => (
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
                            <Image
                              src={item.logo || BROKEN_IMAGE}
                              alt=""
                              height={50}
                              width={50}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <MdModeEditOutline
                              color="blue"
                              size={20}
                              className="cursor-pointer"
                              onClick={() =>
                                setShowForm({
                                  form: "PartnerLogo",
                                  show: true,
                                  edit: item.id,
                                })
                              }
                            />
                            <MdDeleteForever
                              color="red"
                              size={20}
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedLogo(item.id);
                                openDialog("delete");
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {appState?.aiContent?.banner?.button?.list?.length !== 2 && (
            <button
              className="ml-auto mt-5 flex items-center gap-2 text-sm text-indigo-800"
              onClick={() =>
                setShowForm({
                  form: "PartnerLogo",
                  edit: "",
                  show: true,
                })
              }
            >
              Add Logo
              <IoMdAdd size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnersContent;
