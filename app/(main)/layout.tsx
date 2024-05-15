import SiteHeader from "@/components/header";
import StoreProvider from "@/components/store-provider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StoreProvider>{children}</StoreProvider>;
}
