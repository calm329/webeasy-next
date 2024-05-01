import SlideOver from "@/components/slide-over";
import BasicTemplate from "@/components/templates/basic-template";
import { getSiteData } from "@/lib/fetchers";

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const data = await getSiteData(domain);

  if (!data) {
    return (
      <div>
        <h1>Domain: {domain}</h1>
        <h2>Not Found</h2>
      </div>
    );
  }

  let posts = JSON.parse(data.posts || "[]");
  let aiResult = JSON.parse(data.aiResult || "{}");

  return (
    <div>
      {/* <SlideOver/> */}
      <BasicTemplate
        logo={data.logo || undefined}
        businessName={aiResult["businessName"]}
        hero={{
          heading: aiResult["hero"]["heading"],
          subheading: aiResult["hero"]["subheading"],
          imageUrl: aiResult["hero"]["imageUrl"],
        }}
        colors={aiResult["colors"]}
        cta={{
          text: aiResult["hero"]["cta"],
          link: aiResult["hero"]["ctaLink"] || "#",
        }}
        services={aiResult["services"]["list"]}
        posts={posts}
      />
    </div>
  );
}
