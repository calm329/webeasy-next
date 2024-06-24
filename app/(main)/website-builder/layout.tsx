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
      <div className="flex flex-col justify-center pt-10  px-10 gap-5">

      </div>
     
      <div>{children}</div>
    </div>
  );
}
