import * as React from "react";
import CustomizePanel from "@/components/customize/panel";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { FormField, TFields, TSection } from "@/types";
import { DebouncedState } from "use-debounce";
import HeroContent from "@/components/customize/panel/hero";
import BannerContent from "@/components/customize/panel/banner.tsx";
type TProps = {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  section: TSection;
  handleChange: DebouncedState<(name: string, value: string) => void>;
  subdomain: string;
  brandCustomizeFields: FormField[];
  heroCustomizeFields: FormField[];
  focusedField: TFields;
  setBrandCustomizeFields: React.Dispatch<React.SetStateAction<FormField[]>>;
  setHeroCustomizeFields: React.Dispatch<React.SetStateAction<FormField[]>>;
  showButtonForm:{
    edit:string,
    show: boolean,
  }
  setShowButtonForm:React.Dispatch<React.SetStateAction<{
    edit:string,
    show: boolean,
  }>>;
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
    setBrandCustomizeFields,
    setHeroCustomizeFields,
    showButtonForm,
    setShowButtonForm
  } = props;

  return (
    <Drawer open={open} onOpenChange={setIsOpen}>
      <DrawerContent className="border border-white">
        <div className="mx-auto w-full max-w-sm pb-10">
          <CustomizePanel
            setIsOpen={setIsOpen}
            section={section}
            subdomain={subdomain}
            heroCustomizeFields={heroCustomizeFields}
            brandCustomizeFields={brandCustomizeFields}
            focusedField={focusedField}
            showButtonForm={showButtonForm}
            setShowButtonForm={setShowButtonForm}
            setHeroCustomizeFields={setHeroCustomizeFields}
            setBrandCustomizeFields={setBrandCustomizeFields}
            handleChange={handleChange}
          >
            {section === "Hero" && (
              <HeroContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                setHeroCustomizeFields={setHeroCustomizeFields}
                heroCustomizeFields={heroCustomizeFields}
                focusedField={focusedField}
                setShowButtonForm={setShowButtonForm}
              />
            )}
            {section === "Banner" && (
              <BannerContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                setBrandCustomizeFields={setBrandCustomizeFields}
                brandCustomizeFields={brandCustomizeFields}
                focusedField={focusedField}
                setShowButtonForm={setShowButtonForm}
              />
            )}
          </CustomizePanel>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
