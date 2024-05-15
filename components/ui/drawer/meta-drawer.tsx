import * as React from "react";
import CustomizePanel from "@/components/customize/panel";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { AppState, FormField, TFields, TMeta, TSection } from "@/types";
import { DebouncedState } from "use-debounce";
import UpdateUser from "../form/update-user";
import CustomizeMeta from "../../customize/meta";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: DebouncedState<(name: string, value: string) => void>;
  appState: AppState;
};

export function MetaDrawer(props: TProps) {
  const { open, setOpen, handleChange, appState } = props;
  return (
    <Drawer open={!!open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm px-5 pb-10">
          <CustomizeMeta
            appState={appState}
            handleChange={handleChange}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
