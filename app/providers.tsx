"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <Toaster />
        {children}
      </NextUIProvider>
    </SessionProvider>
  );
}
