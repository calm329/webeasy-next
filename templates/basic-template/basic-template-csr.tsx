import Image from "next/image";
import PostCard from "@/components/ui/card/post-card";
import ServiceCard from "@/components/ui/card/service-card";
import CTA from "@/components/cta";
import TopBar from "@/components/top-bar";
import { Dispatch, SetStateAction } from "react";
import {
  TBanner,
  TColors,
  TFields,
  THero,
  TPosts,
  TSection,
  TServices,
} from "@/types";
import EditableBanner from "@/components/editable/banner";
import EditableHero from "@/components/editable/hero";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { appState } from "../../lib/store/slices/site-slice";
import { Skeleton } from "@/components/ui/skeleton";
import TypewriterEffect from "@/components/typewriter-effect";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/select-template-carousel";
import { Card } from "@/components/ui/card/general-card";
import { CardContent } from "@/components/ui/card";

type BasicTemplateProps = {
  hero: THero;
  banner: TBanner;
  colors: TColors;
  services: TServices;
  posts: TPosts;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
  showForm: {
    form: string;
    edit: string;
    show: boolean;
  };
  setShowForm: React.Dispatch<
    React.SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
};

export default function BasicTemplate(props: BasicTemplateProps) {
  const {
    hero,
    banner,
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
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
  console.log("services", services);
  return (
    <>
      <section className="bg-white py-6">
        <EditableBanner
          banner={banner}
          colors={colors}
          editable={editable}
          setFocusedField={setFocusedField}
          setIsOpen={setIsOpen}
          setSection={setSection}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      </section>
      <section className=" bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-white px-8 py-16  pb-10">
            <div className="mx-auto max-w-7xl">
              <EditableHero
                colors={colors}
                hero={hero}
                editable={editable}
                setFocusedField={setFocusedField}
                setIsOpen={setIsOpen}
                setSection={setSection}
                showForm={showForm}
                setShowForm={setShowForm}
              />

              <div
                className={`rounded-3xl  p-8 md:p-12 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"} bg-gray-100`}
                onClick={() => {
                  if (setIsOpen && setSection) {
                    setIsOpen(true);
                    setSection("Services");
                    dispatch(
                      updateAppState({
                        ...appState,
                        openedSlide: "Customize",
                      }),
                    );
                  }
                }}
              >
                <div className="mb-10 flex flex-col">
                  {services?.title ? (
                    <h2
                      className={`mx-auto w-fit text-center text-2xl font-bold ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          editable &&
                          setIsOpen &&
                          setSection &&
                          setFocusedField &&
                          setShowForm
                        ) {
                          setSection("Services");
                          setIsOpen(true);
                          setShowForm({
                            form: "",
                            edit: "",
                            show: false,
                          });
                          dispatch(
                            updateAppState({
                              ...appState,
                              focusedField: "title",
                              openedSlide: "Customize",
                            }),
                          );
                        }
                      }}
                    >
                      {appState?.generate?.generating ? (
                        <TypewriterEffect text={services?.title} />
                      ) : (
                        services?.title
                      )}
                    </h2>
                  ) : (
                    <Skeleton className={`mx-auto h-12 w-40 bg-white `} />
                  )}
                  {services?.description ? (
                    <p
                      className={`mx-auto mb-6 mt-2 w-fit text-center ${editable && "rounded border-2 border-transparent hover:border-indigo-500 "}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          editable &&
                          setIsOpen &&
                          setSection &&
                          setFocusedField &&
                          setShowForm
                        ) {
                          setSection("Services");
                          setIsOpen(true);
                          setShowForm({
                            form: "",
                            edit: "",
                            show: false,
                          });
                          dispatch(
                            updateAppState({
                              ...appState,
                              focusedField: "description",
                              openedSlide: "Customize",
                            }),
                          );
                        }
                      }}
                    >
                      {appState?.generate?.generating ? (
                        <TypewriterEffect text={services?.description} />
                      ) : (
                        services?.description
                      )}
                    </p>
                  ) : (
                    <Skeleton className="mx-auto mb-6 mt-2 h-8 w-96 bg-white" />
                  )}
                </div>

                <div className="-m-8 flex flex-wrap">
                  {services?.show &&
                    services?.list?.map((service) => (
                      <ServiceCard
                        id={service["id"]}
                        key={service["name"]}
                        name={service["name"]}
                        description={service["description"]}
                        color={colors?.primary}
                        editable={editable}
                        setIsOpen={setIsOpen}
                        setSection={setSection}
                        showForm={showForm}
                        setShowForm={setShowForm}
                        appState={appState}
                      />
                    ))}

                  {appState?.generate?.generating &&
                    Array.from({ length: 6 })?.map(
                      (_, i) =>
                        i > (services?.list ?? [])?.length - 1 && (
                          <div
                            key={i}
                            className={`w-full p-8 md:w-1/3 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                          >
                            <div className="-m-3 flex flex-wrap">
                              <div className="w-auto p-3 md:w-full lg:w-auto">
                                <div className="flex  items-center justify-center rounded-xl ">
                                  <Skeleton className="h-12 w-12 bg-white" />
                                </div>
                              </div>
                              <div className="flex-1 p-3">
                                <h3 className="font-heading mb-2 text-xl font-black text-gray-900">
                                  <Skeleton className="h-10 w-full bg-white" />
                                </h3>
                                <p className="flex flex-col gap-1 text-sm font-bold text-gray-700">
                                  {" "}
                                  <Skeleton className="h-8 w-full bg-white" />{" "}
                                  <Skeleton className="h-8 w-1/2 bg-white" />
                                </p>
                              </div>
                            </div>
                          </div>
                        ),
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" container mb-20 mt-20">
        {appState?.aiContent?.gallery?.list ? (
          appState?.aiContent?.gallery?.show && (
            <Carousel className="h-full w-full">
              <CarouselContent>
                {appState?.aiContent?.gallery?.list?.map((image, i) => (
                  <CarouselItem key={i}>
                    <div className=" h-[500px] rounded-lg border border-gray-300 shadow-lg">
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
          )
        ) : (
          <div className=" h-[500px] rounded-lg border border-gray-300 p-8 shadow-lg">
            <div className=" h-[500px] rounded-lg border border-gray-300 shadow-lg">
              <Skeleton
                className="h-[500px] w-full"
                style={{
                  height: 500,
                }}
              />
            </div>
          </div>
        )}
      </section>

      <section className=" container mb-20 mt-20">
        {appState?.aiContent?.partners ? (
          appState?.aiContent?.partners?.show && (
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl font-bold text-gray-900">
                {appState?.aiContent?.partners?.title}
              </h2>
              <p>{appState?.aiContent?.partners?.description}</p>
              <div className="h-full w-full">
                {appState?.aiContent?.partners?.list?.map((image, i) => (
                  <div key={i}></div>
                ))}
              </div>
            </div>
          )
        ) : (
          <div className=" h-[500px] rounded-lg border border-gray-300 p-8 shadow-lg">
            <div className=" h-[500px] rounded-lg border border-gray-300 shadow-lg">
              <Skeleton
                className="h-[500px] w-full"
                style={{
                  height: 500,
                }}
              />
            </div>
          </div>
        )}
      </section>
      <section className=" container mb-20 mt-20">
        {appState?.aiContent?.testimonials?.list ? (
          appState?.aiContent?.testimonials?.show && (
            <Carousel className="h-full w-full">
              <CarouselContent>
                {appState?.aiContent?.testimonials?.list?.map(
                  (testimonial, i) => (
                    <CarouselItem key={i}>
                      <div className=" h-full rounded-lg border border-gray-300 p-8 shadow-lg">
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
                          <h3 className="text-3xl font-bold">
                            {testimonial.name}
                          </h3>
                          <p className="text-xl">{testimonial.content}</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ),
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )
        ) : (
          <div className=" h-full rounded-lg border border-gray-300 p-8 shadow-lg">
            <div className="flex flex-col gap-5">
              <div className="h-44 w-44 overflow-hidden">
                <Skeleton className=" h-[100px] w-[100px] rounded-full object-cover" />
              </div>
              <Skeleton className="h-14 w-full " />
              <Skeleton className="h-10 w-full " />
            </div>
          </div>
        )}
      </section>
      <div
        className={`mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
        onClick={() => {
          if (setIsOpen && setSection) {
            setIsOpen(true);
            setSection("Posts");
            dispatch(
              updateAppState({
                ...appState,
                openedSlide: "Customize",
              }),
            );
            setShowForm({
              form: "",
              edit: "",
              show: false,
            });
          }
        }}
      >
        <h2 className="sr-only">Posts</h2>
        {appState?.iPosts?.show && (
          <div className="flex flex-wrap gap-5">
            {posts.list.map(
              (post, i) =>
                posts.limit > i && (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    permalink={editable ? "#" : post.permalink}
                    media_url={post.media_url}
                    media_type={post.media_type}
                    caption={post.caption}
                    timestamp={post.timestamp}
                    showHash={posts.showHash}
                  />
                ),
            )}
          </div>
        )}
      </div>
    </>
  );
}
