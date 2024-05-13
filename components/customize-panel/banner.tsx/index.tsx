import Uploader from "@/components/form/uploader";
import { Switch } from "@/components/ui/switch";
import { FormField, TFields, TSection } from "@/types";
import React, { useEffect, useState } from "react";
import { FiLink } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { RxDragHandleDots2 } from "react-icons/rx";
import { DebouncedState } from "usehooks-ts";
type TProps = {
  section: TSection;
  handleChange: DebouncedState<(name: string, value: string) => void>;
  subdomain: string;
  brandCustomizeFields: FormField[];
  focusedField: TFields;
  setShowButtonForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const BannerContent = (props: TProps) => {
  const {
    section,
    handleChange,
    subdomain,
    brandCustomizeFields,
    focusedField,
    setShowButtonForm,
  } = props;
  const [loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
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
  return (
    <div className="max-h-[calc(-194px + 80vh)] h-[548px] overflow-y-auto py-5 transition-all ease-in-out">
      <form action="" className="flex flex-col gap-5 px-5">
        {brandCustomizeFields.map((data) => {
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
                          // field.onChange(value);
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
                    htmlFor="businessName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {data.label}
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id={"businessName"}
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
                            <MdModeEditOutline color="blue" size={20} />
                            <MdDeleteForever color="red" size={20} />
                          </div>
                        </div>
                      ))}

                      <button className="ml-auto mt-5 flex items-center gap-2 text-sm text-indigo-800">
                        Add Button
                        <IoMdAdd size={20} />
                      </button>
                    </>
                  )}
                </div>
              );
          }
        })}

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

export default BannerContent;
