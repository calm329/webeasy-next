"use client";
import { AppStore, store, persistor } from "@/lib/store";
import { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ResponsiveDialogProvider } from "../../lib/context/responsive-dialog-context/index";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store;
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate persistor={persistor}>
        <ResponsiveDialogProvider>{children}</ResponsiveDialogProvider>
      </PersistGate>
    </Provider>
  );
}
