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
import { generateCustomServiceTAndD } from "@/lib/utils/function";

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

const ServiceContent = (props: TProps) => {
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
      appState.aiContent.services.list,
      result.source.index,
      result.destination.index,
    );

    dispatch(
      updateAppState({
        ...appState,
        aiContent: {
          ...appState.aiContent,
          services: {
            ...appState.aiContent.services,
            list: updatedItems,
          },
        },
      }),
    );
  };

  const handleDeleteService = (id: string) => {
    dispatch(
      updateAppState({
        ...appState,
        aiContent: {
          ...appState.aiContent,
          services: {
            ...appState.aiContent.services,
            list: appState.aiContent.services.list.filter((service) => {
              if (service.id !== id) {
                return service;
              }
            }),
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

  return (
    <div className="h-[55vh] max-h-[600px] overflow-y-auto py-5 transition-all ease-in-out">
      <div className="flex justify-between gap-10 px-5 pb-5">
        <div>
          <h3 className="block text-sm font-medium leading-6 text-gray-900">
            Services
          </h3>
          <p className="text-xs text-gray-400 ">
            Add, Update or delete a service
          </p>
        </div>
        <Switch
          onCheckedChange={(checked) =>
            dispatch(
              updateAppState({
                ...appState,
                aiContent: {
                  ...appState.aiContent,
                  services: {
                    ...appState.aiContent.services,
                    show: checked,
                  },
                },
              }),
            )
          }
          checked={appState.aiContent.services.show}
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
                  generateCustomServiceTAndD({
                    data: {
                      businessName: appState.aiContent.banner.businessName,
                      businessType: appState.aiContent.businessType ?? "",
                      location: appState.aiContent.location ?? "",
                    },
                    fieldName: "title",
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
                    services: {
                      ...appState.aiContent.services,
                      title: e.target.value,
                    },
                  },
                }),
              );
            }}
            ref={inputRef}
            value={appState.aiContent.services.title}
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
                  generateCustomServiceTAndD({
                    data: {
                      businessName: appState.aiContent.banner.businessName,
                      businessType: appState.aiContent.businessType ?? "",
                      location: appState.aiContent.location ?? "",
                    },
                    fieldName: "description",
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
                    services: {
                      ...appState.aiContent.services,
                      description: e.target.value,
                    },
                  },
                }),
              );
            }}
            ref={textareaRef}
            value={appState.aiContent.services.description}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 border-t p-5 pt-5">
        {appState.aiContent.services.show && (
          <>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className="flex flex-col gap-5"
                  >
                    {appState.aiContent.services?.list?.map((item, index) => (
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
                            <div className="flex items-center gap-2 ">
                              <div>
                                <RxDragHandleDots2 />
                              </div>
                              {/* <FiLink /> */}
                              <div>
                                <h4>{item.name}</h4>
                                <p className="line-clamp-1 ">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <MdModeEditOutline
                                color="blue"
                                size={20}
                                onClick={() => {
                                  setShowForm({
                                    edit: item.id,
                                    show: true,
                                    form: "Service",
                                  });
                                }}
                                className="cursor-pointer"
                              />
                              <MdDeleteForever
                                color="red"
                                size={20}
                                onClick={() => handleDeleteService(item.id)}
                                className="cursor-pointer"
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
            {appState.aiContent.services.list &&
              appState.aiContent.services.list.length !== 9 && (
                <button
                  className="ml-auto mt-5 flex items-center gap-2 text-sm text-indigo-800"
                  onClick={() => {
                    setShowForm({
                      edit: "",
                      show: true,
                      form: "Service",
                    });
                  }}
                >
                  Add Service
                  <IoMdAdd size={20} />
                </button>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceContent;
