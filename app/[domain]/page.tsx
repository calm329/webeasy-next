import BasicTemplate from "@/templates/basic-template";
import { getSiteData } from "@/lib/fetchers";
import ProductTemplate from "@/templates/product-template/";
// import { makeStore } from "@/lib/store";

type TProps = {
  params: { domain: string };
};

export default async function SiteHomePage(props: TProps) {
  const { params } = props;
  const domain = decodeURIComponent(params.domain);
  console.log("domain", domain);
  const data = await getSiteData(domain);
  console.log("data", data);
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
  if (data.type === "Amazon") {
    return <ProductTemplate data={aiResult} />;
  } else {
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
}
