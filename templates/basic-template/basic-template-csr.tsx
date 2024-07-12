import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  TBanner,
  TColors,
  TFields,
  THero,
  TPosts,
  TSection,
  TServices,
} from "@/types";
import EditableBanner from "@/components/editable/banner";

import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import TypewriterEffect from "@/components/typewriter-effect";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/select-template-carousel";
import AddSectionButtons from "@/components/add-section/buttons";
import SectionModal from "@/components/ui/modal/section-modal";
import PostCard from "@/components/ui/card/post-card";
import ServiceCard from "@/components/ui/card/service-card";
import { Card, CardContent } from "@/components/ui/card";
import { appState } from "../../lib/store/slices/site-slice";
import PostsSection from "@/components/sections/posts";
import CustomTestimonial from "@/components/sections/custom-testimonials";
import EditableHero from "@/components/editable/hero";
import ServicesSection from "@/components/sections/services";
import ImageGallerySection from "@/components/sections/image-gallery";
import PartnersSection from "@/components/sections/partners";
import { usePathname } from "next/navigation";

type BasicTemplateProps = {
  hero: THero;
  banner: TBanner;
  colors: TColors;
  services: TServices;
  posts: TPosts;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
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

const BasicTemplate = (props: BasicTemplateProps) => {
  const {
    hero,
    banner,
    colors,
    services,
    posts,
    setIsOpen,
    setSection,
    editable,
    setFocusedField,
    showForm,
    setShowForm,
  } = props;
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
  const [sectionModal, setSectionModal] = useState(false);
  const [triggerSection, setTriggerSection] = useState({
    section: "Banner Section",
    position: 0,
  });
  const pathname = usePathname();

  const initialSections = [
    {
      title: "Banner Section",
      content: (
        <EditableBanner
          banner={banner}
          colors={colors}
          editable={editable}
          setFocusedField={setFocusedField}
          setIsOpen={setIsOpen}
          setSection={setSection}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      ),
    },
    {
      title: "Hero Section",
      content: (
        <EditableHero
          colors={colors}
          setTriggerSection={setTriggerSection}
          setSectionModal={setSectionModal}
          hero={hero}
          editable={editable}
          setFocusedField={setFocusedField}
          setIsOpen={setIsOpen}
          setSection={setSection}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      ),
    },
    {
      title: "Services Section",
      content: (
        <ServicesSection
          showForm={showForm}
          setSectionModal={setSectionModal}
          setShowForm={setShowForm}
          setTriggerSection={setTriggerSection}
          editable={editable}
          setIsOpen={setIsOpen}
          setSection={setSection}
        />
      ),
    },
    {
      title: "Image Gallery Section",
      content: (
        <ImageGallerySection
          showForm={showForm}
          setSectionModal={setSectionModal}
          setShowForm={setShowForm}
          setTriggerSection={setTriggerSection}
          editable={editable}
          setIsOpen={setIsOpen}
          setSection={setSection}
        />
      ),
    },
    {
      title: "Partners Section",
      content: (
        <PartnersSection
          showForm={showForm}
          setSectionModal={setSectionModal}
          setShowForm={setShowForm}
          setTriggerSection={setTriggerSection}
          editable={editable}
          setIsOpen={setIsOpen}
          setSection={setSection}
        />
      ),
    },
    {
      title: "Testimonial Section",
      content: (
        <CustomTestimonial
          setSectionModal={setSectionModal}
          setShowForm={setShowForm}
          setTriggerSection={setTriggerSection}
          editable={editable}
          setIsOpen={setIsOpen}
          setSection={setSection}
        />
      ),
    },
    ...(pathname.split("/")[1] !== "custom"
      ? [
          {
            title: "Posts Section",
            content: (
              <PostsSection
                editable={editable}
                setIsOpen={setIsOpen}
                setSection={setSection}
                setShowForm={setShowForm}
              />
            ),
          },
        ]
      : []),
  ];
  const [sections, setSections] = useState<
    Array<{
      title: string;
      content: JSX.Element;
    }>
  >(initialSections);

  useEffect(() => {
    setSections((prevSections) =>
      prevSections.length === 0 ? initialSections : prevSections,
    );
  }, [appState]);

  const addSectionAtIndex = (
    index: number,
    newSection: {
      title: string;
      content: JSX.Element;
    },
  ) => {
    if (index >= 0 && index <= sections.length) {
      setSections([
        ...sections.slice(0, index),
        newSection,
        ...sections.slice(index),
      ]);
    }
  };
  console.log("sections", sections);
  const addSectionByTitle = (
    title: string,
    newSection: {
      title: string;
      content: JSX.Element;
    },
    position: number,
  ) => {
    const index = sections.findIndex((section) => section.title === title);
    if (index !== -1) {
      const newIndex = position === 0 ? index : index + 1;
      addSectionAtIndex(newIndex, newSection);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col gap-10">
        {sections.map((section, index) => (
          <div key={index}>{section.content}</div>
        ))}
      </div>
      <SectionModal
        open={sectionModal}
        setOpen={setSectionModal}
        addSectionByTitle={addSectionByTitle}
        triggerSection={triggerSection}
        showForm={showForm}
        setSectionModal={setSectionModal}
        setShowForm={setShowForm}
        setTriggerSection={setTriggerSection}
        editable={editable}
        setIsOpen={setIsOpen}
        setSection={setSection}
      />
    </div>
  );
};

export default BasicTemplate;
