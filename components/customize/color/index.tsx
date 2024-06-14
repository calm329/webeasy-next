import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import DynamicForm from "../../ui/form/dynamic-form";
import { AppState, FormField } from "@/types";
import { updateSite } from "@/lib/actions";
import { getUsernameFromPosts } from "@/lib/utils";
import { toast } from "sonner";
import { DebouncedState, useMediaQuery } from "usehooks-ts";

type TProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleChange: (name: string, value: string) => void;
  appState: AppState;
};
const CustomizeColor = (props: TProps) => {
  const { open, setOpen, handleChange, appState } = props;
  const [colorFields, setColorFields] = useState<FormField[]>([
    {
      name: "primary",
      type: "color",
      label: "Primary Color",
      defaultValue: "",
      placeholder: "Enter your Primary Color",
      validation: {
        required: true,
      },
    },
    {
      name: "secondary",
      type: "color",
      label: "Secondary Color",
      defaultValue: "",
      placeholder: "Enter your Secondary Color",
      validation: {
        required: true,
      },
    },
  ]);

  const [originalColor, setOriginalColor] = useState({
    primary: "",
    secondary: "",
  });

  useEffect(() => {
    if (appState.aiContent.colors) {
      const tempColorFields = colorFields;
      tempColorFields[0].defaultValue = appState.aiContent.colors.primary;
      tempColorFields[1].defaultValue = appState.aiContent.colors.secondary;
      setColorFields([...tempColorFields]);
      setOriginalColor({
        primary: appState.aiContent.colors.primary,
        secondary: appState.aiContent.colors.secondary,
      });
    }
  }, []);

  const isMobile = useMediaQuery("(max-width: 1024px)");
  return (
    <div>
      {!isMobile && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Change Color
          </h2>
        </div>
      )}
      <div className="flex gap-5">
        <div className="flex-1">
          <DynamicForm
            focusedField={"primary"}
            fields={colorFields}
            handler={async (data: any, keys: string[]) => {
              try {
        
                handleChange("colors", data);
                await updateSite(
                  getUsernameFromPosts(JSON.stringify(appState.iPosts)) || "",
                  data,
                  keys,
                );
  
                toast.success("Your Colors has been saved");
              } catch (error) {}
            }} // updateSite}
            handleChange={(name, value) => {
              const tempColorFields = colorFields;
              if (name === "primary") {
                tempColorFields[0].defaultValue = value;
              } else {
                tempColorFields[1].defaultValue = value;
              }
              setColorFields([...tempColorFields]);
            }}
          />
        </div>
        <button
          onClick={() => {
            const tempColorFields = colorFields;
            tempColorFields[0].defaultValue = originalColor.primary;
            tempColorFields[1].defaultValue = originalColor.secondary;
            setColorFields([...tempColorFields]);
          }}
          className={`mt-auto  flex w-16 items-center justify-center gap-2 rounded-md  border-2 bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CustomizeColor;
