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
import { TFeature } from "../../types/index";
import CustomContent from "../content/custom";
// import { selectedTemplate } from "../store/slices/template-slice";

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
            businessType: appState?.aiContent?.businessType,
            location: appState?.aiContent?.location,
            businessName: appState?.aiContent?.banner?.businessName,
          },
          fieldName: fieldName?.split(".")
            ? fieldName?.split(".")[0]
            : fieldName ?? "",
          type: type ?? "",
          services: appState?.aiContent?.services,
          testimonials: appState?.aiContent?.testimonials?.list,
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
              imageUrl: appState?.aiContent.hero.image ?? "",
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
        data["hero"]["image"]["imageUrl"] = image;
      } else if (appState?.aiContent.businessType && !fieldName) {
        const res = await fetch("/api/image", {
          method: "POST",
          body: JSON.stringify({
            prompt: appState?.aiContent.businessType ?? "",
          }),
        });
        const image = await res.json();
        data["hero"]["image"]["imageUrl"] = image;
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
      data["banner"]["logo"]["link"] = image;
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
      data["banner"]["logo"]["link"] = image;
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

          case "testimonialName":
            return {
              id: "",
              name: content.testimonials[0].name,
              avatar: "",
              content: "",
            };
          case "testimonialContent":
            return {
              id: "",
              name: "",
              avatar: "",
              content: content.testimonials[0].content,
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
            case "testimonialName":
              if (fieldName?.split(".")[1]) {
                console.log("testimonialName", content.testimonials[0].name);
                dispatch(
                  updateAppState({
                    ...currentAppState,
                    aiContent: {
                      ...currentAppState.aiContent,
                      testimonials: {
                        ...currentAppState.aiContent.testimonials,
                        list: currentAppState.aiContent.testimonials.list.map(
                          (testimonial) => {
                            if (testimonial.id === fieldName?.split(".")[1]) {
                              return {
                                ...testimonial,
                                name: content.testimonials[0].name,
                              };
                            } else {
                              return testimonial;
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
            case "testimonialContent":
              if (fieldName?.split(".")[1]) {
                dispatch(
                  updateAppState({
                    ...currentAppState,
                    aiContent: {
                      ...currentAppState.aiContent,
                      testimonials: {
                        ...currentAppState.aiContent.testimonials,
                        list: currentAppState.aiContent.testimonials.list.map(
                          (testimonial) => {
                            if (testimonial.id === fieldName?.split(".")[1]) {
                              return {
                                ...testimonial,
                                content: content.testimonials[0].content,
                              };
                            } else {
                              return testimonial;
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
        content["hero"]["image"]["imageUrl"] = appState.aiContent.hero.image;
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
        aiContent: { ...appState.aiContent, ...aiContent },
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

export async function saveState(
  appState: AppState,
  dispatch: any,
  templateId: string,
) {
  try {
    const data = {
      aiResult: appState.aiContent,
      font: appState.selectedFont,
      posts: appState.iPosts,
      templateId: templateId,
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
    const startTime = performance.now();

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
    const requestData = { itemIds: [product] };

    const responseStartTime = performance.now();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const responseEndTime = performance.now();
    const responseTimeTaken = responseEndTime - responseStartTime;
    console.log(`Time taken by fetch call: ${responseTimeTaken} milliseconds`);

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    const amazonData = data.ItemsResult.Items[0];

    const colorsStartTime = performance.now();
    const colors = await getColors(amazonData?.Images?.Primary?.Large?.URL);
    const colorsEndTime = performance.now();
    const colorsTimeTaken = colorsEndTime - colorsStartTime;
    console.log(`Time taken by getColors: ${colorsTimeTaken} milliseconds`);

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

    // Parallel execution of getFeatures and getDescription
    const [features, description] = await Promise.all([
      AmazonContent.getFeatures({
        individual: false,
        type: "",
        fieldName: "",
      }),
      AmazonContent.getDescription(),
    ]);

    const featuresEndTime = performance.now();
    const descriptionEndTime = performance.now();

    const featuresTimeTaken = featuresEndTime - responseEndTime; // Calculate relative to response end time
    const descriptionTimeTaken = descriptionEndTime - responseEndTime; // Calculate relative to response end time

    console.log(`Time taken by getFeatures: ${featuresTimeTaken} milliseconds`);
    console.log(
      `Time taken by getDescription: ${descriptionTimeTaken} milliseconds`,
    );

    store.dispatch(
      updateAppState({
        ...getAppState(),
        generate: {
          ...getAppState().generate,
          progress: 100,
          generating: true,
        },
      }),
    );

    const finalData = {
      ...initialData,
      features,
      description,
    };

    const endTime = performance.now();
    const totalTimeTaken = endTime - startTime;
    console.log(`Total time taken: ${totalTimeTaken} milliseconds`);

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
    const features = await AmazonContent.getFeatures({
      individual: false,
      type: "",
      fieldName: "",
    });
    const description = await AmazonContent.getDescription();

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

export async function generateIndividualFeature({
  fieldName,
  type,
}: {
  fieldName: string;
  type: string;
}) {
  try {
    const featureData = await AmazonContent.getFeatures({
      individual: true,
      type: type,
      fieldName: fieldName?.split(".") && fieldName?.split(".")[0],
    });
    console.log("featureData", featureData);
    let feature: TFeature;

    if (Array.isArray(featureData)) {
      feature = featureData[0]; // Assuming we need the first feature from the array
    } else {
      feature = featureData;
    }
    if (fieldName?.split(".") && !fieldName?.split(".")[1]) {
      switch (fieldName?.split(".")[0]) {
        case "featureTitle":
          return {
            id: "",
            title: feature.title,
            image: "",
            description: "",
          };
        case "featureDescription":
          return {
            id: "",
            title: "",
            image: "",
            description: feature.description,
          };
      }
    }

    const updateState = async (fieldName: string, content: any) => {
      const currentAppState = getAppState(); // Ensure we are using the latest app state
      return new Promise<void>((resolve) => {
        switch (fieldName?.split(".") ? fieldName?.split(".")[0] : fieldName) {
          case "featureTitle":
            if (fieldName?.split(".")[1]) {
              store.dispatch(
                updateAppState({
                  ...currentAppState,
                  aiContent: {
                    ...currentAppState.aiContent,
                    features: currentAppState.aiContent.features?.map(
                      (feature) => {
                        if (feature.id === fieldName?.split(".")[1]) {
                          return {
                            ...feature,
                            title: content.title,
                          };
                        } else {
                          return feature;
                        }
                      },
                    ),
                  },
                  generate: {
                    ...currentAppState.generate,
                    field: fieldName,
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
              store.dispatch(
                updateAppState({
                  ...currentAppState,
                  aiContent: {
                    ...currentAppState.aiContent,
                    features: currentAppState.aiContent.features?.map(
                      (feature) => {
                        if (feature.id === fieldName?.split(".")[1]) {
                          return {
                            ...feature,
                            description: content.description,
                          };
                        } else {
                          return feature;
                        }
                      },
                    ),
                  },
                  generate: {
                    ...currentAppState.generate,
                    field: fieldName,
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

    updateQueue.enqueue(() => updateState(fieldName, feature));
  } catch (error) {}
}

export async function generateNewCustomSite(data: {
  businessType: string;
  businessName: string;
  location: string;
}) {
  try {
    store.dispatch(
      updateAppState({
        ...getAppState(),
        aiContent: {
          businessName: data.businessName,
          businessType: data.businessType,
          location: data.location,
        },
        generate: {
          generating: true,
          progress: 0,
        },
      }),
    );

    const startTime = performance.now();
    const startImagesTime = performance.now();
    // Start all API calls in parallel
    const [heroImage] = await Promise.all([
      getRandomImageFromUnsplash(data.businessType),
    ]);

    store.dispatch(
      updateAppState({
        ...getAppState(),
        generate: {
          ...getAppState().generate,
          progress: 10,
        },
      }),
    );

    const endImagesTime = performance.now();
    const timeImagesTaken = endImagesTime - startImagesTime;
    console.log(
      `Total time taken by Image Api Calls: ${timeImagesTaken} milliseconds`,
    );
    const startColorTime = performance.now();
    const colors = await getColors(heroImage);
    const endColorTime = performance.now();
    const timeColorTaken = endColorTime - startColorTime;
    console.log(
      `Total time taken by Colors Api Calls: ${timeColorTaken} milliseconds`,
    );

    const initialData = {
      colors,
      hero: {
        image: {
          show: true,
          imageUrl: heroImage,
        },
      },
      services: {
        show: true,
      },
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
          progress: getAppState().generate.progress + 10,
        },
      }),
    );
    const startTextTime = performance.now();
    const [hero, banner, services, logo, testimonials, gallery, partners] =
      await Promise.all([
        CustomContent.getHero({
          data,
          individual: false,
          fieldName: "",
          type: "",
        }),
        CustomContent.getBanner({
          data,
          individual: false,
          fieldName: "",
          type: "",
        }),
        CustomContent.getServices({
          data,
          individual: false,
          fieldName: "",
          type: "",
        }),

        getLogo(data),
        CustomContent.getTestimonials({
          data,
          individual: false,
          fieldName: "",
          type: "",
        }),
        getPhotosFromUnsplash(data.businessType),
        CustomContent.getPartners({
          data,
          individual: false,
          fieldName: "",
          type: "",
        }),
      ]);

    const endTextTime = performance.now();
    const timeTextTaken = endTextTime - startTextTime;
    console.log(
      `Total time taken by Text and logo Api Calls: ${timeTextTaken} milliseconds`,
    );

    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    console.log("heroImage", heroImage);
    console.log("colors", colors);
    console.log("logo", logo);
    console.log(`Total time taken by all API calls: ${timeTaken} milliseconds`);
    console.log("services", services, hero, banner);

    if (logo) {
      store.dispatch(
        updateAppState({
          ...getAppState(),
          aiContent: {
            ...getAppState().aiContent,
            banner: {
              ...getAppState().aiContent.banner,
              logo: {
                ...getAppState().aiContent.banner.logo,
                show: true,
                link: logo,
              },
            },
          },
          generate: {
            generating: false,
            progress: 100,
          },
        }),
      );
    }

    const finalData = {
      ...initialData,
      services: {
        ...services,
        ...initialData.services,
      },
      hero: {
        ...hero,
        ...initialData.hero,
      },
      banner: {
        ...banner,
        logo: {
          ...banner.logo,
          show: true,
          link: logo,
        },
      },
      testimonials: {
        ...testimonials,
      },
      gallery: {
        show: true,
        list: gallery,
      },
      partners: {
        ...getAppState().aiContent.partners,
      },
    };

    return finalData;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

export async function generateImagesForCustom(data: {
  businessType: string;
  businessName: string;
  location: string;
}) {
  try {
    store.dispatch(
      updateAppState({
        ...getAppState(),
        aiContent: {
          ...getAppState().aiContent,
          banner: {
            ...getAppState().aiContent.banner,

            logo: {
              ...getAppState().aiContent.banner.logo,
              show: true,
              link: "",
            },
          },
          hero: {
            ...getAppState().aiContent.hero,
            image: "",
          },
        },
        generate:{
          ...getAppState().generate,
          generating:true
        }
      }),
    );

    const startTime = performance.now();
    const startImagesTime = performance.now();
    // Start all API calls in parallel
    const [heroImage, logo] = await Promise.all([
      getRandomImageFromUnsplash(data.businessType),
      getLogo(data),
    ]);

    store.dispatch(
      updateAppState({
        ...getAppState(),
        aiContent: {
          ...getAppState().aiContent,
          banner: {
            ...getAppState().aiContent.banner,

            logo: {
              ...getAppState().aiContent.banner.logo,
              show: true,
              link: logo,
            },
          },
          hero: {
            ...getAppState().aiContent.hero,
            image: {
              ...getAppState().aiContent.hero.image,
              show: true,
              imageUrl: heroImage,
            },
          },
        },
        generate: {
          generating: false,
          progress: 0,
        },
      }),
    );
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

export async function generateTextForCustom(data: {
  businessType: string;
  businessName: string;
  location: string;
}) {
  try {
    const heroImage = getAppState().aiContent.hero.image.imageUrl;
    const logo = getAppState().aiContent.banner.logo.link;
    store.dispatch(
      updateAppState({
        ...getAppState(),
        aiContent: {
          ...getAppState().aiContent,
          banner: {
            ...getAppState().aiContent.banner,
            businessName: "",
            button: "",
          },
          hero: {
            ...getAppState().aiContent.hero,
            button: "",
            heading: "",
            subheading: "",
          },
          services: "",
        },
        generate: {
          generating: true,
          progress: 0,
        },
      }),
    );

    const startTextTime = performance.now();
    const [hero, banner, services] = await Promise.all([
      CustomContent.getHero({
        data,
        individual: false,
        fieldName: "",
        type: "",
      }),
      CustomContent.getBanner({
        data,
        individual: false,
        fieldName: "",
        type: "",
      }),
      CustomContent.getServices({
        data,
        individual: false,
        fieldName: "",
        type: "",
      }),
    ]);

    store.dispatch(
      updateAppState({
        ...getAppState(),
        aiContent: {
          ...getAppState().aiContent,
          banner: {
            ...banner,
            logo: {
              ...banner.logo,
              link: logo,
            },
          },
          hero: {
            ...hero,
            image: {
              ...hero.image,
              imageUrl: heroImage,
            },
          },
        },
        generate: {
          generating: false,
          progress: 0,
        },
      }),
    );

    const endTextTime = performance.now();
    const timeTextTaken = endTextTime - startTextTime;
    console.log(
      `Total time taken by Text Api Calls: ${timeTextTaken} milliseconds`,
    );
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

export async function getRandomImageFromUnsplash(prompt: string) {
  try {
    const startTime = performance.now();
    const [res1, res2] = await Promise.all([
     
      fetch(
        `https://api.unsplash.com/photos/random?client_id=-lFN4fpaSIrPO3IsWyqGOd8D5etHth-rVXY7fx77X_E&query=${prompt}&count=3&orientation=landscape`,
      ),
      fetch(
        `https://api.unsplash.com/photos/random?client_id=-lFN4fpaSIrPO3IsWyqGOd8D5etHth-rVXY7fx77X_E&query=${prompt}&count=2&orientation=squarish`,
      ),
  ]);

    const landscapeImages = await res1.json()
    const squarishImages = await res2.json();
  
  
    const resUnsplash = [...landscapeImages, ...squarishImages];
    console.log('resUnsplash',resUnsplash)
    const data = resUnsplash;

    const dataToBeFiltered = data.map((obj: any) => {
      return {
        description: obj.alt_description,
      };
    });
    const response = await fetch("/api/content/image", {
      method: "POST",
      body: JSON.stringify({
        data: dataToBeFiltered,
        businessType: prompt,
      }),
    });
    const index = await response.json();
    const endTime = performance.now();
    console.log(
      `Image Generation using ai+unplash took ${endTime - startTime} ms`,
    );
    // console.log("response",res)
    return data[parseInt(index)].urls.small;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

export async function getLogo(req: {
  businessName: string;
  businessType: string;
  location: string;
}) {
  try {
    const res = await fetch("/api/image", {
      method: "POST",
      body: JSON.stringify({
        prompt: `generate logo for business name ${req.businessName} and businessType ${req.businessType} but don't add living things in it.`,
      }),
    });
    const data = await res.json();
    return data.imageUrl;
  } catch (error) {}
}

export async function getAiHeroImageForCustom() {
  try {
    const res = await fetch("/api/image", {
      method: "POST",
      body: JSON.stringify({
        prompt: `generate hero image for ${getAppState().aiContent.businessType}`,
      }),
    });
    const data = await res.json();
    return data.imageUrl;
  } catch (error) {}
}

export async function regenerateHeroImage(type: string) {
  try {
    let image = "";
    console.log("type", type);
    if (type === "Stored Image") {
      image = await getRandomImageFromUnsplash(
        getAppState().aiContent?.businessType ?? "",
      );
    } else {
      image = await getAiHeroImageForCustom();
    }
    return image;
  } catch (error) {}
}

export async function generateCustomServiceTAndD({
  individual,
  type,
  fieldName,
  data,
}: {
  individual: boolean;
  type: string;
  fieldName: string;
  data: { businessType: string; businessName: string; location: string };
}) {
  try {
    const response = await CustomContent.getServiceTAndD({
      data,
      fieldName,
      type: "",
      individual: true,
    });

    const updateState = async (fieldName: string, content: any) => {
      const currentAppState = getAppState(); // Ensure we are using the latest app state
      return new Promise<void>((resolve) => {
        switch (fieldName) {
          case "title":
            store.dispatch(
              updateAppState({
                ...currentAppState,
                aiContent: {
                  ...currentAppState.aiContent,
                  services: {
                    ...currentAppState.aiContent.services,
                    title: content.title,
                  },
                },
              }),
            );

            break;
          case "description":
            store.dispatch(
              updateAppState({
                ...currentAppState,
                aiContent: {
                  ...currentAppState.aiContent,
                  services: {
                    ...currentAppState.aiContent.services,
                    description: content.description,
                  },
                },
              }),
            );
            break;
        }
        resolve();
      });
    };

    updateQueue.enqueue(() => updateState(fieldName, response));
  } catch (error) {}
}

export async function generatePartnersTAndD({
  individual,
  type,
  fieldName,
  data,
}: {
  individual: boolean;
  type: string;
  fieldName: string;
  data: { businessType: string; businessName: string; location: string };
}) {
  try {
    const response = await CustomContent.getPartnersTAndD({
      data,
      fieldName,
      type: "",
      individual: true,
    });

    const updateState = async (fieldName: string, content: any) => {
      const currentAppState = getAppState(); // Ensure we are using the latest app state
      return new Promise<void>((resolve) => {
        switch (fieldName) {
          case "partnersTitle":
            store.dispatch(
              updateAppState({
                ...currentAppState,
                aiContent: {
                  ...currentAppState.aiContent,
                  partners: {
                    ...currentAppState.aiContent.partners,
                    title: content.title,
                  },
                },
              }),
            );

            break;
          case "partnersDescription":
            store.dispatch(
              updateAppState({
                ...currentAppState,
                aiContent: {
                  ...currentAppState.aiContent,
                  partners: {
                    ...currentAppState.aiContent.partners,
                    description: content.description,
                  },
                },
              }),
            );
            break;
        }
        resolve();
      });
    };

    updateQueue.enqueue(() => updateState(fieldName, response));
  } catch (error) {}
}

export const validateURL = (url: string) => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i", // fragment locator
  );
  return !!urlPattern.test(url);
};

export const getPhotosFromUnsplash = async (prompt: string) => {
  try {
    console.log("prompt",prompt)
    const res = await fetch(
      `https://api.unsplash.com/photos/random?client_id=-lFN4fpaSIrPO3IsWyqGOd8D5etHth-rVXY7fx77X_E&query=${prompt}&count=6`,
    );
    const data = await res.json();
    const fullUrls = data.map((photo: any) => photo.urls.full);
    store.dispatch(
      updateAppState({
        ...getAppState(),
        aiContent: {
          ...getAppState().aiContent,
          gallery: {
            ...getAppState().aiContent.gallery,
            list: fullUrls,
          },
        },
      }),
    );
    return fullUrls;
  } catch (error) {}
};