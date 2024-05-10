"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Toaster
        position="top-right"
        richColors
        closeButton={true}
        toastOptions={{
          classNames: {
            closeButton: "ml-auto right-0 mt-3",
          },
        }}
      />
      {children}
    </SessionProvider>
  );
}
