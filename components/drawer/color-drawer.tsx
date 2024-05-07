import * as React from "react";
import CustomizePanel from "../customize-panel/index";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { FormField, TFields, TMeta, TSection } from "@/types";
import { DebouncedState } from "use-debounce";
import { AppState } from "@/app/(main)/auth/page";
import CustomizeColor from "../customize-color";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: DebouncedState<(name: string, value: string) => void>;
  appState: AppState;
  meta?: TMeta;
  getData: (flag?: "init" | "regenerate" | "refresh") => Promise<void>;
};

export function ColorDrawer(props: TProps) {
  const { open, setOpen, handleChange, appState, meta, getData } = props;
  return (
    <Drawer open={!!open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm px-5 pb-10">
          <CustomizeColor
            appState={appState}
            getData={getData}
            handleChange={handleChange}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
