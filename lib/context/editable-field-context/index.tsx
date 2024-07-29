import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type FieldType = "image" | "text" | "textarea" | "list";

interface ListItem {
  id: string;
  content: string;
}

interface EditableFieldContextType {
  type: FieldType;
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
  regenerateOptions?: string[];
  generationType?: string;
  setGenerationType?: Dispatch<SetStateAction<string>>;
  onValueChange?: (url: string) => void;
  isSwitchable?: boolean;
  switchChecked?: boolean;
  onSwitchChange?: (checked: boolean) => void;
  listItems?: ListItem[];
  setListItems?: Dispatch<SetStateAction<ListItem[]>>;
  draggable?: boolean;
  onDragEnd?: (result: any) => void;
  onRegenerate?: (image: string) => void;
  imagePosition?: {
    horizontal: number;
    vertical: number;
  };
  setImagePosition?: ({
    horizontal,
    vertical,
  }: {
    horizontal: number;
    vertical: number;
  }) => void;
}

const EditableFieldContext = createContext<
  EditableFieldContextType | undefined
>(undefined);

interface EditableFieldProviderProps {
  type: FieldType;
  value?: any;
  setValue?: Dispatch<SetStateAction<any>>;
  regenerateOptions?: string[];
  generationType?: string;
  setGenerationType?: Dispatch<SetStateAction<string>>;
  onValueChange?: (url: string) => void;
  isSwitchable?: boolean;
  switchChecked?: boolean;
  onSwitchChange?: (checked: boolean) => void;
  listItems?: ListItem[];
  setListItems?: Dispatch<SetStateAction<ListItem[]>>;
  draggable?: boolean;
  onDragEnd?: (result: any) => void;
  children: ReactNode;
  onRegenerate?: (image: string) => void;
  imagePosition?: {
    horizontal: number;
    vertical: number;
  };
  setImagePosition?: ({
    horizontal,
    vertical,
  }: {
    horizontal: number;
    vertical: number;
  }) => void;
}

export const EditableFieldProvider: React.FC<EditableFieldProviderProps> = ({
  type,
  value,
  setValue,
  regenerateOptions,
  generationType,
  setGenerationType,
  onValueChange,
  isSwitchable,
  switchChecked,
  onSwitchChange,
  listItems,
  setListItems,
  draggable,
  onDragEnd,
  children,
  onRegenerate,
  imagePosition,
  setImagePosition,
}) => {
  return (
    <EditableFieldContext.Provider
      value={{
        type,
        value: value ?? null,
        setValue: setValue ?? (() => {}),
        regenerateOptions: regenerateOptions ?? [],
        generationType,
        setGenerationType,
        onValueChange,
        isSwitchable,
        switchChecked,
        onSwitchChange,
        listItems,
        setListItems,
        draggable,
        onDragEnd,
        onRegenerate,
        imagePosition,
        setImagePosition,
      }}
    >
      {children}
    </EditableFieldContext.Provider>
  );
};

export const useEditableFieldContext = (): EditableFieldContextType => {
  const context = useContext(EditableFieldContext);
  if (context === undefined) {
    throw new Error(
      "useEditableFieldContext must be used within an EditableFieldProvider",
    );
  }
  return context;
};
