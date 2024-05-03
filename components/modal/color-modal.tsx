"use client";

import { FormField, TMeta } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import DynamicForm from "../form/dynamic-form";
import { checkSiteAvailability, updateSite } from "@/lib/actions";
import { toast } from "sonner";
import { DebouncedState } from "use-debounce";
import { getUsernameFromPosts } from "@/lib/utils";
import { AppState } from "@/app/(main)/auth/page";

type TProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleChange: DebouncedState<(name: string, value: string) => void>;
  appState: AppState;
  getData: (flag?: "init" | "regenerate" | "refresh") => Promise<void>;
};
export default function ColorModal(props: TProps) {
  const { open, setOpen, handleChange, appState, getData } = props;
  const [colorFields, setColorFields] = useState<FormField[]>([
    {
      name: "primary",
      type: "text",
      label: "Primary Color",
      defaultValue: "",
      placeholder: "Enter your Primary Color",
      validation: {
        required: true,
      },
    },
    {
      name: "secondary",
      type: "text",
      label: "Secondary Color",
      defaultValue: "",
      placeholder: "Enter your Secondary Color",
      validation: {
        required: true,
      },
    },
  ]);
  useEffect(() => {
    if (appState.aiContent.colors) {
      const tempColorFields = colorFields;
      tempColorFields[0].defaultValue = appState.aiContent.colors.primary;
      tempColorFields[1].defaultValue = appState.aiContent.colors.secondary;
      setColorFields([...tempColorFields]);
    }
  }, []);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" open={open} className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[480px] sm:p-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    SEO Configuration
                  </h2>
                </div>
                <div>
                  <DynamicForm
                    focusedField={"primary"}
                    fields={colorFields}
                    handler={async (data: any, keys: string[]) => {
                      try {
                        await updateSite(
                          getUsernameFromPosts(
                            JSON.stringify(appState.iPosts),
                          ) || "",
                          data,
                          keys,
                        );
                        getData();
                        toast.success("Your Colors has been saved");
                      } catch (error) {}
                    }} // updateSite}
                    handleChange={handleChange}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
