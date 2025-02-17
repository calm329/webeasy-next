"use client";

import { AppState, FormField, TMeta } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import CustomizeColor from "../../customize/color/index";

type TProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleChange: (name: string, value: string) => void;
  appState: AppState;
};
export default function ColorModal(props: TProps) {
  const { open, setOpen, handleChange, appState } = props;
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
    if (appState?.aiContent?.colors) {
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
              <Dialog.Panel className="relative transform  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[480px] sm:p-6">
                <CustomizeColor
                  appState={appState}
                  handleChange={handleChange}
                  open={open}
                  setOpen={setOpen}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
