import Image from "next/image";
import PostCard from "@/components/ui/card/post-card";
import ServiceCard from "@/components/ui/card/service-card";
import CTA from "@/components/cta";
import TopBar from "@/components/top-bar";
import { generateUniqueId } from "@/lib/utils/function";
import {
  TAiContent,
  TBanner,
  TColors,
  TFeature,
  THero,
  TPosts,
  TServices,
} from "@/types";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/select-template-carousel";

type TProps = {
  aiContent: TAiContent;
  posts: TPosts;
};
export default function BasicTemplate(props: TProps) {
  const { aiContent, posts } = props;
  console.log("aiContent?.partners?.list",aiContent?.partners?.list)
  return (
    <>
      <section className="bg-white py-6">
        <div className={`container mx-auto px-4`}>
          <div className="flex items-center justify-between rounded-full border border-gray-100 bg-gray-100 px-6 py-3.5 max-sm:flex-col max-sm:gap-5">
            <div className="w-auto">
              <div className="flex flex-wrap items-center">
                <div
                  className="text-black-300 flex w-auto items-center gap-2 text-xl font-medium"
                  style={{ color: aiContent?.colors?.primary }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {aiContent.banner.logo && (
                    <Image
                      src={aiContent.banner.logo.link}
                      alt={aiContent.banner.logo.alt}
                      className={`h-8 w-auto `}
                      height={32}
                      width={200}
                    />
                  )}
                  <Link href="#">{aiContent.banner.businessName}</Link>
                </div>
              </div>
            </div>
            <div className="w-auto">
              <div className="flex flex-wrap items-center">
                <div className="w-auto lg:block">
                  <div className="-m-2 flex flex-wrap">
                    <div className={`flex w-full gap-5 p-2 md:w-auto`}>
                      {aiContent.banner.button.list.map((data, i) => (
                        <div key={i}>
                          <CTA
                            text={data.label}
                            bgColor={aiContent?.colors?.secondary}
                            link={data.link ?? ""}
                            external={data.type === "External"}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="overflow-hidden bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-white px-8 py-16 pb-10">
            <div className="mx-auto max-w-7xl">
              <div
                className={`-m-8 mb-10 flex flex-wrap justify-between pr-2 `}
              >
                <div className="w-1/2 p-8 max-md:w-full">
                  <div className="md:max-w-lg">
                    <h2
                      className={`font-heading mb-6 text-4xl font-black tracking-tight text-gray-300 md:text-5xl `}
                      style={{ color: aiContent?.colors?.primary }}
                    >
                      {aiContent.hero.heading}
                    </h2>
                    <p className={`mb-8 text-xl font-bold `}>
                      {aiContent.hero.subheading}
                    </p>
                    <div className="-m-2 flex flex-wrap">
                      <div className={`flex w-full gap-5 p-2 md:w-auto`}>
                        {aiContent.hero.button.list.map((button) => (
                          <div key={button.name}>
                            <CTA
                              text={button.label}
                              bgColor={aiContent?.colors?.secondary}
                              link={button.link ?? ""}
                              external={button.type === "External"}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`$w-1/4 max-h-96 max-w-96 overflow-hidden  py-2 max-sm:w-full`}
                >
                  <Image
                    src={aiContent.hero.image.imageUrl}
                    width={256}
                    height={256}
                    alt="Hero Image"
                    className={`$ mx-auto h-full w-full rounded-3xl object-cover md:mr-0`}
                  />
                </div>
              </div>
              {aiContent.services.show && (
                <div className="rounded-3xl bg-gray-100 p-8 md:p-12">
                  <div className="-m-8 flex flex-wrap">
                    {aiContent.services.list.map((service) => (
                      <ServiceCard
                        id={service["id"]}
                        key={service["name"]}
                        name={service["name"]}
                        description={service["description"]}
                        color={aiContent?.colors?.primary}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className={`container mb-20 mt-20`}>
        {aiContent?.gallery?.show && (
          <Carousel className="h-full w-full">
            <CarouselContent>
              {aiContent?.gallery?.list?.map((image, i) => (
                <CarouselItem key={i}>
                  <div
                    className={`mx-10 h-[500px]  rounded-lg border border-gray-300 shadow-lg max-sm:mx-0`}
                  >
                    <Image
                      src={image}
                      alt=""
                      height={1000}
                      width={1000}
                      className=" w-full  object-cover"
                      style={{
                        height: 500,
                      }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </section>

      <section className={`container mb-20 mt-20`}>
        {aiContent?.partners?.show && (
          <div className={`flex flex-col gap-5`}>
            <h2 className="text-3xl font-bold text-gray-900">
              {aiContent?.partners?.title}
            </h2>
            <p>{aiContent?.partners?.description}</p>

            <div className="inline-edit mt-10 flex-1 px-5 md:px-6">
              <div className="flex w-full overflow-hidden">
                <div className=" flex w-full items-center justify-center gap-10">
                  {(aiContent?.partners?.list ?? []).map((src, index) => (
                    <div
                      key={index}
                      className="relative flex h-24 w-auto flex-shrink-0 rounded-lg p-2 transition-all md:h-16 md:rounded-xl lg:rounded-2xl"
                    >
                      <Link href={src.link ?? ""}>
                        <Image
                          className="h-full object-contain grayscale transition-all duration-300 hover:grayscale-0"
                          src={src.logo}
                          alt={`Logo ${index + 1}`}
                          height={200}
                          width={200}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className={`container mb-20 mt-20`}>
        {aiContent?.testimonials?.show && (
          <Carousel className="h-full w-full">
            <CarouselContent>
              {aiContent?.testimonials?.list?.map((testimonial, i) => (
                <CarouselItem key={i}>
                  <div
                    className={` h-full rounded-lg border border-gray-300 p-8 shadow-lg`}
                  >
                    <div className="flex flex-col gap-5">
                      <div className="h-44 w-44 overflow-hidden">
                        <Image
                          src={testimonial.avatar}
                          alt=""
                          height={100}
                          width={100}
                          className="h-[100px] w-[100px] rounded-full object-cover"
                        />
                      </div>
                      <h3 className="text-3xl font-bold">{testimonial.name}</h3>
                      <p className="text-xl">{testimonial.content}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </section>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Posts</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {posts?.list?.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              permalink={post.permalink}
              media_url={post.media_url}
              media_type={post.media_type}
              caption={post.caption}
              timestamp={post.timestamp}
              showHash={posts.showHash}
            />
          ))}
        </div>
      </div>
    </>
  );
}
