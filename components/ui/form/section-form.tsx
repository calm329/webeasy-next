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
import { TSection } from "@/types";

type TProps = {
  addSectionByTitle: (
    title: string,
    newSection: {
      title: string;
      content: JSX.Element;
    },
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
  } = props;
  const [searchQuery, setSearchQuery] = useState("");

  const sections = [
    {
      id: "1",
      image:
        "https://tailwindui.com/img/category-thumbnails/marketing/blog-sections.png",
      title: "Blog",
      description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
      Element: (
        <BlogSection
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
      id: "2",
      image:
        "https://tailwindui.com/img/category-thumbnails/marketing/contact-sections.png",
      title: "Contact",
      description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
      Element: (
        <ContactSection
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
      id: "3",
      image:
        "https://tailwindui.com/img/category-thumbnails/marketing/content-sections.png",
      title: "Content",
      description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
      Element: (
        <ContentSection
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
      id: "4",
      image:
        "https://tailwindui.com/img/category-thumbnails/marketing/cta-sections.png",
      title: "CTA",
      description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
      Element: (
        <CtaSection
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
      id: "5",
      image:
        "https://tailwindui.com/img/category-thumbnails/marketing/faq-sections.png",
      title: "FAQ",
      description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
      Element: (
        <FaqSection
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
      id: "6",
      image:
        "https://tailwindui.com/img/category-thumbnails/marketing/feature-sections.png",
      title: "Feature",
      description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
      Element: (
        <FeatureSection
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
      id: "7",
      image:
        "https://tailwindui.com/img/category-thumbnails/marketing/footers.png",
      title: "Footers",
      description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
      Element: (
        <FooterSection
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
      id: "8",
      image:
        "https://tailwindui.com/img/category-thumbnails/marketing/header.png",
      title: "Header",
      description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
      Element: (
        <HeaderSection
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
      id: "9",
      image:
        "https://tailwindui.com/img/category-thumbnails/marketing/heroes.png",
      title: "Hero",
      description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
      Element: (
        <HeroSection
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
      id: "10",
      image:
        "https://tailwindui.com/img/category-thumbnails/marketing/logo-clouds.png",
      title: "Logo",
      description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
      Element: (
        <LogoSection
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
      id: "11",
      image:
        "https://tailwindui.com/img/category-thumbnails/marketing/newsletter-sections.png",
      title: "NewsLetters",
      description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
      Element: (
        <NewsLetterSection
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
      id: "12",
      image:
        "https://tailwindui.com/img/category-thumbnails/marketing/pricing.png",
      title: "Pricing",
      description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
      Element: (
        <PricingSection
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
      id: "13",
      image:
        "https://tailwindui.com/img/category-thumbnails/marketing/stats-sections.png",
      title: "Stats",
      description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
      Element: (
        <StatsSection
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
      id: "14",
      image:
        "https://tailwindui.com/img/category-thumbnails/marketing/team-sections.png",
      title: "Team",
      description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
      Element: (
        <TeamSection
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
      id: "15",
      image:
        "https://tailwindui.com/img/category-thumbnails/marketing/testimonials.png",
      title: "Testimonials",
      description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
      Element: (
        <TestimonialSection
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
  ];

  const filteredSections = sections.filter((section) =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()),
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
            key={section.id}
            className="flex cursor-pointer gap-3 rounded border p-5 hover:bg-gray-50 max-lg:flex-col"
            onClick={() => {
              addSectionByTitle(
                triggerSection.section,
                {
                  title: section.title,
                  content: section.Element,
                },
                triggerSection.position,
              );
              setOpen(false);
            }}
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">{section.title}</h2>
              <p className="text-xs">{section.description}</p>
            </div>
            <Image
              alt=""
              src={section.image}
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
