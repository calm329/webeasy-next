import PostCard from "@/components/card/post-card";
import ServiceCard from "@/components/card/service-card";
import CTA from "@/components/cta";
import TopBar from "@/components/top-bar";
import { getUserData } from "@/lib/fetchers";
import Image from "next/image";

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const data = await getUserData(domain);

  if (!data) {
    return (
      <div>
        <h1>Domain: {domain}</h1>
        <h2>Not Found</h2>
      </div>
    );
  }

  let posts = JSON.parse(data?.posts || "[]");
  let aiResult = JSON.parse(data?.aiResult || "{}");

  return (
    <div>
      <section className="bg-white py-6">
        <div className="container mx-auto px-4">
          <TopBar
            businessName={aiResult["businessName"]}
            colors={aiResult["colors"]}
            cta={{
              text: aiResult["hero"]["cta"],
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
                      style={{ color: aiResult["colors"]["primary"] }}
                    >
                      {aiResult["hero"]["heading"]}
                    </h2>
                    <p className="mb-8 text-xl font-bold">
                      {aiResult["hero"]["subheading"]}
                    </p>
                    <div className="-m-2 flex flex-wrap">
                      <div className="w-full p-2 md:w-auto">
                        <CTA
                          text={aiResult["hero"]["cta"]}
                          bgColor={aiResult["colors"]["secondary"]}
                          link="#"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full p-8 md:w-1/2">
                  <Image
                    src={aiResult["hero"]["imageUrl"]}
                    width={256}
                    height={256}
                    alt="Hero Image"
                    className="mx-auto rounded-3xl object-contain md:mr-0"
                  />
                </div>
              </div>
              <div className="rounded-3xl bg-gray-100 p-8 md:p-12">
                <div className="-m-8 flex flex-wrap">
                  {aiResult["services"]["list"].map((service) => (
                    <ServiceCard
                      key={service["name"]}
                      name={service["name"]}
                      description={service["description"]}
                      color={aiResult["colors"]["primary"]}
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
          {posts.map((post) => (
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
