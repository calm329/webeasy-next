"use client";
import { useLayoutEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import SiteHeader from "../../../components/header/index";
import {
  BellIcon,
  CreditCardIcon,
  CubeIcon,
  FingerPrintIcon,
  UserCircleIcon,
  UsersIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import PrivateRoute from "@/components/private-route";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Invoices", href: "#" },
  { name: "Clients", href: "#" },
  { name: "Expenses", href: "#" },
];
const secondaryNavigation = [
  { name: "General", href: "/settings", icon: UserCircleIcon },
  {
    name: "Security",
    href: "/settings/security",
    icon: FingerPrintIcon,
  },
  { name: "My Websites", href: "/settings/websites", icon: GlobeAltIcon },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <PrivateRoute>
      <SiteHeader showNavigation={true} />
      <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
        <h1 className="sr-only text-black">User Settings</h1>

        <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-10">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={classNames(
                      item.href === pathname
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                      "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6",
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.href === pathname
                          ? "text-indigo-600"
                          : "text-gray-400 group-hover:text-indigo-600",
                        "h-6 w-6 shrink-0",
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {children}
      </div>
    </PrivateRoute>
  );
}
