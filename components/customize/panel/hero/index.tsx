import React, { useEffect, useRef, useState } from "react";
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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateZodSchema } from "@/lib/utils";
import { updateSite } from "@/lib/actions";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";
type TProps = {
  section: TSection;
  handleChange: DebouncedState<(name: string, value: string) => void>;
  subdomain: string;
  heroCustomizeFields: FormField[];
  focusedField: TFields;
  setShowButtonForm: React.Dispatch<
    React.SetStateAction<{
      edit: string;
      show: boolean;
    }>
  >;
  setHeroCustomizeFields: React.Dispatch<React.SetStateAction<FormField[]>>;
  getData?: (
    flag?: "init" | "regenerate" | "text" | "image" | "individual",
    fieldName?: string,
  ) => Promise<void>;
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
  const {
    section,
    handleChange,
    subdomain,
    heroCustomizeFields,
    focusedField,
    setHeroCustomizeFields,
    setShowButtonForm,
    getData,
  } = props;
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

  const zodSchema = generateZodSchema(heroCustomizeFields);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(zodSchema),
  });

  const [isLinkInValid, setIsLinkInValid] = useState(false);
  const onLinkInvalid = () => {
    setIsLinkInValid(true);
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    setLoading(true);

    try {
      const response = await fetch(data["ctaLink"], { mode: "no-cors" });
      setIsLinkInValid(false);

      await updateSite(
        subdomain,
        data,
        heroCustomizeFields.map((f) => f.name as string),
      );
      toast.success("Your brand customization has been saved");
      // handleNext?.();
    } catch (error: any) {
      if (error.message === "Failed to fetch") {
        onLinkInvalid();
      }
      console.error("Form submission error:", error.message);
    } finally {
      setLoading(false);
    }
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
      heroCustomizeFields[3]?.children,
      result.source.index,
      result.destination.index,
    );
    const updatedItemsForRedux = reorder(
      appState.aiContent.hero.button.list,
      result.source.index,
      result.destination.index,
    );

    dispatch(
      updateAppState({
        ...appState,
        aiContent: {
          ...appState.aiContent,
          hero: {
            ...appState.aiContent.hero,
            button: {
              ...appState.aiContent.hero.button,
              list: updatedItemsForRedux,
            },
          },
        },
      }),
    );

    const tempFields = heroCustomizeFields;
    tempFields[3].children = updatedItems;
    setHeroCustomizeFields(tempFields);
  };

  const handleDeleteButton = (name: string) => {
    const updatedHeroCustomizeFields = heroCustomizeFields.map((field) => {
      if (field.type === "button" && Array.isArray(field.children)) {
        // Filter out the child with the provided name
        field.children = field.children.filter((child) => child.name !== name);
      }
      return field;
    });

    setHeroCustomizeFields(updatedHeroCustomizeFields);
    dispatch(
      updateAppState({
        ...appState,
        aiContent: {
          ...appState.aiContent,
          hero: {
            ...appState.aiContent.hero,
            button: {
              ...appState.aiContent.hero.button,
              list: appState.aiContent.hero.button.list.filter((button) => {
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

  useEffect(() => {
    for (const f of heroCustomizeFields) {
      setValue(f.name, f.defaultValue);
    }
  }, [heroCustomizeFields]);

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (appState.focusedField === "heading") {
      inputRef.current?.focus();
    }

    if (appState.focusedField === "subheading") {
      textareaRef.current?.focus();
    }
  }, [appState]);

  return (
    <div className="max-h-[calc(-194px + 80vh)] h-[548px] overflow-y-auto py-5 transition-all ease-in-out">
      <form
        action=""
        className="flex flex-col gap-5 px-4 sm:px-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {heroCustomizeFields.map((data) => (
          <Controller
            key={data.name}
            name={data.name}
            control={control}
            render={({ field }) => (
              <>
                {(() => {
                  switch (data.type) {
                    case "image":
                      return (
                        <div className="flex flex-col gap-5">
                          <div className="flex justify-between ">
                            <h3 className="block text-sm font-medium leading-6 text-gray-900">
                              {data.label}
                            </h3>
                            <Switch
                              onCheckedChange={(checked) =>
                                dispatch(
                                  updateAppState({
                                    ...appState,
                                    aiContent: {
                                      ...appState.aiContent,
                                      hero: {
                                        ...appState.aiContent.hero,
                                        image: {
                                          ...appState.aiContent.hero.image,
                                          show: checked,
                                        },
                                      },
                                    },
                                  }),
                                )
                              }
                              checked={appState.aiContent.hero.image.show}
                            />
                          </div>
                          {appState.aiContent.hero.image.show && (
                            <div>
                              <Uploader
                                defaultValue={data.defaultValue}
                                name={data.name as "logo" | "image"}
                                label={""}
                                onChange={(value) => {
                                  handleChange(data.name, value);
                                  field.onChange(value);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    case "text":
                      return (
                        <div className="flex flex-col border-t pt-5">
                          <div className="flex  justify-between text-sm font-medium leading-6 text-gray-900">
                            <label htmlFor={data.name} className="block">
                              {data.label}
                            </label>
                            <button
                              onClick={() =>
                                getData && getData("individual", data.name)
                              }
                            >
                              Regenerate
                            </button>
                          </div>

                          <input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id={data.name}
                            {...field}
                            placeholder={data.placeholder}
                            aria-invalid={errors[field.name] ? "true" : "false"}
                            aria-describedby={field.name}
                            onChange={(e) => {
                              handleChange(data.name, e.target.value);
                              field.onChange(e.target.value);
                            }}
                            ref={inputRef}
                            defaultValue={data.defaultValue}
                          />
                        </div>
                      );
                    case "textarea":
                      return (
                        <div className="flex flex-col border-t pt-5">
                          <div className="flex  justify-between text-sm font-medium leading-6 text-gray-900">
                            <label htmlFor={data.name} className="block">
                              {data.label}
                            </label>
                            <button
                              onClick={() =>
                                getData && getData("individual", data.name)
                              }
                            >
                              Regenerate
                            </button>
                          </div>
                          <textarea
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id={data.name}
                            {...field}
                            placeholder={data.placeholder}
                            aria-invalid={errors[field.name] ? "true" : "false"}
                            aria-describedby={field.name}
                            onChange={(e) => {
                              handleChange(data.name, e.target.value);
                              field.onChange(e.target.value);
                            }}
                            ref={textareaRef}
                            defaultValue={data.defaultValue}
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
                                Add a button with a link to a page, phone
                                number, email or section
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
                                        ...appState.aiContent.hero,
                                        button: {
                                          ...appState.aiContent.hero.button,
                                          show: checked,
                                        },
                                      },
                                    },
                                  }),
                                )
                              }
                              checked={appState.aiContent.hero.button.show}
                            />
                          </div>
                          {appState.aiContent.hero.button.show && (
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
                                      {heroCustomizeFields[3]?.children?.map(
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
                                                      setShowButtonForm({
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
                              {heroCustomizeFields[3]?.children &&
                                heroCustomizeFields[3]?.children.length !==
                                  2 && (
                                  <button
                                    className="ml-auto mt-5 flex items-center gap-2 text-sm text-indigo-800"
                                    onClick={() =>
                                      setShowButtonForm({
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
            )}
          />
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

export default HeroContent;
