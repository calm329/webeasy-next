import * as React from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import CustomizePanel from "../customize-panel/index";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FormField, TFields, TSection } from "@/types";
import { DebouncedState } from "use-debounce";
type TProps = {
  open:boolean
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
    <Drawer open={open} onClose={()=>setIsOpen(false)}> 
      {/* <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger> */}
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm pb-10">
          {/* <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader> */}
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
          {/* <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter> */}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
