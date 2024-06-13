import Image, { type ImageProps } from "next/image";
import clsx from "clsx";

import { Button } from "@/components/ui/button/template-button";
import { Card } from "@/components/ui/card/general-card";
import { Container } from "@/components/container/nested-container";
import { Header } from "@/components/header/general-header";
import { Dispatch, SetStateAction } from "react";
import { TBanner, TColors, TFields, THero, TPosts, TSection } from "@/types";

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
  posts: TPosts;
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
          {posts.list.map((data, i) => (
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

type TProps = {
  hero: THero;
  banner: TBanner;
  colors: TColors;
  services: any[];
  posts: TPosts;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
  showForm?: {
    form: string;
    edit: string;
    show: boolean;
  };
  setShowForm?: React.Dispatch<
    React.SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
};

export default function General(props: TProps) {
  const {
    banner,
    hero,
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
  return (
    <>
      <div className=" inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <Header
          banner={banner}
          colors={colors}
          editable={editable}
          setIsOpen={setIsOpen}
          setSection={setSection}
          setShowForm={setShowForm}
          showForm={showForm}
        />
        <main className="mt-24 flex-auto">
          <Container className=" flex w-full">
            <div className="flex gap-10  max-lg:flex-col">
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
                {hero.button.list.map((data, i) => (
                  <div key={i}>
                    <Button
                      href={data.value ?? "#"}
                      text={data.label}
                      bgColor={colors.secondary}
                      className="mt-10  "
                    />
                  </div>
                ))}
              </div>
              <div>
                <Image
                  src={hero.image.imageUrl}
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
