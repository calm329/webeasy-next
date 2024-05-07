import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import DynamicForm from "../form/dynamic-form";
import { FormField, TMeta } from "@/types";
import { DebouncedState, useMediaQuery } from "usehooks-ts";
import { AppState } from "@/app/(main)/auth/page";
import { updateSite } from "@/lib/actions";
import { getUsernameFromPosts } from "@/lib/utils";
import { toast } from "sonner";
type TProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleChange: DebouncedState<(name: string, value: string) => void>;
  appState: AppState;
  meta?: TMeta;
  getData: (flag?: "init" | "regenerate" | "refresh") => Promise<void>;
};
const CustomizeMeta = (props: TProps) => {
  const { open, setOpen, handleChange, appState, meta, getData } = props;
  const [metaFields, setMetaFields] = useState<FormField[]>([
    {
      name: "title",
      type: "text",
      label: "Page Title",
      defaultValue: "",
      placeholder: "Enter your Page Title",
      validation: {
        required: true,
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Page Description",
      defaultValue: "",
      placeholder: "Enter your Page Description",
      validation: {
        required: true,
      },
    },
  ]);

  useEffect(() => {
    console.log("MetaData", meta);
    if (meta) {
      const tempFields = metaFields;
      tempFields[0].defaultValue = meta.title;
      tempFields[1].defaultValue = meta.description;
      setMetaFields([...tempFields]);
    }
  }, [meta, open]);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  return (
    <>
      {!isMobile && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            SEO Configuration
          </h2>
        </div>
      )}
      <div>
        <DynamicForm
          focusedField={"title"}
          fields={metaFields}
          handler={async (data: any, keys: string[]) => {
            try {
              await updateSite(
                getUsernameFromPosts(JSON.stringify(appState.iPosts)) || "",
                data,
                keys,
              );
              getData();
              toast.success("Your Meta Data has been saved");
            } catch (error) {}
          }} // updateSite}
          handleChange={handleChange}
        />
      </div>
    </>
  );
};

export default CustomizeMeta;
