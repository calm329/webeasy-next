import { AppState } from "@/app/(main)/auth/page";
import { FormField, TFields, TSection } from "@/types";
import { Dispatch, SetStateAction} from "react";
import { DebouncedState } from "use-debounce";
import CustomizePanel from "../customize-panel";

type TProps = {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: AppState;
  section: TSection;
  handleChange: DebouncedState<(name: string, value: string) => void>;
  subdomain: string;
  brandCustomizeFields: FormField[];
  heroCustomizeFields: FormField[];
  focusedField: TFields;
};

function SlideOver(props: TProps) {
  const {
    open,
    setIsOpen,
    data,
    section,
    handleChange,
    subdomain,
    heroCustomizeFields,
    brandCustomizeFields,
    focusedField,
  } = props;
  
  return (
    <div className="pointer-events-none fixed inset-y-0 right-0 z-10 flex max-w-full pl-10 sm:pl-16">
      <div
        className={`pointer-events-auto w-screen max-w-sm ${open ? "translate-x-0" : "translate-x-full"} transform transition duration-500 ease-in-out sm:duration-700`}
      >
        <div
          className="mt-2 flex h-fit flex-col justify-between divide-y divide-gray-200 rounded-xl  border bg-white pb-10 shadow-xl"
        >
          <CustomizePanel setIsOpen={setIsOpen} section={section} handleChange={handleChange} subdomain={subdomain}heroCustomizeFields={heroCustomizeFields} brandCustomizeFields={brandCustomizeFields} focusedField={focusedField}/>
        </div>
      </div>
    </div>
  );
}

export default SlideOver;
