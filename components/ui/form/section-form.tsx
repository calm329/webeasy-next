import React, { useState, Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";
import BlogSection from "@/components/sections/blog";
import ContactSection from "@/components/sections/contact";
import ContentSection from "@/components/sections/content";
import CtaSection from "@/components/sections/cta";
import FaqSection from "@/components/sections/faq";
import FeatureSection from "@/components/sections/feature";
import FooterSection from "@/components/sections/footers";
import HeaderSection from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import LogoSection from "@/components/sections/logo-clouds";
import NewsLetterSection from "@/components/sections/newsletter";
import PricingSection from "@/components/sections/pricing";
import StatsSection from "@/components/sections/stats";
import TeamSection from "../../sections/team/index";
import TestimonialSection from "@/components/sections/testimonials";
import Image from "next/image";
import { TSection, TSectionsType } from "@/types";
import { generateUniqueId } from "@/lib/utils/function";

type TProps = {
  addSectionByTitle: (
    id: string,
    newSection: TSectionsType,
    position: number,
  ) => void;
  triggerSection: {
    section: string;
    position: number;
  };
  setOpen: Dispatch<SetStateAction<boolean>>;
  editable?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  setShowForm: React.Dispatch<
    SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
  setSectionModal: React.Dispatch<SetStateAction<boolean>>;
  setTriggerSection: React.Dispatch<
    SetStateAction<{ section: string; position: number }>
  >;
  showForm?: {
    form: string;
    edit: string;
    show: boolean;
  };
  setSections: Dispatch<
    SetStateAction<
    TSectionsType[]
    >
  >;
  sections: TSectionsType[];
  id: string;

  initialSections:(() => TSectionsType | null)[]
};

const SectionForm = (props: TProps) => {
  const {
    addSectionByTitle,
    triggerSection,
    setOpen,
    editable,
    setIsOpen,
    setSection,
    setShowForm,
    setSectionModal,
    setTriggerSection,
    showForm,
    sections,
    setSections,
    id,
    initialSections
  } = props;
  const [searchQuery, setSearchQuery] = useState("");

  const newSections = [
    ...initialSections,
    () => {
      const newId = generateUniqueId();
      return {
        id: newId,
        image:
          "https://tailwindui.com/img/category-thumbnails/marketing/contact-sections.png",
        title: "Contact",
        description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
        content: (
          <ContactSection
            id={newId}
            showForm={showForm}
            setSectionModal={setSectionModal}
            setShowForm={setShowForm}
            setTriggerSection={setTriggerSection}
            editable={editable}
            setIsOpen={setIsOpen}
            setSection={setSection}
            sections={sections}
            setSections={setSections}
          />
        ),
      };
    },
    () => {
      const newId = generateUniqueId();
      return {
        id: newId,
        image:
          "https://tailwindui.com/img/category-thumbnails/marketing/cta-sections.png",
        title: "CTA",
        description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
        content: (
          <CtaSection
            id={newId}
            showForm={showForm}
            setSectionModal={setSectionModal}
            setShowForm={setShowForm}
            setTriggerSection={setTriggerSection}
            editable={editable}
            setIsOpen={setIsOpen}
            setSection={setSection}
            sections={sections}
            setSections={setSections}
          />
        ),
      };
    },

    () => {
      const newId = generateUniqueId();
      return {
        id: newId,
        title: "FAQ",
        image:
          "https://tailwindui.com/img/category-thumbnails/marketing/faq-sections.png",
        description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
        content: (
          <FaqSection
            id={newId}
            showForm={showForm}
            setSectionModal={setSectionModal}
            setShowForm={setShowForm}
            setTriggerSection={setTriggerSection}
            editable={editable}
            setIsOpen={setIsOpen}
            setSection={setSection}
            sections={sections}
            setSections={setSections}
          />
        ),
      };
    },
    () => {
      const newId = generateUniqueId();
      return {
        id: newId,
        image:
          "https://tailwindui.com/img/category-thumbnails/marketing/footers.png",
        title: "Footers",
        description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
        content: (
          <FooterSection
            id={newId}
            showForm={showForm}
            setSectionModal={setSectionModal}
            setShowForm={setShowForm}
            setTriggerSection={setTriggerSection}
            editable={editable}
            setIsOpen={setIsOpen}
            setSection={setSection}
            sections={sections}
            setSections={setSections}
          />
        ),
      };
    },
    () => {
      const newId = generateUniqueId();
      return {
        id: newId,
        image:
          "https://tailwindui.com/img/category-thumbnails/marketing/header.png",
        title: "Header",
        description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
        content: (
          <HeaderSection
            id={newId}
            showForm={showForm}
            setSectionModal={setSectionModal}
            setShowForm={setShowForm}
            setTriggerSection={setTriggerSection}
            editable={editable}
            setIsOpen={setIsOpen}
            setSection={setSection}
            sections={sections}
            setSections={setSections}
          />
        ),
      };
    },
    () => {
      const newId = generateUniqueId();
      return {
        id: newId,
        image:
          "https://tailwindui.com/img/category-thumbnails/marketing/heroes.png",
        title: "Hero",
        description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
        content: (
          <HeroSection
            id={newId}
            showForm={showForm}
            setSectionModal={setSectionModal}
            setShowForm={setShowForm}
            setTriggerSection={setTriggerSection}
            editable={editable}
            setIsOpen={setIsOpen}
            setSection={setSection}
            sections={sections}
            setSections={setSections}
          />
        ),
      };
    },
    () => {
      const newId = generateUniqueId();
      return {
        id: newId,
        image:
          "https://tailwindui.com/img/category-thumbnails/marketing/logo-clouds.png",
        title: "Logo",
        description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
        content: (
          <LogoSection
            id={newId}
            showForm={showForm}
            setSectionModal={setSectionModal}
            setShowForm={setShowForm}
            setTriggerSection={setTriggerSection}
            editable={editable}
            setIsOpen={setIsOpen}
            setSection={setSection}
            sections={sections}
            setSections={setSections}
          />
        ),
      };
    },
    () => {
      const newId = generateUniqueId();
      return {
        id: newId,
        image:
          "https://tailwindui.com/img/category-thumbnails/marketing/newsletter-sections.png",
        title: "NewsLetters",
        description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
        content: (
          <NewsLetterSection
            id={newId}
            showForm={showForm}
            setSectionModal={setSectionModal}
            setShowForm={setShowForm}
            setTriggerSection={setTriggerSection}
            editable={editable}
            setIsOpen={setIsOpen}
            setSection={setSection}
            sections={sections}
            setSections={setSections}
          />
        ),
      };
    },
    () => {
      const newId = generateUniqueId();
      return {
        id: newId,
        image:
          "https://tailwindui.com/img/category-thumbnails/marketing/pricing.png",
        title: "Pricing",
        description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
        content: (
          <PricingSection
            id={newId}
            showForm={showForm}
            setSectionModal={setSectionModal}
            setShowForm={setShowForm}
            setTriggerSection={setTriggerSection}
            editable={editable}
            setIsOpen={setIsOpen}
            setSection={setSection}
            sections={sections}
            setSections={setSections}
          />
        ),
      };
    },
    () => {
      const newId = generateUniqueId();
      return {
        id: newId,
        image:
          "https://tailwindui.com/img/category-thumbnails/marketing/stats-sections.png",
        title: "Stats",
        description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
        content: (
          <StatsSection
            id={newId}
            showForm={showForm}
            setSectionModal={setSectionModal}
            setShowForm={setShowForm}
            setTriggerSection={setTriggerSection}
            editable={editable}
            setIsOpen={setIsOpen}
            setSection={setSection}
            sections={sections}
            setSections={setSections}
          />
        ),
      };
    },

    () => {
      const newId = generateUniqueId();
      return {
        id: newId,
        image:
          "https://tailwindui.com/img/category-thumbnails/marketing/team-sections.png",
        title: "Team",
        description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
        content: (
          <TeamSection
            id={newId}
            showForm={showForm}
            setSectionModal={setSectionModal}
            setShowForm={setShowForm}
            setTriggerSection={setTriggerSection}
            editable={editable}
            setIsOpen={setIsOpen}
            setSection={setSection}
            sections={sections}
            setSections={setSections}
          />
        ),
      };
    },
    // () => {
    //   const newId = generateUniqueId();
    //   return {
    //     id: newId,
    //     image:
    //       "https://tailwindui.com/img/category-thumbnails/marketing/testimonials.png",
    //     title: "Testimonials",
    //     description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
    //     content: (
    //       <TestimonialSection
    //         id={newId}
    //         showForm={showForm}
    //         setSectionModal={setSectionModal}
    //         setShowForm={setShowForm}
    //         setTriggerSection={setTriggerSection}
    //         editable={editable}
    //         setIsOpen={setIsOpen}
    //         setSection={setSection}
    //         sections={sections}
    //         setSections={setSections}
    //       />
    //     ),
    //   };
    // },
  ];

  const filteredSections = newSections
    .map((section) => section()).filter((section) => section !== null)
    .filter((section) =>
      section?.title?.toLowerCase()?.includes(searchQuery.toLowerCase()),
    );

  return (
    <div>
      <div className="flex flex-wrap justify-between gap-5 p-5">
        <input
          type="text"
          className="rounded border border-gray-300 text-sm"
          placeholder="Search Section..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Section" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup></SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid max-h-[600px] grid-cols-2 gap-10 overflow-auto px-5 max-md:grid-cols-1">
        {filteredSections.map((section) => (
          <div
            key={section?.id??''}
            className="flex cursor-pointer gap-3 rounded border p-5 hover:bg-gray-50 max-lg:flex-col"
            onClick={() => {
              addSectionByTitle(
                id,
                {
                  id: section?.id??"",
                  title: section?.title??"",
                  content: section?.content ??<></>,
                  image:section?.image??"",
                  description:section?.description ??""
                },
                triggerSection?.position,
              );
              setOpen(false);
            }}
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">{section?.title??""}</h2>
              <p className="text-xs">{section?.description ??"Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is"}</p>
            </div>
            <Image
              alt=""
              src={section?.image ??""}
              height={200}
              width={200}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionForm;
