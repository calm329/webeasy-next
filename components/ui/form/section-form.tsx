import React, { Dispatch, SetStateAction } from "react";
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

const sections = [
  {
    id: "",
    image: "",
    title: "Blog",
    description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
    Element: <BlogSection />,
  },
  {
    id: "",
    image: "",
    title: "Contact",
    description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
    Element: <ContactSection />,
  },
  {
    id: "",
    image: "",
    title: "Content",
    description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
    Element: <ContentSection />,
  },
  {
    id: "",
    image: "",
    title: "CTA",
    description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
    Element: <CtaSection />,
  },
  {
    id: "",
    image: "",
    title: "FAQ",
    description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
    Element: <FaqSection />,
  },
  {
    id: "",
    image: "",
    title: "Feature",
    description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
    Element: <FeatureSection />,
  },
  {
    id: "",
    image: "",
    title: "Footers",
    description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
    Element: <FooterSection />,
  },
  {
    id: "",
    image: "",
    title: "Header",
    description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
    Element: <HeaderSection />,
  },
  {
    id: "",
    image: "",
    title: "Hero",
    description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
    Element: <HeroSection />,
  },
  {
    id: "",
    image: "",
    title: "Logo",
    description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
    Element: <LogoSection />,
  },
  {
    id: "",
    image: "",
    title: "NewsLetters",
    description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
    Element: <NewsLetterSection />,
  },
  {
    id: "",
    image: "",
    title: "Pricing",
    description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
    Element: <PricingSection />,
  },
  {
    id: "",
    image: "",
    title: "Stats",
    description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
    Element: <StatsSection />,
  },
  {
    id: "",
    image: "",
    title: "Team",
    description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
    Element: <TeamSection />,
  },
  {
    id: "",
    image: "",
    title: "Testimonials",
    description: "Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is",
    Element: <TestimonialSection />,
  },
];

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

};

const SectionForm = (props: TProps) => {
  const { addSectionByTitle, triggerSection, setOpen } = props;
  return (
    <div>
      <div className="flex justify-between p-5">
        <input
          type="text"
          className="rounded border border-gray-300 text-sm"
          placeholder="Search Component"
        />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Section" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem> */}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid max-h-[600px] grid-cols-2 gap-10 overflow-auto px-5">
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex cursor-pointer flex-col gap-3 rounded border p-5 hover:bg-gray-50"
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
            <h2 className="text-xl font-bold">{section.title}</h2>
            <p>{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionForm;
