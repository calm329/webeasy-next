import * as React from "react";
import CustomizePanel from "../customize-panel/index";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { FormField, TFields, TMeta, TSection } from "@/types";
import { DebouncedState } from "use-debounce";
import UpdateUser from "../form/update-user";
import { TUser } from "@/app/(main)/settings/page";
import { AppState } from "@/app/(main)/auth/page";
import CustomizeMeta from "../customize-meta";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: DebouncedState<(name: string, value: string) => void>;
  appState: AppState;
  meta?: TMeta;
  getData: (flag?: "init" | "regenerate" | "refresh") => Promise<void>;
};

export function MetaDrawer(props: TProps) {
  const { open, setOpen, handleChange, appState, meta, getData } = props;
  return (
    <Drawer open={!!open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm pb-10">
          <CustomizeMeta
            appState={appState}
            getData={getData}
            handleChange={handleChange}
            open={open}
            setOpen={setOpen}
            meta={meta}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
