import * as React from "react";
import CustomizePanel from "@/components/customize/panel";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { FormField, TFields, TMeta, TSection } from "@/types";
import { DebouncedState } from "use-debounce";
import CustomizeColor from "../../customize/color";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { SketchPicker } from "react-color";
import { IoClose } from "react-icons/io5";

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
  const [selectedColor, setSelectedColor] = React.useState("");
  const saveColor = () => {
    handleChange(f.name, selectedColor);
    field.onChange(selectedColor);
    setOpen(false);
  };

  return (
    <Drawer open={!!open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto mt-5 flex w-full max-w-sm flex-col items-center justify-center px-5 pb-10">
          <button
            onClick={() => setOpen(false)}
            className="mb-5 ml-auto text-2xl"
          >
            <IoClose />
          </button>
          <SketchPicker
            {...field}
            color={selectedColor}
            onChange={(value) => setSelectedColor(value.hex)}
          />
          <div className="ml-auto mt-5 flex gap-5">
            <button
              onClick={saveColor}
              className={`ml-auto flex w-16 items-center justify-center gap-2 rounded-md bg-indigo-600 px-3  py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              Ok
            </button>
            <button
              onClick={() => setOpen(false)}
              className={`ml-auto  flex w-16 items-center justify-center gap-2 rounded-md  border-2 bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              Cancel
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
