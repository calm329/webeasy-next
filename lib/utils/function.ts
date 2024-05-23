import { AppState, FormField, TData } from "@/types";
import { ReadonlyURLSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { checkSiteAvailability, createNewSite, updateSite } from "../actions";
import { getSiteData } from "../fetchers";
import { fetchData } from "../utils";
import { updateAppState } from "../store/slices/site-slice";

type TParams = {
  flag: "init" | "regenerate" | "refresh";
  searchParams: ReadonlyURLSearchParams;
  dispatch: any;
  appState: AppState;
  setBrandCustomizeFields: Dispatch<SetStateAction<FormField[]>>;
  setHeroCustomizeFields: Dispatch<SetStateAction<FormField[]>>;
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
  console.log("default values", heroButtonList, bannerButtonList);
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

  console.log("editable", editable);
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
    console.log("updated meta", {
      title: siteData.title,
      description: siteData.description,
    });
    const aiContent = JSON.parse(siteData.aiResult);

    console.log("aiContent", aiContent);
    const updatedData = {
      banner: {
        businessName: aiContent["businessName"],
        button: {
          show: true,
          list: [
            {
              name: "button1",
              label: aiContent["hero"]["cta"],
              type: "External",
              value: aiContent["hero"]["ctaLink"],
            },
          ],
        },
        logo: {
          link: siteData.logo ?? appState.aiContent.banner.logo.link ?? "",
          alt: appState.aiContent.banner.logo.alt ?? "",
          show: true,
        },
      },
      colors: aiContent["colors"],
      hero: {
        button: {
          show: true,
          list: [
            {
              name: "button1",
              label: aiContent["hero"]["cta"],
              type: "External",
              value: aiContent["hero"]["ctaLink"],
            },
          ],
        },
        image: {
          heroImagePrompt: aiContent["heroImagePrompt"],
          imageId: aiContent["hero"]["imageId"],
          imageUrl: aiContent["hero"]["imageUrl"],
          alt: "",
          show: true,
        },
        heading: aiContent["hero"]["heading"],
        subheading: aiContent["hero"]["subheading"],
      },
      services: aiContent["services"],
    };
    dispatch(
      updateAppState({
        ...appState,
        subdomain: siteAvailable,
        status: "Done",
        aiContent: updatedData,
        iPosts: JSON.parse(siteData.posts),
        meta: { title: siteData.title, description: siteData.description },
      }),
    );
    const heroButtonList = updatedData.hero.button.list;
    const bannerButtonList = updatedData.banner.button.list;

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
        status: flag === "refresh" ? "Done" : "Generating Content",
      }),
    );
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

    dispatch(
      updateAppState({
        ...appState,
        subdomain: siteAvailable,
        status: "Choosing Colors",
      }),
    );
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

    dispatch(
      updateAppState({
        ...appState,

        subdomain: siteAvailable,
        status: "Done",
      }),
    );
  }

  dispatch(
    updateAppState({
      ...appState,
      subdomain: siteAvailable,
      aiContent: Object.keys(aiContent).length
        ? {
            banner: {
              logo: {
                link: appState.aiContent.banner.logo.link ?? "",
                alt: appState.aiContent.banner.logo.alt ?? "",
                show: appState.aiContent.hero.button.show,
              },
              businessName: aiContent["businessName"],
              button: {
                show: appState.aiContent.hero.button.show,
                list: [
                  {
                    name: "button1",
                    label: aiContent["hero"]["cta"],
                    type: "External",
                    value: aiContent["hero"]["ctaLink"],
                  },
                ],
              },
            },
            colors: aiContent["colors"],
            hero: {
              button: {
                show: appState.aiContent.hero.button.show,
                list: [
                  {
                    name: "button1",
                    label: aiContent["hero"]["cta"],
                    type: "External",
                    value: aiContent["hero"]["ctaLink"],
                  },
                ],
              },
              image: {
                heroImagePrompt: aiContent["heroImagePrompt"],
                imageId: aiContent["hero"]["imageId"],
                imageUrl: aiContent["hero"]["imageUrl"],
                alt: appState.aiContent.hero.image.alt,
                show: appState.aiContent.hero.image.show,
              },
              heading: aiContent["hero"]["heading"],

              subheading: aiContent["hero"]["subheading"],
            },
            services: aiContent["services"],
          }
        : appState.aiContent,
      iPosts: iPosts,
    }),
  );

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
  const heroButtonList = appState.aiContent.hero.button.list;
  const bannerButtonList = appState.aiContent.banner.button.list;

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
  console.log("name", name, value);
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
                    console.log("data hai", data, data.name === name);
                    if (data.name === name) {
                      console.log("aaya", {
                        name: name,
                        label: (value as any)["label"],
                        type: (value as any)["type"],
                        link: (value as any)["link"],
                      });
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
                    console.log("data hai", data, data.name === name);
                    if (data.name === name) {
                      console.log("aaya", {
                        name: name,
                        label: (value as any)["label"],
                        type: (value as any)["type"],
                        link: (value as any)["link"],
                      });
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
