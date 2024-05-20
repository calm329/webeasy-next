import { useLayoutEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import SiteHeader from "../../../components/header/index";
import Navlink from "../../../components/navlink";
import { useSession } from "next-auth/react";
import PrivateRoute from "@/components/private-route";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute>
      <SiteHeader showNavigation={true} />
      <div className="flex flex-col lg:flex-row mx-auto w-full max-w-7xl">
        <Navlink />
        <div className="p-4 w-full">{children}</div>
      </div>
    </PrivateRoute>
  );
}
