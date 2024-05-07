import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import DynamicForm from "../form/dynamic-form";
import { FormField } from "@/types";
import { updateSite } from "@/lib/actions";
import { getUsernameFromPosts } from "@/lib/utils";
import { toast } from "sonner";
import { DebouncedState, useMediaQuery } from "usehooks-ts";
import { AppState } from "@/app/(main)/auth/page";

type TProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleChange: DebouncedState<(name: string, value: string) => void>;
  appState: AppState;
  getData: (flag?: "init" | "regenerate" | "refresh") => Promise<void>;
};
const CustomizeColor = (props: TProps) => {
  const { open, setOpen, handleChange, appState, getData } = props;
  const [colorFields, setColorFields] = useState<FormField[]>([
    {
      name: "primary",
      type: "text",
      label: "Primary Color",
      defaultValue: "",
      placeholder: "Enter your Primary Color",
      validation: {
        required: true,
      },
    },
    {
      name: "secondary",
      type: "text",
      label: "Secondary Color",
      defaultValue: "",
      placeholder: "Enter your Secondary Color",
      validation: {
        required: true,
      },
    },
  ]);
  useEffect(() => {
    if (appState.aiContent.colors) {
      const tempColorFields = colorFields;
      tempColorFields[0].defaultValue = appState.aiContent.colors.primary;
      tempColorFields[1].defaultValue = appState.aiContent.colors.secondary;
      setColorFields([...tempColorFields]);
    }
  }, []);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  return (
    <div>
      {!isMobile && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Customize Color
          </h2>
        </div>
      )}
      <div>
        <DynamicForm
          focusedField={"primary"}
          fields={colorFields}
          handler={async (data: any, keys: string[]) => {
            try {
              await updateSite(
                getUsernameFromPosts(JSON.stringify(appState.iPosts)) || "",
                data,
                keys,
              );
              getData();
              toast.success("Your Colors has been saved");
            } catch (error) {}
          }} // updateSite}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CustomizeColor;
