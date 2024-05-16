"use client";
import { FormField } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import { SketchPicker } from "react-color";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { IoClose } from "react-icons/io5";

type TProps = {
  field: ControllerRenderProps<
    FieldValues,
    | "logo"
    | "title"
    | "name"
    | "businessName"
    | "ctaLink"
    | "imageUrl"
    | "heading"
    | "subheading"
    | "cta"
    | "primary"
    | "secondary"
    | "avatar"
    | "email"
    | "description"
  >;
  getValues: any;
  f: FormField;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleChange: (name: string, value: string) => void;
};
export default function SelectColorModal(props: TProps) {
  const { field, getValues, setOpen, open, f, handleChange } = props;
  const [selectedColor, setSelectedColor] = useState("");

  const saveColor = () => {
    handleChange(f.name, selectedColor);
    field.onChange(selectedColor);
    setOpen(false);
  };

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
              <Dialog.Panel className="relative flex  transform flex-col items-center justify-center rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[480px] sm:p-6">
                <button
                  onClick={() => setOpen(false)}
                  className="ml-auto text-2xl"
                >
                  <IoClose />
                </button>
                <SketchPicker
                  {...field}
                  color={selectedColor}
                  onChange={(value) => setSelectedColor(value.hex)}
                />
                <div className="ml-auto mt-5 flex gap-5">
                  <button
                    onClick={saveColor}
                    className={`ml-auto flex w-16 items-center justify-center gap-2 rounded-md bg-indigo-600 px-3  py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    Ok
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className={`ml-auto  flex w-16 items-center justify-center gap-2 rounded-md  border-2 bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
