import { AppState } from "@/app/(main)/auth/page";
import { updateSite } from "@/lib/actions";
import { generateZodSchema, getUsernameFromPosts } from "@/lib/utils";
import { FormField, TSection } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DebouncedState, useDebouncedCallback } from "use-debounce";
import { infer, object, string, z } from "zod";
import DynamicForm from "../form/dynamic-form";

type TProps = {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: AppState;
  section: TSection;
  handleChange: DebouncedState<(name: string, value: string) => void>;
  subdomain: string;
  brandCustomizeFields: FormField[];
  heroCustomizeFields: FormField[];
};

function SlideOver(props: TProps) {
  const {
    open,
    setIsOpen,
    data,
    section,
    handleChange,
    subdomain,
    heroCustomizeFields,
    brandCustomizeFields,
  } = props;
  console.log("slideOver",section)
  return (
    <div className="pointer-events-none fixed inset-y-0 right-0 z-10 flex max-w-full pl-10 sm:pl-16">
      <div
        className={`pointer-events-auto w-screen max-w-sm ${open ? "translate-x-0" : "translate-x-full"} transform transition duration-500 ease-in-out sm:duration-700`}
      >
        <div
          className="flex h-fit pb-10 flex-col justify-between divide-y divide-gray-200 border  bg-white shadow-xl rounded-xl mt-2"
          // onSubmit={handleSubmit(onSubmit)}
        >
          <div className=" overflow-y-auto">
            <div className=" px-4 py-6 sm:px-6">
              <div className="flex items-center justify-between">
                <h2
                  className="text-base font-semibold leading-6 "
                  id="slide-over-title"
                >
                  {section}
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
            <div className="flex flex-1 flex-col justify-between">
              <div className="divide-y divide-gray-200 px-4 sm:px-6">
                {section === "Banner" && (
                  <DynamicForm
                    // title={`Section ${section}`}
                    fields={brandCustomizeFields}
                    handler={async (data: any, keys: string[]) => {
                      try {
                        await updateSite(subdomain, data, keys);
                      } catch (error) {
                        toast.success(
                          "Your brand customization has been saved",
                        );
                      }
                    }} // updateSite}
                    handleChange={handleChange}
                  />
                )}
                {section === "Hero" && (
                  <DynamicForm
                    // title={`Section ${section}`}
                    fields={heroCustomizeFields}
                    handler={async (data: any, keys: string[]) => {
                      try {
                        await updateSite(subdomain, data, keys);
                      } catch (error) {
                        toast.success(
                          "Your brand customization has been saved",
                        );
                      }
                    }} // updateSite}
                    handleChange={handleChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideOver;
