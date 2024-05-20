import { Dialog, Transition } from "@headlessui/react";
import React, {
  Dispatch,
  Fragment,
  ReactElement,
  SetStateAction,
  useState,
} from "react";
import { FaAmazon, FaInstagram } from "react-icons/fa";
import { FormField, TFields, TUser } from "@/types";

import Image from "next/image";
import Link from "next/link";

type TProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
};

export default function SelectSourceModal(props: TProps) {
  const { setOpen, open } = props;

  // const enhancedChild = React.cloneElement(children as ReactElement, {
  //   onClick: () => setOpen(true),
  // });

  return (
    <>
      {/* {enhancedChild} */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={setOpen}>
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
                    <Image
                      className="mx-auto h-10 w-auto"
                      src="/WebEasy-logo-dark.svg"
                      alt="Your Company"
                      height={40}
                      width={200}
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      Select the content source
                    </h2>

                    <div className="mt-6 grid grid-cols-1 gap-4">
                      <Link
                        href="#"
                        className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                      >
                        <FaInstagram className="size-5 text-[#4267B2]" />
                        <span className="text-sm font-semibold leading-6">
                          Instagram
                        </span>
                      </Link>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-4">
                      <Link
                        href={`${process.env.INSTAGRAM_API_AUTH_ENDPOINT}authorize?client_id=${process.env.NEXT_PUBLIC_FB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_FB_REDIRECT_URL}&scope=user_profile,user_media&response_type=code`}
                        className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                      >
                        <FaAmazon className="size-5" />
                        <span className="text-sm font-semibold leading-6">
                          Amazon
                        </span>
                      </Link>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-4">
                      <Link
                        href="#"
                        className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                      >
                        <span className="text-sm font-semibold leading-6">
                          Custom
                        </span>
                      </Link>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
