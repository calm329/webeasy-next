import * as React from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { TTemplate } from "../../header";
import SelectTemplateCarousel from "../select-template-carousel/carousel-template";
import { TTemplateName } from "@/types";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  templates: TTemplate | null;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<TTemplateName>>;
  getData: (flag?: "init" | "regenerate" | "refresh") => Promise<void>;
};
export default function SelectTemplateDrawer(props: TProps) {
  const { open, setOpen, templates, setSelectedTemplate, getData } = props;

  return (
    <Drawer open={!!open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm pb-10">
          <SelectTemplateCarousel
            templates={templates}
            setSelectedTemplate={setSelectedTemplate}
            setOpen={setOpen}
            getData={getData}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
