"use client";

import BrandDesktopForm from "@/components/form/brand-desktop-form";
import BrandMobileForm from "@/components/form/brand-mobile-form";
import Loader from "@/components/loader";
import BasicTemplate from "@/components/templates/basic-template";
// import { createNewSite, updateSite } from "@/lib/actions";
import { getUserData } from "@/lib/fetchers";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

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
  const [logo, setLogo] = useState("");
  const [brandCustomizeFields, setBrandCustomizeFields] = useState<any[]>([
    {
      name: "logo",
      type: "image",
      label: "Logo Image",
      defaultValue: "",
      placeholder: "Enter your first name",
      validation: {
        required: true,
      },
    },
    {
      name: "businessName",
      type: "text",
      label: "Business Name",
      defaultValue: "",
      placeholder: "Enter your business name",
      validation: {
        required: true,
      },
    },
    {
      name: "ctaLink",
      type: "text",
      label: "CTA URL",
      defaultValue: "",
      placeholder: "Enter a link",
      validation: {
        required: true,
      },
    },
  ]);

  const updateDefaultValues = async (data) => {
    const _brandCustomizeFields = brandCustomizeFields;

    "logo" in data && (_brandCustomizeFields[0].defaultValue = data.logo);
    "businessName" in data &&
      (_brandCustomizeFields[1].defaultValue = data.businessName);
    "ctaLink" in data && (_brandCustomizeFields[2].defaultValue = data.ctaLink);

    setBrandCustomizeFields(_brandCustomizeFields);
  };

  const getData = async (flag: "init" | "regenerate" | "refresh" = "init") => {
    setStatus("Loading Instagram");

    // check if user data exists
    const userData = flag === "init" ? await getUserData() : null;

    if (userData) {
      const _aiContent = JSON.parse(userData.aiResult);

      setAiContent(_aiContent);
      setIPosts(JSON.parse(userData.posts));
      setLogo(userData.logo || "");

      // update default values
      updateDefaultValues({
        logo: userData.logo,
        businessName: _aiContent?.businessName,
        ctaLink: _aiContent?.hero?.ctaLink,
      });

      setStatus("Done");

      return;
    }

    let _imageIds = {};
    let _iPosts: any[] = [];
    let _mediaCaption = "";
    let _aiContent: any = {};

    // get user media
    {
      const response = await fetch(`/api/auth?code=${searchParams.code}`);
      const data = await response.json();

      if (data.mediaCaption) _mediaCaption = data.mediaCaption;
      if (Object.keys(data.imageIds).length) _imageIds = data.imageIds;
      if (data.posts.length) _iPosts = data.posts;

      setStatus(flag === "refresh" ? "Done" : "Generating Content");
    }

    // generate content from user media using openai
    if (flag !== "refresh") {
      const response = await fetch("/api/content", {
        method: "POST",
        body: JSON.stringify({ mediaCaption: _mediaCaption }),
      });

      const data = await response.json();

      if (data.content) {
        _aiContent = JSON.parse(data.content);
        _aiContent["hero"]["imageUrl"] =
          _imageIds[_aiContent["hero"]["imageId"]];
      }

      setStatus("Choosing Colors");
    }

    // generate colors from content using openai
    if (flag !== "refresh") {
      const response = await fetch("/api/color", {
        method: "POST",
        body: JSON.stringify({ imageUrl: _aiContent["hero"]["imageUrl"] }),
      });

      const data = await response.json();

      if (data.colors) {
        const _aiColors = JSON.parse(data.colors);
        _aiContent = { ..._aiContent, colors: _aiColors };
      }

      setStatus("Done");
    }

    Object.keys(_aiContent).length && setAiContent(_aiContent);
    setIPosts(_iPosts);

    // update default values
    updateDefaultValues({
      businessName: _aiContent?.businessName,
      ctaLink: _aiContent?.hero?.ctaLink,
    });

    // if (flag === "init") {
    //   if (Object.keys(_aiContent).length && _iPosts.length)
    //     await createNewSite(
    //       JSON.stringify(_aiContent),
    //       JSON.stringify(_iPosts),
    //     );
    // } else {
    //   if (Object.keys(_aiContent).length || _iPosts.length)
    //     await updateSite(
    //       {
    //         aiResult: JSON.stringify(_aiContent),
    //         posts: JSON.stringify(_iPosts),
    //       },
    //       Object.keys(_aiContent).length ? ["aiResult", "posts"] : ["posts"],
    //     );
    // }
  };

  const handleChange = useDebouncedCallback((name: string, value: string) => {
    if (name === "logo") {
      setLogo(value);
    } else if (name === "businessName") {
      setAiContent({
        ...aiContent,
        ["businessName"]: value,
      });
    } else if (name === "ctaLink") {
      setAiContent({
        ...aiContent,
        ["hero"]: {
          ...aiContent["hero"],
          ["ctaLink"]: value,
        },
      });
    }
  }, 300);

  useEffect(() => {
    getData();
  }, []);

  return status === "Done" ? (
    <div className="relative flex size-full">
      <div className="h-full w-full">
        <div className="flex w-full justify-end bg-gray-100">
          <Button
            variant="light"
            size="sm"
            onClick={() => getData("regenerate")}
          >
            Regenerate the content
          </Button>
          <Button variant="light" size="sm" onClick={() => getData("refresh")}>
            Refresh Instagram feed
          </Button>
        </div>
        <BasicTemplate
          logo={logo}
          businessName={aiContent["businessName"]}
          hero={{
            heading: aiContent["hero"]["heading"],
            subheading: aiContent["hero"]["subheading"],
            imageUrl: aiContent["hero"]["imageUrl"],
          }}
          colors={aiContent["colors"]}
          cta={{
            text: aiContent["hero"]["cta"],
            link: aiContent["hero"]["ctaLink"] || "#",
          }}
          services={aiContent["services"]["list"]}
          posts={iPosts}
        />
      </div>
      <BrandDesktopForm
        brandCustomizeFields={brandCustomizeFields}
        handleChange={handleChange}
      />
      <BrandMobileForm
        brandCustomizeFields={brandCustomizeFields}
        handleChange={handleChange}
      />
    </div>
  ) : (
    <div className="absolute inset-0 flex items-center justify-center">
      <Loader text={status} />
    </div>
  );
}
