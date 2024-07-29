"use client";
import SiteHeader from "@/components/header";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TSectionObject = Array<{
  link: string;
  text: string;
  shortText: string;
}>;

const sections: TSectionObject = [
  {
    link: "/website-builder",
    text: "Build a website from scratch",
    shortText: "Scratch",
  },
  {
    link: "/website-builder/instagram",
    text: "Build a website from Instagram",
    shortText: "Instagram",
  },
  {
    link: "/website-builder/amazon",
    text: "Build an Amazon landing page",
    shortText: "Amazon",
  },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <div className="mx-auto max-w-7xl">
      <SiteHeader showNavigation={true} />

      <div>{children}</div>
    </div>
  );
}
