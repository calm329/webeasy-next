import * as React from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import FontPicker from "@/components/font-picker";
type TProps = {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function FontsDrawer(props: TProps) {
  const { open, setIsOpen } = props;
  return (
    <Drawer open={!!open} onOpenChange={setIsOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <div className="h-[55vh] max-h-[600px] overflow-y-auto p-5 transition-all ease-in-out">
            <FontPicker />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
