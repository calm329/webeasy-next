import * as React from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import LeaveContent from "@/components/leave-content";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function LeaveDrawer(props: TProps) {
  const { open, setOpen } = props;
  return (
    <Drawer open={!!open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm px-5 pb-10">
          <LeaveContent setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
