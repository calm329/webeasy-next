import { store } from "../store";
import { updateAppState } from "../store/slices/site-slice";
import { getAppState } from "../utils/function";
import { TBanner, TFeature, THero, TServices } from "@/types";

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
                    generate: {
                      ...getAppState().generate,
                      progress: 100,
                    },
                  }))
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
                      show: true,
                      list: [...tempServices],
                    },
                  },
                  generate: {
                    ...getAppState().generate,
                    progress: getAppState().generate.progress + 10,
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
                      progress: getAppState().generate.progress + 10,
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
                      progress: getAppState().generate.progress + 10,
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
}

const CustomContent = new CustomContentApiService();
export default CustomContent;
