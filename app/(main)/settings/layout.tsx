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
      <div className="mx-auto flex w-full max-w-7xl flex-col lg:flex-row">
        <Navlink />
        <div className="w-full p-4">{children}</div>
      </div>
    </PrivateRoute>
  );
}
