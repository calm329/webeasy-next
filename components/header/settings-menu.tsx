import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { signOut, useSession } from "next-auth/react";
import { IoMdSettings } from "react-icons/io";
import CustomizeMetaModal from "../modal/customize-meta";
import { DebouncedState } from "use-debounce";
import { AppState } from "@/app/(main)/auth/page";
import { useMediaQuery } from "usehooks-ts";
import { TMeta } from "@/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type TProps = {
  getData: (flag?: "init" | "regenerate" | "refresh") => Promise<void>;
  handleChange?: DebouncedState<(name: string, value: string) => void>;
  appState: AppState;
  meta?: TMeta;
};

export default function SettingMenu(props: TProps) {
  const { getData, handleChange, appState, meta } = props;
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery("(max-width: 500px)");
  return (
    <>
      {handleChange && (
        <CustomizeMetaModal
          setOpen={setOpen}
          open={open}
          handleChange={handleChange}
          appState={appState}
          meta={meta}
          getData={getData}
        />
      )}
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 ">
            <IoMdSettings />
            {matches ? "" : "Settings"}
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-white"
              aria-hidden="true"
            />
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
          <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {/* <div className="px-4 py-3">
            <p className="text-sm">Signed in as</p>
            <p className="truncate text-sm font-medium text-gray-900">
              {session?.user?.email}
            </p>
          </div> */}
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full cursor-pointer px-4 py-2 text-left text-sm",
                    )}
                    onClick={() => setOpen(true)}
                  >
                    SEO Configuration
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => getData("regenerate")}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full cursor-pointer px-4 py-2 text-left text-sm",
                    )}
                  >
                    Regenerate the content
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => getData("refresh")}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full cursor-pointer px-4 py-2 text-left text-sm",
                    )}
                  >
                    Refresh Instagram feed
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
