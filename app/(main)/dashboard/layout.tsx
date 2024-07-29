"use client";
import WebsitesForm from "@/components/ui/form/websites-form";
import SelectSourceContent from "@/components/ui/modal/select-source-modal";
import SelectSourceModal from "@/components/ui/modal/select-source-modal";
import { useResponsiveDialog } from "@/lib/context/responsive-dialog-context";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdAnalytics, MdDomain } from "react-icons/md";
import ResponsiveDialog from "@/components/ui/responsive-dialog";
import SiteHeader from "../../../components/header/index";

const tabs = [
  { name: "My Websites", href: "/dashboard", icon: GlobeAltIcon },
  { name: "Analytics", href: "#", icon: MdAnalytics },
  { name: "Domains", href: "/dashboard/domain", icon: MdDomain },
];

export default function MyWebsites({ children }: { children: ReactNode }) {
  const { openDialog } = useResponsiveDialog();
  const pathname = usePathname();
  return (
    <>
      <SiteHeader showNavigation={true} />
      <div className="mx-auto mb-10 max-w-[83.5rem] px-5">
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
        {children}
      </div>
    </>
  );
}
