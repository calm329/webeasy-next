"use client"
import SiteHeader from "@/components/header";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TSectionObject = Array<{
    link:string,
    text:string,
    shortText:string
}>;

const sections: TSectionObject = [
    {
        link:"/website-builder",
        text:"Build a website from scratch",
        shortText:"Scratch"
    },
    {
        link:"/website-builder/instagram",
        text:"Build a website from Instagram",
           shortText:"Instagram"
    },
    {
        link:"/website-builder/amazon",
        text:"Build an Amazon landing page",
           shortText:"Amazon"
    }
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <div className="max-w-7xl mx-auto">
      <SiteHeader showNavigation={true} />
      <div className="flex flex-col justify-center items-center p-10 gap-5">
        <h1 className="mx-auto   text-2xl font-bold">
          Establish your online presence in seconds with WebEasy.ai
        </h1>
        <p className="mx-auto text-xl font-semibold sm:hidden">Build a website from </p>
      </div>
      <div className="">
        <div className="border-b border-gray-200 ">
          <nav className=" flex " aria-label="Tabs">
            {sections.map((section) => (
              <Link
                key={section.link}
                href={section.link}
                className={`group inline-flex items-center border-b-2  px-1 py-4 text-sm font-medium ${pathname === section.link ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} w-1/2 justify-center gap-2`}
                // onClick={() => setSelectedSection(section)}
              >
                <span className="max-sm:hidden">{section.text}</span>
                <span className="sm:hidden">{section.shortText}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
