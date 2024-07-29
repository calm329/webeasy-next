import BasicTemplate from "@/templates/basic-template";
import { getAllTemplates, getSiteData } from "@/lib/fetchers";
import ProductTemplate from "@/templates/product-template/";
import BlueBasedTemplate from "@/templates/blue-based-template";
import General from "@/templates/general-template";
import PostBasedTemplate from "@/templates/post-based-template";
// import { makeStore } from "@/lib/store";

type TProps = {
  params: { domain: string };
};

export default async function SiteHomePage(props: TProps) {
  const { params } = props;
  const domain = decodeURIComponent(params.domain);
  console.log("domain", domain);
  const data = await getSiteData(domain);
  const templates = await getAllTemplates();
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
  const selectedTemplate = templates.filter(
    (template) => data.templateId === template.id,
  )[0];
  console.log("selectedTemplate", selectedTemplate, data.templateId);
  if (data.type === "Amazon") {
    return <ProductTemplate data={aiResult} />;
  } else {
    return (
      <div>
        {selectedTemplate.name === "Basic template" && (
          <BasicTemplate aiContent={aiResult} posts={posts} />
        )}
        {selectedTemplate.name === "Blue-Based template" && (
          <BlueBasedTemplate aiContent={aiResult} posts={posts} />
        )}
        {selectedTemplate.name === "General template" && (
          <General aiContent={aiResult} posts={posts} />
        )}
        {selectedTemplate.name === "Post-Based template" && (
          <PostBasedTemplate aiContent={aiResult} posts={posts} />
        )}
      </div>
    );
  }
}
