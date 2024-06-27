import Image from "next/image";
import clsx from "clsx";
import { Button } from "@/components/ui/button/template-button";
import { Card } from "@/components/ui/card/general-card";
import {
  TBanner,
  TFeature,
  THero,
  TPosts,
  TServices,
} from "@/types";

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

export default function General(props: TProps) {
  const { aiContent, posts } = props;
  return (
    <div className={`relative mx-auto flex w-full max-w-7xl flex-col px-5`}>
      <div>
        <header
          className={`pointer-events-none relative flex flex-none flex-col `}
        >
          <div className="top-0  pt-6">
            <div className={`top-[var(--header-top,theme(spacing.6))] w-full `}>
              <div className={`relative flex gap-4`}>
                <div className="flex flex-1 justify-end md:justify-center">
                  <nav className="pointer-events-auto block w-full">
                    <div className="flex w-full items-center justify-between rounded-full border bg-white/90 px-10 py-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-lg dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 max-md:px-5 max-sm:flex-col max-sm:gap-5 max-sm:rounded">
                      <div
                        className="flex items-center gap-5 max-md:gap-2"
                        style={{ color: aiContent.colors.primary }}
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
                      {aiContent.banner.button.show &&
                        aiContent.banner.button.list.map((data, i) => (
                          <div key={i}>
                            <Button
                              href={data.link ?? "#"}
                              text={data.label}
                              bgColor={aiContent.colors.secondary}
                            />
                          </div>
                        ))}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div
          className="flex-none"
          style={{ height: "var(--content-offset)" }}
        />
      </div>
      <main className="mt-24 flex flex-col gap-10 ">
        <div className={`flex w-full`}>
          <div
            className={`flex items-center justify-center gap-10 max-lg:flex-col`}
          >
            <div className="">
              <h1
                className={`text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl`}
              >
                {aiContent.hero.heading}
              </h1>
              <p className={`mt-6 text-base text-zinc-600 dark:text-zinc-400 `}>
                {aiContent.hero.subheading}
              </p>
              <div>
                {aiContent.hero.button.show && (
                  <div>
                    {aiContent.hero.button.list.map((data, i) => (
                      <div key={i}>
                        <Button
                          href={data.link ?? "#"}
                          text={data.label}
                          bgColor={aiContent.colors.secondary}
                          className="mt-10  "
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {aiContent.hero.image.show && (
              <div>
                <Image
                  src={aiContent.hero.image.imageUrl}
                  alt=""
                  height={400}
                  width={300}
                  className={`mt-5 rounded-lg object-contain drop-shadow max-lg:mx-auto`}
                />
              </div>
            )}
          </div>
        </div>
        <div className="my-24 md:mt-28">
          <div className={`mx-auto  gap-y-20 lg:max-w-none lg:grid-cols-2`}>
            {aiContent.services.show && (
              <div className="flex  flex-wrap justify-center gap-10">
                {aiContent.services.list.map((data) => (
                  <div className={`max-w-96`} key={data.id}>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Description>{data.description}</Card.Description>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          <div className={`my-20" mt-16 sm:mt-20`}>
            {posts?.show && (
              <div className="my flex flex-wrap justify-center gap-10 overflow-hidden py-4 ">
                {posts.list.map(
                  (data, i) =>
                    posts.limit > i && (
                      <div className={`flex w-96 flex-col `} key={data.id}>
                        <div
                          className={clsx(
                            "relative aspect-[9/10] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl",
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

                        <p>{data.caption}</p>
                      </div>
                    ),
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
