"use client";
import WebsitesForm from "@/components/ui/form/websites-form";
import SelectSourceModal from "@/components/ui/modal/select-source-modal";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdAnalytics, MdDomain } from "react-icons/md";

const tabs = [
  { name: "My Websites", href: "/settings/websites", icon: GlobeAltIcon },
  { name: "Domain", href: "/settings/domain", icon: MdDomain },
  { name: "Analytics", href: "#", icon: MdAnalytics },
];

export default function MyWebsites() {
  const [showMobileMenu, setMobileMenuOpen] = useState(false);
  const [showSelectSourceModal, setSelectSourceModal] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <SelectSourceModal
        open={showSelectSourceModal}
        setOpen={setSelectSourceModal}
      />
      <div className="">
        <div className="border-b border-gray-200 ">
          <nav className=" flex " aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                href={tab.href}
                key={tab.name}
                className={`group inline-flex items-center border-b-2  px-1 py-4 text-sm font-medium ${pathname === tab.href ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} w-1/2 justify-center gap-2`}
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
                  setSelectSourceModal(true);
                  setMobileMenuOpen(false);
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
    </>
  );
}
