import React, { createContext, useContext, ReactNode, useState } from "react";

// Define the types of dialogs
export type DialogName =
  | "leave"
  | "auth"
  | "back"
  | "widget"
  | "password"
  | "delete"
  | "deleteUser"
  | "domain"
  | "imageListing"
  | "publish"
  | "updateUser"
  | "selectTemplate";

// Create a type for the dialog state
type DialogState = Record<DialogName, boolean>;

// Interface for the context props
interface ResponsiveDialogContextProps {
  dialogState: DialogState;
  openDialog: (id: DialogName) => void;
  closeDialog: (id: DialogName) => void;
}

// Create the context
const ResponsiveDialogContext = createContext<
  ResponsiveDialogContextProps | undefined
>(undefined);

// Custom hook to use the dialog context
export const useResponsiveDialog = (): ResponsiveDialogContextProps => {
  const context = useContext(ResponsiveDialogContext);
  if (!context) {
    throw new Error(
      "useResponsiveDialog must be used within a ResponsiveDialogProvider",
    );
  }
  return context;
};

// Props for the provider component
interface ResponsiveDialogProviderProps {
  children: ReactNode;
}

// The provider component
export const ResponsiveDialogProvider: React.FC<
  ResponsiveDialogProviderProps
> = ({ children }) => {
  // Initial state for the dialogs
  const initialState: DialogState = {
    leave: false,
    auth: false,
    back: false,
    widget: false,
    password: false,
    delete: false,
    deleteUser: false,
    domain: false,
    imageListing: false,
    publish: false,
    updateUser: false,
    selectTemplate: false,
  };

  // State for managing the dialogs
  const [dialogState, setDialogState] = useState<DialogState>(initialState);

  // Function to open a dialog
  const openDialog = (id: DialogName) => {
    setDialogState((prevState) => ({ ...prevState, [id]: true }));
  };

  // Function to close a dialog
  const closeDialog = (id: DialogName) => {
    setDialogState((prevState) => ({ ...prevState, [id]: false }));
  };

  return (
    <ResponsiveDialogContext.Provider
      value={{ dialogState, openDialog, closeDialog }}
    >
      {children}
    </ResponsiveDialogContext.Provider>
  );
};
