import { Fragment } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  LinkIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
import { FaDesktop } from "react-icons/fa";
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ViewMenu() {
  const matches = useMediaQuery("(max-width: 500px)");
  const isMobile = useMediaQuery("(max-width: 900px)");
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
  return (
    <Menu as="div" className={`relative ml-3 `}>
      <Menu.Button
        className="inline-flex items-center rounded-md  px-3 py-2 text-sm font-semibold  text-black max-sm:text-xs "
        onClick={() =>
          dispatch(updateAppState({ ...appState, openedSlide: null }))
        }
      >
        <div className="flex items-center justify-center gap-1 max-sm:flex-col max-sm:gap-2 sm:hidden">
          <div className="flex">
            <FaDesktop
              className="-ml-0.5 mr-1.5 h-5 w-5 max-sm:m-0"
              aria-hidden="true"
            />
          </div>
          View
        </div>
        <div
          className={`flex  flex-col items-center justify-center gap-2 max-sm:hidden`}
        >
          <FaDesktop className="-ml-0.5 mr-1.5 h-5 w-5 " aria-hidden="true" />
          <div className="flex">
            View
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
        <Menu.Items
          className={`absolute left-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isMobile && "-top-36 left-auto right-0"}`}
        >
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block w-full px-4 py-2 text-left text-sm text-gray-700",
                )}
                onClick={() =>
                  dispatch(updateAppState({ ...appState, view: "Desktop" }))
                }
              >
                Desktop
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block w-full px-4 py-2 text-left text-sm text-gray-700",
                )}
                type="button"
                onClick={() =>
                  dispatch(updateAppState({ ...appState, view: "Tablet" }))
                }
              >
                Tablet
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block w-full px-4 py-2 text-left text-sm text-gray-700",
                )}
                type="button"
                onClick={() =>
                  dispatch(updateAppState({ ...appState, view: "Mobile" }))
                }
              >
                Mobile
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
