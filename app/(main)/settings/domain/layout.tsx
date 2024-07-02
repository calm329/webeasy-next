"use client"
import DomainForm from "@/components/ui/form/domain-form";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdAnalytics, MdDomain } from "react-icons/md";

const tabs = [
  { name: "My Websites", href: "/settings/websites", icon: GlobeAltIcon },
  { name: "Analytics", href: "#", icon: MdAnalytics },
  { name: "Domains", href: "/settings/domain", icon: MdDomain },
];

export default function DomainLayout({children}:{children:React.ReactNode}) {
  const pathname = usePathname();
  return (
    <>
      <div className="">
        <div className="border-b border-gray-200 ">
          <nav className=" flex " aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                href={tab.href}
                key={tab.name}
                className={`group w-fit px-5 inline-flex items-center border-b-2  px-1 py-4 text-sm font-medium ${pathname === tab.href ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} w-1/2 justify-center gap-2`}
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
    </>
  );
}
