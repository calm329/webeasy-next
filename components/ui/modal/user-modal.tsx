"use client";

import { FormField, TFields, TMeta, TUser } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import DynamicForm from "../form/dynamic-form";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import UpdateUser from "../form/update-user";

type TProps = {
  open: TFields;
  setOpen: Dispatch<SetStateAction<TFields>>;
  user: TUser;
  getUserData: () => Promise<void>;
};
export default function UserModal(props: TProps) {
  const { open, setOpen, user, getUserData } = props;
  const { data: session, update } = useSession();

  return (
    <Transition.Root show={!!open} as={Fragment}>
      <Dialog
        as="div"
        open={!!open}
        className="relative z-10"
        onClose={() => setOpen(null)}
      >
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all max-md:w-full sm:my-8 sm:w-full sm:max-w-[480px] sm:p-6">
                <UpdateUser
                  getUserData={getUserData}
                  open={open}
                  setOpen={setOpen}
                  user={user}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
