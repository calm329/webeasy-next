"use client";

import { useId } from "react";
import Image, { type ImageProps } from "next/image";
// import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";

import { Container } from "./Container";

interface Feature {
  name: React.ReactNode;
  summary: string;
  description: string;
  image: ImageProps["src"];
  icon: React.ComponentType;
}

function Feature({
  feature,
  isActive,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  feature: {
    name: string;
    description: string;
    image: string;
  };
  isActive: boolean;
}) {
  return (
    <div
      className={clsx(className, !isActive && "opacity-75 hover:opacity-100")}
      {...props}
    >
      <div
        className={clsx(
          "w-9 rounded-lg",
          isActive ? "bg-blue-600" : "bg-slate-500",
        )}
      >
        <svg aria-hidden="true" className="h-9 w-9" fill="none">
          {/* <feature.icon /> */}
        </svg>
      </div>
      <h3
        className={clsx(
          "mt-6 text-sm font-medium",
          isActive ? "text-blue-600" : "text-slate-600",
        )}
      >
        {feature.name}
      </h3>
      <p className="mt-4 text-sm text-slate-600">{feature.description}</p>
    </div>
  );
}

function FeaturesMobile() {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {services.list.map((data) => (
        <div key={data.name}>
          <Feature feature={data} className="mx-auto max-w-2xl" isActive />
          <div className="relative mt-10 pb-10">
            <div className="absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6" />
            <div className="relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
              {/* <Image
                className="w-full"
                src={data.image}
                alt=""
                sizes="52.75rem"
                height={100}
                width={100}
              /> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturesDesktop() {
  return (
    <div className="hidden lg:mt-20 lg:block">
      <div className="grid grid-cols-3 gap-x-8">
        {services.list.map((feature, featureIndex) => (
          <Feature
            key={feature.name}
            feature={feature}
            isActive={featureIndex === 0}
            className="relative"
          />
        ))}
      </div>
    </div>
  );
}

const services = {
  title: "Our Services",
  description: "Delivering Graceful Moments with Floral Art",
  list: [
    {
      name: "Custom Floral Arrangements",
      description:
        "Tailor-made arrangements that marry simplicity with elegance, perfect for every occasion from weddings to corporate events.",
      image: "url-to-service1-image.jpg",
    },
    {
      name: "Digital Floral Artistry",
      description:
        "Our expertly crafted digital images bring the delicate beauty of blooms to your digital spaces, ideal for creating serene backdrops and inspired settings.",
      image: "url-to-service2-image.jpg",
    },
    {
      name: "Romantic Floral Sets",
      description:
        "Experience the enchantment of meticulously designed floral sets that evoke romance and elegance, making every moment unforgettable.",
      image: "url-to-service3-image.jpg",
    },
    {
      name: "Seasonal Bloom Collections",
      description:
        "Explore the vibrant colors and fragrant scents of our seasonal bloom collections curated to reflect the beauty of each season.",
      image: "url-to-service4-image.jpg",
    },
  ],
};

export function SecondaryFeatures() {
  return (
    <section
      id="secondary-features"
      aria-label="Features for simplifying everyday business tasks"
      className="pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            {services.title}
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            {services.description}
          </p>
        </div>
        <FeaturesMobile />
        <FeaturesDesktop />
      </Container>
    </section>
  );
}
