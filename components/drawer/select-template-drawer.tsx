import * as React from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { TTemplate } from "../header";
import SelectTemplateCarousel from "../select-template-carousel";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  templates: TTemplate | null;
};
export default function SelectTemplateDrawer(props: TProps) {
  const { open, setOpen, templates } = props;
  return (
    <Drawer open={!!open} onOpenChange={(state) => setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm pb-10">
          <SelectTemplateCarousel templates={templates} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
