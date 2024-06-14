import { useState } from "react";
import DynamicForm from "./dynamic-form";
import { updateSite } from "@/lib/actions";
import { toast } from "sonner";

type TProps = {
  subdomain: string;
  brandCustomizeFields: any[];
  handleChange: (name: string, value: string) => void;
};

export default function BrandDesktopForm(props: TProps) {
  const { subdomain, brandCustomizeFields, handleChange } = props;
  return (
    <div className="sticky top-0 hidden h-full w-[500px] p-4 lg:block">
      <DynamicForm
        title="Brand Customization"
        fields={brandCustomizeFields}
        handler={async (data: any, keys: string[]) => {
          try {
            await updateSite(subdomain, data, keys);
            toast.success("Your brand customization has been saved");
          } catch (error) {
            toast.error("Something went wrong");
          }
        }}
        handleChange={handleChange}
      />
    </div>
  );
}
