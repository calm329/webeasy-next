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
  regenerate?: boolean,
  searchParams: ReadonlyURLSearchParams;
  dispatch: any;
  appState: AppState;
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

export const getContent = async (mediaCaption?: string, fieldName?: string) => {
  try {
    const response = await fetch("/api/content", {
      method: "POST",
      body: JSON.stringify({
        mediaCaption,
        fieldName: fieldName?.split(".")
          ? fieldName?.split(".")[0]
          : fieldName ?? "",
      }),
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
    return JSON.parse(content);
  } catch (error) {
    console.log("error", error);
  }
};

export const getColors = async (imageUrl: string) => {
  try {
    const { colors } = await fetchData("/api/color", {
      method: "POST",
      body: JSON.stringify({
        imageUrl,
      }),
    });
    return JSON.parse(colors);
  } catch (error) {
    console.log("errors");
  }
};

export const getInstagramDetails = async (
  userId: string,
  accessToken: string,
) => {
  try {
    const {
      mediaCaption: _mediaCaption,
      imageIds: _imageIds,
      posts: _posts,
    } = await fetchData(
      `/api/instagram/media?access_token=${accessToken}&user_id=${userId}`,
    );

    return {
      mediaCaption: _mediaCaption ?? "",
      imageIds: _imageIds ?? {},
      iPosts: _posts ?? [],
    };
  } catch (error) {
    console.log("getInstagramDetails", error);
  }
};

type TRParams = {};

export const regenerateInstagramData = async (params: TRParams) => {
  try {

  } catch (error) {

  }
};

export const getInstagramData = async (params: TParams) => {
  const { regenerate,searchParams, dispatch, appState } = params;
  const userId = searchParams.get("user_id") ?? "";
  const accessToken = searchParams.get("access_token") ?? "";
  dispatch(
    updateAppState({
      ...appState,
      status: "Loading Instagram",
    }),
  );
  const { subdomain: siteAvailable, editable } = await checkSiteAvailability({
    userId,
  });
  dispatch(
    updateAppState({
      ...appState,
      subdomain: siteAvailable,
      status: "Loading Instagram",
      editable,
    }),
  );
  console.log("siteAvailable", siteAvailable);
  if (siteAvailable && !regenerate) {
    const siteData = await getSiteData(siteAvailable);

    if (!siteData) {
      return;
    }
    const aiContent = JSON.parse(siteData.aiResult);
    console.log("siteData", siteData);
    console.log("aiContent", aiContent);
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
  } else {
    const instagramDetails = await getInstagramDetails(userId, accessToken);

    if (instagramDetails) {
      dispatch(
        updateAppState({
          ...appState,
          status: "Generating Content",
        }),
      );

      const content = await getContent(instagramDetails.mediaCaption);
      if (content) {
        console.log("content", content);
        content["hero"]["image"]["imageUrl"] =
          instagramDetails.imageIds[content["hero"]["image"]["imageId"]];

        dispatch(
          updateAppState({
            ...appState,
            status: "Choosing Colors",
          }),
        );

        const colors = await getColors(content["hero"]["image"]["imageUrl"]);
        content["colors"] = colors;

        dispatch(
          updateAppState({
            ...appState,
            subdomain: siteAvailable,
            aiContent: Object.keys(content).length
              ? content
              : appState.aiContent,
            iPosts: { ...appState.iPosts, list: instagramDetails.iPosts },
            status: "Done",
          }),
        );
        if(!regenerate){
          await createNewSite({
            aiResult: JSON.stringify(content),
            posts: JSON.stringify({
              limit: 20,
              show: true,
              list: instagramDetails.iPosts,
            }),
            accessToken: searchParams.get("access_token") || "",
            userId: searchParams.get("user_id") || "",
          });
        }
      } else {
        dispatch(
          updateAppState({
            ...appState,
            status: "Done",
          }),
        );
      }
    } else {
      dispatch(
        updateAppState({
          ...appState,
          status: "Done",
        }),
      );
    }
  }
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
  } else if ((value as any)["section"] === "Services") {
    console.log("i came here", name, value);
    dispatch(
      updateAppState({
        ...appState,
        aiContent: {
          ...appState.aiContent,
          services: {
            ...appState.aiContent.services,
            list: appState.aiContent.services.list.map((service) => {
              if (service.id === name) {
                return {
                  id: service.id,
                  image: service.image,
                  description: (value as any)["description"],
                  name: (value as any)["name"],
                };
              } else {
                return service;
              }
            }),
          },
        },
      }),
    );
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
    const data = {
      aiResult: appState.aiContent,
      font: appState.selectedFont,
      posts: appState.iPosts,
    };
    console.log("Saved state", data);
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
