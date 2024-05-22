"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import AuthModal from "../ui/modal/auth-modal";
import AccountMenu from "./account-menu";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import SettingMenu from "./settings-menu";
import { getUsernameFromPosts } from "@/lib/utils";
import { DebouncedState } from "use-debounce";
import { useMediaQuery } from "usehooks-ts";
import { TMeta, TTemplateName, AppState, TUser } from "@/types";
import { getAllTemplates, getUserById } from "@/lib/fetchers";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { fetchTemplates } from "@/lib/store/slices/template-slice";
import { Fragment } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  LinkIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import WidgetModal from "../ui/modal/widget-modal";
import { useState } from "react";
import ViewMenu from "../menu/view-menu";
import PublishMenu from "../menu/publish-menu";
import BottomToolBar from "../bottom-bar";
import { WidgetDrawer } from "../ui/drawer/widget-drawer";

const navigation = [
  { name: "Customization", href: "#" },
  { name: "Analytics", href: "#" },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type TProps = {
  showNavigation: boolean;
  isAuth?: boolean;
  getData?: (flag?: "init" | "regenerate" | "refresh") => Promise<void>;
  appState?: AppState;
  handleChange?: DebouncedState<(name: string, value: string) => void>;
  setSelectedTemplate?: Dispatch<SetStateAction<TTemplateName>>;
};
export type TTemplate = {
  id: string;
  name: any;
  previewUrl: string;
  createdAt: Date;
  updatedAt: Date;
}[];
export default function SiteHeader(props: TProps) {
  const pathname = usePathname();
  const {
    showNavigation,
    isAuth,
    getData,
    appState,
    handleChange,
    setSelectedTemplate,
  } = props;
  const router = useRouter();
  const { status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const matches = useMediaQuery("(max-width: 500px)");
  const [user, setUser] = useState<TUser>(null);
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<TTemplate | null>(null);
  const [hideNavigation, setHideNavigation] = useState(false);
  const [showWidgetModal, setWidgetModal] = useState(false);
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    try {
      const response = await getAllTemplates();
      const templates = await dispatch(fetchTemplates()).unwrap();
      console.log("templates", templates);
      setTemplates(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();

    switch (pathname) {
      case "/":
      case "/custom":
      case "/amazon":
        setHideNavigation(true);
        break;
      default:
        setHideNavigation(false);
    }
  }, [pathname]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const user = await getUserById();
      setUser({ ...user });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  const isBottomBar = useMediaQuery("(min-width: 900px)");
  const isMobile = useMediaQuery("(max-width: 1024px)");
  useEffect(() => {
    getUserData();
  }, [status]);
  return (
    <header
      className={`${isAuth ? " w-full" : "relative"} border-b-1 z-1 bg-white`}
    >
      {!isBottomBar && (
        <BottomToolBar
          showNavigation={showNavigation}
          appState={appState}
          getData={getData}
          handleChange={handleChange}
          isAuth={isAuth}
          setShowAuthModal={setShowAuthModal}
          setSelectedTemplate={setSelectedTemplate}
        />
      )}
      <nav
        className={`mx-auto flex max-w-[85rem] items-center px-5 ${!isAuth && "justify-between"} p-6 px-0`}
        aria-label="Global"
      >
        <div className="flex items-center gap-x-12 ">
          {isAuth && (
            <button
              onClick={() => router.push("/settings/websites")}
              className="relative  flex  items-center  rounded-md border border-gray-300 bg-white px-2 py-2 text-sm  font-medium  text-gray-700 hover:bg-gray-50"
            >
              <span className="sr-only"> Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              Back
            </button>
          )}
          <Link href="/" className="-m-1.5 p-1.5">
            <Image
              src={"/WebEasy-logo-dark.svg"}
              alt={"Logo"}
              className={`${!isAuth && "h-10  max-sm:w-full"}`}
              width={200}
              height={100}
            />
          </Link>
          <div
            className={`flex lg:gap-x-12 ${hideNavigation && "hidden"} max-lg:hidden`}
          >
            {user &&
              showNavigation &&
              navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className=" mt-2 font-semibold  leading-6 text-gray-900"
                >
                  {item.name}
                </a>
              ))}
          </div>
        </div>
        {isAuth && (
          <>
            <div
              className={`ml-auto ${!isBottomBar && "hidden"}  flex justify-end gap-5 max-sm:ml-5  max-sm:gap-2`}
            >
              {getData && setSelectedTemplate && appState && (
                <SettingMenu
                  getData={getData}
                  handleChange={handleChange ?? undefined}
                  appState={appState}
                  templates={templates}
                  setSelectedTemplate={setSelectedTemplate}
                  setShowAuthModal={setShowAuthModal}
                />
              )}
            </div>
            <div className={` ml-3 flex ${!isBottomBar && "hidden"}`}>
              <span className="hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={() => setWidgetModal(true)}
                >
                  <ChatBubbleLeftIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Widget
                </button>
              </span>
              {isMobile ? (
                <WidgetDrawer open={showWidgetModal} setOpen={setWidgetModal} />
              ) : (
                <WidgetModal open={showWidgetModal} setOpen={setWidgetModal} />
                
              )}
              <ViewMenu />

              <PublishMenu />
            </div>
            {status === "authenticated" ? (
              <div className="max-lg:hidden">
                <AccountMenu user={user} />
              </div>
            ) : (
              <button
                className="ml-5 flex w-20 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 max-lg:hidden"
                onClick={() => {
                  setShowAuthModal(true);
                  setMobileMenuOpen(false);
                }}
              >
                Sign in
              </button>
            )}
          </>
        )}
        <div
          className={`flex ${isAuth && "hidden"} justify-end gap-5  max-lg:hidden`}
        >
          {status === "authenticated" ? (
            <AccountMenu user={user} />
          ) : (
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                setShowAuthModal(true);
                setMobileMenuOpen(false);
              }}
            >
              Sign in
            </button>
          )}
        </div>
        <div
          className={`flex ${isAuth ? "ml-4 w-auto" : "w-full"} justify-end gap-5  lg:hidden`}
        >
          {status === "authenticated" ? (
            <div className="flex">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <button
              className="flex w-20 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                setShowAuthModal(true);
                setMobileMenuOpen(false);
              }}
            >
              Sign in
            </button>
          )}
        </div>
      </nav>
      <AuthModal open={showAuthModal} setOpen={setShowAuthModal} />
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-20  backdrop-blur" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-30 w-80 overflow-y-auto bg-white px-6 py-6  sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                className="h-8 w-auto"
                src="/WebEasy-logo-dark.svg"
                alt=""
                height={32}
                width={200}
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {status === "authenticated" && (
                <div className="py-5 pt-10">
                  <div className="flex gap-3">
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
                    <div>
                      <h2 className="font-semibold">{user?.name}</h2>
                      <p className="text-sm">{user?.email}</p>
                    </div>
                  </div>
                </div>
              )}
              {/* <div className="space-y-1 py-5">
                {user &&
                  navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base  leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
              </div> */}

              {status === "authenticated" ? (
                <>
                  <div className="space-y-1 py-5">
                    <div>
                      <Link
                        href="/settings"
                        className={
                          "-mx-3 block rounded-lg px-3 py-2 text-base  leading-7 text-gray-900 hover:bg-gray-50"
                        }
                      >
                        Account settings
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="#"
                        className={
                          "-mx-3 block rounded-lg px-3 py-2 text-base  leading-7 text-gray-900 hover:bg-gray-50"
                        }
                      >
                        Support
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="#"
                        className={
                          "-mx-3 block rounded-lg px-3 py-2 text-base  leading-7 text-gray-900 hover:bg-gray-50"
                        }
                      >
                        License
                      </Link>
                    </div>
                  </div>
                  <div className="pt-5">
                    <div>
                      <button
                        className={
                          "-mx-3 block w-full rounded-lg px-3  py-2  text-start text-base leading-7 text-gray-900 hover:bg-gray-50"
                        }
                        onClick={async () => {
                          signOut({ callbackUrl: "/" });
                        }}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="pt-5">
                  <button
                    className="-mx-3 block w-full rounded-lg px-3  py-2  text-start text-base leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => {
                      setShowAuthModal(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
