import { AppState, FormField, TData } from "@/types";
import { ReadonlyURLSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { checkSiteAvailability, createNewSite, updateSite } from "../actions";
import { getSiteData } from "../fetchers";
import { fetchData, getUsernameFromPosts } from "../utils";
import {
  updateAppState,
  updateSite as updateStateSite,
} from "../store/slices/site-slice";
import { toast } from "sonner";
import { prompt } from "./common-constant";
import { appState } from "../store/slices/site-slice";
import Search from "../../components/ui/search/index";
import App from "next/app";

type TParams = {
  regenerate?: boolean;
  searchParams: ReadonlyURLSearchParams;
  dispatch: any;
  appState: AppState;
  fieldName?: string;
};

export const getContent = async (
  mediaCaption?: string,
  fieldName?: string,
  type?: string,
  appState?: AppState,
) => {
  try {
    // Create a URL object
    const urlObj = new URL(window.location.href);

    // Use URLSearchParams to extract the 'subdomain' parameter
    const params = new URLSearchParams(urlObj.search);
    const subdomain = params.get("subdomain");
    let data;
    if (fieldName !== "image" && fieldName !== "logo") {
      let response;
      if (subdomain) {
        response = await fetch("/api/content/custom", {
          method: "POST",
          body: JSON.stringify({
            data: {
              businessType: appState?.aiContent.businessType,
              location: appState?.aiContent.location,
              businessName: appState?.aiContent.banner.businessName,
            },
            fieldName: fieldName?.split(".")
              ? fieldName?.split(".")[0]
              : fieldName ?? "",
            type: type ?? "",
          }),
        });
      } else {
        response = await fetch("/api/content", {
          method: "POST",
          body: JSON.stringify({
            mediaCaption,
            fieldName: fieldName?.split(".")
              ? fieldName?.split(".")[0]
              : fieldName ?? "",
            type: type ?? "",
          }),
        });
      }

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
      data = JSON.parse(content);
    }
    console.log("appStateWhileGenerating:",appState)
    if (subdomain) {
      console.log("subdomain: " + subdomain);
      if (fieldName === "image" && appState?.aiContent.businessType) {
        data = {
          hero: {
            image: {
              imageUrl: appState?.aiContent.hero.image.imageUrl ?? "",
            },
          },
        };
        const res = await fetch("/api/image", {
          method: "POST",
          body: JSON.stringify({
            prompt: appState?.aiContent.businessType ?? "",
          }),
        });
        const image = await res.json();
        data["hero"]["image"]["imageUrl"] = image.imageUrl;
      }
      else if (appState?.aiContent.businessType && !fieldName) {
        const res = await fetch("/api/image", {
          method: "POST",
          body: JSON.stringify({
            prompt: appState?.aiContent.businessType ?? "",
          }),
        });
        const image = await res.json();
        data["hero"]["image"]["imageUrl"] = image.imageUrl;
      }
    }

    if (fieldName === "logo") {
      data = {
        banner: {
          logo: {
            link: appState?.aiContent.banner.logo.link ?? "",
          },
        },
      };
      const res = await fetch("/api/image", {
        method: "POST",
        body: JSON.stringify({
          prompt:
            "generate logo for " +
            (appState?.aiContent.banner.businessName ?? "") +
            " but don't add living things in it",
        }),
      });
      const image = await res.json();
      data["banner"]["logo"]["link"] = image.imageUrl;
    }
    else if (data?.banner?.businessName && !fieldName) {
      const res = await fetch("/api/image", {
        method: "POST",
        body: JSON.stringify({
          prompt:
            "generate logo for " +
            (data.banner.businessName ?? "") +
            " but don't add living things in it",
        }),
      });
      const image = await res.json();
      data["banner"]["logo"]["link"] = image.imageUrl;
    }
    console.log("generated-data", data);
    return data;
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

type TRParams = {
  fieldName: string;
  searchParams: ReadonlyURLSearchParams;
  dispatch: any;
  appState: AppState;
  type?: string;
};

export const regenerateIndividual = async (params: TRParams) => {
  const { fieldName, searchParams, dispatch, appState, type } = params;
  const userId = searchParams.get("user_id") ?? "";
  const accessToken = searchParams.get("access_token") ?? "";
  try {
    // Create a URL object
    const urlObj = new URL(window.location.href);

    // Use URLSearchParams to extract the 'subdomain' parameter
    const params = new URLSearchParams(urlObj.search);
    const subdomain = params.get("subdomain");
    const instagramDetails = await getInstagramDetails(userId, accessToken);
    if (instagramDetails) {
      const content = await getContent(
        instagramDetails.mediaCaption,
        fieldName,
        type,
        appState,
      );
      switch (fieldName?.split(".") ? fieldName?.split(".")[0] : fieldName) {
        case "businessName":
          dispatch(
            updateAppState({
              ...appState,
              aiContent: {
                ...appState.aiContent,
                banner: {
                  ...appState.aiContent.banner,
                  businessName: content.banner.businessName,
                },
              },
            }),
          );
          break;
        case "logo":
          dispatch(
            updateAppState({
              ...appState,
              aiContent: {
                ...appState.aiContent,
                banner: {
                  ...appState.aiContent.banner,
                  logo: {
                    ...appState.aiContent.banner.logo,
                    link: content.banner.logo.link,
                  },
                },
              },
            }),
          );
          break;

        case "image":
          dispatch(
            updateAppState({
              ...appState,
              aiContent: {
                ...appState.aiContent,
                hero: {
                  ...appState.aiContent.hero,
                  image: {
                    ...appState.aiContent.hero.image,
                    imageUrl: subdomain
                      ? content["hero"]["image"]["imageUrl"]
                      : instagramDetails.imageIds[
                          content["hero"]["image"]["imageId"]
                        ],
                  },
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
                hero: {
                  ...appState.aiContent.hero,
                  heading: content.hero.heading,
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
                hero: {
                  ...appState.aiContent.hero,
                  subheading: content.hero.subheading,
                },
              },
            }),
          );

          break;
        case "serviceName":
          if (fieldName?.split(".")[1]) {
            dispatch(
              updateAppState({
                ...appState,
                aiContent: {
                  ...appState.aiContent,
                  services: {
                    ...appState.aiContent.services,
                    list: appState.aiContent.services.list.map((service) => {
                      if (service.id === fieldName?.split(".")[1]) {
                        return {
                          ...service,
                          name: content.services.list[0].name,
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
            return {
              id: "",
              name: content.services.list[0].name,
              image: "",
              description: "",
            };
          }

          break;
        case "serviceDescription":
          if (fieldName?.split(".")[1]) {
            dispatch(
              updateAppState({
                ...appState,
                aiContent: {
                  ...appState.aiContent,
                  services: {
                    ...appState.aiContent.services,
                    list: appState.aiContent.services.list.map((service) => {
                      if (service.id === fieldName?.split(".")[1]) {
                        return {
                          ...service,
                          description: content.services.list[0].description,
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
            return {
              id: "",
              name: "",
              image: "",
              description: content.services.list[0].description,
            };
          }
          break;
      }
    }
  } catch (error) {}
};

export const regenerateText = async (params: TParams) => {
  const { searchParams, dispatch, appState } = params;
  const userId = searchParams.get("user_id") ?? "";
  const accessToken = searchParams.get("access_token") ?? "";
  try {
    const instagramDetails = await getInstagramDetails(userId, accessToken);
    if (instagramDetails) {
      dispatch(
        updateAppState({
          ...appState,
          status: "Generating Content",
        }),
      );

      const content = await getContent(
        instagramDetails.mediaCaption,
        "",
        "",
        appState,
      );

      if (content) {
        console.log("content", content);
        content["hero"]["image"]["imageUrl"] =
          appState.aiContent.hero.image.imageUrl;
        content["banner"]["logo"]["link"] = appState.aiContent.banner.logo.link;

        content["colors"] = appState.aiContent.colors;
        dispatch(
          updateAppState({
            ...appState,
            aiContent: Object.keys(content).length
              ? {...appState.aiContent,...content}
              : appState.aiContent,
            status: "Done",
          }),
        );
      }
    }
  } catch (error) {}
};

export const regenerateImage = async (params: TParams) => {
  const { searchParams, dispatch, appState } = params;
  const userId = searchParams.get("user_id") ?? "";
  const accessToken = searchParams.get("access_token") ?? "";
  try {
    const urlObj = new URL(window.location.href);

    // Use URLSearchParams to extract the 'subdomain' parameter
    const params = new URLSearchParams(urlObj.search);
    const subdomain = params.get("subdomain");
    const instagramDetails = await getInstagramDetails(userId, accessToken);
    if (instagramDetails) {
      dispatch(
        updateAppState({
          ...appState,
          status: "Generating Images",
        }),
      );

      let content = await getContent(
        instagramDetails.mediaCaption,
        "",
        "",
        appState,
      );

      if (content) {
        dispatch(
          updateAppState({
            ...appState,
            aiContent: {
              ...appState.aiContent,
              banner: {
                ...appState.aiContent.banner,
                logo: {
                  ...appState.aiContent.banner.logo,
                  link: content["banner"]["logo"]["link"],
                },
              },
              hero: {
                ...appState.aiContent.hero,
                image: {
                  ...content["hero"]["image"],
                  imageUrl: subdomain
                    ? content["hero"]["image"]["imageUrl"]
                    : instagramDetails.imageIds[
                        content["hero"]["image"]["imageId"]
                      ],
                },
              },
            },
            status: "Done",
          }),
        );
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getInstagramData = async (params: TParams) => {
  const { regenerate, searchParams, dispatch, appState } = params;
  const userId = searchParams.get("user_id") ?? "";
  const accessToken = searchParams.get("access_token") ?? "";
  const customSubDomain = searchParams.get("subdomain") ?? "";
  dispatch(
    updateAppState({
      ...appState,
      status: "Loading",
    }),
  );
  const { subdomain: siteAvailable, editable } = await checkSiteAvailability({
    userId,
  });
  dispatch(
    updateAppState({
      ...appState,
      subdomain: siteAvailable,
      status: "Loading",
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
        iPosts: JSON.parse(siteData?.posts ?? ""),
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

      const content = await getContent(
        instagramDetails.mediaCaption,
        "",
        "",
        appState,
      );
      if (content) {
        console.log("content", content);
        if (!customSubDomain) {
          content["hero"]["image"]["imageUrl"] =
            instagramDetails.imageIds[content["hero"]["image"]["imageId"]];
        }

        dispatch(
          updateAppState({
            ...appState,
            status: "Choosing Colors",
          }),
        );
        if(content["hero"]["image"]["imageUrl"]){
          const colors = await getColors(content["hero"]["image"]["imageUrl"]);
          content["colors"] = colors;
        }
        let businessName;
        if (customSubDomain) {
          if (regenerate) {
            businessName = appState.aiContent.banner.businessName;
          } else {
            businessName = customSubDomain;
          }
        } else {
          if (regenerate) {
            businessName = appState.aiContent.banner.businessName;
          } else {
            businessName = getUsernameFromPosts(
              JSON.stringify(instagramDetails.iPosts),
            );
          }
        }

        dispatch(
          updateAppState({
            ...appState,
            subdomain: customSubDomain || siteAvailable,
            aiContent: Object.keys(content).length
              ? {
                  ...appState.aiContent,
                  ...content,
                  banner: {
                    ...content.banner,
                    businessName: businessName,
                  },
                }
              : appState.aiContent,
            iPosts: { ...appState.iPosts, list: instagramDetails.iPosts },
            status: "Done",
          }),
        );
        if (!regenerate) {
          await createNewSite({
            subdomain: getUsernameFromPosts(
              JSON.stringify(instagramDetails.iPosts),
            ),
            aiResult: JSON.stringify(content),
            posts: JSON.stringify({
              limit: 20,
              show: true,
              list: instagramDetails.iPosts,
            }),
            accessToken: searchParams.get("access_token") || "",
            userId: searchParams.get("user_id") || "",
            type: "Instagram",
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
    console.log("Saved state", appState);
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
