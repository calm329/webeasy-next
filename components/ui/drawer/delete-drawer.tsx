import * as React from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import BackContent from "@/components/back-content";
import DeleteContent from "@/components/delete-content";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id:string
};

export function DeleteDrawer(props: TProps) {
  const { open, setOpen,id } = props;
  return (
    <Drawer open={!!open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm px-5 pb-10">
          <DeleteContent id={id} setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
