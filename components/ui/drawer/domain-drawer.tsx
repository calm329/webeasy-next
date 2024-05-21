import * as React from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import UpdateDomainForm from "../form/update-domain-form";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subdomain:string
};

export function DomainDrawer(props: TProps) {
  const { open, setOpen,subdomain} = props;
  return (
    <Drawer open={!!open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm px-5 pb-10">
          <UpdateDomainForm subdomain={subdomain} setOpen={setOpen}/>
        </div>
      </DrawerContent>
    </Drawer>
  );
}