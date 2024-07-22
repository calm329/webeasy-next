"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";
import PublishForm from "../form/publish-form";
import SectionForm from "../form/section-form";
import { TSection, TSectionsType } from "@/types";

type TProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  addSectionByTitle: (
    id: string,
    newSection: TSectionsType,
    position: number,
  ) => void;
  triggerSection: {
    section: string;
    position: number;
  };
  editable?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  setShowForm: React.Dispatch<
    SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
  setSectionModal: React.Dispatch<SetStateAction<boolean>>;
  setTriggerSection: React.Dispatch<
    SetStateAction<{ section: string; position: number }>
  >;
  showForm?: {
    form: string;
    edit: string;
    show: boolean;
  };
  setSections: Dispatch<
    SetStateAction<
    TSectionsType[]
    >
  >;
  sections: TSectionsType[];
  id: string;
  initialSections:(() => TSectionsType | null)[]
};
export default function SectionModal(props: TProps) {
  const {
    open,
    setOpen,
    addSectionByTitle,
    triggerSection,
    editable,
    setIsOpen,
    setSection,
    setShowForm,
    setSectionModal,
    setTriggerSection,
    showForm,
    sections,
    setSections,
    id,
    initialSections
  } = props;
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
              <Dialog.Panel className="relative transform  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[1000px] sm:p-6">
                <div className="flex w-full ">
                  <button onClick={() => setOpen(false)} className="ml-auto ">
                    <IoClose size={20} />
                  </button>
                </div>
                <SectionForm
                initialSections={initialSections}
                  addSectionByTitle={addSectionByTitle}
                  triggerSection={triggerSection}
                  setOpen={setOpen}
                  showForm={showForm}
                  setSectionModal={setSectionModal}
                  setShowForm={setShowForm}
                  setTriggerSection={setTriggerSection}
                  editable={editable}
                  setIsOpen={setIsOpen}
                  setSection={setSection}
                  sections={sections}
                  setSections={setSections}
                  id={id}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
