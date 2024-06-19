import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";
import React, { Dispatch, SetStateAction } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { FiLink } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { RxDragHandleDots2 } from "react-icons/rx";

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
  return (
    <div className="max-h-[600px] h-[55vh] overflow-y-auto py-5 transition-all ease-in-out">
      {" "}
      <div className="flex flex-col gap-5 border-t p-5 pt-5">
        <div className="flex justify-between gap-10">
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
