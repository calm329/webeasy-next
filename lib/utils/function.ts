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
import { store } from "../store";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import AmazonContent from "../content/amazon";

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
    const custom = params.get("id");
    let data;

    let response;
    if (custom && fieldName !== "image" && fieldName !== "logo") {
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
          services: appState?.aiContent.services,
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
          services: appState?.aiContent.services,
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

    console.log("appStateWhileGenerating:", appState, data);
    if (custom) {
      // console.log("subdomain: " + subdomain);
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
      } else if (appState?.aiContent.businessType && !fieldName) {
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
    } else if (data?.banner?.businessName && !fieldName) {
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

export const getAppState = () => {
  const state = store.getState();
  return state.siteSlice.sites.domain.present;
};

type UpdateFunction = () => Promise<void>;

class UpdateQueue {
  private queue: UpdateFunction[] = [];
  private processing = false;

  enqueue(updateFn: UpdateFunction) {
    this.queue.push(updateFn);
    if (!this.processing) {
      this.processNext();
    }
  }

  private async processNext() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }
    this.processing = true;
    const nextUpdate = this.queue.shift();
    if (nextUpdate) {
      await nextUpdate();
    }
    this.processNext();
  }
}

const updateQueue = new UpdateQueue();

export const regenerateIndividual = async (params: TRParams) => {
  const { fieldName, searchParams, dispatch, type } = params;
  const userId = searchParams.get("user_id") ?? "";
  const accessToken = searchParams.get("access_token") ?? "";
  const amazon = searchParams.get("site_id") ?? "";
  try {
    // Create a URL object
    const urlObj = new URL(window.location.href);
    const params = new URLSearchParams(urlObj.search);
    const custom = params.get("id");
    const instagramDetails = await getInstagramDetails(userId, accessToken);

    if (instagramDetails) {
      let content;
      if (amazon) {
        content = await getAmazonData(getAppState(), fieldName, type);
      } else {
        content = await getContent(
          instagramDetails.mediaCaption,
          fieldName,
          type,
          getAppState(), // Fetch the latest app state
        );
      }

      console.log("content: " + JSON.stringify(content));

      if (fieldName?.split(".") && !fieldName?.split(".")[1]) {
        switch (fieldName?.split(".")[0]) {
          case "serviceName":
            return {
              id: "",
              name: content.services.list[0].name,
              image: "",
              description: "",
            };
          case "serviceDescription":
            return {
              id: "",
              name: "",
              image: "",
              description: content.services.list[0].description,
            };

          case "featureTitle":
            return {
              id: "",
              title: content.features[0].title,
              image: "",
              description: "",
            };
          case "featureDescription":
            return {
              id: "",
              title: "",
              image: "",
              description: content.features[0].description,
            };
        }
      }

      const updateState = async (fieldName: string, content: any) => {
        const currentAppState = getAppState(); // Ensure we are using the latest app state
        return new Promise<void>((resolve) => {
          switch (
            fieldName?.split(".") ? fieldName?.split(".")[0] : fieldName
          ) {
            case "amazonDescription":
              dispatch(
                updateAppState({
                  ...currentAppState,
                  aiContent: {
                    ...currentAppState.aiContent,
                    description: content.description,
                  },
                }),
              );
              break;
            case "businessName":
              dispatch(
                updateAppState({
                  ...currentAppState,
                  aiContent: {
                    ...currentAppState.aiContent,
                    banner: {
                      ...currentAppState.aiContent.banner,
                      businessName: content.banner.businessName,
                    },
                  },
                }),
              );
              break;
            case "logo":
              dispatch(
                updateAppState({
                  ...currentAppState,
                  aiContent: {
                    ...currentAppState.aiContent,
                    banner: {
                      ...currentAppState.aiContent.banner,
                      logo: {
                        ...currentAppState.aiContent.banner.logo,
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
                  ...currentAppState,
                  aiContent: {
                    ...currentAppState.aiContent,
                    hero: {
                      ...currentAppState.aiContent.hero,
                      image: {
                        ...currentAppState.aiContent.hero.image,
                        imageUrl: custom
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
                  ...currentAppState,
                  aiContent: {
                    ...currentAppState.aiContent,
                    hero: {
                      ...currentAppState.aiContent.hero,
                      heading: content.hero.heading,
                    },
                  },
                }),
              );
              break;
            case "subheading":
              dispatch(
                updateAppState({
                  ...currentAppState,
                  aiContent: {
                    ...currentAppState.aiContent,
                    hero: {
                      ...currentAppState.aiContent.hero,
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
                    ...currentAppState,
                    aiContent: {
                      ...currentAppState.aiContent,
                      services: {
                        ...currentAppState.aiContent.services,
                        list: currentAppState.aiContent.services.list.map(
                          (service) => {
                            if (service.id === fieldName?.split(".")[1]) {
                              return {
                                ...service,
                                name: content.services.list[0].name,
                              };
                            } else {
                              return service;
                            }
                          },
                        ),
                      },
                    },
                  }),
                );
              } else {
                resolve();
                return;
              }
              break;
            case "serviceDescription":
              if (fieldName?.split(".")[1]) {
                dispatch(
                  updateAppState({
                    ...currentAppState,
                    aiContent: {
                      ...currentAppState.aiContent,
                      services: {
                        ...currentAppState.aiContent.services,
                        list: currentAppState.aiContent.services.list.map(
                          (service) => {
                            if (service.id === fieldName?.split(".")[1]) {
                              return {
                                ...service,
                                description:
                                  content.services.list[0].description,
                              };
                            } else {
                              return service;
                            }
                          },
                        ),
                      },
                    },
                  }),
                );
              } else {
                resolve();
                return;
              }
              break;
            case "featureTitle":
              if (fieldName?.split(".")[1]) {
                dispatch(
                  updateAppState({
                    ...currentAppState,
                    aiContent: {
                      ...currentAppState.aiContent,
                      features: currentAppState.aiContent.features?.map(
                        (feature) => {
                          if (feature.id === fieldName?.split(".")[1]) {
                            return {
                              ...feature,
                              title: content.features[0].title,
                            };
                          } else {
                            return feature;
                          }
                        },
                      ),
                    },
                  }),
                );
              } else {
                resolve();
                return;
              }
              break;
            case "featureDescription":
              if (fieldName?.split(".")[1]) {
                dispatch(
                  updateAppState({
                    ...currentAppState,
                    aiContent: {
                      ...currentAppState.aiContent,
                      features: currentAppState.aiContent.features?.map(
                        (feature) => {
                          if (feature.id === fieldName?.split(".")[1]) {
                            return {
                              ...feature,
                              description: content.features[0].description,
                            };
                          } else {
                            return feature;
                          }
                        },
                      ),
                    },
                  }),
                );
              } else {
                resolve();
                return;
              }
              break;
          }
          resolve();
        });
      };

      updateQueue.enqueue(() => updateState(fieldName, content));
    }
  } catch (error) {
    console.error(error);
  }
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
              ? { ...appState.aiContent, ...content }
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
    const custom = params.get("id");
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
                  imageUrl: custom
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
  const custom = searchParams.get("id") ?? "";
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
        id: siteData?.id,
        selectedFont: siteData.font,
        subdomain: siteAvailable,
        status: "Done",
        aiContent: aiContent,
        iPosts: JSON.parse(siteData?.posts ?? ""),
        meta: { title: siteData.title, description: siteData.description },
        editable,
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
        if (!custom) {
          content["hero"]["image"]["imageUrl"] =
            instagramDetails.imageIds[content["hero"]["image"]["imageId"]];
        }

        dispatch(
          updateAppState({
            ...appState,
            status: "Choosing Colors",
          }),
        );
        if (content["hero"]["image"]["imageUrl"]) {
          const colors = await getColors(content["hero"]["image"]["imageUrl"]);
          content["colors"] = colors;
        }
        let businessName;
        if (custom) {
          businessName = appState.aiContent.banner.businessName;
        } else {
          if (regenerate) {
            businessName = appState.aiContent.banner.businessName;
          } else {
            businessName = getUsernameFromPosts(
              JSON.stringify(instagramDetails.iPosts),
            );
          }
        }
        let id;
        if (!regenerate) {
          const response = await createNewSite({
            subdomain: getUsernameFromPosts(
              JSON.stringify(instagramDetails.iPosts),
            ),
            aiResult: JSON.stringify(content),
            posts: JSON.stringify({
              limit: 20,
              show: true,
              list: instagramDetails.iPosts,
              showHash: true,
            }),
            accessToken: searchParams.get("access_token") || "",
            userId: searchParams.get("user_id") || "",
            type: "Instagram",
          });
          id = response?.id;
        }

        dispatch(
          updateAppState({
            ...appState,
            id: id || appState.id,
            // subdomain: customSubDomain || siteAvailable,
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
  } else if ((value as any)["section"] === "Features") {
    console.log("i came here", name, value);
    dispatch(
      updateAppState({
        ...appState,
        aiContent: {
          ...appState.aiContent,
          features: appState.aiContent.features?.map((feature) => {
            if (feature.id === name) {
              return {
                id: feature.id,
                image: (value as any)["image"],
                description: (value as any)["description"],
                title: (value as any)["title"],
              };
            } else {
              return feature;
            }
          }),
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
      case "primaryImage":
        dispatch(
          updateAppState({
            ...appState,
            aiContent: {
              ...appState.aiContent,
              images: {
                ...appState.aiContent.images,
                primary: {
                  ...appState?.aiContent?.images?.primary,
                  Large: {
                    ...appState?.aiContent?.images?.primary.Large,
                    URL: value,
                  },
                },
              },
            },
          }),
        );
        break;
      case "image1":
        dispatch(
          updateAppState({
            ...appState,
            aiContent: {
              ...appState.aiContent,
              images: {
                ...appState.aiContent.images,
                variant: appState.aiContent.images?.variant.map((image, i) => {
                  if (i === 0) {
                    return {
                      ...image,
                      Large: {
                        ...image.Large,
                        URL: value,
                      },
                    };
                  } else {
                    return image;
                  }
                }),
              },
            },
          }),
        );

        break;
      case "image2":
        dispatch(
          updateAppState({
            ...appState,
            aiContent: {
              ...appState.aiContent,
              images: {
                ...appState.aiContent.images,
                variant: appState.aiContent.images?.variant.map((image, i) => {
                  if (i === 1) {
                    return {
                      ...image,
                      Large: {
                        ...image.Large,
                        URL: value,
                      },
                    };
                  } else {
                    return image;
                  }
                }),
              },
            },
          }),
        );
        break;
      case "image3":
        dispatch(
          updateAppState({
            ...appState,
            aiContent: {
              ...appState.aiContent,
              images: {
                ...appState.aiContent.images,
                variant: appState.aiContent.images?.variant.map((image, i) => {
                  if (i === 2) {
                    return {
                      ...image,
                      Large: {
                        ...image.Large,
                        URL: value,
                      },
                    };
                  } else {
                    return image;
                  }
                }),
              },
            },
          }),
        );
        break;
      case "image4":
        dispatch(
          updateAppState({
            ...appState,
            aiContent: {
              ...appState.aiContent,
              images: {
                ...appState.aiContent.images,
                variant: appState.aiContent.images?.variant.map((image, i) => {
                  if (i === 3) {
                    return {
                      ...image,
                      Large: {
                        ...image.Large,
                        URL: value,
                      },
                    };
                  } else {
                    return image;
                  }
                }),
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

export function extractASIN(url: string) {
  // Match the ASIN pattern in the URL
  const asinMatch = url.match(/\/([A-Z0-9]{10})(?:[/?]|$)/);
  // If there's a match, return the first group captured
  return asinMatch ? asinMatch[1] : null;
}

export async function generateUniqueHash(inputString: string) {
  // Helper function to convert ArrayBuffer to hex string
  function bufferToHex(buffer: any) {
    return Array.prototype.map
      .call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2))
      .join("");
  }

  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = bufferToHex(salt);

  // Combine the input string with the salt
  const saltedInput = inputString + saltHex;

  // Encode the salted input string to a Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(saltedInput);

  // Hash the salted input using SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashHex = bufferToHex(hashBuffer);

  // Combine the salt and the hash to ensure uniqueness and randomness
  return `${saltHex}${hashHex}`;
}

export async function getAmazonData(
  appState: AppState,
  fieldName?: string,
  type?: string,
) {
  try {
    const response = await fetch("/api/content/amazon", {
      method: "POST",
      body: JSON.stringify({
        productTitle: appState?.aiContent?.title,
        fieldName: fieldName?.split(".")
          ? fieldName?.split(".")[0]
          : fieldName ?? "",
        type: type ?? "",
        features: appState?.aiContent?.features,
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
    const data = JSON.parse(content);
    return data;
  } catch (error) {}
}

export function isSiteBuilderPage(pathname: string): boolean {
  const tempPathname = pathname.split("/")[1];
  console.log("isSiteBuilderPage", tempPathname);
  if (
    tempPathname === "auth" ||
    tempPathname === "custom" ||
    tempPathname === "amazon"
  ) {
    return true;
  } else {
    return false;
  }
}

export const createNewAmazonSite = async (
  amazonData: any,
  router: AppRouterInstance,
) => {
  try {
    const startContentFetch = performance.now();
    const response = await fetch("/api/content/amazon", {
      method: "POST",
      body: JSON.stringify({
        productTitle: amazonData.ItemInfo.Title.DisplayValue,
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
    const endContentFetch = performance.now();
    console.log(`Content fetch took ${endContentFetch - startContentFetch} ms`);
    const data = JSON.parse(content);
    const colors = await getColors(amazonData?.Images?.Primary?.Large?.URL);

    const finalData = {
      ...data,
      images: {
        primary: amazonData?.Images?.Primary,
        variant: amazonData?.Images?.Variants,
      },
      price: amazonData?.Offers?.Listings[0]?.Price?.DisplayAmount ?? "",
      title: amazonData?.ItemInfo?.Title?.DisplayValue,
      features: data.features.map((feature: any, i: any) => {
        if (i === 0) {
          return {
            ...feature,
            image: amazonData?.Images?.Primary?.Large?.URL ?? "",
          };
        } else if (i === 1 || i === 2 || i === 3) {
          return {
            ...feature,
            image:
              amazonData?.Images?.Variants[i - 1]?.Large?.URL ??
              amazonData?.Images?.Primary?.Large?.URL ??
              "",
          };
        }
      }),
      colors,
    };

    // setAiData(data);

    // dispatch(updateAmazonSite(finalData));
    // router.push("/amazon?site_id=" + responseSite.id);
  } catch (error) {
    console.log("errorAmazonGeneration", error);
  }
};

export const getAmazonDataUsingASIN = async (product: string) => {
  try {
    store.dispatch(
      updateAppState({
        ...getAppState(),
        aiContent: {
          productId: product,
        },
        generate: {
          generating: true,
          progress: 0,
        },
      }),
    );
    const url = "/api/amazon";

    const requestData = {
      itemIds: [product],
    };

    const response = await fetch(url, {
      method: "POST", // Assuming this is a POST request
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    const amazonData = data.ItemsResult.Items[0];
    // const data = JSON.parse(content);
    const colors = await getColors(amazonData?.Images?.Primary?.Large?.URL);

    store.dispatch(
      updateAppState({
        ...getAppState(),
        aiContent: {},
        generate: {
          ...getAppState().generate,
          progress: 10,
        },
      }),
    );

    const initialData = {
      images: {
        primary: amazonData?.Images?.Primary,
        variant: amazonData?.Images?.Variants,
      },
      price: amazonData?.Offers?.Listings[0]?.Price?.DisplayAmount ?? "",
      title: amazonData?.ItemInfo?.Title?.DisplayValue,
      colors,
      features: [],
      description: "",
    };
    store.dispatch(
      updateAppState({
        ...getAppState(),
        aiContent: {
          ...getAppState().aiContent,
          ...initialData,
        },
        generate: {
          ...getAppState().generate,
          progress: getAppState().generate.progress + 40,
        },
      }),
    );
    console.log("appState", getAppState());
    const features = await AmazonContent.getFeatures(amazonData);
    const description = await AmazonContent.getDescription(amazonData);

    const finalData = {
      ...initialData,
      features,
      description,
    };
    return finalData;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const getLatestAmazonData = async (
  product: string,
  router: AppRouterInstance,
) => {
  try {
    store.dispatch(
      updateAppState({
        ...getAppState(),
        aiContent: {
          ...getAppState().aiContent,
          images: "",
          price: "",
          title: "",
        },
      }),
    );
    const url = "/api/amazon";

    const requestData = {
      itemIds: [product],
    };

    const response = await fetch(url, {
      method: "POST", // Assuming this is a POST request
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    const amazonData = data.ItemsResult.Items[0];

    const initialData = {
      images: {
        primary: amazonData?.Images?.Primary,
        variant: amazonData?.Images?.Variants,
      },
      price: amazonData?.Offers?.Listings[0]?.Price?.DisplayAmount ?? "",
      title: amazonData?.ItemInfo?.Title?.DisplayValue,
    };
    store.dispatch(
      updateAppState({
        ...getAppState(),
        aiContent: {
          ...getAppState().aiContent,
          ...initialData,
        },
      }),
    );
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const getNewAiDataForAmazon = async (
  product: string,
  router: AppRouterInstance,
) => {
  try {
    store.dispatch(
      updateAppState({
        ...getAppState(),
        aiContent: {},
        generate: {
          ...getAppState().generate,
          progress: 0,
        },
      }),
    );
    const url = "/api/amazon";

    const requestData = {
      itemIds: [product],
    };

    const response = await fetch(url, {
      method: "POST", // Assuming this is a POST request
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    const amazonData = data.ItemsResult.Items[0];
    // const data = JSON.parse(content);
    const colors = await getColors(amazonData?.Images?.Primary?.Large?.URL);

    store.dispatch(
      updateAppState({
        ...getAppState(),
        aiContent: {},
        generate: {
          ...getAppState().generate,
          progress: 10,
        },
      }),
    );

    const initialData = {
      images: {
        primary: amazonData?.Images?.Primary,
        variant: amazonData?.Images?.Variants,
      },
      price: amazonData?.Offers?.Listings[0]?.Price?.DisplayAmount ?? "",
      title: amazonData?.ItemInfo?.Title?.DisplayValue,
      colors,
      features: [],
      description: "",
    };
    store.dispatch(
      updateAppState({
        ...getAppState(),
        aiContent: {
          ...getAppState().aiContent,
          ...initialData,
        },
        generate: {
          ...getAppState().generate,
          progress: getAppState().generate.progress + 40,
        },
      }),
    );
    console.log("appState", getAppState());
    const features = await AmazonContent.getFeatures(amazonData);
    const description = await AmazonContent.getDescription(amazonData);

    const finalData = {
      ...initialData,
      features,
      description,
    };
    return finalData;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const findClosingBracketIndex = (
  text: string,
  startIndex: number,
): number => {
  let openBrackets = 0;

  for (let i = startIndex; i < text.length; i++) {
    if (text[i] === "{") {
      openBrackets++;
    } else if (text[i] === "}") {
      openBrackets--;
      if (openBrackets === 0) {
        return i;
      }
    }
  }

  return -1;
};
