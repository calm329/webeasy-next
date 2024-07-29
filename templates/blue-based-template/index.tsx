import React from "react";
import { TBanner, TFeature, THero, TServices } from "@/types";

import { Container } from "@/components/container";
import Image from "next/image";
import { Button } from "@/components/ui/button/template-button";
import clsx from "clsx";
import { TPosts } from "../../types/index";

type TProps = {
  aiContent: {
    productId?: string;
    banner: TBanner;
    hero: THero;
    services: TServices;
    colors: {
      primary: string;
      secondary: string;
    };
    features?: Array<TFeature>;
    description?: string;
    images?: {
      primary: { Large: { Height: number; URL: string; Width: number } };
      variant: Array<{
        Large: { Height: number; URL: string; Width: number };
        Medium: { Height: number; URL: string; Width: number };
        Small: { Height: number; URL: string; Width: number };
      }>;
    };
    price?: string;
    title?: string;
    businessType?: string;
    location?: string;
  };
  posts: TPosts;
};

export function BackgroundImage({
  className,
  position = "left",
}: {
  className?: string;
  position?: "left" | "right";
}) {
  return (
    <div
      className={clsx(
        "absolute inset-0 overflow-hidden bg-indigo-50",
        className,
      )}
    >
      <Image
        className={clsx(
          "absolute top-0",
          position === "left" &&
            "left-0 translate-x-[-55%] translate-y-[-10%] -scale-x-100 sm:left-1/2 sm:translate-x-[-98%] sm:translate-y-[-6%] lg:translate-x-[-106%] xl:translate-x-[-122%]",
          position === "right" &&
            "left-full -translate-x-1/2 sm:left-1/2 sm:translate-x-[-20%] sm:translate-y-[-15%] md:translate-x-0 lg:translate-x-[5%] lg:translate-y-[4%] xl:translate-x-[27%] xl:translate-y-[-8%]",
        )}
        src={"/images/background.jpg"}
        alt=""
        width={918}
        height={1495}
        priority
        unoptimized
      />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
    </div>
  );
}

const BlueBasedTemplate = (props: TProps) => {
  const { aiContent, posts } = props;

  return (
    <>
      <header className={`z-1 relative flex-none lg:pt-20  `}>
        <Container
          className={`flex flex-wrap items-center justify-center gap-10 max-sm:flex-col sm:justify-between lg:flex-nowrap`}
          style={{ color: aiContent.colors.primary }}
        >
          <div
            className={`mt-10 flex items-center  gap-2 text-xl lg:mt-0 lg:grow lg:basis-0 `}
          >
            {aiContent.banner.logo.show && (
              <Image
                src={aiContent.banner.logo.link ?? ""}
                alt={aiContent.banner.logo.alt ?? ""}
                height={100}
                width={100}
              />
            )}

            <span>{aiContent.banner.businessName}</span>
          </div>
          {aiContent.banner.button.show && (
            <div
              className={`sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end `}
            >
              <div className={` flex gap-5`}>
                {aiContent.banner.button.list.map((obj, i) => (
                  <div key={i}>
                    <Button
                      href={obj.link ?? "#"}
                      text={obj.label}
                      bgColor={aiContent.colors.secondary}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </header>
      <div className="relative py-20 sm:pb-24 sm:pt-36 ">
        <BackgroundImage className="-bottom-14 -top-36 max-sm:-top-48" />
        <Container className={`relative flex max-lg:flex-col-reverse `}>
          {aiContent.hero.image.show && (
            <Image
              src={aiContent.hero?.image?.imageUrl ?? ""}
              alt=""
              height={400}
              width={300}
              className={`mt-5 rounded-lg object-contain drop-shadow max-lg:mx-auto `}
            />
          )}
          <div className={`ml-auto max-w-2xl `}>
            <h1
              className={`font-display text-5xl font-bold tracking-tighter text-blue-600 sm:text-7xl `}
              style={{ color: aiContent.colors.primary }}
            >
              <span className="sr-only">DeceptiConf - </span>
              {aiContent.hero.heading}
            </h1>
            <div className="font-display mt-6 space-y-6 text-2xl tracking-tight text-blue-900">
              <p>{aiContent.hero.subheading}</p>
            </div>
            {aiContent.hero.button.show && (
              <div className={` flex gap-5 `}>
                {aiContent.hero.button.list.map((obj, i) => (
                  <div key={i} className="w-full">
                    <Button
                      href={obj.link ?? "#"}
                      text={obj.label}
                      bgColor={aiContent.colors.secondary}
                      className="mt-10 w-full "
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
      <section id="schedule" aria-label="Schedule" className="py-14">
        <div className="relative ">
          <BackgroundImage position="right" />
          <Container className={`relative`}>
            <div className="grid  lg:gap-x-8">
              {aiContent.services.show && (
                <ol
                  className={
                    " mt-10  space-y-8 bg-white px-10 py-14 text-center shadow-xl shadow-blue-900/5"
                  }
                >
                  {aiContent.services.list?.map((obj, i) => (
                    <li key={i}>
                      {i > 0 && (
                        <div className="mx-auto mb-8 h-px  border-b-2 border-gray-400 bg-white" />
                      )}
                      <h4 className="text-lg font-semibold tracking-tight text-blue-900">
                        {obj.name}
                      </h4>
                      {obj.description && (
                        <p className="mt-1 tracking-tight text-blue-900">
                          {obj.description}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </Container>
        </div>
      </section>
      <section
        id="speakers"
        aria-labelledby="speakers-title"
        className="py-20 sm:py-32"
      >
        <Container className={`flex`}>
          <div className="mt-14 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:mt-16 sm:gap-y-16 lg:mt-24 lg:grid-cols-3">
            <div className="lg:col-span-3">
              <div
                className={`ui-not-focus-visible:outline-none grid  grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-16 md:grid-cols-3 `}
              >
                {posts?.show &&
                  posts.list?.map(
                    (post, i) =>
                      posts.limit > i && (
                        <div key={post.id}>
                          <div className="rounded-4xl group relative h-96 transform overflow-hidden">
                            <div
                              className={clsx(
                                "rounded-4xl absolute bottom-6 left-0 right-4 top-0 border transition duration-300 group-hover:scale-95 xl:right-6",
                                [
                                  "border-blue-300",
                                  "border-indigo-300",
                                  "border-sky-300",
                                ][i % 3],
                              )}
                            />
                            <div
                              className="absolute inset-0 bg-indigo-50"
                              style={{ clipPath: `url(#${post.id}-${i % 3})` }}
                            >
                              <Image
                                className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110"
                                src={post.media_url}
                                alt=""
                                priority
                                sizes="(min-width: 1280px) 17.5rem, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                                height={400}
                                width={400}
                              />
                            </div>
                          </div>

                          <p className="mt-1 text-base tracking-tight text-slate-500">
                            {post.caption}
                          </p>
                        </div>
                      ),
                  )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default BlueBasedTemplate;
