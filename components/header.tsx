"use client";

import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import AuthModal from "./modal/auth-modal";
import { signOut, useSession } from "next-auth/react";

export default function SiteHeader() {
  const { data: session, status } = useSession();

  return (
    <Navbar isBordered className="justify-start" maxWidth="full">
      <NavbarBrand>
        <p className="text-2xl font-bold">WebEasy</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          {status === "authenticated" ? (
            <Button color="primary" onClick={() => signOut()}>
              Sign Out
            </Button>
          ) : (
            <AuthModal>
              <Button color="primary">Sign In</Button>
            </AuthModal>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
