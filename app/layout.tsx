import type { Metadata } from "next";
import { fontSans } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "WebEasy.AI",
  description: "Welcome to WebEasy.AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", fontSans.className)}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
