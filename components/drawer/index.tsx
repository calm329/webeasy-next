import * as React from "react";
import CustomizePanel from "../customize-panel/index";
import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer";
import { FormField, TFields, TSection } from "@/types";
import { DebouncedState } from "use-debounce";
type TProps = {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  section: TSection;
  handleChange: DebouncedState<(name: string, value: string) => void>;
  subdomain: string;
  brandCustomizeFields: FormField[];
  heroCustomizeFields: FormField[];
  focusedField: TFields;
};
export function CustomDrawer(props: TProps) {
  const {
    open,
    setIsOpen,
    section,
    handleChange,
    subdomain,
    brandCustomizeFields,
    heroCustomizeFields,
    focusedField,
  } = props;
  return (
    <Drawer open={open} onClose={() => setIsOpen(false)}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm pb-10">
          <CustomizePanel
            setIsOpen={setIsOpen}
            section={section}
            handleChange={handleChange}
            subdomain={subdomain}
            heroCustomizeFields={heroCustomizeFields}
            brandCustomizeFields={brandCustomizeFields}
            focusedField={focusedField}
            isMobile={true}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
