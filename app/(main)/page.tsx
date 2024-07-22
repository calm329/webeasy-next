"use client";
import SiteHeader from "@/components/header";
import AmazonHomeTab from "@/components/home/amazon";
import CustomHomeTab from "@/components/home/custom";
import InstagramHomeTab from "@/components/home/instagram";
import { getUserById } from "@/lib/fetchers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ResponsiveDialog from "../../components/ui/responsive-dialog/index";
import PasswordForm from "@/components/ui/form/password-form";
import { useResponsiveDialog } from "@/lib/context/responsive-dialog-context";

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
  const { openDialog } = useResponsiveDialog();
  const [selectedTab, setSelectedTab] = useState<
    "CUSTOM" | "AMAZON" | "INSTAGRAM"
  >("CUSTOM");
  useEffect(() => {
    getUserById().then((user) => {
      if (user) {
        if (!user?.password) {
          openDialog("password");
        }
      }
    });
  }, []);
  return (
    <div className="mx-auto max-w-7xl">
      <ResponsiveDialog id="password">
        <PasswordForm />
      </ResponsiveDialog>
      <SiteHeader showNavigation={true} />
      <div className="flex flex-col justify-center  gap-8 p-5 max-sm:py-0">
        <h1 className="text-6xl font-bold leading-normal max-md:text-3xl max-sm:text-2xl">
          Instant Online Presence Made Easy
        </h1>
        <p className="mx-auto text-xl font-semibold sm:hidden">
          Build a website from{" "}
        </p>
      </div>
      <div className="">
        <div className="mx-10 border-b border-gray-200 max-sm:mx-5">
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
