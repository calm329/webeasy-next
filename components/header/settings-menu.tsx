import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon,ChevronUpIcon } from "@heroicons/react/20/solid";
import { signOut, useSession } from "next-auth/react";
import { IoMdSettings } from "react-icons/io";
import CustomizeMetaModal from "../ui/modal/meta-modal";
import { DebouncedState } from "use-debounce";
import { useMediaQuery } from "usehooks-ts";
import { TMeta, TTemplateName, AppState } from "@/types";
import ColorModal from "../ui/modal/color-modal";
import { MetaDrawer } from "../ui/drawer/meta-drawer";
import { ColorDrawer } from "../ui/drawer/color-drawer";
import SelectTemplateModal from "../ui/modal/select-template-modal";
import { TTemplate } from ".";
import SelectTemplateDrawer from "../ui/drawer/select-template-drawer";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type TProps = {
  getData: (flag?: "init" | "regenerate" | "refresh") => Promise<void>;
  handleChange?: DebouncedState<(name: string, value: string) => void>;
  appState: AppState;
  templates: TTemplate | null;
  setSelectedTemplate: Dispatch<SetStateAction<TTemplateName>>;
  setShowAuthModal: Dispatch<SetStateAction<boolean>>;
};

export default function SettingMenu(props: TProps) {
  const {
    getData,
    handleChange,
    appState,
    templates,
    setSelectedTemplate,
    setShowAuthModal,
  } = props;
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const matches = useMediaQuery("(max-width: 900px)");
  const isMobile = useMediaQuery("(max-width: 1024px)");
  return (
    <>
      {isMobile ? (
        <SelectTemplateDrawer
          open={isTemplateOpen}
          setOpen={setIsTemplateOpen}
          templates={templates}
          setSelectedTemplate={setSelectedTemplate}
          getData={getData}
        />
      ) : (
        <SelectTemplateModal
          open={isTemplateOpen}
          setOpen={setIsTemplateOpen}
          templates={templates}
          setSelectedTemplate={setSelectedTemplate}
          getData={getData}
        />
      )}
      {handleChange &&
        (isMobile ? (
          <MetaDrawer
            setOpen={setOpen}
            open={open}
            handleChange={handleChange}
            appState={appState}
          />
        ) : (
          <CustomizeMetaModal
            setOpen={setOpen}
            open={open}
            handleChange={handleChange}
            appState={appState}
          />
        ))}
      {handleChange &&
        (isMobile ? (
          <ColorDrawer
            setOpen={setIsColorOpen}
            open={isColorOpen}
            handleChange={handleChange}
            appState={appState}
          />
        ) : (
          <ColorModal
            setOpen={setIsColorOpen}
            open={isColorOpen}
            handleChange={handleChange}
            appState={appState}
          />
        ))}
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className={`inline-flex w-full items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold max-sm:text-xs text-black `}>
            <div className="flex items-center justify-center gap-2 flex-col sm:hidden">
              <div className="flex">
                <IoMdSettings size={18} />
              </div>
              Settings
            </div>
            <div className="flex gap-2 max-sm:hidden flex-col justify-center items-center">
              <IoMdSettings size={18} />
              <div className="flex ">
              Settings
              {matches ? (
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
          <Menu.Items className={`absolute left-0 z-20 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${matches && "-top-52"} `}>
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
                    onClick={() =>
                      status === "unauthenticated"
                        ? setShowAuthModal(true)
                        : setOpen(true)
                    }
                  >
                    SEO Configuration
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full cursor-pointer px-4 py-2 text-left text-sm",
                    )}
                    onClick={() =>
                      status === "unauthenticated"
                        ? setShowAuthModal(true)
                        : setIsColorOpen(true)
                    }
                  >
                    Customize Colors
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full cursor-pointer px-4 py-2 text-left text-sm",
                    )}
                    onClick={() =>
                      status === "unauthenticated"
                        ? setShowAuthModal(true)
                        : setIsTemplateOpen(true)
                    }
                  >
                    Switch Template
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() =>
                      status === "unauthenticated"
                        ? setShowAuthModal(true)
                        : getData("regenerate")
                    }
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
                    onClick={() =>
                      status === "unauthenticated"
                        ? setShowAuthModal(true)
                        : getData("refresh")
                    }
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
