import { Fragment } from "react";
import { ChevronDownIcon, LinkIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}


export default function ViewMenu() {
  const matches = useMediaQuery("(max-width: 500px)");
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <Menu
      as="div"
      className={`relative ml-3 `}
    >
      <Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <div className="flex items-center justify-center gap-1 max-sm:flex-col sm:hidden">
          <div className="flex">
            <LinkIcon
              className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />

            <ChevronUpIcon
              className="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          View
        </div>
        <div className={`flex  max-sm:hidden` }>
          <LinkIcon
            className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          View
          <ChevronUpIcon
            className="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                href="#"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700",
                )}
              >
                Desktop
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href="#"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700",
                )}
              >
                Tablet
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href="#"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700",
                )}
              >
                Mobile
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
