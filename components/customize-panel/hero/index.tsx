import React from "react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { FiLink } from "react-icons/fi";
import { MdModeEditOutline, MdDeleteForever } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { Switch } from "@/components/ui/switch";

const HeroContent = () => {
  return (
    <div className="my-5">
      <form action="" className="flex flex-col gap-5">
        <div className="flex flex-col">
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
        <div className="flex justify-between border-t pt-5">
          <h3 className="block text-sm font-medium leading-6 text-gray-900">
            Image
          </h3>
          <Switch />
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
            <Switch />
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
        </div>
      </form>
    </div>
  );
};

export default HeroContent;
