import { useState } from "react";
import DynamicForm from "./dynamic-form";
import { updateSite } from "@/lib/actions";
import { toast } from "sonner";

export default function BrandDesktopForm({
  subdomain,
  brandCustomizeFields,
  handleChange,
}: {
  subdomain: string;
  brandCustomizeFields: any[];
  handleChange: (name: string, value: string) => void;
}) {
  return (
    <div className="sticky top-0 hidden h-full w-[500px] p-4 lg:block">
      <DynamicForm
        title="Brand Customization"
        fields={brandCustomizeFields}
        handler={async (data: any, keys: string[]) => {
          try {
            await updateSite(subdomain, data, keys);
          } catch (error) {
            toast.success("Your brand customization has been saved");
          }
        }} // updateSite}
        handleChange={handleChange}
      />
    </div>
  );
}
