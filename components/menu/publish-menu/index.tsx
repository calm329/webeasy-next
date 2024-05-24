import { Fragment } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useMediaQuery } from "usehooks-ts";
import { useAppSelector } from "@/lib/store/hooks";
import { appState as AS } from "@/lib/store/slices/site-slice";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PublishMenu() {
  const matches = useMediaQuery("(max-width: 500px)");
  const isMobile = useMediaQuery("(max-width: 900px)");
  const appState = useAppSelector(AS);
  return (
    <Menu as="div" className={`relative ml-3`}>
      <Menu.Button className={`inline-flex items-center rounded-md  px-3 py-2 text-sm font-semibold max-sm:bg-transparent max-sm:text-xs text-black max-sm:shadow-none max-sm:hover:bg-transparent`}>
        <div className="flex items-center justify-center gap-1 max-sm:flex-col max-sm:gap-3 sm:hidden">
          <div className="flex">
            <FaExternalLinkAlt
              className="-ml-0.5 mr-1.5 h-4 w-4 max-sm:m-0"
              aria-hidden="true"
            />

            {/* <ChevronUpIcon
              className="-mr-1 ml-1.5 h-5 w-5 "
              aria-hidden="true"
            /> */}
          </div>
          Publish
        </div>
        <div className={`flex  max-sm:hidden flex-col items-center justify-center gap-3`}>
          <FaExternalLinkAlt
            className="mr-2 h-4 w-4 "
            aria-hidden="true"
          />
          <div className="flex">
          Publish
          {isMobile ? (
            <ChevronUpIcon
              className="-mr-1 ml-1.5 h-5 w-5 "
              aria-hidden="true"
            />
          ) : (
            <ChevronDownIcon
              className="-mr-1 ml-1.5 h-5 w-5 "
              aria-hidden="true"
            />
          )}
          </div>
         
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
        <Menu.Items className={`absolute left-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isMobile && "-top-28 right-0 left-auto"}`}>
          <Menu.Item>
            {({ active }) => (
              <Link
                href={"/"+appState.subdomain}
                target="_blank"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700",
                )}
              >
                Preview
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href={"https://" + appState.subdomain + ".webeasy.ai"}
                target="_blank"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700",
                )}
              >
                Publish Product
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
