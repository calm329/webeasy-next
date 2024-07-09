import { store } from "../store";
import { updateAppState } from "../store/slices/site-slice";
import { getAppState, getRandomImageFromUnsplash } from "../utils/function";
import { TBanner, TBlogs, TContact, TFeature, THero, TServices } from "@/types";

class CustomContentApiService {
  private url = (api: string) => `/api/content/custom/${api}`;
  public async getServices({
    individual,
    type,
    fieldName,
    data,
  }: {
    individual: boolean;
    type: string;
    fieldName: string;
    data: { businessType: string; businessName: string; location: string };
  }): Promise<TServices> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          this.url(individual ? fieldName : "services"),
          {
            method: "POST",
            body: JSON.stringify({
              data: data,
              type: type ?? "",
              services: getAppState().aiContent.services ?? "",
            }),
          },
        );
        const tempServices: Array<{
          id: string;
          name: string;
          description: string;
          image: string;
        }> = [];
        const reader = response.body?.getReader();
        if (!reader) {
          reject(new Error("ReadableStream not available"));
          return;
        }
        const decoder = new TextDecoder();
        let accumulatedText = "";
        let completeJson = "";

        const processText = async ({
          done,
          value,
        }: ReadableStreamReadResult<Uint8Array>) => {
          if (done) {
            if (completeJson) {
              try {
                console.log("completeJson", completeJson);
                const parsedData = JSON.parse(completeJson);
                console.log("parsedDataServices", parsedData);
                store.dispatch(
                  updateAppState({
                    ...getAppState(),
                    aiContent: {
                      ...getAppState().aiContent,
                      services: parsedData.services,
                    },
                  }),
                );
                resolve(parsedData.services);
              } catch (error) {
                console.error("Error parsing final JSON:", error);
                reject(error);
              }
            }
            reader.releaseLock();
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          accumulatedText += chunk;
          completeJson += chunk;

          const titleMatch = accumulatedText.match(/"title"\s*:\s*"([^"]*)"/);
          const descriptionMatch = accumulatedText.match(
            /"description"\s*:\s*"([^"]*)"/,
          );
          console.log("titleMatch", titleMatch, descriptionMatch);
          if (titleMatch || descriptionMatch) {
            store.dispatch(
              updateAppState({
                ...getAppState(),
                aiContent: {
                  ...getAppState().aiContent,
                  services: {
                    ...getAppState().aiContent.services,
                    title: titleMatch
                      ? titleMatch[1]
                      : getAppState().aiContent.services.title,
                    description: descriptionMatch
                      ? descriptionMatch[1]
                      : getAppState().aiContent.services.description,
                  },
                },
              }),
            );
          }

          let startIndex = accumulatedText.indexOf('{"id":');
          console.log("startIndex", startIndex);

          while (startIndex !== -1) {
            const endIndex = accumulatedText.indexOf("}", startIndex);
            if (endIndex === -1) {
              break;
            }

            const jsonString = accumulatedText.substring(
              startIndex,
              endIndex + 1,
            );

            try {
              const jsonObject = JSON.parse(jsonString);

              tempServices.push({
                ...jsonObject,
              });
              console.log(
                "tempFeatures",
                JSON.stringify(tempServices, null, 2),
              );
              store.dispatch(
                updateAppState({
                  ...getAppState(),
                  aiContent: {
                    ...getAppState().aiContent,
                    services: {
                      ...getAppState().aiContent.services,
                      show: true,
                      list: [...tempServices],
                    },
                  },
                  generate: {
                    ...getAppState().generate,
                    progress: getAppState().generate.progress + 5,
                  },
                }),
              );
              console.log(
                "Complete JSON Object:",
                JSON.stringify(jsonObject, null, 2),
              );
              accumulatedText = accumulatedText.substring(endIndex + 1);
            } catch (error) {
              console.log("error parsing JSON", error);
              break;
            }

            startIndex = accumulatedText.indexOf('{"id":');
          }

          reader.read().then(processText).catch(console.error);
        };

        reader.read().then(processText).catch(console.error);
      } catch (error) {
        console.error("Error fetching content:", error);
        reject(error);
      }
    });
  }

  public async getTestimonials({
    individual,
    type,
    fieldName,
    data,
  }: {
    individual: boolean;
    type: string;
    fieldName: string;
    data: { businessType: string; businessName: string; location: string };
  }): Promise<{
    show: boolean;
    list: Array<{
      id: string;
      name: string;
      avatar: string;
      content: string;
    }>;
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          this.url(individual ? fieldName : "testimonials"),
          {
            method: "POST",
            body: JSON.stringify({
              data: data,
              type: type ?? "",
              testimonials: getAppState().aiContent.testimonials ?? "",
            }),
          },
        );
        const tempTestimonials: Array<{
          id: string;
          name: string;
          content: string;
          avatar: string;
        }> = [];
        const reader = response.body?.getReader();
        if (!reader) {
          reject(new Error("ReadableStream not available"));
          return;
        }
        const decoder = new TextDecoder();
        let accumulatedText = "";
        let completeJson = "";

        const processText = async ({
          done,
          value,
        }: ReadableStreamReadResult<Uint8Array>) => {
          if (done) {
            if (completeJson) {
              try {
                console.log("completeJson", completeJson);
                const parsedData = JSON.parse(completeJson);
                console.log("parsedDataServices", parsedData);
                // store.dispatch(
                //   updateAppState({
                //     ...getAppState(),
                //     aiContent: {
                //       ...getAppState().aiContent,
                //       testimonials: parsedData.testimonials,
                //     },
                //   }),
                // );
                resolve(getAppState().aiContent.testimonials);
              } catch (error) {
                console.error("Error parsing final JSON:", error);
                reject(error);
              }
            }
            reader.releaseLock();
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          accumulatedText += chunk;
          completeJson += chunk;

          const titleMatch = accumulatedText.match(/"title"\s*:\s*"([^"]*)"/);
          const descriptionMatch = accumulatedText.match(
            /"description"\s*:\s*"([^"]*)"/,
          );
          console.log("titleMatch", titleMatch, descriptionMatch);
          if (titleMatch || descriptionMatch) {
            store.dispatch(
              updateAppState({
                ...getAppState(),
                aiContent: {
                  ...getAppState().aiContent,
                  services: {
                    ...getAppState().aiContent.services,
                    title: titleMatch
                      ? titleMatch[1]
                      : getAppState().aiContent.services.title,
                    description: descriptionMatch
                      ? descriptionMatch[1]
                      : getAppState().aiContent.services.description,
                  },
                },
              }),
            );
          }

          let startIndex = accumulatedText.indexOf('{"id":');
          console.log("startIndex", startIndex);

          while (startIndex !== -1) {
            const endIndex = accumulatedText.indexOf("}", startIndex);
            if (endIndex === -1) {
              break;
            }

            const jsonString = accumulatedText.substring(
              startIndex,
              endIndex + 1,
            );

            try {
              const jsonObject = JSON.parse(jsonString);
              const image = await getRandomImageFromUnsplash(jsonObject.gender +"portrait")
              
              tempTestimonials.push({
                ...jsonObject,
                avatar:image
              });
             
              console.log(
                "tempTestimonials",
                JSON.stringify(tempTestimonials, null, 2),
              );
              store.dispatch(
                updateAppState({
                  ...getAppState(),
                  aiContent: {
                    ...getAppState().aiContent,
                    testimonials: {
                      ...getAppState().aiContent.testimonials,
                      show: true,
                      list: [...tempTestimonials],
                    },
                  },
                  generate: {
                    ...getAppState().generate,
                    progress: getAppState().generate.progress + 5,
                  },
                }),
              );
              console.log(
                "Complete JSON Object:",
                JSON.stringify(jsonObject, null, 2),
              );
              accumulatedText = accumulatedText.substring(endIndex + 1);
            } catch (error) {
              console.log("error parsing JSON", error);
              break;
            }

            startIndex = accumulatedText.indexOf('{"id":');
          }

          reader.read().then(processText).catch(console.error);
        };

        reader.read().then(processText).catch(console.error);
      } catch (error) {
        console.error("Error fetching content:", error);
        reject(error);
      }
    });
  }

  public async getBlogs({
    individual,
    type,
    fieldName,
    data,
  }: {
    individual: boolean;
    type: string;
    fieldName: string;
    data: { businessType: string; businessName: string; location: string };
  }): Promise<TBlogs> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          this.url(individual ? fieldName : "blog"),
          {
            method: "POST",
            body: JSON.stringify({
              data: data,
              type: type ?? "",
              services: getAppState()?.aiContent?.blog?.posts ?? "",
            }),
          },
        );
        const tempBlogPosts: Array<{
          id: number,
          title: string,
          href: string,
          description:string,
          imageUrl:string,
          date: string,
          datetime: string,
          category: { title:  string, href: string },
          author: {
            name: string
            role: string
            href: string
            imageUrl:string,
          },
        }> = [];
        const reader = response.body?.getReader();
        if (!reader) {
          reject(new Error("ReadableStream not available"));
          return;
        }
        const decoder = new TextDecoder();
        let accumulatedText = "";
        let completeJson = "";

        const processText = async ({
          done,
          value,
        }: ReadableStreamReadResult<Uint8Array>) => {
          if (done) {
            if (completeJson) {
              try {
                console.log("completeJson", completeJson);
                const parsedData = JSON.parse(completeJson);
                console.log("parsedDataServices", parsedData);
                store.dispatch(
                  updateAppState({
                    ...getAppState(),
                    aiContent: {
                      ...getAppState().aiContent,
                      blog: parsedData.blog,
                    },
                  }),
                );
                resolve(parsedData.services);
              } catch (error) {
                console.error("Error parsing final JSON:", error);
                reject(error);
              }
            }
            reader.releaseLock();
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          accumulatedText += chunk;
          completeJson += chunk;

          const titleMatch = accumulatedText.match(/"title"\s*:\s*"([^"]*)"/);
          const descriptionMatch = accumulatedText.match(
            /"description"\s*:\s*"([^"]*)"/,
          );
          console.log("titleMatch", titleMatch, descriptionMatch);
          if (titleMatch || descriptionMatch) {
            store.dispatch(
              updateAppState({
                ...getAppState(),
                aiContent: {
                  ...getAppState().aiContent,
                  blog: {
                    ...getAppState().aiContent.blog,
                    title: titleMatch
                      ? titleMatch[1]
                      : getAppState().aiContent.services.title,
                    description: descriptionMatch
                      ? descriptionMatch[1]
                      : getAppState().aiContent.services.description,
                  },
                },
              }),
            );
          }

          let startIndex = accumulatedText.indexOf('{"id":');
          console.log("startIndex", startIndex);

          while (startIndex !== -1) {
            const endIndex = accumulatedText.indexOf("}", startIndex);
            if (endIndex === -1) {
              break;
            }

            const jsonString = accumulatedText.substring(
              startIndex,
              endIndex + 1,
            );

            try {
              const jsonObject = JSON.parse(jsonString);

              tempBlogPosts.push({
                ...jsonObject,
              });
              console.log(
                "tempFeatures",
                JSON.stringify(tempBlogPosts, null, 2),
              );
              store.dispatch(
                updateAppState({
                  ...getAppState(),
                  aiContent: {
                    ...getAppState().aiContent,
                    blog: {
                      ...getAppState().aiContent.blog,
                      show: true,
                      posts: [...tempBlogPosts],
                    },
                  },
                  // generate: {
                  //   ...getAppState().generate,
                  //   progress: getAppState().generate.progress + 5,
                  // },
                }),
              );
              console.log(
                "Complete JSON Object:",
                JSON.stringify(jsonObject, null, 2),
              );
              accumulatedText = accumulatedText.substring(endIndex + 1);
            } catch (error) {
              console.log("error parsing JSON", error);
              break;
            }

            startIndex = accumulatedText.indexOf('{"id":');
          }

          reader.read().then(processText).catch(console.error);
        };

        reader.read().then(processText).catch(console.error);
      } catch (error) {
        console.error("Error fetching content:", error);
        reject(error);
      }
    });
  }


  public async getHero({
    individual,
    type,
    fieldName,
    data,
  }: {
    individual: boolean;
    type: string;
    fieldName: string;
    data: { businessType: string; businessName: string; location: string };
  }): Promise<THero> {
    return new Promise(async (resolve, reject) => {
      console.log("getHero");
      try {
        const response = await fetch(
          this.url(individual ? fieldName : "hero"),
          {
            method: "POST",
            body: JSON.stringify({
              data: data,
              type: type ?? "",
              services: getAppState().aiContent.services ?? "",
            }),
          },
        );

        const reader = response.body?.getReader();
        if (!reader) {
          reject(new Error("ReadableStream not available"));
          return;
        }
        const decoder = new TextDecoder();
        let completeJson = "";

        const processText = async ({
          done,
          value,
        }: ReadableStreamReadResult<Uint8Array>) => {
          if (done) {
            if (completeJson) {
              try {
                console.log("completeJson", completeJson);
                const parsedData = JSON.parse(completeJson);
                store.dispatch(
                  updateAppState({
                    ...getAppState(),
                    aiContent: {
                      ...getAppState().aiContent,
                      hero: {
                        ...parsedData.hero,
                        ...getAppState().aiContent.hero,
                      },
                    },
                    generate: {
                      ...getAppState().generate,
                      progress: getAppState().generate.progress + 5,
                    },
                  }),
                );
                resolve(parsedData.hero);
              } catch (error) {
                console.error("Error parsing final JSON:", error);
                reject(error);
              }
            }
            reader.releaseLock();
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          completeJson += chunk;
          reader.read().then(processText).catch(console.error);
        };

        reader.read().then(processText).catch(console.error);
      } catch (error) {
        console.error("Error fetching content:", error);
        reject(error);
      }
    });
  }

  public async getServiceTAndD({
    individual,
    type,
    fieldName,
    data,
  }: {
    individual: boolean;
    type: string;
    fieldName: string;
    data: { businessType: string; businessName: string; location: string };
  }): Promise<{title:string,description:string}> {
    return new Promise(async (resolve, reject) => {
      console.log("getHero");
      try {
        const response = await fetch(
          this.url(individual ? fieldName : "title"),
          {
            method: "POST",
            body: JSON.stringify({
              data: data,
              type: type ?? "",
              services: getAppState().aiContent.services ?? "",
            }),
          },
        );

        const reader = response.body?.getReader();
        if (!reader) {
          reject(new Error("ReadableStream not available"));
          return;
        }
        const decoder = new TextDecoder();
        let completeJson = "";

        const processText = async ({
          done,
          value,
        }: ReadableStreamReadResult<Uint8Array>) => {
          if (done) {
            if (completeJson) {
              try {
                console.log("completeJson", completeJson);
                const parsedData = JSON.parse(completeJson);

                resolve(parsedData);
              } catch (error) {
                console.error("Error parsing final JSON:", error);
                reject(error);
              }
            }
            reader.releaseLock();
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          completeJson += chunk;
          reader.read().then(processText).catch(console.error);
        };

        reader.read().then(processText).catch(console.error);
      } catch (error) {
        console.error("Error fetching content:", error);
        reject(error);
      }
    });
  }

  public async getPartnersTAndD({
    individual,
    type,
    fieldName,
    data,
  }: {
    individual: boolean;
    type: string;
    fieldName: string;
    data: { businessType: string; businessName: string; location: string };
  }): Promise<{title:string,description:string}> {
    return new Promise(async (resolve, reject) => {
      console.log("getHero");
      try {
        const response = await fetch(
          this.url(individual ? fieldName : "partnersTitle"),
          {
            method: "POST",
            body: JSON.stringify({
              data: data,
              type: type ?? "",
              services: getAppState().aiContent.services ?? "",
            }),
          },
        );

        const reader = response.body?.getReader();
        if (!reader) {
          reject(new Error("ReadableStream not available"));
          return;
        }
        const decoder = new TextDecoder();
        let completeJson = "";

        const processText = async ({
          done,
          value,
        }: ReadableStreamReadResult<Uint8Array>) => {
          if (done) {
            if (completeJson) {
              try {
                console.log("completeJson", completeJson);
                const parsedData = JSON.parse(completeJson);

                resolve(parsedData);
              } catch (error) {
                console.error("Error parsing final JSON:", error);
                reject(error);
              }
            }
            reader.releaseLock();
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          completeJson += chunk;
          reader.read().then(processText).catch(console.error);
        };

        reader.read().then(processText).catch(console.error);
      } catch (error) {
        console.error("Error fetching content:", error);
        reject(error);
      }
    });
  }

  public async getBanner({
    individual,
    type,
    fieldName,
    data,
  }: {
    individual: boolean;
    type: string;
    fieldName: string;
    data: { businessType: string; businessName: string; location: string };
  }): Promise<TBanner> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          this.url(individual ? fieldName : "banner"),
          {
            method: "POST",
            body: JSON.stringify({
              data: data,
              type: type ?? "",
              services: getAppState().aiContent.services ?? "",
            }),
          },
        );

        const reader = response.body?.getReader();
        if (!reader) {
          reject(new Error("ReadableStream not available"));
          return;
        }
        const decoder = new TextDecoder();
        let completeJson = "";

        const processText = async ({
          done,
          value,
        }: ReadableStreamReadResult<Uint8Array>) => {
          if (done) {
            if (completeJson) {
              try {
                console.log("completeJson", completeJson);
                const parsedData = JSON.parse(completeJson);
                // if(individual){
                //   resolve(JSON.parse(completeJson).features);
                // }

                store.dispatch(
                  updateAppState({
                    ...getAppState(),
                    aiContent: {
                      ...getAppState().aiContent,
                      banner: {
                        ...parsedData.banner,
                        ...getAppState().aiContent.banner,
                      },
                    },
                    generate: {
                      ...getAppState().generate,
                      progress: getAppState().generate.progress + 5,
                    },
                  }),
                );

                resolve(parsedData.banner);
              } catch (error) {
                console.error("Error parsing final JSON:", error);
                reject(error);
              }
            }
            reader.releaseLock();
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          completeJson += chunk;

          reader.read().then(processText).catch(console.error);
        };

        reader.read().then(processText).catch(console.error);
      } catch (error) {
        console.error("Error fetching content:", error);
        reject(error);
      }
    });
  }

  public async getContact({
    individual,
    type,
    fieldName,
    data,
  }: {
    individual: boolean;
    type: string;
    fieldName: string;
    data: { businessType: string; businessName: string; location: string };
  }): Promise<TContact> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          this.url(individual ? fieldName : "contact"),
          {
            method: "POST",
            body: JSON.stringify({
              data: data,
              type: type ?? "",
              services: getAppState().aiContent.services ?? "",
            }),
          },
        );

        const reader = response.body?.getReader();
        if (!reader) {
          reject(new Error("ReadableStream not available"));
          return;
        }
        const decoder = new TextDecoder();
        let completeJson = "";

        const processText = async ({
          done,
          value,
        }: ReadableStreamReadResult<Uint8Array>) => {
          if (done) {
            if (completeJson) {
              try {
                console.log("completeJson", completeJson);
                const parsedData = JSON.parse(completeJson);

                store.dispatch(
                  updateAppState({
                    ...getAppState(),
                    aiContent: {
                      ...getAppState().aiContent,
                      contact: {
                        ...parsedData.contact,
                      },
                    },

                  }),
                );

                resolve(parsedData.contact);
              } catch (error) {
                console.error("Error parsing final JSON:", error);
                reject(error);
              }
            }
            reader.releaseLock();
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          completeJson += chunk;

          reader.read().then(processText).catch(console.error);
        };

        reader.read().then(processText).catch(console.error);
      } catch (error) {
        console.error("Error fetching content:", error);
        reject(error);
      }
    });
  }


  public async getPartners({
    individual,
    type,
    fieldName,
    data,
  }: {
    individual: boolean;
    type: string;
    fieldName: string;
    data: { businessType: string; businessName: string; location: string };
  }): Promise<TBanner> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          this.url(individual ? fieldName : "partners"),
          {
            method: "POST",
            body: JSON.stringify({
              data: data,
              type: type ?? "",
              services: getAppState().aiContent.services ?? "",
            }),
          },
        );

        const reader = response.body?.getReader();
        if (!reader) {
          reject(new Error("ReadableStream not available"));
          return;
        }
        const decoder = new TextDecoder();
        let completeJson = "";

        const processText = async ({
          done,
          value,
        }: ReadableStreamReadResult<Uint8Array>) => {
          if (done) {
            if (completeJson) {
              try {
                console.log("completeJson", completeJson);
                const parsedData = JSON.parse(completeJson);
                // if(individual){
                //   resolve(JSON.parse(completeJson).features);
                // }

                store.dispatch(
                  updateAppState({
                    ...getAppState(),
                    aiContent: {
                      ...getAppState().aiContent,
                      partners: {
                        ...parsedData.partners,
                        ...getAppState().aiContent.partners,
                        list:[
                          {
                            id:"0",
                            name:"",
                            logo:"/images/partners/logo-ipsum-1.png",
                            redirect:""
                          }
                          ,
                          {
                            id:"1",
                            name:"",
                            logo:"/images/partners/logo-ipsum-2.png",
                            redirect:""
                          },
                          {
                            id:"2",
                            name:"",
                            logo:"/images/partners/logo-ipsum-3.png",
                            redirect:""
                          },
                          {
                            id:"3",
                            name:"",
                            logo:"/images/partners/logo-ipsum-4.png",
                            redirect:""
                          },
                          {
                            id:"4",
                            name:"",
                            logo:"/images/partners/logo-ipsum-5.png",
                            redirect:""
                          }
                        ]
                      },
                    },
                    generate:{
                      ...getAppState().generate,
                        progress: getAppState().generate.progress + 10,
                    }
                  }),
                );

                resolve(parsedData.partners);
              } catch (error) {
                console.error("Error parsing final JSON:", error);
                reject(error);
              }
            }
            reader.releaseLock();
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          completeJson += chunk;

          reader.read().then(processText).catch(console.error);
        };

        reader.read().then(processText).catch(console.error);
      } catch (error) {
        console.error("Error fetching content:", error);
        reject(error);
      }
    });
  }
}

const CustomContent = new CustomContentApiService();
export default CustomContent;
