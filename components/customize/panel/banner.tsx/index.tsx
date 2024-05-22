import Uploader from "@/components/ui/form/uploader";
import { Switch } from "@/components/ui/switch";
import { updateSite } from "@/lib/actions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";
import { generateZodSchema } from "@/lib/utils";
import { FormField, TFields, TSection } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
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
type TProps = {
  section: TSection;
  handleChange: DebouncedState<(name: string, value: string) => void>;
  subdomain: string;
  brandCustomizeFields: FormField[];
  focusedField: TFields;
  setBrandCustomizeFields: React.Dispatch<React.SetStateAction<FormField[]>>;
  setShowButtonForm: React.Dispatch<
    React.SetStateAction<{
      edit: string;
      show: boolean;
    }>
  >;
};

const BannerContent = (props: TProps) => {
  const appState = useAppSelector(AS);
  const {
    section,
    handleChange,
    subdomain,
    brandCustomizeFields,
    focusedField,
    setShowButtonForm,
    setBrandCustomizeFields,
  } = props;
  const [loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const dispatch = useAppDispatch();
  const zodSchema = generateZodSchema(brandCustomizeFields);
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
  console.log("error", errors);
  const onSubmit: SubmitHandler<any> = async (data) => {
    setLoading(true);

    try {
      const response = await fetch(data["ctaLink"], { mode: "no-cors" });
      setIsLinkInValid(false);

      await updateSite(
        subdomain,
        data,
        brandCustomizeFields.map((f) => f.name as string),
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
  useEffect(() => {
    brandCustomizeFields.forEach((field) => {
      if (field.type === "image") {
        setShowImage(field.show ?? false);
      }
      if (field.type === "button") {
        setShowButtons(field.show ?? false);
      }
    });
  }, []);

  console.log("values", getValues());

  useEffect(() => {
    for (const f of brandCustomizeFields) {
      // if (f.type === "button") {
      //   f.children?.forEach((child) =>
      //     setValue(child.name, child.defaultValue),
      //   );
      // } else {
      setValue(f.name, f.defaultValue);
      // }
    }
  }, [brandCustomizeFields]);

  const handleDeleteButton = (name: string) => {
    const updatedBrandCustomizeFields = brandCustomizeFields.map((field) => {
      if (field.name === "cta" && Array.isArray(field.children)) {
        // Filter out the child with the provided name
        field.children = field.children.filter((child) => child.name !== name);
      }
      return field;
    });
    console.log(updatedBrandCustomizeFields);
    setBrandCustomizeFields(updatedBrandCustomizeFields);
  };
  return (
    <div className="max-h-[calc(-194px + 80vh)] h-[548px] overflow-y-auto py-5 transition-all ease-in-out">
      <form
        action=""
        className="flex flex-col gap-5 px-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {brandCustomizeFields.map((data) => (
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
                          {appState.aiContent.banner.logo.show && (
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
                                  // {...field}
                                  placeholder={data.placeholder}
                                  aria-invalid={
                                    errors[field.name] ? "true" : "false"
                                  }
                                  aria-describedby={field.name}
                                  onChange={(e) => {
                                    handleChange("alt", e.target.value);
                                    // field.onChange(e.target.value);
                                  }}
                                  defaultValue={data.alt}
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
                            htmlFor="businessName"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            {data.label}
                          </label>
                          <input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...field}
                            placeholder={data.placeholder}
                            aria-invalid={errors[field.name] ? "true" : "false"}
                            aria-describedby={field.name}
                            onChange={(e) => {
                              handleChange(data.name, e.target.value);
                              field.onChange(e.target.value);
                            }}
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
                              {data.children?.map((child) => (
                                <div
                                  className="flex items-center justify-between "
                                  key={child.name}
                                >
                                  <div className="flex items-center gap-2">
                                    <RxDragHandleDots2 />
                                    <FiLink />
                                    <h4>{child.label}</h4>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MdModeEditOutline
                                      color="blue"
                                      size={20}
                                      onClick={() =>
                                        setShowButtonForm({
                                          edit: child.name,
                                          show: true,
                                        })
                                      }
                                    />
                                    <MdDeleteForever
                                      color="red"
                                      size={20}
                                      onClick={() =>
                                        handleDeleteButton(child.name)
                                      }
                                    />
                                  </div>
                                </div>
                              ))}

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

export default BannerContent;
