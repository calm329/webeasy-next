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

const PostsContent = () => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
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
      appState.iPosts.list,
      result.source.index,
      result.destination.index,
    );

    dispatch(
      updateAppState({
        ...appState,
        iPosts: { ...appState.iPosts, list: updatedItems },
      }),
    );
  };

  const handleDeleteService = (id: string) => {
    dispatch(
      updateAppState({
        ...appState,
        iPosts: {
          ...appState.iPosts,
          list: appState.iPosts.list.filter((service) => {
            if (service.id !== id) {
              return service;
            }
          }),
        },
      }),
    );
  };
  return (
    <div className="max-h-[calc(-194px + 80vh)] h-[548px] overflow-y-auto py-5 transition-all ease-in-out">
      {" "}
      <div className="flex flex-col gap-5 border-t p-5 pt-5">
        <div className="flex justify-between gap-10">
          <div>
            <h3 className="block text-sm font-medium leading-6 text-gray-900">
              Posts
            </h3>
            <p className="text-xs text-gray-400 ">Re-Order and limit Posts</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="w-20 rounded"
              value={appState.iPosts.limit}
              onChange={(e) => {
                const num = parseInt(e.target.value, 10); // Convert string to number
                dispatch(
                  updateAppState({
                    ...appState,
                    iPosts: {
                      ...appState.iPosts,
                      limit: num,
                    },
                  }),
                );
              }}
            />
            <Switch
              onCheckedChange={(checked) => {
                console.log("checked", checked);
                dispatch(
                  updateAppState({
                    ...appState,
                    iPosts: {
                      ...appState.iPosts,
                      show: checked,
                    },
                  }),
                );
              }}
              checked={appState.iPosts.show}
            />
          </div>
        </div>
        {appState.iPosts.show && (
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
                    {appState.iPosts?.list?.map((item, index) => (
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
                            <div className="flex items-center gap-2 ">
                              <div>
                                <RxDragHandleDots2 />
                              </div>
                              {/* <FiLink /> */}
                              <div>
                                <h4>{item.username}</h4>
                                <p className="line-clamp-1 ">{item.caption}</p>
                              </div>
                            </div>
                            {/* <div className="flex items-center gap-2">
                              <MdModeEditOutline
                                color="blue"
                                size={20}
                                onClick={() => {
                                  setShowForm({
                                    edit: item.id,
                                    show: true,
                                    form: "Post",
                                  });
                                }}
                              />
                              <MdDeleteForever
                                color="red"
                                size={20}
                                onClick={() => handleDeleteService(item.id)}
                              />
                            </div> */}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {/* {appState.aiContent.services.list &&
              appState.aiContent.services.list.length !== 9 && (
                <button
                  className="ml-auto mt-5 flex items-center gap-2 text-sm text-indigo-800"
                  onClick={() => {
                    setShowForm({
                      edit: "",
                      show: true,
                      form: "Post",
                    });
                  }}
                >
                  Add Service
                  <IoMdAdd size={20} />
                </button>
              )} */}
          </>
        )}
      </div>
    </div>
  );
};

export default PostsContent;
