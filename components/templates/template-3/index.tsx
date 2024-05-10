import Image, { type ImageProps } from "next/image";
import clsx from "clsx";

import { Button } from "../template-1/Button";
import { Card } from "./Card";
import { Container } from "./Container";
import { Header } from "./Header";
import { Dispatch, SetStateAction } from "react";
import { TFields, TSection } from "@/types";

function Service({
  service,
}: {
  service: { name: string; description: string; image: string };
}) {
  return (
    <Card className="max-w-96">
      <Card.Title>{service.name}</Card.Title>
      <Card.Description>{service.description}</Card.Description>
    </Card>
  );
}

type TPostProps = {
  posts: any[];
};

function Photos(props: TPostProps) {
  const { posts } = props;
  let rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2",
  ];

  return (
    <>
      <div className="mt-16 sm:mt-20">
        <div className="-my-4 flex flex-wrap justify-center gap-10 overflow-hidden py-4 ">
          {posts.map((data, i) => (
            <div className="flex w-72 flex-col" key={data.id}>
              <div
                className={clsx(
                  "relative aspect-[9/10] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl",
                  rotations[i % rotations.length],
                )}
              >
                <Image
                  src={data.media_url}
                  alt=""
                  className=" inset-0 h-full w-full object-cover"
                  height={300}
                  width={300}
                />
              </div>
              <h2>{data.username}</h2>
              <p>{data.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </>
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

type TProps = {
  logo?: string;
  businessName: string;
  hero: {
    heading: string;
    subheading: string;
    imageUrl: string;
  };
  colors: {
    primary: string;
    secondary: string;
  };
  cta: {
    text: string;
    link: string;
  };
  services: any[];
  posts: any[];
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
};

export default function Home(props: TProps) {
  const {
    logo,
    businessName,
    hero,
    colors,
    cta,
    services,
    posts,
    setIsOpen,
    setSection,
    editable,
    setFocusedField,
  } = props;
  return (
    <>
      <div className=" inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <Header
          logo={logo}
          businessName={businessName}
          cta={cta}
          colors={colors}
        />
        <main className="flex-auto max-sm:mt-20">
          <Container className="mt-9 flex w-full">
            <div className="flex gap-10 max-lg:flex-col">
              <div className="">
                <h1
                  className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
                  style={{ color: colors.primary }}
                >
                  {hero.heading}
                </h1>
                <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                  {hero.subheading}
                </p>
                <Button
                  href={cta.link}
                  className="mt-10  "
                  bgColor={colors.secondary}
                  text={cta.text}
                />
              </div>
              <div>
                <Image
                  src={hero.imageUrl}
                  alt=""
                  height={400}
                  width={300}
                  className="mt-5 rounded-lg object-contain drop-shadow max-lg:mx-auto"
                />
              </div>
            </div>
          </Container>
          <Container>
            <Photos posts={posts} />
          </Container>
          <Container className="my-24 md:mt-28">
            <div className="mx-auto  gap-y-20 lg:max-w-none lg:grid-cols-2">
              <div className="flex  flex-wrap gap-10">
                {services.map((data) => (
                  <Service key={data.name} service={data} />
                ))}
              </div>
            </div>
          </Container>
        </main>
      </div>
    </>
  );
}
