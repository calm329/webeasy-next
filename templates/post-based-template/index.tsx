import { Services } from "../../components/services/post-based-services";
import { Posts } from "../../components/posts/post-based-posts";
import { TBanner, TFeature, THero, TPosts, TServices } from "@/types";
import { Header } from "@/components/header/post-based-header";
import { Hero } from "@/components/hero/post-based-hero";
import { Container } from "@/components/container";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button/template-button";
import clsx from "clsx";
import { QuoteIcon } from "lucide-react";

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

export default function PostBasedTemplate(props: TProps) {
  const { aiContent, posts } = props;
  return (
    <>
      <header className="py-10">
        <Container>
          <nav
            className={`z-1 relative flex items-center justify-between gap-10 max-sm:flex-col`}
          >
            <div
              className="flex items-center md:gap-x-12 "
              style={{ color: aiContent.colors.primary }}
            >
              <Link
                href="#"
                aria-label="Home"
                className="flex items-center gap-5"
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
              </Link>
            </div>
            {aiContent.banner.button.show && (
              <div className={`flex items-center gap-x-5 md:gap-x-8`}>
                {aiContent.banner.button.list.map((data, i) => (
                  <div key={i}>
                    <Button
                      href={data.link ?? "#"}
                      text={data.label}
                      bgColor={aiContent.colors.secondary}
                    />
                  </div>
                ))}
                <div className="-mr-1 md:hidden">
                  {/* <MobileNavigation /> */}
                </div>
              </div>
            )}
          </nav>
        </Container>
      </header>
      <main>
        <Container
          className={`flex gap-5 pb-16 pt-20 text-center max-lg:flex-col lg:pt-32`}
        >
          {aiContent.hero.image.show && (
            <Image
              src={aiContent.hero.image.imageUrl}
              alt=""
              height={400}
              width={300}
              className={`mt-5 rounded-lg object-contain drop-shadow max-lg:mx-auto`}
            />
          )}
          <div>
            <h1
              className={`font-display ml-auto max-w-4xl text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl`}
              style={{ color: aiContent.colors.primary }}
            >
              {aiContent.hero.heading}
            </h1>
            <p
              className={`mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700 `}
            >
              {aiContent.hero.subheading}
            </p>
            {aiContent.hero.button.show && (
              <div className={`mx-auto ml-0 mt-10 flex justify-center gap-x-6`}>
                {aiContent.hero.button.list.map((data, i) => (
                  <div key={i}>
                    <Button
                      href={data.link ?? "#"}
                      text={data.label}
                      bgColor={aiContent.colors.secondary}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
        <section
          id="secondary-features"
          aria-label="Features for simplifying everyday business tasks"
          className="pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32"
        >
          <Container>
            {aiContent.services.show && (
              <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
                {aiContent.services.list.map((data) => (
                  <div key={data.name}>
                    <div className={``}>
                      <div
                        className={clsx(
                          "flex w-9 justify-center rounded-lg",
                          "bg-slate-500",
                        )}
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
                      <h3
                        className={clsx(
                          "mt-6 text-sm font-medium",
                          "text-slate-600",
                        )}
                      >
                        {data.name}
                      </h3>
                      <p className="mt-4 text-sm text-slate-600">
                        {data.description}
                      </p>
                    </div>
                    <div className="relative mt-10 pb-10">
                      <div className="absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6" />
                      <div className="relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {aiContent.services.show && (
              <div className="hidden lg:mt-20 lg:block">
                <div className="grid grid-cols-2  gap-10 ">
                  {aiContent.services.list.map((data, featureIndex) => (
                    <div key={featureIndex}>
                      <div
                        className={clsx(
                          "flex w-9 justify-center rounded-lg",
                          "bg-slate-500",
                        )}
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
                      <h3
                        className={clsx(
                          "mt-6 text-sm font-medium",
                          "text-slate-600",
                        )}
                      >
                        {data.name}
                      </h3>
                      <p className="mt-4 text-sm text-slate-600">
                        {data.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </section>
        <section
          id="testimonials"
          aria-label="What our customers are saying"
          className="bg-slate-50 py-20 sm:py-32"
        >
          <Container>
            <div className="mx-auto max-w-2xl md:text-center">
              <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
                Posts
              </h2>
            </div>
            {posts.show && (
              <ul
                className={`mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3`}
              >
                {posts.list.map(
                  (data, i) =>
                    posts.limit > i && (
                      <li key={i} className="">
                        <ul
                          role="list"
                          className="flex h-full gap-y-6 sm:gap-y-8"
                        >
                          <li key={i}>
                            <figure className="relative flex h-full flex-col justify-between rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                              <QuoteIcon className="absolute left-6 top-6 fill-slate-100" />
                              <blockquote className="relative">
                                <p className="text-lg tracking-tight text-slate-900">
                                  {data.caption}
                                </p>
                              </blockquote>
                              <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                                <div className="overflow-hidden rounded-full bg-slate-50">
                                  <Image
                                    className="h-14 w-14 object-cover"
                                    src={data.media_url}
                                    alt=""
                                    width={56}
                                    height={56}
                                  />
                                </div>
                              </figcaption>
                            </figure>
                          </li>
                        </ul>
                      </li>
                    ),
                )}
              </ul>
            )}
          </Container>
        </section>
      </main>
    </>
  );
}
