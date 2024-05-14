"use client";

import { useId } from "react";
import Image, { type ImageProps } from "next/image";
// import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";
import { Container } from "@/components/container";

interface Feature {
  service: {
    name: string;
    description: string;
  };
  className: string;
}

function Feature(props: Feature) {
  const { service, className } = props;
  return (
    <div className={className}>
      <div
        className={clsx("flex w-9 justify-center rounded-lg", "bg-slate-500")}
      >
        <svg
          fill="none"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          color="#F7B886"
        >
          <path
            d="M14 16C14 17.77 13.23 19.37 12 20.46C10.94 21.42 9.54 22 8 22C4.69 22 2 19.31 2 16C2 13.9753 3.01397 12.1814 4.5554 11.0973C4.80358 10.9228 5.1393 11.0422 5.27324 11.3145C6.21715 13.2332 7.95419 14.6699 10.02 15.23C10.65 15.41 11.31 15.5 12 15.5C12.4872 15.5 12.9539 15.4538 13.4074 15.3687C13.6958 15.3147 13.9828 15.4995 13.9955 15.7926C13.9985 15.8621 14 15.9314 14 16Z"
            fill="currentColor"
            fill-rule="evenodd"
          ></path>
          <path
            d="M18 8C18 8.78 17.85 9.53 17.58 10.21C16.89 11.95 15.41 13.29 13.58 13.79C13.08 13.93 12.55 14 12 14C11.45 14 10.92 13.93 10.42 13.79C8.59 13.29 7.11 11.95 6.42 10.21C6.15 9.53 6 8.78 6 8C6 4.69 8.69 2 12 2C15.31 2 18 4.69 18 8Z"
            fill="currentColor"
            fill-rule="evenodd"
          ></path>
          <path
            d="M22 16C22 19.31 19.31 22 16 22C15.2555 22 14.5393 21.8643 13.8811 21.6141C13.5624 21.4929 13.503 21.0851 13.7248 20.8262C14.8668 19.4938 15.5 17.786 15.5 16C15.5 15.66 15.47 15.32 15.42 15C15.3902 14.8155 15.4844 14.6342 15.6478 14.5437C16.9719 13.8107 18.0532 12.6876 18.727 11.3153C18.8609 11.0427 19.1968 10.923 19.4452 11.0978C20.9863 12.1818 22 13.9755 22 16Z"
            fill="currentColor"
            fill-rule="evenodd"
          ></path>
        </svg>
      </div>
      <h3 className={clsx("mt-6 text-sm font-medium", "text-slate-600")}>
        {service.name}
      </h3>
      <p className="mt-4 text-sm text-slate-600">{service.description}</p>
    </div>
  );
}

type TProps = {
  services: any[];
};

function FeaturesMobile(props: TProps) {
  const { services } = props;
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {services.map((data) => (
        <div key={data.name}>
          <Feature service={data} className="mx-auto max-w-2xl" />
          <div className="relative mt-10 pb-10">
            <div className="absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6" />
            <div className="relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturesDesktop(props: TProps) {
  const { services } = props;
  return (
    <div className="hidden lg:mt-20 lg:block">
      <div className="grid grid-cols-2  gap-10 ">
        {services.map((data, featureIndex) => (
          <Feature key={data} service={data} className="relative" />
        ))}
      </div>
    </div>
  );
}

export function SecondaryFeatures(props: TProps) {
  const { services } = props;
  return (
    <section
      id="secondary-features"
      aria-label="Features for simplifying everyday business tasks"
      className="pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32"
    >
      <Container>
        <FeaturesMobile services={services} />
        <FeaturesDesktop services={services} />
      </Container>
    </section>
  );
}
