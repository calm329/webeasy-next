import React, { useEffect, useState } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { FiLink } from "react-icons/fi";
import { MdModeEditOutline, MdDeleteForever } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { Switch } from "@/components/ui/switch";
import { ImSpinner2 } from "react-icons/im";
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
type TProps = {
  section: TSection;
  handleChange: DebouncedState<(name: string, value: string) => void>;
  subdomain: string;
  heroCustomizeFields: FormField[];
  focusedField: TFields;
  setShowButtonForm: React.Dispatch<React.SetStateAction<boolean>>;
};
interface Item {
  name: string;
  label: string;
}

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
  const [loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  useEffect(() => {
    heroCustomizeFields.forEach((field) => {
      if (field.type === "image") {
        setShowImage(field.show ?? false);
      }
      if (field.type === "button") {
        setShowButtons(field.show ?? false);
      }
    });
  }, []);
  const getItems = (): Item[] =>
    heroCustomizeFields[3].children?.map((k) => ({
      name: k.name,
      label: k.label ?? "",
    })) ?? [];

  const reorder = (
    list: Item[],
    startIndex: number,
    endIndex: number,
  ): Item[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const {
    section,
    handleChange,
    subdomain,
    heroCustomizeFields,
    focusedField,
    setShowButtonForm,
  } = props;
  const [items, setItems] = useState<Item[]>(getItems());

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }

    const updatedItems = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    setItems(updatedItems);
  };

  return (
    <div className="max-h-[calc(-194px + 80vh)] h-[548px] overflow-y-auto py-5 transition-all ease-in-out">
      <form action="" className="flex flex-col gap-5 px-4 sm:px-6">
        {heroCustomizeFields?.map((data) => {
          switch (data.type) {
            case "image":
              return (
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between ">
                    <h3 className="block text-sm font-medium leading-6 text-gray-900">
                      {data.label}
                    </h3>
                    <Switch
                      onCheckedChange={setShowImage}
                      checked={showImage}
                    />
                  </div>
                  {showImage && (
                    <div>
                      <Uploader
                        defaultValue={data.defaultValue}
                        name={data.name as "logo" | "image"}
                        label={""}
                        onChange={(value) => {
                          handleChange(data.name, value);
                        }}
                      />
                      <div className="flex flex-col  pt-5">
                        <label
                          htmlFor={"alt"}
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Alt Text
                        </label>
                        <input
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          id={"alt"}
                          defaultValue={data.alt}
                          onChange={(e) =>
                            handleChange(data.name, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            case "text":
              return (
                <div className="flex flex-col border-t pt-5">
                  <label
                    htmlFor={data.name}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {data.label}
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id={data.name}
                    defaultValue={data.defaultValue}
                    onChange={(e) => handleChange(data.name, e.target.value)}
                  />
                </div>
              );
            case "textarea":
              return (
                <div className="flex flex-col border-t pt-5">
                  <label
                    htmlFor={data.name}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {data.label}
                  </label>
                  <textarea
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id={data.name}
                    defaultValue={data.defaultValue}
                    onChange={(e) => handleChange(data.name, e.target.value)}
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
                        Add a button with a link to a page, phone number, email
                        or section
                      </p>
                    </div>
                    <Switch
                      onCheckedChange={setShowButtons}
                      checked={showButtons}
                    />
                  </div>
                  {showButtons && (
                    <>
                      <DragDropContext
                        onDragEnd={onDragEnd}
                        onDragStart={() => console.log("it's started")}
                      >
                        <Droppable droppableId="droppable">
                          {(provided, snapshot) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={getListStyle(snapshot.isDraggingOver)}
                            >
                              {items?.map((item, index) => (
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
                                        />
                                        <MdDeleteForever
                                          color="red"
                                          size={20}
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

                      <button
                        className="ml-auto mt-5 flex items-center gap-2 text-sm text-indigo-800"
                        onClick={() => setShowButtonForm(true)}
                      >
                        Add Button
                        <IoMdAdd size={20} />
                      </button>
                    </>
                  )}
                </div>
              );
          }
        })}
        {/* <div className="flex flex-col">
          <label
            htmlFor="heading"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Heading
          </label>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"heading"}
          />
        </div>
        <div>
          <label
            htmlFor="subheading"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Sub-Heading
          </label>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"subheading"}
          />
        </div>
        <div className="flex flex-col gap-5 border-t pt-5">
          <div className="flex justify-between ">
            <h3 className="block text-sm font-medium leading-6 text-gray-900">
              Image
            </h3>
            <Switch onCheckedChange={setShowImage} checked={showImage} />
          </div>
          {showImage && (
            <div>
              <Uploader
                defaultValue={""}
                name={"image"}
                label={""}
                onChange={() => {
                  // handleChange(f.name, value);
                  // field.onChange(value);
                }}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-5 border-t pt-5">
          <div className="flex justify-between gap-10">
            <div>
              <h3 className="block text-sm font-medium leading-6 text-gray-900">
                Buttons
              </h3>
              <p className="text-xs text-gray-400 ">
                Add a button with a link to a page, phone number, email or
                section
              </p>
            </div>
            <Switch onCheckedChange={setShowButtons} checked={showButtons} />
          </div>
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <RxDragHandleDots2 />
              <FiLink />
              <h4>Button</h4>
            </div>
            <div className="flex items-center gap-2">
              <MdModeEditOutline color="blue" size={20} />
              <MdDeleteForever color="red" size={20} />
            </div>
          </div>
          <button className="ml-auto mt-5 flex items-center gap-2 text-sm text-indigo-800">
            Add Button
            <IoMdAdd size={20} />
          </button>
        </div> */}
        <button
          type="submit"
          className={`ml-auto  flex gap-2 rounded-md px-3 py-2 text-sm  font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "bg-indigo-500" : "bg-indigo-600 hover:bg-indigo-500 "}`}
          disabled={loading}
        >
          {loading && (
            <ImSpinner2 className="animate-spin text-lg text-white" />
          )}
          Save
        </button>
      </form>
    </div>
  );
};

export default HeroContent;
