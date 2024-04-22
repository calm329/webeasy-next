"use client";

import PostCard from "@/components/card/post-card";
import ServiceCard from "@/components/card/service-card";
import CTA from "@/components/cta";
import Loader from "@/components/loader";
import TopBar from "@/components/top-bar";
import { createNewSite } from "@/lib/actions";
import { getUserData } from "@/lib/fetchers";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [code: string]: string | string[] | undefined };
}) {
  const [status, setStatus] = useState("Loading Instagram");
  const [iPosts, setIPosts] = useState<any[]>([]);
  const [aiContent, setAiContent] = useState({});

  const getData = async () => {
    // check if user data exists
    const data = await getUserData();

    if (data) {
      setStatus("Done");

      setAiContent(JSON.parse(data.aiResult));
      setIPosts(JSON.parse(data.posts));

      return;
    }

    let _imageIds = {};
    let _iPosts = [];
    let _mediaCaption = "";
    let _aiContent = {};

    // get user media
    {
      const response = await fetch("/api/auth");
      const data = await response.json();

      if (data.mediaCaption) _mediaCaption = data.mediaCaption;
      if (Object.keys(data.imageIds).length) _imageIds = data.imageIds;
      if (data.posts.length) _iPosts = data.posts;

      setStatus("Generating Content");
    }

    // generate content from user media using openai
    {
      const response = await fetch("/api/content", {
        method: "POST",
        body: JSON.stringify({ mediaCaption: _mediaCaption }),
      });

      const data = await response.json();

      if (data.content) {
        _aiContent = JSON.parse(data.content);
        _aiContent["hero"]["imageUrl"] =
          _imageIds[_aiContent["hero"]["imageId"]];

        setStatus("Choosing Colors");
      }
    }

    // generate colors from content using openai
    {
      const response = await fetch("/api/color", {
        method: "POST",
        body: JSON.stringify({ imageUrl: _aiContent["hero"]["imageUrl"] }),
      });

      const data = await response.json();

      if (data.colors) {
        const _aiColors = JSON.parse(data.colors);
        _aiContent = { ..._aiContent, colors: _aiColors };

        setStatus("Done");

        setAiContent(_aiContent);
        setIPosts(_iPosts);

        await createNewSite(
          JSON.stringify(_aiContent),
          JSON.stringify(_iPosts),
        );
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return status === "Done" ? (
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
  ) : (
    <div className="absolute inset-0 flex items-center justify-center">
      <Loader text={status} />
    </div>
  );
}
