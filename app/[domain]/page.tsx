import BasicTemplate from "@/templates/basic-template";
import { getSiteData } from "@/lib/fetchers";
// import { makeStore } from "@/lib/store";

type TProps = {
  params: { domain: string };
};

export default async function SiteHomePage(props: TProps) {
  const { params } = props;
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
      <BasicTemplate
        banner={aiResult["banner"]}
        hero={aiResult["hero"]}
        colors={aiResult["colors"]}
        services={aiResult["services"]["list"]}
        posts={posts}
      />
    </div>
  );
}
