import { AppState, FormField, TData } from "@/types";
import { ReadonlyURLSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { checkSiteAvailability, createNewSite, updateSite } from "../actions";
import { getSiteData } from "../fetchers";
import { fetchData } from "../utils";

type TParams = {
  setAppState: Dispatch<SetStateAction<AppState>>;
  flag: "init" | "regenerate" | "refresh";
  searchParams: ReadonlyURLSearchParams;
  setBrandCustomizeFields: Dispatch<SetStateAction<FormField[]>>;
  setHeroCustomizeFields: Dispatch<SetStateAction<FormField[]>>;
};

const updateDefaultValues = (
  data: TData,
  setBrandCustomizeFields: Dispatch<SetStateAction<FormField[]>>,
  setHeroCustomizeFields: Dispatch<SetStateAction<FormField[]>>,
) => {
  setBrandCustomizeFields((currentFields) =>
    currentFields.map((field) => ({
      ...field,
      defaultValue: data[field.name as keyof typeof data] ?? field.defaultValue,
    })),
  );
  setHeroCustomizeFields((currentFields) =>
    currentFields.map((field) => ({
      ...field,
      defaultValue: data[field.name as keyof typeof data] ?? field.defaultValue,
    })),
  );
};

export const getData = async (params: TParams) => {
  const {
    flag,
    setAppState,
    searchParams,
    setBrandCustomizeFields,
    setHeroCustomizeFields,
  } = params;
  setAppState((state) => ({
    ...state,
    status: "Loading Instagram",
  }));
  const { subdomain: siteAvailable, editable } = await checkSiteAvailability({
    userId: searchParams.get("user_id") || "",
  });

  setAppState((state) => ({
    ...state,
    status: "Loading Instagram",
    editable,
  }));

  // check if user data exists
  // const userData = flag === "init" ? await getUserData() : null;

  if (siteAvailable && flag === "init") {
    const siteData = await getSiteData(siteAvailable);

    if (!siteData) {
      return;
    }
    console.log("updated meta", {
      title: siteData.title,
      description: siteData.description,
    });
    const aiContent = JSON.parse(siteData.aiResult);

    console.log(aiContent);
    if (!aiContent["hero"]["ctaLink"]) {
      aiContent["hero"]["ctaLink"] = "https://domain.com";
    }
    setAppState((state) => ({
      ...state,
      status: "Done",
      aiContent: aiContent,
      iPosts: JSON.parse(siteData.posts),
      logo: siteData.logo || state.logo,
      meta: { title: siteData.title, description: siteData.description },
    }));

    // update default values
    updateDefaultValues(
      {
        logo: siteData.logo || undefined,
        businessName: aiContent?.businessName,
        ctaLink: aiContent?.hero?.ctaLink,
        heading: aiContent?.hero?.heading,
        subheading: aiContent?.hero?.subheading,
        imageUrl: aiContent?.hero?.imageUrl,
        cta: aiContent?.hero?.cta,
      },
      setBrandCustomizeFields,
      setHeroCustomizeFields,
    );

    return;
  }

  let imageIds: any = {};
  let iPosts: any[] = [];
  let mediaCaption = "";
  let aiContent: any = {};

  // get user media
  {
    const {
      mediaCaption: _mediaCaption,
      imageIds: _imageIds,
      posts: _posts,
    } = await fetchData(
      `/api/instagram/media?access_token=${searchParams.get(
        "access_token",
      )}&user_id=${searchParams.get("user_id")}`,
    );

    if (!_mediaCaption || !_imageIds || !_posts) {
      return;
    }

    mediaCaption = _mediaCaption || mediaCaption;
    imageIds = _imageIds || imageIds;
    iPosts = _posts || iPosts;

    setAppState((state) => ({
      ...state,
      status: flag === "refresh" ? "Done" : "Generating Content",
    }));
  }

  // generate content from user media using openai
  if (flag !== "refresh") {
    const response = await fetch("/api/content", {
      method: "POST",
      body: JSON.stringify({ mediaCaption }),
    });

    let content = "";

    const reader = response.body?.getReader();
    if (!reader) return;

    const decoder = new TextDecoder();
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      console.log(chunkValue);
      if (chunkValue && chunkValue !== "###") content += chunkValue;
    }

    if (content) {
      aiContent = JSON.parse(content);
      aiContent["hero"]["imageUrl"] = imageIds[aiContent["hero"]["imageId"]];
    } // else return;

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
    } // else return;

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

  if (!siteAvailable && flag === "init") {
    await createNewSite({
      aiResult: JSON.stringify(aiContent),
      posts: JSON.stringify(iPosts),
      accessToken: searchParams.get("access_token") || "",
      userId: searchParams.get("user_id") || "",
    });
  } else if (siteAvailable) {
    await updateSite(
      siteAvailable,
      {
        aiResult: JSON.stringify(aiContent),
        posts: JSON.stringify(iPosts),
      },
      ["aiResult", "posts"],
    );
  }
  console.log("updated", aiContent);
  // update default values
  updateDefaultValues(
    {
      businessName: aiContent?.businessName,
      ctaLink: aiContent?.hero?.ctaLink,
      heading: aiContent?.hero?.heading,
      subheading: aiContent?.hero?.subheading,
      cta: aiContent?.hero?.cta,
    },
    setBrandCustomizeFields,
    setHeroCustomizeFields,
  );
};

