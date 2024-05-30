import * as React from "react";
import CustomizePanel from "@/components/customize/panel";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { FormField, TFields, TSection } from "@/types";
import { DebouncedState } from "use-debounce";
import HeroContent from "@/components/customize/panel/hero";
import BannerContent from "@/components/customize/panel/banner";
import ServiceContent from "@/components/customize/panel/service";
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
  showForm: {
    form: string;
    edit: string;
    show: boolean;
  };
  setShowForm: React.Dispatch<
    React.SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
  getData?: (
    flag?: "init" | "regenerate" | "text" | "image" | "individual",
    fieldName?: string,
  ) => Promise<void>;
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
    showForm,
    setShowForm,
    getData,
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
            showForm={showForm}
            setShowForm={setShowForm}
            setHeroCustomizeFields={setHeroCustomizeFields}
            setBrandCustomizeFields={setBrandCustomizeFields}
            handleChange={handleChange}
            getData={getData}
          >
            {section === "Hero" && (
              <HeroContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                setHeroCustomizeFields={setHeroCustomizeFields}
                heroCustomizeFields={heroCustomizeFields}
                focusedField={focusedField}
                setShowForm={setShowForm}
                getData={getData}
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
                setShowForm={setShowForm}
                getData={getData}
              />
            )}
            {section === "Services" && (
              <ServiceContent setShowForm={setShowForm} />
            )}
          </CustomizePanel>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
