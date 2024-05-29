import { AppState, FormField, TData } from "@/types";
import { ReadonlyURLSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { checkSiteAvailability, createNewSite, updateSite } from "../actions";
import { getSiteData } from "../fetchers";
import { fetchData } from "../utils";
import {
  updateAppState,
  updateSite as updateStateSite,
} from "../store/slices/site-slice";
import { toast } from "sonner";
import { prompt } from "./common-constant";

type TParams = {
  flag: "init" | "regenerate" | "text" | "image" | "individual";
  searchParams: ReadonlyURLSearchParams;
  dispatch: any;
  appState: AppState;
  setBrandCustomizeFields: Dispatch<SetStateAction<FormField[]>>;
  setHeroCustomizeFields: Dispatch<SetStateAction<FormField[]>>;
  fieldName?: string;
};

const updateDefaultValues = (
  data: TData,
  setBrandCustomizeFields: Dispatch<SetStateAction<FormField[]>>,
  setHeroCustomizeFields: Dispatch<SetStateAction<FormField[]>>,
  heroButtonList: Array<{
    type: any;
    value: string;
    label: string;
    name: string;
  }>,
  bannerButtonList: Array<{
    type: any;
    value: string;
    label: any;
    name: string;
  }>,
) => {
  setBrandCustomizeFields((prevFields) =>
    prevFields.map((field) => {
      if (field.type === "button") {
        // If the field is cta, update its children
        return {
          ...field,
          children: bannerButtonList.map((item) => ({
            name: item.name,
            type: item.type,
            defaultValue: item.value,
            label: item.label,
            validation: { required: true, link: true },
            link: item.value ?? "#",
            placeholder: "Enter",
          })),
        };
      } else {
        // If it's not cta, just return the field as it is
        return {
          ...field,
          defaultValue:
            data[field.name as keyof typeof data] ?? field.defaultValue,
        };
      }
    }),
  );

  setHeroCustomizeFields((prevFields) =>
    prevFields.map((field) => {
      if (field.type === "button") {
        // If the field is cta, update its children
        return {
          ...field,
          children: heroButtonList.map((item) => ({
            name: item.name,
            type: item.type,
            defaultValue: item.value,
            label: item.label,
            validation: { required: true, link: true },
            link: item.value ?? "#",
            placeholder: "Enter",
          })),
        };
      } else {
        return {
          ...field,
          defaultValue:
            data[field.name as keyof typeof data] ?? field.defaultValue,
        };
      }
    }),
  );
};

export const getData = async (params: TParams) => {
  const {
    flag,
    searchParams,
    dispatch,
    appState,
    setBrandCustomizeFields,
    setHeroCustomizeFields,
    fieldName,
  } = params;
  dispatch(
    updateAppState({
      ...appState,
      status: "Loading Instagram",
    }),
  );
  const { subdomain: siteAvailable, editable } = await checkSiteAvailability({
    userId: searchParams.get("user_id") || "",
  });

  dispatch(
    updateAppState({
      ...appState,
      subdomain: siteAvailable,
      status: "Loading Instagram",
      editable,
    }),
  );

  // check if user data exists
  // const userData = flag === "init" ? await getUserData() : null;

  if (siteAvailable && flag === "init") {
    const siteData = await getSiteData(siteAvailable);

    if (!siteData) {
      return;
    }
    const aiContent = JSON.parse(siteData.aiResult);
    console.log("siteData", siteData);
    dispatch(
      updateAppState({
        ...appState,
        selectedFont: siteData.font,
        subdomain: siteAvailable,
        status: "Done",
        aiContent: aiContent,
        iPosts: JSON.parse(siteData.posts),
        meta: { title: siteData.title, description: siteData.description },
      }),
    );
    const heroButtonList = aiContent.hero.button.list;
    const bannerButtonList = aiContent.banner.button.list;
    // update default values

    updateDefaultValues(
      {
        logo: siteData.logo || undefined,
        businessName: aiContent.banner?.businessName,
        ctaLink: aiContent?.hero?.ctaLink,
        heading: aiContent?.hero?.heading,
        subheading: aiContent?.hero?.subheading,
        imageUrl: aiContent?.hero.image?.imageUrl,
        cta: aiContent?.hero?.cta,
      },
      setBrandCustomizeFields,
      setHeroCustomizeFields,
      heroButtonList,
      bannerButtonList,
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
    dispatch(
      updateAppState({
        ...appState,
        subdomain: siteAvailable,
        status: "Generating Content",
      }),
    );
  }

  // generate content from user media using openai
  if (
    flag === "regenerate" ||
    flag === "text" ||
    flag === "image" ||
    flag === "individual"
  ) {
    console.log("fieldName: " + fieldName, flag);
    const response = await fetch("/api/content", {
      method: "POST",
      body: JSON.stringify({ mediaCaption, fieldName }),
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

      if (chunkValue && chunkValue !== "###") content += chunkValue;
    }
    if (content) {
      aiContent = JSON.parse(content);
      console.log("content", content);
      if (flag === "regenerate") {
        aiContent["hero"]["image"]["imageUrl"] =
          imageIds[aiContent["hero"]["image"]["imageId"]];
      }
      if (flag === "image") {
        // console.log("Hero", imageIds[aiContent["hero"]["image"]["imageId"]])
        const updatedImage = imageIds[aiContent["hero"]["image"]["imageId"]];
        aiContent = {
          ...appState.aiContent,
          hero: {
            ...appState.aiContent.hero,
            image: {
              ...appState.aiContent.hero.image,
              imageUrl: updatedImage,
            },
          },
        };
      }

      if (flag === "text") {
        aiContent = {
          ...aiContent,
          hero: {
            ...aiContent.hero,
            image: {
              ...aiContent.hero.image,
              imageUrl: appState.aiContent.hero.image.imageUrl,
            },
          },
        };
      }
    }

    dispatch(
      updateAppState({
        ...appState,
        subdomain: siteAvailable,
        status: "Choosing Colors",
      }),
    );
  }

  // generate colors from content using openai
  if (flag === "regenerate") {
    const { colors } = await fetchData("/api/color", {
      method: "POST",
      body: JSON.stringify({
        imageUrl: aiContent["hero"]["image"]["imageUrl"],
      }),
    });

    if (colors) {
      const aiColors = JSON.parse(colors);
      aiContent = { ...aiContent, colors: aiColors };
    } // else return;

    dispatch(
      updateAppState({
        ...appState,

        subdomain: siteAvailable,
        status: "Done",
      }),
    );
  } else {
    aiContent["colors"] = appState.aiContent.colors;
  }

  if (flag === "individual") {
    switch (fieldName) {
      case "businessName":
        aiContent = {
          ...appState.aiContent,
          banner: {
            ...appState.aiContent.banner,
            businessName: aiContent.banner.businessName,
          },
        };
        break;
      case "heading":
        aiContent = {
          ...appState.aiContent,
          hero: {
            ...appState.aiContent.hero,
            heading: aiContent.hero.heading,
          },
        };
        break;
      case "subheading":
        aiContent = {
          ...appState.aiContent,
          hero: {
            ...appState.aiContent.hero,
            subheading: aiContent.hero.subheading,
          },
        };
        break;
    }
    console.log("updated field name: " + JSON.stringify(aiContent));
    dispatch(
      updateAppState({
        ...appState,
        subdomain: siteAvailable,
        aiContent: Object.keys(aiContent).length
          ? aiContent
          : appState.aiContent,
        iPosts: iPosts,
      }),
    );
  } else {
    dispatch(
      updateAppState({
        ...appState,
        subdomain: siteAvailable,
        aiContent: Object.keys(aiContent).length
          ? aiContent
          : appState.aiContent,
        iPosts: iPosts,
      }),
    );
  }

  if (!siteAvailable && flag === "init") {
    await createNewSite({
      aiResult: JSON.stringify(aiContent),
      posts: JSON.stringify(iPosts),
      accessToken: searchParams.get("access_token") || "",
      userId: searchParams.get("user_id") || "",
    });
  }

  // update default values
  const heroButtonList = appState.aiContent.hero.button.list;
  const bannerButtonList = appState.aiContent.banner.button.list;

  updateDefaultValues(
    {
      businessName: aiContent?.banner.businessName,
      ctaLink: aiContent?.hero?.ctaLink,
      heading: aiContent?.hero?.heading,
      subheading: aiContent?.hero?.subheading,
      cta: aiContent?.hero?.cta,
    },
    setBrandCustomizeFields,
    setHeroCustomizeFields,
    heroButtonList,
    bannerButtonList,
  );
};

export const handleChangeAppState = (
  dispatch: any,
  appState: AppState,
  name: string,
  value: string,
) => {
  if ((value as any)["fieldType"] === "button") {
    switch ((value as any)["section"]) {
      case "Banner":
        dispatch(
          updateAppState({
            ...appState,
            aiContent: {
              ...appState.aiContent,
              banner: {
                ...appState.aiContent.banner,
                button: {
                  ...appState.aiContent.banner.button,
                  list: appState.aiContent.banner.button.list.map((data) => {
                    if (data.name === name) {
                      return {
                        name: name,
                        label: (value as any)["label"],
                        type: (value as any)["type"],
                        link: (value as any)["link"],
                      };
                    } else {
                      return data;
                    }
                  }),
                },
              },
            },
          }),
        );
        break;
      case "Hero":
        dispatch(
          updateAppState({
            ...appState,
            aiContent: {
              ...appState.aiContent,
              hero: {
                ...appState.aiContent.hero,
                button: {
                  ...appState.aiContent.hero.button,
                  list: appState.aiContent.hero.button.list.map((data) => {
                    if (data.name === name) {
                      return {
                        name: name,
                        label: (value as any)["label"],
                        type: (value as any)["type"],
                        link: (value as any)["link"],
                      };
                    } else {
                      return data;
                    }
                  }),
                },
              },
            },
          }),
        );
        break;
    }
  } else {
    switch (name) {
      case "alt":
        dispatch(
          updateAppState({
            ...appState,
            logo: {
              ...appState.aiContent.banner.logo,
              alt: value,
            },
          }),
        );
        break;
      case "logo":
        dispatch(
          updateAppState({
            ...appState,
            logo: {
              ...appState.aiContent.banner.logo,
              link: value,
            },
          }),
        );
        break;
      case "businessName":
        dispatch(
          updateAppState({
            ...appState,
            aiContent: {
              ...appState.aiContent,
              banner: {
                ...appState.aiContent.banner,
                businessName: value,
              },
            },
          }),
        );
        break;
      case "ctaLink":
        dispatch(
          updateAppState({
            ...appState,
            aiContent: {
              ...appState.aiContent,
              ["hero"]: {
                ...appState.aiContent["hero"],
                ["ctaLink"]: value,
              },
            },
          }),
        );
        break;
      case "heading":
        dispatch(
          updateAppState({
            ...appState,
            aiContent: {
              ...appState.aiContent,
              ["hero"]: {
                ...appState.aiContent["hero"],
                ["heading"]: value,
              },
            },
          }),
        );
        break;
      case "subheading":
        dispatch(
          updateAppState({
            ...appState,
            aiContent: {
              ...appState.aiContent,
              ["hero"]: {
                ...appState.aiContent["hero"],
                ["subheading"]: value,
              },
            },
          }),
        );
        break;
      case "imageUrl":
        dispatch(
          updateAppState({
            ...appState,
            aiContent: {
              ...appState.aiContent,
              ["hero"]: {
                ...appState.aiContent["hero"],
                ["imageUrl"]: value,
              },
            },
          }),
        );
        break;
      case "cta":
        dispatch(
          updateAppState({
            ...appState,
            aiContent: {
              ...appState.aiContent,
              ["hero"]: {
                ...appState.aiContent["hero"],
                ["cta"]: value,
              },
            },
          }),
        );
        break;
      case "primary":
        dispatch(
          updateAppState({
            ...appState,
            aiContent: {
              ...appState.aiContent,
              ["colors"]: {
                ...appState.aiContent["colors"],
                ["primary"]: value,
              },
            },
          }),
        );
        break;
      case "colors":
        dispatch(
          updateAppState({
            ...appState,
            aiContent: {
              ...appState.aiContent,
              colors: value,
            },
          }),
        );
        break;
      case "title":
        dispatch(
          updateAppState({
            ...appState,
            meta: {
              ...appState.meta,
              title: value,
            },
          }),
        );
        break;
      case "description":
        dispatch(
          updateAppState({
            ...appState,
            meta: {
              ...appState.meta,
              description: value,
            },
          }),
        );
        break;
      case "secondary":
        dispatch(
          updateAppState({
            ...appState,
            aiContent: {
              ...appState.aiContent,
              ["colors"]: {
                ...appState.aiContent["colors"],
                ["secondary"]: value,
              },
            },
          }),
        );
        break;
      default:
        break;
    }
  }
};

export function generateUniqueId() {
  // Generate a random number and convert it to base 36
  const randomPart = Math.random().toString(36).substr(2, 9);

  // Get the current timestamp
  const timestampPart = new Date().getTime().toString(36);

  // Concatenate the random part and timestamp part
  const uniqueId = randomPart + timestampPart;

  return uniqueId;
}

export async function saveState(appState: AppState, dispatch: any) {
  try {
    const data = { aiResult: appState.aiContent, font: appState.selectedFont };
    await dispatch(
      updateStateSite({
        subdomain: appState.subdomain,
        data,
        keys: Object.keys(data),
      }),
    ).unwrap();
    toast.success("Data saved successfully");
  } catch (error) {}
}
