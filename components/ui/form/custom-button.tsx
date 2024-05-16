import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

type TProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowButtonForm: React.Dispatch<
    React.SetStateAction<{
      edit: string;
      show: boolean;
    }>
  >;
  setBrandCustomizeFields: React.Dispatch<React.SetStateAction<FormField[]>>;
  setHeroCustomizeFields: React.Dispatch<React.SetStateAction<FormField[]>>;
  section: TSection;
  brandCustomizeFields: FormField[];
  heroCustomizeFields: FormField[];
  showButtonForm: {
    edit: string;
    show: boolean;
  };
};
import { IoMdArrowBack } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";
import { FormField, TSection } from "@/types";

const linkTypes = ["External", "Section"];

const CustomButton = (props: TProps) => {
  const {
    setIsOpen,
    setShowButtonForm,
    setBrandCustomizeFields,
    setHeroCustomizeFields,
    brandCustomizeFields,
    heroCustomizeFields,
    section,
    showButtonForm,
  } = props;
  const [loading, setLoading] = useState(false);
  console.log("Custom", showButtonForm);
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (showButtonForm.edit) {
      heroCustomizeFields.forEach((field) => {
        field.children?.forEach((child) => {
          if (child.name === showButtonForm.edit) {
            setData(child);
          }
        });
      });
    }
  }, []);

  return (
    <div className="">
      <div className=" border-b px-4 py-6 sm:px-6">
        <div className="flex items-center justify-between">
          <h2
            className="flex items-center gap-2 text-base font-semibold leading-6 "
            id="slide-over-title"
          >
            <IoMdArrowBack
              onClick={() =>
                setShowButtonForm({
                  edit: "",
                  show: false,
                })
              }
              className="cursor-pointer"
            />
            Button Settings
          </h2>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              className="relative rounded-md  text-black  focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setIsOpen(false)}
            >
              <span className="absolute -inset-2.5"></span>
              <span className="sr-only">Close panel</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <form action="" className="flex flex-col gap-5 p-5">
        <div className="flex flex-col ">
          <label
            htmlFor="linktype"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Link type
          </label>
          <Select value={data?.type ?? ""}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select a Link Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {linkTypes.map((type) => (
                  <SelectItem value={type} key={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col ">
          <label
            htmlFor="label"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Label
          </label>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"label"}
            defaultValue={data?.label ?? ""}
            // onChange={(e) => handleChange(data.name, e.target.value)}
          />
        </div>
        <div className="flex flex-col ">
          <label
            htmlFor="website"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Website
          </label>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"website"}
            defaultValue={data?.link ?? ""}
            // onChange={(e) => handleChange(data.name, e.target.value)}
          />
        </div>
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

export default CustomButton;
