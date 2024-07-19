import { FormField, TFields, TSection } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import { DebouncedState } from "use-debounce";
import CustomizePanel from "@/components/customize/panel";
import HeroContent from "@/components/customize/panel/hero";
import BannerContent from "@/components/customize/panel/banner";
import FontPicker from "@/components/font-picker";
import { IoClose } from "react-icons/io5";

type TProps = {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function PageSlideOver(props: TProps) {
  const { open, setIsOpen } = props;

  return (
    <div className="pointer-events-none fixed right-0 top-20  z-20 flex max-w-full  pl-10  sm:pl-16 ">
      <div
        className={`pointer-events-auto w-screen max-w-sm ${open ? "translate-x-0" : "translate-x-full"} transform transition duration-500 ease-in-out sm:duration-700`}
      >
        <div className="mt-2 flex h-fit flex-col justify-between divide-y divide-gray-200 rounded-xl  border bg-white shadow-xl">
          <div className="flex justify-between p-5">
            <h1>Pages</h1>
            <button onClick={() => setIsOpen(false)} className="text-2xl">
              <IoClose />
            </button>
          </div>
          <div className=" p-5 max-h-[600px] h-[55vh] overflow-y-auto transition-all ease-in-out">
            {/* <FontPicker /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageSlideOver;
