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
  meta?: TMeta;
  getData: (flag?: "init" | "regenerate" | "refresh") => Promise<void>;
};
export default function CustomizeMetaModal(props: TProps) {
  const { open, setOpen, handleChange, appState, meta, getData } = props;
  const [metaFields, setMetaFields] = useState<FormField[]>([
    {
      name: "title",
      type: "text",
      label: "Page Title",
      defaultValue: "",
      placeholder: "Enter your Page Title",
      validation: {
        required: true,
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Page Description",
      defaultValue: "",
      placeholder: "Enter your Page Description",
      validation: {
        required: true,
      },
    },
  ]);

  useEffect(() => {
    console.log("MetaData", meta);
    if (meta) {
      const tempFields = metaFields;
      tempFields[0].defaultValue = meta.title;
      tempFields[1].defaultValue = meta.description;
      setMetaFields([...tempFields]);
    }
  }, [meta, open]);
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
                    focusedField={"title"}
                    fields={metaFields}
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
                        toast.success("Your Meta Data has been saved");
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
