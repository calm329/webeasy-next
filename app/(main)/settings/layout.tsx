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
      <div className="flex flex-row">
        <Navlink />
        {children}
      </div>
    </PrivateRoute>
  );
}
