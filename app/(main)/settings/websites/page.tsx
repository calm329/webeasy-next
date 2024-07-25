"use client";
import WebsitesForm from "@/components/ui/form/websites-form";
import SelectSourceContent from "@/components/ui/modal/select-source-modal";
import SelectSourceModal from "@/components/ui/modal/select-source-modal";
import { useResponsiveDialog } from "@/lib/context/responsive-dialog-context";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdAnalytics, MdDomain } from "react-icons/md";
import ResponsiveDialog from "@/components/ui/responsive-dialog";

const tabs = [
  { name: "My Websites", href: "/dashboard", icon: GlobeAltIcon },
  { name: "Analytics", href: "#", icon: MdAnalytics },
  { name: "Domains", href: "/dashboard/domain", icon: MdDomain },
];

export default function MyWebsites() {
  const { openDialog } = useResponsiveDialog();
  const pathname = usePathname();
  return (
    <div className="max-w-[83.5rem] mb-10 mx-auto px-5">
      <ResponsiveDialog id="source">
        <SelectSourceContent />
      </ResponsiveDialog>
      <div className="">
        <div className="border-b border-gray-200 ">
          <nav className=" flex " aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                href={tab.href}
                key={tab.name}
                className={`group inline-flex w-fit items-center border-b-2 px-5   py-4 text-sm font-medium ${pathname === tab.href ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} w-1/2 justify-center gap-2`}
                // onClick={() => {
                //   setSelectedSection(section.name);
                //   setPage(1);
                // }}
              >
                {/* {tab.icon} */}
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <main className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-300 bg-white p-5 shadow">
        <div className="mx-auto max-w-2xl space-y-16 max-lg:m-0 max-lg:max-w-full sm:space-y-20 lg:mx-0 lg:max-w-none">
          <div>
            <div className="flex w-full justify-between">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                My Websites
              </h2>
              <button
                type="button"
                onClick={() => {
                  openDialog("source");
                }}
                className="text-bold flex items-center justify-center rounded-lg border bg-indigo-500 px-5 py-2 text-white"
              >
                <IoMdAdd /> Add Website
              </button>
            </div>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              This contains all the information about your websites.
            </p>
            <WebsitesForm />
          </div>
        </div>
      </main>
    </div>
  );
}
