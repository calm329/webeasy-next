import { useState } from "react";
import DynamicForm from "./dynamic-form";
// import { updateSite } from "@/lib/actions";

export default function BrandDesktopForm({
  brandCustomizeFields,
  handleChange,
}: {
  brandCustomizeFields: any[];
  handleChange: (name: string, value: string) => void;
}) {
  return (
    <div className="sticky top-0 hidden h-full w-[500px] p-4 lg:block">
      <DynamicForm
        title="Brand Customization"
        fields={brandCustomizeFields}
        handler={() => {}} // updateSite}
        handleChange={handleChange}
      />
    </div>
  );
}
