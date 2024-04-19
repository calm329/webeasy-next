"use client";

import PostCard from "@/components/card/post-card";
import ServiceCard from "@/components/card/service-card";
import CTA from "@/components/cta";
import Loader from "@/components/loader";
import TopBar from "@/components/top-bar";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [code: string]: string | string[] | undefined };
}) {
  const code = searchParams["code"];

  const [status, setStatus] = useState("Loading Instagram");
  const [imageIds, setImageIds] = useState<any>({});
  const [iPosts, setIPosts] = useState<any[]>([]);
  const [mediaCaption, setMediaCaption] = useState("");
  const [aiContent, setAiContent] = useState({});
  // useEffect(() => {

  //     const fetchDate = async () => {
  //         try {
  //             const response1 = await fetch("/api/auth?code=" + code);
  //             const data1 = await response1.json();

  //             if (data1.mediaCaption) setMediaCaption(data1.mediaCaption);
  //             if (Object.keys(data1.imageIds).length) setImageIds(data1.imageIds);
  //             if (data1.posts.length) setIPosts(data1.posts);

  //             setStatus("Generating Content");
  //         } catch (error) {
  //             console.log(error);
  //         };
  //     };
  // }, []);

  useEffect(() => {
    fetch("/api/auth?code=" + code)
      .then(async (response) => {
        try {
          const data = await response.json();

          if (data.mediaCaption) setMediaCaption(data.mediaCaption);
          if (Object.keys(data.imageIds).length) setImageIds(data.imageIds);
          if (data.posts.length) setIPosts(data.posts);
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
        setMediaCaption(error);
      });
  }, []);

  useEffect(() => {
    if (!mediaCaption) return;

    console.log(status);

    setStatus("Generating Content");

    fetch("/api/content", {
      method: "POST",
      body: JSON.stringify({ mediaCaption }),
    }).then(async (response) => {
      try {
        const data = await response.json();

        if (data.aiContent) {
          const _aiContent = JSON.parse(data.aiContent);
          const postImageUrl = imageIds[_aiContent["hero"]["imageId"]];
          _aiContent["hero"]["imageUrl"] = postImageUrl;

          setStatus("Choosing Colors");

          fetch("/api/color", {
            method: "POST",
            body: JSON.stringify({ postImageUrl }),
          }).then(async (colorsResponse) => {
            try {
              const colorsData = await colorsResponse.json();

              if (colorsData.colors)
                _aiContent["colors"] = JSON.parse(colorsData.colors);

              setAiContent(_aiContent);

              setStatus("done");
            } catch (error) {
              console.log(error);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, [mediaCaption]);

  if (status != "done")
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader text={status} />
      </div>
    );

  return (
    <div>
      <section className="bg-white py-6">
        <div className="container mx-auto px-4">
          <TopBar
            businessName={aiContent["businessName"]}
            colors={aiContent["colors"]}
            cta={{
              text: aiContent["hero"]["cta"],
              link: "#",
            }}
          />
        </div>
      </section>
      <section className="overflow-hidden bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-white px-8 py-16">
            <div className="mx-auto max-w-7xl">
              <div className="-m-8 mb-10 flex flex-wrap">
                <div className="w-full p-8 md:w-1/2">
                  <div className="md:max-w-lg">
                    <h2
                      className={`font-heading mb-6 text-4xl font-black tracking-tight text-gray-300 md:text-5xl`}
                      style={{ color: aiContent["colors"]["primary"] }}
                    >
                      {aiContent["hero"]["heading"]}
                    </h2>
                    <p className="mb-8 text-xl font-bold">
                      {aiContent["hero"]["subheading"]}
                    </p>
                    <div className="-m-2 flex flex-wrap">
                      <div className="w-full p-2 md:w-auto">
                        <CTA
                          text={aiContent["hero"]["cta"]}
                          bgColor={aiContent["colors"]["secondary"]}
                          link="#"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full p-8 md:w-1/2">
                  <Image
                    src={aiContent["hero"]["imageUrl"]}
                    width={256}
                    height={256}
                    alt="Hero Image"
                    className="mx-auto rounded-3xl object-contain md:mr-0"
                  />
                </div>
              </div>
              <div className="rounded-3xl bg-gray-100 p-8 md:p-12">
                <div className="-m-8 flex flex-wrap">
                  {aiContent["services"]["list"].map((service) => (
                    <ServiceCard
                      key={service["name"]}
                      name={service["name"]}
                      description={service["description"]}
                      color={aiContent["colors"]["primary"]}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*<p className="text-base font-semibold leading-7 text-indigo-600">WebEasy.AI</p>
          <div className="mx-auto max-w-2xl text-base leading-7 text-gray-700" dangerouslySetInnerHTML={{ __html: aiContent }} />*/}

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Posts</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {iPosts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              permalink={post.permalink}
              media_url={post.media_url}
              media_type={post.media_type}
              caption={post.caption}
              timestamp={post.timestamp}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
