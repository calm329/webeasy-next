import * as React from "react";
import CustomizePanel from "@/components/customize/panel";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { AppState, FormField, TFields, TMeta, TSection } from "@/types";
import { DebouncedState } from "use-debounce";
import CustomizeColor from "../../customize/color";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: DebouncedState<(name: string, value: string) => void>;
  appState: AppState;
  meta?: TMeta;
};

export function ColorDrawer(props: TProps) {
  const { open, setOpen, handleChange, appState, meta } = props;
  return (
    <Drawer open={!!open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm px-5 pb-10">
          <CustomizeColor
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
