import * as React from "react";
import CustomizePanel from "../customize-panel/index";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { FormField, TFields, TMeta, TSection } from "@/types";
import { DebouncedState } from "use-debounce";
import { AppState } from "@/app/(main)/auth/page";
import CustomizeColor from "../customize-color";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { SketchPicker } from "react-color";

type TProps = {
  field: ControllerRenderProps<
    FieldValues,
    | "logo"
    | "title"
    | "name"
    | "businessName"
    | "ctaLink"
    | "imageUrl"
    | "heading"
    | "subheading"
    | "cta"
    | "primary"
    | "secondary"
    | "avatar"
    | "email"
    | "description"
  >;
  getValues: any;
  f: FormField;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (name: string, value: string) => void;
};

export function SelectColorDrawer(props: TProps) {
  const { field, getValues, setOpen, open, f, handleChange } = props;
  return (
    <Drawer open={!!open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto mt-5 flex w-full max-w-sm justify-center px-5 pb-10">
          <SketchPicker
            {...field}
            color={getValues(f.name)}
            onChange={(value) => {
              handleChange(f.name, value.hex);
              field.onChange(value.hex);
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
