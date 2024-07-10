
import { store } from "../store";
import { updateAppState } from "../store/slices/site-slice";
import { getAppState, getRandomImageFromUnsplash } from "../utils/function";
import { TBanner, TBlogs, TContact, TFeature, THero, TServices } from "@/types";
import { LifebuoyIcon, NewspaperIcon, PhoneIcon } from "@heroicons/react/24/outline";

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
                        address:{
                          label:"Address",
                          value:"545 Mavis Island Chicago, IL 99191"
                        },
                        telephone:{
                          label:"Telephone",
                          value:"+1 (555) 234-5678"
                        },
                        email:{
                          label:"Email",
                          value:"hello@example.com"
                        }
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

  public async getData({
    individual,
    type,
    fieldName,
    data,
  }: {
    individual: boolean;
    type: string;
    fieldName: string;
    data: { businessType: string; businessName: string; location: string };
  }): Promise<any> {
    switch (fieldName) {
      case "cta":
        store.dispatch(updateAppState({
          ...getAppState(),
          aiContent:{
            ...getAppState().aiContent,
            cta: {
              title:"Boost your productivity. Start using our app today.",
              description:" Incididunt sint fugiat pariatur cupidatat consectetur sit cillumanim id veniam aliqua proident excepteur commodo do ea.",
              button:{
                label:"Get started",
                link:"#",
              },
              link:{
                label:"Learn More",
                link:"#",
              }
            },
          }
        }))
        break;
      case "faq":
        store.dispatch(updateAppState({
          ...getAppState(),
          aiContent:{
            ...getAppState().aiContent,
            faq: {
              title:"Frequently asked questions",
              list:[
                {
                  id:"faq1",
                  question: "What's the best thing about Switzerland?",
                  answer:
                    "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
                },
                {
                  id:"faq2",
                  question: "What's the best thing about Switzerland?",
                  answer:
                    "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
                },
                {
                  id:"faq3",
                  question: "What's the best thing about Switzerland?",
                  answer:
                    "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
                }
              ]
            },
          }
        }))
        break;
      case "footer":
        store.dispatch(updateAppState({
          ...getAppState(),
          aiContent:{
            ...getAppState().aiContent,
            footer: {
              title:"Footer",
              list:{
                solutions:{
                  title:"Solutions",
                  list: [
                  { name: "Marketing", href: "#" },
                  { name: "Analytics", href: "#" },
                  { name: "Commerce", href: "#" },
                  { name: "Insights", href: "#" },
                ]},
                support: {title:"Support",list:[
                  { name: "Pricing", href: "#" },
                  { name: "Documentation", href: "#" },
                  { name: "Guides", href: "#" },
                  { name: "API Status", href: "#" },
                ]},
                company: {
                  title:"Company",
                  list:[
                  { name: "About", href: "#" },
                  { name: "Blog", href: "#" },
                  { name: "Jobs", href: "#" },
                  { name: "Press", href: "#" },
                  { name: "Partners", href: "#" },
                ]},
                legal: {
                  title:"Legal",
                  list:[
                  { name: "Claim", href: "#" },
                  { name: "Privacy", href: "#" },
                  { name: "Terms", href: "#" },
                ]},
                social: [
                  {
                    name: "Facebook",
                    href: "#",
                    // icon: (props: any) => (<svg fill="currentColor" viewBox="0 0 24 24" {...props}> <path
                    //       fillRule="evenodd"
                    //       d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    //       clipRule="evenodd"
                    //     />
                    //   </svg>
                    // ),
                  },
                  {
                    name: "Instagram",
                    href: "#",
                    // icon: (props: any) => (
                    //   <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    //     <path
                    //       fillRule="evenodd"
                    //       d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    //       clipRule="evenodd"
                    //     />
                    //   </svg>
                    // ),
                  },
                  {
                    name: "X",
                    href: "#",
                    // icon: (props: any) => (
                    //   <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    //     <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                    //   </svg>
                    // ),
                  },
                  {
                    name: "GitHub",
                    href: "#",
                    // icon: (props: any) => (
                    //   <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    //     <path
                    //       fillRule="evenodd"
                    //       d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    //       clipRule="evenodd"
                    //     />
                    //   </svg>
                    // ),
                  },
                  {
                    name: "YouTube",
                    href: "#",
                    // icon: (props: any) => (
                    //   <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    //     <path
                    //       fillRule="evenodd"
                    //       d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    //       clipRule="evenodd"
                    //     />
                    //   </svg>
                    // ),
                  },
                ],
            }
            },
          }
        }))
        break;
      case "header":
          store.dispatch(updateAppState({
            ...getAppState(),
            aiContent:{
              ...getAppState().aiContent,
              header: {
                title:"Support center",
                description:"Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.",
                list:[
                  {
                    id:"Card1",
                    name: "Sales",
                    description:
                      "Consectetur vel non. Rerum ut consequatur nobis unde. Enim est quo corrupti consequatur.",
                    icon: PhoneIcon,
                  },
                  {
                    id:"Card2",
                    name: "Technical Support",
                    description:
                      "Quod possimus sit modi rerum exercitationem quaerat atque tenetur ullam.",
                    icon: LifebuoyIcon,
                  },
                  {
                    id:"Card3",
                    name: "Media Inquiries",
                    description:
                      "Ratione et porro eligendi est sed ratione rerum itaque. Placeat accusantium impedit eum odit.",
                    icon: NewspaperIcon,
                  },
                ]
              },
            }
          }))
          break;

      case "heroSection":
            store.dispatch(updateAppState({
              ...getAppState(),
              aiContent:{
                ...getAppState().aiContent,
                heroSection: {
                  title:"Deploy to the cloud with confidence",
                  description:"Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.",
                  button:{
                    label:"Get started",
                    link:"#",
                  },
                  link:{
                    label:"Learn More",
                    link:"#",
                  }
                },
              }
            }))
            break;

      case "logoClouds":
            store.dispatch(updateAppState({
              ...getAppState(),
              aiContent:{
                ...getAppState().aiContent,
                logoClouds: {
                  title:"Trusted by the world’s most innovative teams",
                  list:[
                    {
                      image: "https://tailwindui.com/img/logos/transistor-logo-gray-900.svg",
                      alt: "Logo 1",
                      link: "#",
                    },
                    {
                      image: "https://tailwindui.com/img/logos/reform-logo-gray-900.svg",
                      alt: "Logo 1",
                      link: "#",
                    },
                    {
                      image: "https://tailwindui.com/img/logos/tuple-logo-gray-900.svg",
                      alt: "Logo 1",
                      link: "#",
                    },
                    {
                      image: "https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg",
                      alt: "Logo 1",
                      link: "#",
                    },
                    {
                      image: "https://tailwindui.com/img/logos/statamic-logo-gray-900.svg",
                      alt: "Logo 1",
                      link: "#",
                    }
                  ]
                },
              }
            }))
            break;

      case "newsLetter":
        store.dispatch(updateAppState({
          ...getAppState(),
          aiContent:{
            ...getAppState().aiContent,
            newsLetter: {
              title:"Want product news and updates?",
              description:"Sign up for our newsletter."
            },
          }
        }))
      break;

      case "pricing":
        store.dispatch(updateAppState({
          ...getAppState(),
          aiContent:{
            ...getAppState().aiContent,
            pricing: {
              title:" Pricing plans for teams of all sizes",
              description:"Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.",
              list:[
                {
                  name: "Freelancer",
                  id: "tier-freelancer",
                  href: "#",
                  priceMonthly: "$24",
                  description: "The essentials to provide your best work for clients.",
                  features: [
                    "5 products",
                    "Up to 1,000 subscribers",
                    "Basic analytics",
                    "48-hour support response time",
                  ],
                  mostPopular: false,
                },
                {
                  name: "Startup",
                  id: "tier-startup",
                  href: "#",
                  priceMonthly: "$32",
                  description: "A plan that scales with your rapidly growing business.",
                  features: [
                    "25 products",
                    "Up to 10,000 subscribers",
                    "Advanced analytics",
                    "24-hour support response time",
                    "Marketing automations",
                  ],
                  mostPopular: true,
                },
                {
                  name: "Enterprise",
                  id: "tier-enterprise",
                  href: "#",
                  priceMonthly: "$48",
                  description: "Dedicated support and infrastructure for your company.",
                  features: [
                    "Unlimited products",
                    "Unlimited subscribers",
                    "Advanced analytics",
                    "1-hour, dedicated support response time",
                    "Marketing automations",
                  ],
                  mostPopular: false,
                },
              ]
            },
          }
        }))
      break;

      case "stats":
        store.dispatch(updateAppState({
          ...getAppState(),
          aiContent:{
            ...getAppState().aiContent,
            stats: {
              title:"Trusted by creators worldwide",
              description:"Lorem ipsum dolor sit amet consect adipisicing possimus.",
              list: [
                { id: 1, name: 'Creators on the platform', value: '8,000+' },
                { id: 2, name: 'Flat platform fee', value: '3%' },
                { id: 3, name: 'Uptime guarantee', value: '99.9%' },
                { id: 4, name: 'Paid out to creators', value: '$70M' },
              ]
            },
          }
        }))
      break;

      case "team":
        store.dispatch(updateAppState({
          ...getAppState(),
          aiContent:{
            ...getAppState().aiContent,
            team: {
              title:"Our team",
              description:" We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.",
              list:[
                {
                  id:"1",
                  name: 'Lindsay Walton',
                  role: 'Front-end Developer',
                  imageUrl:
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
                  xUrl: '#',
                  linkedinUrl: '#',
                },
                {
                  id:"2",
                  name: 'Lindsay Walton',
                  role: 'Front-end Developer',
                  imageUrl:
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
                  xUrl: '#',
                  linkedinUrl: '#',
                },
                {
                  id:"3",
                  name: 'Lindsay Walton',
                  role: 'Front-end Developer',
                  imageUrl:
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
                  xUrl: '#',
                  linkedinUrl: '#',
                },
              ]
            },
          }
        }))
      break;

      case "testimonialsSection":
          store.dispatch(updateAppState({
            ...getAppState(),
            aiContent:{
              ...getAppState().aiContent,
              testimonialsSection: {
                image:"https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg",
                message:"“Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente  alias molestiae. Numquam corruption laborum sed rerum et corporis.”",
                avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                name:"Judith Black",
                role:"CEO of Workcation",
                
              },
            }
          }))
        break;
    
      default:
        break;
    }
  }
}

const CustomContent = new CustomContentApiService();
export default CustomContent;
