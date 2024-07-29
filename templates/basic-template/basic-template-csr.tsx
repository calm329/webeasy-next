import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  TBanner,
  TColors,
  TFields,
  THero,
  TPosts,
  TSection,
  TSectionsType,
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
import { generateUniqueId } from "../../lib/utils/function";
import {
  sectionsData as SD,
  setSections,
} from "@/lib/store/slices/section-slice";

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
  // const [sections, setSections] = useState<Array<TSectionsType>>([]);
  const isCustom = pathname?.split("/")[1] === "custom";
  const sections = useAppSelector(SD);

  const initialSections = [
    () => {
      const id = generateUniqueId();
      return {
        id,
        title: "Banner Section",
        image:
          "https://tailwindui.com/img/category-thumbnails/marketing/faq-sections.png",
        description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
        content: (
          <EditableBanner
            id={id}
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
      };
    },
    () => {
      const id = generateUniqueId();
      return {
        id,
        title: "Hero Section",
        image:
          "https://tailwindui.com/img/category-thumbnails/marketing/faq-sections.png",
        description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
        content: (
          <EditableHero
            id={id}
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
      };
    },
    () => {
      const id = generateUniqueId();
      return {
        id,
        title: "Services Section",
        image:
          "https://tailwindui.com/img/category-thumbnails/marketing/faq-sections.png",
        description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
        content: (
          <ServicesSection
            id={id}
            showForm={showForm}
            setSectionModal={setSectionModal}
            setShowForm={setShowForm}
            setTriggerSection={setTriggerSection}
            editable={editable}
            setIsOpen={setIsOpen}
            setSection={setSection}
          />
        ),
      };
    },
    () => {
      const id = generateUniqueId();
      if (isCustom) {
        return {
          id,
          title: "Image Gallery Section",
          image:
            "https://tailwindui.com/img/category-thumbnails/marketing/faq-sections.png",
          description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
          content: (
            <ImageGallerySection
              id={id}
              showForm={showForm}
              setSectionModal={setSectionModal}
              setShowForm={setShowForm}
              setTriggerSection={setTriggerSection}
              editable={editable}
              setIsOpen={setIsOpen}
              setSection={setSection}
            />
          ),
        };
      } else {
        return {
          id,
          title: "Posts Section",
          image:
            "https://tailwindui.com/img/category-thumbnails/marketing/faq-sections.png",
          description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
          content: (
            <PostsSection
              id={id}
              editable={editable}
              setIsOpen={setIsOpen}
              setSection={setSection}
              setShowForm={setShowForm}
            />
          ),
        };
      }
    },
    () => {
      const id = generateUniqueId();
      return {
        id,
        title: "Partners Section",
        image:
          "https://tailwindui.com/img/category-thumbnails/marketing/faq-sections.png",
        description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
        content: (
          <PartnersSection
            id={id}
            showForm={showForm}
            setSectionModal={setSectionModal}
            setShowForm={setShowForm}
            setTriggerSection={setTriggerSection}
            editable={editable}
            setIsOpen={setIsOpen}
            setSection={setSection}
          />
        ),
      };
    },
    () => {
      const id = generateUniqueId();
      return {
        id,
        title: "Testimonial Section",
        image:
          "https://tailwindui.com/img/category-thumbnails/marketing/faq-sections.png",
        description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
        content: (
          <CustomTestimonial
            id={id}
            setSectionModal={setSectionModal}
            setShowForm={setShowForm}
            setTriggerSection={setTriggerSection}
            editable={editable}
            setIsOpen={setIsOpen}
            setSection={setSection}
          />
        ),
      };
    },
  ];
  const filteredSections = initialSections
    .map((section) => section())
    .filter((section) => section !== null);

  // Use useEffect to set initial sections if needed
  useEffect(() => {
    dispatch(setSections(filteredSections));
  }, []);
  // useEffect(() => {
  //   setSections((prevSections) => {
  //     if (prevSections.length === 0) {
  //       // Ensure that `filteredSections` does not contain `null` values
  //       return filteredSections.filter(
  //         (section) => section !== null,
  //       ) as TSectionsType[];
  //     }
  //     return prevSections;
  //   });
  // }, [appState]);

  // Update addSectionAtIndex function to use Redux
  const addSectionAtIndex = (index: number, newSection: TSectionsType) => {
    if (index >= 0 && index <= sections.length) {
      const updatedSections = [
        ...sections.slice(0, index),
        newSection,
        ...sections.slice(index),
      ];
      dispatch(setSections(updatedSections));
    }
  };

  console.log("sections", sections);
  const addSectionByTitle = (
    id: string,
    newSection: TSectionsType,
    position: number,
  ) => {
    const index = sections.findIndex((section) => section.id === id);
    if (index !== -1) {
      const newIndex = position === 0 ? index : index + 1;
      addSectionAtIndex(newIndex, newSection);
    }
  };
  console.log("appState.selectedFont", appState.selectedFont);
  return (
    <div className="mb-20 flex min-h-screen flex-col">
      <div className="flex flex-col gap-10">
        {sections.map((section, index) => (
          <div key={index}>{section.content}</div>
        ))}
      </div>
      <SectionModal
        initialSections={initialSections}
        id={triggerSection.section}
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