export const handleChangeAppState = (
  setAppState: Dispatch<SetStateAction<AppState>>,
  name: string,
  value: string,
) => {
  switch (name) {
    case "logo":
      setAppState((state) => ({ ...state, logo: value }));
      break;
    case "businessName":
      setAppState((state) => ({
        ...state,
        aiContent: {
          ...state.aiContent,
          ["businessName"]: value,
        },
      }));
      break;
    case "ctaLink":
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
      break;
    case "heading":
      setAppState((state) => ({
        ...state,
        aiContent: {
          ...state.aiContent,
          ["hero"]: {
            ...state.aiContent["hero"],
            ["heading"]: value,
          },
        },
      }));
      break;
    case "subheading":
      setAppState((state) => ({
        ...state,
        aiContent: {
          ...state.aiContent,
          ["hero"]: {
            ...state.aiContent["hero"],
            ["subheading"]: value,
          },
        },
      }));
      break;
    case "imageUrl":
      setAppState((state) => ({
        ...state,
        aiContent: {
          ...state.aiContent,
          ["hero"]: {
            ...state.aiContent["hero"],
            ["imageUrl"]: value,
          },
        },
      }));
      break;
    case "cta":
      setAppState((state) => ({
        ...state,
        aiContent: {
          ...state.aiContent,
          ["hero"]: {
            ...state.aiContent["hero"],
            ["cta"]: value,
          },
        },
      }));
      break;
    case "primary":
      setAppState((state) => ({
        ...state,
        aiContent: {
          ...state.aiContent,
          ["colors"]: {
            ...state.aiContent["colors"],
            ["primary"]: value,
          },
        },
      }));
      break;
    case "colors":
      setAppState((state) => ({
        ...state,
        aiContent: {
          ...state.aiContent,
          ["colors"]: value,
        },
      }));
      break;
    case "title":
      setAppState((state) => ({
        ...state,
        meta: {
          ...state.meta,
          title: value,
        },
      }));
      break;
    case "description":
      setAppState((state) => ({
        ...state,
        meta: {
          ...state.meta,
          description: value,
        },
      }));
      break;
    case "secondary":
      setAppState((state) => ({
        ...state,
        aiContent: {
          ...state.aiContent,
          ["colors"]: {
            ...state.aiContent["colors"],
            ["secondary"]: value,
          },
        },
      }));
      break;
    default:
      break;
  }
};
