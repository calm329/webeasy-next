import { FormField, TFields, TSection } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import { DebouncedState } from "use-debounce";
import CustomizePanel from "@/components/customize/panel";
import HeroContent from "@/components/customize/panel/hero";
import BannerContent from "@/components/customize/panel/banner";
import ServiceContent from "@/components/customize/panel/service";
import PostsContent from "@/components/customize/panel/posts";
import GalleryContent from "@/components/customize/panel/gallery";
import TitleContent from "@/components/customize/panel/title";
import DescriptionContent from "@/components/customize/panel/description";
import FeaturesContent from "@/components/customize/panel/features";
import CustomGalleryContent from "@/components/customize/panel/custom-gallery";
import PartnersContent from "@/components/customize/panel/partners";
import TestimonialContent from "@/components/customize/panel/testimonials";
import ContactContent from "@/components/customize/panel/contact";
import CtaContent from "@/components/customize/panel/cta";
import FaqContent from "@/components/customize/panel/faq";
import HeaderContent from "@/components/customize/panel/header";
import HeaderSectionContent from "@/components/customize/panel/hero-section";
import LogoContent from "@/components/customize/panel/logo";
import NewsLetterContent from "@/components/customize/panel/news-letter";
import StatsContent from "@/components/customize/panel/stats";
import TeamContent from "@/components/customize/panel/team";
import TestimonialSectionContent from "@/components/customize/panel/testimonial-section";
import PricingContent from "@/components/customize/panel/pricing";

type TProps = {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  section: TSection;
  handleChange: (name: string, value: string) => void;
  subdomain: string;
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
};

function SlideOver(props: TProps) {
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
    <div className="pointer-events-none fixed right-0  z-10 flex max-w-full  pl-10  sm:pl-16">
      <div
        className={`pointer-events-auto w-screen max-w-sm ${open ? "translate-x-0" : "translate-x-full"} transform transition duration-500 ease-in-out sm:duration-700`}
      >
        <div className="mt-2 flex h-fit flex-col justify-between divide-y divide-gray-200 rounded-xl  border bg-white shadow-xl">
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
            {section === "Partners" && (
              <PartnersContent setShowForm={setShowForm} />
            )}
            {section === "Testimonials" && (
              <TestimonialContent setShowForm={setShowForm} />
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
            {section === "Image Gallery" && (
              <CustomGalleryContent
         
              />
            )}
            {section === "Title" && <TitleContent />}
            {section === "Description" && <DescriptionContent />}
            {section === "Features" && (
              <FeaturesContent setShowForm={setShowForm} />
            )}

            {/* {New Section} */}
            {section === "Contact" && (
              <ContactContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                setShowForm={setShowForm}
              />
            )}
            {section === "CTA" && (
              <CtaContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                setShowForm={setShowForm}
              />
            )}
            {section === "Faq" && (
              <FaqContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                setShowForm={setShowForm}
              />
            )}
            {section === "Footer" && <TitleContent />}
            {section === "Header" && (
              <HeaderContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                setShowForm={setShowForm}
              />
            )}
            {section === "HeroSection" && (
              <HeaderSectionContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                setShowForm={setShowForm}
              />
            )}
            {section === "logoClouds" && (
              <LogoContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                setShowForm={setShowForm}
              />
            )}
            {section === "newsLetter" && (
              <NewsLetterContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                setShowForm={setShowForm}
              />
            )}
            {section === "Pricing" && (
              <PricingContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                setShowForm={setShowForm}
              />
            )}
            {section === "Stats" && (
              <StatsContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                setShowForm={setShowForm}
              />
            )}
            {section === "Team" && (
              <TeamContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                setShowForm={setShowForm}
              />
            )}
            {section === "TestimonialSection" && (
              <TestimonialSectionContent
                section={section}
                handleChange={handleChange}
                subdomain={subdomain}
                setShowForm={setShowForm}
              />
            )}
          </CustomizePanel>
        </div>
      </div>
    </div>
  );
}

export default SlideOver;
