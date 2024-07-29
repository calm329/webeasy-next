import { TFeature } from "@/types";
import { store } from "../store";
import { updateAppState } from "../store/slices/site-slice";
import { getAppState } from "../utils/function";

class AmazonContentApiService {
  private url = (api: string) => `/api/content/amazon/${api}`;

  public async getFeatures({
    individual,
    type,
    fieldName,
  }: {
    individual: boolean;
    type: string;
    fieldName: string;
  }): Promise<TFeature[] | TFeature> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          this.url(individual ? fieldName : "features"),
          {
            method: "POST",
            body: JSON.stringify({
              productTitle: getAppState().aiContent.title,
              type: type ?? "",
              features: getAppState().aiContent.features ?? "",
            }),
          },
        );

        const reader = response.body?.getReader();
        if (!reader) {
          reject(new Error("ReadableStream not available"));
          return;
        }
        const decoder = new TextDecoder();
        let accumulatedText = "";
        let completeJson = "";
        const tempFeatures: Array<TFeature> = [];

        const processText = async ({
          done,
          value,
        }: ReadableStreamReadResult<Uint8Array>) => {
          if (done) {
            if (completeJson) {
              try {
                console.log("completeJson", completeJson);
                if (individual) {
                  resolve(JSON.parse(completeJson).features);
                }
                resolve(tempFeatures);
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

          let startIndex = accumulatedText.indexOf('{"image":');
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

              tempFeatures.push({
                ...jsonObject,
                image: getAppState().aiContent.images?.primary.Large.URL,
              });
              console.log(
                "tempFeatures",
                JSON.stringify(tempFeatures, null, 2),
              );
              store.dispatch(
                updateAppState({
                  ...getAppState(),
                  aiContent: {
                    ...getAppState().aiContent,
                    features: [...tempFeatures],
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

            startIndex = accumulatedText.indexOf('{"image":');
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

  public async getDescription(): Promise<string | null> {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log("title", amazonData);
        const response = await fetch(this.url("description"), {
          method: "POST",
          body: JSON.stringify({
            productTitle: getAppState().aiContent.title,
          }),
        });

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
                const parseJson = JSON.parse(completeJson);
                store.dispatch(
                  updateAppState({
                    ...getAppState(),
                    aiContent: {
                      ...getAppState().aiContent,
                      description: parseJson.description,
                    },
                    generate: {
                      ...getAppState().generate,
                      progress: getAppState().generate.progress + 10,
                    },
                  }),
                );
                resolve(parseJson.description);
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

const AmazonContent = new AmazonContentApiService();
export default AmazonContent;
