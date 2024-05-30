import { FormField, TFields, TSection } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import { DebouncedState } from "use-debounce";
import CustomizePanel from "@/components/customize/panel";
import HeroContent from "@/components/customize/panel/hero";
import BannerContent from "@/components/customize/panel/banner";
import ServiceContent from "@/components/customize/panel/service";

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
  setShowForm: React.Dispatch<
    React.SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
  showForm: {
    form: string;
    edit: string;
    show: boolean;
  };
  getData?: (
    flag?: "init" | "regenerate" | "text" | "image" | "individual",
    fieldName?: string,
  ) => Promise<void>;
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
    showForm,
    setShowForm,
    getData,
  } = props;

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
            showForm={showForm}
            setShowForm={setShowForm}
            setBrandCustomizeFields={setBrandCustomizeFields}
            setHeroCustomizeFields={setHeroCustomizeFields}
            handleChange={handleChange}
            getData={getData}
          >
            {section === "Hero" && (
              <HeroContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                heroCustomizeFields={heroCustomizeFields}
                setHeroCustomizeFields={setHeroCustomizeFields}
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
                brandCustomizeFields={brandCustomizeFields}
                focusedField={focusedField}
                setShowForm={setShowForm}
                setBrandCustomizeFields={setBrandCustomizeFields}
                getData={getData}
              />
            )}
            {section === "Services" && <ServiceContent setShowForm={setShowForm}/>}
          </CustomizePanel>
        </div>
      </div>
    </div>
  );
}

export default SlideOver;
