import * as React from "react";
import CustomizePanel from "@/components/customize/panel";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { FormField, TFields, TSection, TUser } from "@/types";
import { DebouncedState } from "use-debounce";
import UpdateUser from "../form/update-user";
type TProps = {
  open: TFields;
  setOpen: React.Dispatch<React.SetStateAction<TFields>>;
  user: TUser;
  getUserData: () => Promise<void>;
};
export function UserDrawer(props: TProps) {
  const { open, setOpen, getUserData, user } = props;
  return (
    <Drawer open={!!open} onOpenChange={(state) => !state && setOpen(null)}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm pb-10">
          <UpdateUser
            getUserData={getUserData}
            open={open}
            setOpen={setOpen}
            user={user}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
