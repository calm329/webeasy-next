import React from "react";
import { ImSpinner2, ImPower } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { Switch } from "@/components/ui/switch";
import Uploader from "@/components/ui/form/uploader";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import RegenerateOptions from "@/components/regenerate-options";
import { useEditableFieldContext } from "@/lib/context/editable-field-context";
import { useResponsiveDialog } from "@/lib/context/responsive-dialog-context";
import {
  regenerateHeroImage,
  regenerateIndividual,
} from "@/lib/utils/function";
import ResponsiveDialog from "@/components/ui/responsive-dialog";
import ImagesListing from "@/components/ui/form/images-listing";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { appState as AS } from "@/lib/store/slices/site-slice";
import { useSearchParams } from "next/navigation";

const EditableField: React.FC = () => {
  const {
    type,
    value,
    setValue,
    regenerateOptions,
    generationType,
    setGenerationType,
    onValueChange,
    isSwitchable,
    switchChecked,
    onSwitchChange,
    listItems,
    setListItems,
    draggable,
    onDragEnd,
    onRegenerate,
    imagePosition,
    setImagePosition,
  } = useEditableFieldContext();

  const [loading, setLoading] = React.useState(false);
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const handleRegenerate = async () => {
    setLoading(true);
    let data: any;
    switch (type) {
      case "image":
        data = await regenerateHeroImage(generationType ?? "");
        break;
      case "text":
        data = await regenerateIndividual({
          appState,
          dispatch,
          searchParams,
          fieldName: "heading",
          type,
        });
        break;

      default:
        break;
    }

    onRegenerate && onRegenerate(data ?? "");
    setValue(data ?? "");
    setLoading(false);
  };

  const handleAddListItem = () => {
    if (setListItems && listItems) {
      setListItems([
        ...listItems,
        { id: `${Date.now()}`, content: "New Item" },
      ]);
    }
  };

  const handleDeleteListItem = (id: string) => {
    if (setListItems && listItems) {
      setListItems(listItems.filter((item) => item.id !== id));
    }
  };

  const handleEditListItem = (id: string, content: string) => {
    if (setListItems && listItems) {
      setListItems(
        listItems.map((item) => (item.id === id ? { ...item, content } : item)),
      );
    }
  };
  const { openDialog } = useResponsiveDialog();
  const renderField = () => {
    switch (type) {
      case "image":
        return (
          <div className="flex flex-col">
            <ResponsiveDialog id="imageListing" width={"800px"}>
              <ImagesListing
                action={(data) => {
                  const image = data.urls.small;
                  onValueChange && onValueChange(image);
                  setValue(image);
                }}
              />
            </ResponsiveDialog>
            <div className="flex justify-between">
              <h3 className=" flex items-center justify-center text-sm font-medium leading-6 text-gray-900">
                Image
              </h3>
              {isSwitchable && (
                <Switch
                  onCheckedChange={onSwitchChange}
                  checked={switchChecked || false}
                />
              )}{" "}
            </div>
            {switchChecked && (
              <>
                <Uploader
                  defaultValue={value}
                  name="image"
                  onChange={(value) => {
                    setValue(value);
                    onValueChange && onValueChange(value);
                  }}
                />

                <div className="mt-5 flex">
                  <button
                    type="button"
                    onClick={handleRegenerate}
                    className="flex items-center gap-2"
                  >
                    Regenerate
                    {loading ? (
                      <ImSpinner2 className="animate-spin text-lg text-black" />
                    ) : (
                      <ImPower className="text-xs" />
                    )}
                  </button>
                  {regenerateOptions && (
                    <RegenerateOptions
                      setType={setGenerationType}
                      type={generationType || ""}
                      types={regenerateOptions}
                      title="Generation Type"
                    />
                  )}
                  <button
                    type="button"
                    className="mr-auto rounded-md border bg-red-600 px-5 py-2 font-medium text-white"
                    onClick={() => {
                      openDialog("imageListing");
                    }}
                  >
                    Swap
                  </button>
                </div>
                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700">
                    Image position
                  </label>
                  <div className="mt-3 px-5">
                    <label className="block text-xs font-medium text-gray-700">
                      Horizontal
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={imagePosition?.horizontal}
                      onChange={(e) =>
                        setImagePosition &&
                        setImagePosition({
                          vertical: imagePosition?.vertical ?? 0,
                          horizontal: parseInt(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                    <label className="block text-xs font-medium text-gray-700">
                      Vertical
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={imagePosition?.vertical}
                      onChange={(e) =>
                        setImagePosition &&
                        setImagePosition({
                          horizontal: imagePosition?.horizontal ?? 0,
                          vertical: parseInt(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        );
      case "text":
        return (
          <div className="flex flex-col border-t pt-5">
            <div className="flex  justify-between text-sm font-medium leading-6 text-gray-900">
              <label htmlFor={"Text"} className="my-auto">
                Text
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRegenerate}
                  className="flex items-center gap-2"
                >
                  Regenerate
                  {loading ? (
                    <ImSpinner2 className="animate-spin text-lg text-black" />
                  ) : (
                    <ImPower className="text-xs" />
                  )}
                </button>
                <RegenerateOptions setType={setGenerationType} type={type} />
              </div>
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                onValueChange && onValueChange(e.target.value);
              }}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter text..."
            />
          </div>
        );
      case "textarea":
        return (
          <div>
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter text..."
            />
            <button
              type="button"
              onClick={handleRegenerate}
              className="flex items-center gap-2"
            >
              Regenerate
              {loading ? (
                <ImSpinner2 className="animate-spin text-lg text-black" />
              ) : (
                <ImPower className="text-xs" />
              )}
            </button>
          </div>
        );
      case "list":
        return (
          <div>
            {draggable && onDragEnd && (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {listItems &&
                        listItems.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  padding: 8,
                                  marginBottom: 8,
                                  backgroundColor: "#fff",
                                  borderRadius: 4,
                                }}
                                className="flex items-center justify-between border p-2"
                              >
                                <input
                                  type="text"
                                  value={item.content}
                                  onChange={(e) =>
                                    handleEditListItem(item.id, e.target.value)
                                  }
                                  className="flex-grow"
                                />
                                <div className="flex items-center gap-2">
                                  <MdDeleteForever
                                    color="red"
                                    size={20}
                                    onClick={() =>
                                      handleDeleteListItem(item.id)
                                    }
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
            )}
            <button
              type="button"
              onClick={handleAddListItem}
              className="ml-auto mt-5 flex items-center gap-2 text-sm text-indigo-800"
            >
              Add Item
              <IoMdAdd size={20} />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderField()}</div>;
};

export default EditableField;
