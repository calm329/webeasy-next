"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        <Toaster />
        {children}
      </NextUIProvider>
    </SessionProvider>
  );
}
