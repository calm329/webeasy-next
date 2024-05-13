import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { FiLink } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { RxDragHandleDots2 } from "react-icons/rx";

const BannerContent = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="my-5">
      <form action="" className="flex flex-col gap-5">
        <div className="flex justify-between ">
          <h3 className="block text-sm font-medium leading-6 text-gray-900">
            Image
          </h3>
          <Switch />
        </div>
        <div className="flex flex-col border-t pt-5">
          <label
            htmlFor="businessName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Business Name
          </label>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"businessName"}
          />
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
