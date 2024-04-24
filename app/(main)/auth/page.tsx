"use client";

import BrandDesktopForm from "@/components/form/brand-desktop-form";
import BrandMobileForm from "@/components/form/brand-mobile-form";
import Loader from "@/components/loader";
import BasicTemplate from "@/components/templates/basic-template";
// import { createNewSite, updateSite } from "@/lib/actions";
import { fetchData } from "@/lib/utils";
import { FormField } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface AppState {
  status: string;
  iPosts: any[];
  aiContent: any;
  logo: string;
}

const initialState: AppState = {
  status: "Loading Instagram",
  iPosts: [],
  aiContent: {},
  logo: "",
};

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [appState, setAppState] = useState<AppState>(initialState);
  const [brandCustomizeFields, setBrandCustomizeFields] = useState<FormField[]>(
    [
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
    ],
  );

  const updateDefaultValues = (
    data: Partial<{ logo: string; businessName: string; ctaLink: string }>,
  ) => {
    setBrandCustomizeFields((currentFields) =>
      currentFields.map((field) => ({
        ...field,
        defaultValue: data[field.name] ?? field.defaultValue,
      })),
    );
  };

  const getData = async (flag: "init" | "regenerate" | "refresh" = "init") => {
    setAppState((state) => ({ ...state, status: "Loading Instagram" }));

    // check if user data exists
    // const userData = flag === "init" ? await getUserData() : null;

    // if (userData) {
    //   const aiContent = JSON.parse(userData.aiResult);

    //   setAppState((state) => ({
    //     ...state,
    //     status: "Done",
    //     aiContent: aiContent,
    //     iPosts: JSON.parse(userData.posts),
    //     logo: userData.logo || state.logo,
    //   }));

    //   // update default values
    //   updateDefaultValues({
    //     logo: userData.logo || undefined,
    //     businessName: aiContent?.businessName,
    //     ctaLink: aiContent?.hero?.ctaLink,
    //   });

    //   return;
    // }

    let imageIds = {};
    let iPosts: any[] = [];
    let mediaCaption = "";
    let aiContent: any = {};

    // get user media
    {
      const data = await fetchData(
        `/api/instagram/media?code=${searchParams.get("code")}`,
      );

      mediaCaption = data?.mediaCaption || mediaCaption;
      imageIds = data?.imageIds || imageIds;
      iPosts = data?.posts || iPosts;

      setAppState((state) => ({
        ...state,
        status: flag === "refresh" ? "Done" : "Generating Content",
      }));
    }

    // generate content from user media using openai
    if (flag !== "refresh") {
      const { content } = await fetchData("/api/content", {
        method: "POST",
        body: JSON.stringify({ mediaCaption }),
      });

      if (content) {
        aiContent = JSON.parse(content);
        aiContent["hero"]["imageUrl"] = imageIds[aiContent["hero"]["imageId"]];
      }

      setAppState((state) => ({
        ...state,
        status: "Choosing Colors",
      }));
    }

    // generate colors from content using openai
    if (flag !== "refresh") {
      const { colors } = await fetchData("/api/color", {
        method: "POST",
        body: JSON.stringify({ imageUrl: aiContent["hero"]["imageUrl"] }),
      });

      if (colors) {
        const aiColors = JSON.parse(colors);
        aiContent = { ...aiContent, colors: aiColors };
      }

      setAppState((state) => ({
        ...state,
        status: "Done",
      }));
    }

    setAppState((state) => ({
      ...state,
      aiContent: Object.keys(aiContent).length ? aiContent : state.aiContent,
      iPosts: iPosts,
    }));

    // update default values
    updateDefaultValues({
      businessName: aiContent?.businessName,
      ctaLink: aiContent?.hero?.ctaLink,
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
      setAppState((state) => ({ ...state, logo: value }));
    } else if (name === "businessName") {
      setAppState((state) => ({
        ...state,
        aiContent: {
          ...state.aiContent,
          ["businessName"]: value,
        },
      }));
    } else if (name === "ctaLink") {
      setAppState((state) => ({
        ...state,
        aiContent: {
          ...state.aiContent,
          ["hero"]: {
            ...state.aiContent["hero"],
            ["ctaLink"]: value,
          },
        },
      }));
    }
  }, 300);

  useEffect(() => {
    getData();
  }, []);

  return appState.status === "Done" ? (
    <div className="relative flex size-full">
      <div className="h-full w-full">
        <div className="flex w-full justify-end bg-gray-100">
          {/* <Button
            variant="light"
            size="sm"
            onClick={() => getData("regenerate")}
          >
            Regenerate the content
          </Button>
          <Button variant="light" size="sm" onClick={() => getData("refresh")}>
            Refresh Instagram feed
          </Button> */}
        </div>
        <BasicTemplate
          logo={appState.logo}
          businessName={appState.aiContent["businessName"]}
          hero={{
            heading: appState.aiContent["hero"]["heading"],
            subheading: appState.aiContent["hero"]["subheading"],
            imageUrl: appState.aiContent["hero"]["imageUrl"],
          }}
          colors={appState.aiContent["colors"]}
          cta={{
            text: appState.aiContent["hero"]["cta"],
            link: appState.aiContent["hero"]["ctaLink"] || "#",
          }}
          services={appState.aiContent["services"]["list"]}
          posts={appState.iPosts}
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
      <Loader text={appState.status} />
    </div>
  );
}
