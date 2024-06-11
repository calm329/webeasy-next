import * as React from "react";
import CustomizePanel from "@/components/customize/panel";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { FormField, TFields, TSection } from "@/types";
import { DebouncedState } from "use-debounce";
import HeroContent from "@/components/customize/panel/hero";
import BannerContent from "@/components/customize/panel/banner";
import ServiceContent from "@/components/customize/panel/service";
import PostsContent from "@/components/customize/panel/posts";
import GalleryContent from "@/components/customize/panel/gallery";
import TitleContent from "@/components/customize/panel/title";
import DescriptionContent from "@/components/customize/panel/description";
import FeaturesContent from "@/components/customize/panel/features";
type TProps = {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  section: TSection;
  handleChange: (name: string, value: string) => void;
  subdomain: string;
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
};
export function CustomDrawer(props: TProps) {
  const {
    open,
    setIsOpen,
    section,
    handleChange,
    subdomain,
    showForm,
    setShowForm,
  } = props;

  return (
    <Drawer open={open} onOpenChange={setIsOpen}>
      <DrawerContent className="border border-white">
        <div className="mx-auto w-full max-w-sm pb-10">
          <CustomizePanel
            setIsOpen={setIsOpen}
            section={section}
            subdomain={subdomain}
            showForm={showForm}
            setShowForm={setShowForm}
            handleChange={handleChange}
          >
            {section === "Hero" && (
              <HeroContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                setShowForm={setShowForm}
              />
            )}
            {section === "Banner" && (
              <BannerContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                setShowForm={setShowForm}
              />
            )}
            {section === "Services" && (
              <ServiceContent setShowForm={setShowForm} />
            )}
            {section === "Posts" && <PostsContent />}
            {section === "Gallery" && (
              <GalleryContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                setShowForm={setShowForm}
              />
            )}
            {section === "Title" && <TitleContent />}
            {section === "Description" && <DescriptionContent />}
            {section === "Features" && <FeaturesContent setShowForm={setShowForm}/>}
          </CustomizePanel>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
