"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import AuthModal from "../modal/auth-modal";
import AccountMenu from "./account-menu";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import SettingMenu from "./settings-menu";
import { getUsernameFromPosts } from "@/lib/utils";
import { AppState } from "@/app/(main)/auth/page";
import { DebouncedState } from "use-debounce";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useMediaQuery } from "usehooks-ts";
import { TMeta } from "@/types";
import { TUser } from "@/app/(main)/settings/page";
import { getUserById } from "@/lib/fetchers";

const navigation = [
  { name: "Customization", href: "#" },
  { name: "Analytics", href: "#" },
  { name: "Settings", href: "#" },
];

type TProps = {
  showNavigation: boolean;
  isAuth?: boolean;
  getData?: (flag?: "init" | "regenerate" | "refresh") => Promise<void>;
  appState?: AppState;
  handleChange?: DebouncedState<(name: string, value: string) => void>;
  meta?: TMeta;
};

export default function SiteHeader(props: TProps) {
  const { showNavigation, isAuth, getData, appState, handleChange, meta } =
    props;
  const { status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const matches = useMediaQuery("(max-width: 500px)");
  const [user, setUser] = useState<TUser>(null);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <header
      className={`${isAuth ? "fixed w-full" : "relative"} border-b-1 z-10 bg-white`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center ${!isAuth && "justify-between"} p-6  lg:px-8`}
        aria-label="Global"
      >
        <div className="flex items-center gap-x-12">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image
              src={"/WebEasy-logo-dark.svg"}
              alt={"Logo"}
              className={`${!isAuth && "h-full w-full"}`}
              width={150}
              height={100}
            />
          </Link>
          <div className="hidden lg:flex lg:gap-x-12">
            {showNavigation &&
              navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {item.name}
                </a>
              ))}
          </div>
        </div>
        <div className="flex w-full justify-end gap-5">
          {isAuth && (
            <div className="flex gap-5">
              {getData && appState && (
                <SettingMenu
                  getData={getData}
                  handleChange={handleChange ?? undefined}
                  appState={appState}
                  meta={meta}
                />
              )}
              <Link
                href={`https://${getUsernameFromPosts(JSON.stringify(appState?.iPosts))}.webeasy.ai`}
                target="_blank"
                className="text-500 inline-flex w-full items-center justify-center gap-x-1.5 rounded-md border-2 border-gray-400 bg-white px-5 py-1 text-sm font-semibold hover:bg-gray-100"
              >
                <FaExternalLinkAlt />
                {matches ? "" : "Preview"}
              </Link>
            </div>
          )}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        {showNavigation && (
          <div className="hidden w-36 lg:flex">
            {status === "authenticated" ? (
              <AccountMenu user={user} />
            ) : (
              <AuthModal>
                <Link
                  href="#"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </Link>
              </AuthModal>
            )}
          </div>
        )}
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-20 bg-gray-800 opacity-30" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-30 w-80 overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
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
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {status === "authenticated" ? (
                  <AccountMenu user={user} />
                ) : (
                  <AuthModal>
                    <button className=" font-bold text-black  ">Sign in</button>
                  </AuthModal>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
