"use client";

import { TUser } from "@/types";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { useMediaQuery } from "usehooks-ts";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type TProps = {
  user: TUser;
};

export default function AccountMenu(props: TProps) {
  const { data: session } = useSession();
  const { user } = props;

  const match = useMediaQuery("(max-width:1024px)");
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-5 gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
          {user && (
            <>
              {user?.image ? (
                <Image
                  src={user?.image}
                  className=" aspect-1 h-[45px] w-[45px] rounded-full object-cover text-gray-900"
                  alt=""
                  width={50}
                  height={50}
                />
              ) : (
                <Image
                  src={"/Default_pfp.png"}
                  className="aspect-1 h-[45px] w-[45px] rounded-full object-cover text-gray-900"
                  alt=""
                  width={50}
                  height={50}
                />
              )}
              <ChevronDownIcon
                className="-mr-1 mt-2.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </>
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute ${
            match ? "left-0" : "right-0"
          }  z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <div className="px-4 py-3">
            <p className="text-sm">Signed in as</p>
            <p className="truncate text-sm font-medium text-gray-900">
              {session?.user?.email}
            </p>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/settings"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm",
                  )}
                >
                  Account settings
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm",
                  )}
                >
                  Support
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm",
                  )}
                >
                  License
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm",
                  )}
                  onClick={async () => {
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
