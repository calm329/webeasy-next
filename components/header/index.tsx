"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import AccountMenu from "./account-menu";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import SettingMenu from "./settings-menu";
import { getUsernameFromPosts } from "@/lib/utils";
import { DebouncedState } from "use-debounce";
import { useMediaQuery } from "usehooks-ts";
import { TMeta, TTemplateName, AppState, TUser } from "@/types";
import { getAllTemplates, getSitesByUserId, getUserById } from "@/lib/fetchers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchTemplates,
  setSelectedTemplate,
  selectedTemplate as ST,
} from "@/lib/store/slices/template-slice";
import { Fragment } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  LinkIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import { FaExternalLinkAlt, FaRedoAlt, FaUndoAlt } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import ViewMenu from "../menu/view-menu";
import PublishMenu from "../menu/publish-menu";
import BottomToolBar from "../bottom-bar";
import { isBot } from "next/dist/server/web/spec-extension/user-agent";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlineDownloadDone } from "react-icons/md";
import { IoMdAdd, IoMdArrowRoundBack } from "react-icons/io";
import {
  getInstagramData,
  isSiteBuilderPage,
  saveState,
} from "@/lib/utils/function";
import {
  appState as AS,
  clearPastAndFuture,
  futureAppState as FAS,
  fetchSiteById,
  loading as LD,
  pastAppState as PAS,
  redo,
  undo,
  updateAppState,
} from "@/lib/store/slices/site-slice";
import AiAssist from "../ai-assist";
import { fetchUser, UsersData as UD } from "@/lib/store/slices/user-slice";
import PageSlideOver from "../ui/slide-over/page-slide";
// import BackContent from "../modal-content/back";
import AuthModalContent from "../modal-content/auth";
import LeaveContent from "../leave-content";
import ResponsiveDialog from "../ui/responsive-dialog";
import {
  ResponsiveDialogProvider,
  useResponsiveDialog,
} from "@/lib/context/responsive-dialog-context";
import WidgetForm from "../ui/form/widget-form";
import { sectionsData as SD } from "@/lib/store/slices/section-slice";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  // { name: "Analytics", href: "#" },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type TProps = {
  showNavigation: boolean;
  isAuth?: boolean;
  handleChange?: (name: string, value: string) => void;
  setIsFontOpen?: Dispatch<SetStateAction<boolean>>;
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
  const { showNavigation, isAuth, handleChange, setIsFontOpen } = props;
  const router = useRouter();
  const { status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const matches = useMediaQuery("(max-width: 500px)");
  const [loading, setLoading] = useState(false);
  const [hideNavigation, setHideNavigation] = useState(false);
  const [showPagesPanel, setShowPagesPanel] = useState(false);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
  const pastAppState = useAppSelector(PAS);
  const futureAppState = useAppSelector(FAS);
  const selectedTemplate = useAppSelector(ST);
  const [templates, setTemplates] = useState<TTemplate | null>(null);
  const userData = useAppSelector(UD);
  const fetchData = async () => {
    try {
      const temp = await dispatch(fetchTemplates()).unwrap();
      !selectedTemplate && dispatch(setSelectedTemplate(temp[0]));
      setTemplates(temp);
    } catch (error) {}
  };
  console.log("userData", userData);
  useEffect(() => {
    !templates && fetchData();

    switch (pathname) {
      case "/":
      case "/website-builder":
      case "/website-builder/instagram":
      case "/website-builder/amazon":
        setHideNavigation(true);
        break;
      default:
        setHideNavigation(false);
    }
  }, [pathname]);

  const getUserData = async () => {
    setLoading(true);
    try {
      // const user = await getUserById();
      const res = await dispatch(fetchUser()).unwrap();

      // setUser({ ...user });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (session?.user?.email) {
    !userData && getUserData();
    // }
  }, [status]);
  const isBottomBar = useMediaQuery("(min-width: 900px)");
  const { openDialog, closeDialog } = useResponsiveDialog();
  const sections = useAppSelector(SD);
  return (
    <header
      className={`${isAuth ? " w-full" : "relative"} border-b-1 z-1 bg-white`}
    >
      <ResponsiveDialog id="auth" dismissible={false} showClose={true}>
        <AuthModalContent />
      </ResponsiveDialog>
      <ResponsiveDialog id="leave" showClose={true}>
        <LeaveContent />
      </ResponsiveDialog>
      <ResponsiveDialog id="widget" showClose={true}>
        <WidgetForm />
      </ResponsiveDialog>

      {isSiteBuilderPage(pathname) &&
        !appState?.generate?.generating &&
        setIsFontOpen && (
          <BottomToolBar
            showNavigation={showNavigation}
            // appState={appState}
            handleChange={handleChange}
            setIsFontOpen={setIsFontOpen}
          />
        )}

      <PageSlideOver setIsOpen={setShowPagesPanel} open={showPagesPanel} />

      <nav>
        {!isBottomBar && isSiteBuilderPage(pathname) && (
          <div className="fixed top-0 z-10 flex w-full justify-around border-b bg-white pb-5 pt-5">
            <button className="flex flex-col items-center">
              <IoMdAdd size={20} />
              {/* Undo */}
            </button>
            <button
              className={`flex flex-col items-center ${pastAppState.length === 0 && "text-gray-500"}`}
              onClick={() => dispatch(undo())}
              disabled={pastAppState.length === 0}
            >
              <FaUndoAlt />
              {/* Undo */}
            </button>
            <button
              className={`flex flex-col items-center ${futureAppState.length === 0 && "text-gray-500"}`}
              onClick={() => dispatch(redo())}
              disabled={futureAppState.length === 0}
            >
              <FaRedoAlt />
              {/* Redo */}
            </button>
            <button className="flex flex-col items-center">
              <ImCancelCircle
                size={18}
                onClick={() => {
                  if (pathname.startsWith("/custom")) {
                    if (searchParams.get("id")) {
                      dispatch(
                        fetchSiteById({
                          id: searchParams.get("id") ?? "",
                        }),
                      );
                    }
                  } else if (pathname.startsWith("/amazon")) {
                    if (searchParams.get("site_id")) {
                      dispatch(
                        fetchSiteById({
                          id: searchParams.get("site_id") ?? "",
                        }),
                      );
                    }
                  } else {
                    getInstagramData({
                      appState,
                      dispatch,
                      searchParams,
                    });
                  }
                  dispatch(clearPastAndFuture());
                }}
              />
              {/* Cancel */}
            </button>
            <button className="flex flex-col items-center">
              <MdOutlineDownloadDone
                size={20}
                onClick={() => {
                  if (status === "authenticated") {
                    saveState(
                      appState,
                      dispatch,
                      selectedTemplate?.id ?? "",
                      sections,
                    ).then(() => dispatch(clearPastAndFuture()));
                  } else {
                    openDialog("auth");
                  }
                }}
              />
              {/* Done */}
            </button>
          </div>
        )}
        <div
          className={`mx-auto flex max-w-[85rem] items-center px-5 ${!isAuth && "justify-between"} p-5 px-0 ${!isBottomBar && isSiteBuilderPage(pathname) && " mt-14 w-full max-w-full justify-between"}`}
          aria-label="Global"
        >
          <div className="flex items-center gap-x-12 ">
            <button
              onClick={async () => {
                if (status === "authenticated") {
                  const sites = await getSitesByUserId();
                  const hasSites = sites.length > 0;
                  const isSettingsPage = pathname.startsWith("/dashboard");

                  if (isSiteBuilderPage(pathname)) {
                    if (
                      futureAppState.length === 0 &&
                      pastAppState.length === 0
                    ) {
                      router.push("/");
                    } else {
                      openDialog("leave");
                    }
                  } else {
                    if (isSettingsPage) {
                      if (hasSites) {
                        // Stay on the settings page if the user has sites
                        return;
                      } else {
                        router.push("/");
                      }
                    } else {
                      router.push("/");
                    }
                  }
                } else {
                  // User is not authenticated, redirect to the general home page
                  router.push("/");
                }
              }}
            >
              <Image
                src={"/WebEasy-logo-dark.svg"}
                alt={"Logo"}
                className={`${!isAuth && "h-[2.9rem] max-sm:w-full"}`}
                width={200}
                height={100}
              />
            </button>

            {/* <div className={`flex max-lg:hidden  lg:gap-x-12`}>
              {status === "authenticated" &&
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
            </div> */}
          </div>
          {isAuth && isBottomBar && status === "authenticated" && (
            <div className="ml-5 flex gap-2">
              <div
                className="flex items-center justify-center gap-5 rounded border border-gray-400 px-5 py-2 pr-2"
                onClick={() => setShowPagesPanel(true)}
              >
                <span>Home</span>
                <span className="h-5 w-5 text-sm">
                  <ChevronDownIcon />
                </span>
              </div>
              <div className="rounded border border-gray-400 px-2 py-2">
                <IoMdAdd size={20} />
              </div>
            </div>
          )}
          {isAuth && (
            <>
              <div
                className={`ml-auto ${!isBottomBar && "hidden"}  flex justify-end gap-5 max-sm:ml-5  max-sm:gap-2 `}
              >
                {appState && setIsFontOpen && (
                  <SettingMenu
                    handleChange={handleChange ?? undefined}
                    appState={appState}
                    templates={templates}
                    setIsFontOpen={setIsFontOpen}
                  />
                )}
              </div>
              <div className={` ml-3 mr-5 flex ${!isBottomBar && "hidden"}`}>
                {status === "authenticated" && (
                  <span className="hidden sm:block">
                    <button
                      type="button"
                      className="inline-flex flex-col items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-black"
                      onClick={() => {
                        openDialog("widget");
                        dispatch(
                          updateAppState({ ...appState, openedSlide: null }),
                        );
                      }}
                    >
                      <ChatBubbleLeftIcon
                        className="-ml-0.5 mr-1.5 h-5 w-5 "
                        aria-hidden="true"
                      />
                      Widget
                    </button>
                  </span>
                )}

                <ViewMenu />

                <PublishMenu />
                {status === "authenticated" && <AiAssist />}
              </div>
              <div className="-mt-4">
                {status === "authenticated" && (
                  <button
                    className="max-lg:hidden"
                    onClick={() =>
                      dispatch(
                        updateAppState({ ...appState, openedSlide: null }),
                      )
                    }
                  >
                    <AccountMenu user={userData} />
                  </button>
                )}
                {status === "unauthenticated" && (
                  <button
                    className="ml-5 flex w-20 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 max-lg:hidden"
                    onClick={() => {
                      openDialog("auth");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign in
                  </button>
                )}
              </div>
            </>
          )}
          <div
            className={`flex ${isAuth && "hidden"} justify-end gap-5  max-lg:hidden`}
          >
            {status === "authenticated" && <AccountMenu user={userData} />}

            {status === "unauthenticated" && (
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  openDialog("auth");
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
            {status === "authenticated" && (
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
            )}
            {status === "unauthenticated" && (
              <button
                className="flex w-20 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  openDialog("auth");
                  setMobileMenuOpen(false);
                }}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </nav>
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
                    {userData?.image ? (
                      <Image
                        src={userData?.image}
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
                      <h2 className="font-semibold">{userData?.name}</h2>
                      <p className="text-sm">{userData?.email}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="space-y-1 py-5">
                {status === "authenticated" &&
                  navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base  leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
              </div>

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
                      openDialog("auth");
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
