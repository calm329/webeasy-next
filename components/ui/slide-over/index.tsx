import { FormField, TFields, TSection } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import { DebouncedState } from "use-debounce";
import CustomizePanel from "@/components/customize/panel";
import HeroContent from "@/components/customize/panel/hero";
import BannerContent from "@/components/customize/panel/banner.tsx";

type TProps = {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  section: TSection;
  handleChange: DebouncedState<(name: string, value: string) => void>;
  subdomain: string;
  brandCustomizeFields: FormField[];
  heroCustomizeFields: FormField[];
  focusedField: TFields;
  setBrandCustomizeFields: React.Dispatch<React.SetStateAction<FormField[]>>;
  setHeroCustomizeFields: React.Dispatch<React.SetStateAction<FormField[]>>;
};

function SlideOver(props: TProps) {
  const {
    open,
    setIsOpen,
    section,
    handleChange,
    subdomain,
    heroCustomizeFields,
    brandCustomizeFields,
    focusedField,
    setBrandCustomizeFields,
    setHeroCustomizeFields,
  } = props;
  const [showButtonForm, setShowButtonForm] = useState({
    edit: "",
    show: false,
  });
  return (
    <div className="pointer-events-none fixed right-0  z-10 flex max-w-full  pl-10  sm:pl-16">
      <div
        className={`pointer-events-auto w-screen max-w-sm ${open ? "translate-x-0" : "translate-x-full"} transform transition duration-500 ease-in-out sm:duration-700`}
      >
        <div className="mt-2 flex h-fit flex-col justify-between divide-y divide-gray-200 rounded-xl  border bg-white shadow-xl">
          <CustomizePanel
            setIsOpen={setIsOpen}
            section={section}
            subdomain={subdomain}
            heroCustomizeFields={heroCustomizeFields}
            brandCustomizeFields={brandCustomizeFields}
            focusedField={focusedField}
            showButtonForm={showButtonForm}
            setShowButtonForm={setShowButtonForm}
            setBrandCustomizeFields={setBrandCustomizeFields}
            setHeroCustomizeFields={setHeroCustomizeFields}
          >
            {section === "Hero" && (
              <HeroContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                heroCustomizeFields={heroCustomizeFields}
                setHeroCustomizeFields={setHeroCustomizeFields}
                focusedField={focusedField}
                setShowButtonForm={setShowButtonForm}
              />
            )}
            {section === "Banner" && (
              <BannerContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                brandCustomizeFields={brandCustomizeFields}
                focusedField={focusedField}
                setShowButtonForm={setShowButtonForm}
                setBrandCustomizeFields={setBrandCustomizeFields}
              />
            )}
          </CustomizePanel>
        </div>
      </div>
    </div>
  );
}

export default SlideOver;
