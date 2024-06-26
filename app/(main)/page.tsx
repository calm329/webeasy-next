"use client";
import SiteHeader from "@/components/header";
import AmazonHomeTab from "@/components/home/amazon";
import CustomHomeTab from "@/components/home/custom";
import InstagramHomeTab from "@/components/home/instagram";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type TSectionObject = Array<{
  id: "CUSTOM" | "AMAZON" | "INSTAGRAM";
  text: string;
  shortText: string;
}>;

const sections: TSectionObject = [
  {
    id: "CUSTOM",
    text: "Build a Website",
    shortText: "Scratch",
  },
  {
    id: "INSTAGRAM",
    text: "Build an InstaSite",
    shortText: "Instagram",
  },
  {
    id: "AMAZON",
    text: "Build an Amazon landing page",
    shortText: "Amazon",
  },
];

export default function Home() {
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState<
    "CUSTOM" | "AMAZON" | "INSTAGRAM"
  >("CUSTOM");
  return (
    <div className="mx-auto max-w-7xl">
      <SiteHeader showNavigation={true} />
      <div className="flex flex-col justify-center max-sm:pb-5 gap-5 p-10 max-sm:px-5">
        <h1 className="text-6xl font-bold leading-normal max-md:text-3xl max-sm:text-2xl">
          WebEasy.ai,
          <br />
          Instant Online Presence Made Simple
        </h1>
        <p className="mx-auto text-xl font-semibold sm:hidden">
          Build a website from{" "}
        </p>
      </div>
      <div className="">
        <div className="border-b border-gray-200 mx-10 max-sm:mx-5">
          <nav className=" flex " aria-label="Tabs">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setSelectedTab(section.id);
                }}
                className={`group inline-flex  w-fit border-b-2 px-5  py-4  text-sm font-medium max-sm:w-full ${selectedTab === section.id ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} w-1/2 justify-center gap-2 `}
                // onClick={() => setSelectedSection(section)}
              >
                <span className="max-sm:hidden">{section.text}</span>
                <span className="sm:hidden">{section.shortText}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div>
        {selectedTab === "CUSTOM" && <CustomHomeTab />}
        {selectedTab === "AMAZON" && <AmazonHomeTab />}
        {selectedTab === "INSTAGRAM" && <InstagramHomeTab />}
      </div>
    </div>
  );
}
