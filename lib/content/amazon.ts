import { TFeature } from "@/types";
import { _get, _post } from "../api/base-api";
import { store } from "../store";
import { updateAppState } from "../store/slices/site-slice";
import { appAxios } from "../utils/axios.config";
import { findClosingBracketIndex, getAppState } from "../utils/function";

class AmazonContentApiService {
  private url = (api: string) => `/api/content/amazon/${api}`;
  public async getFeatures(amazonData: any) {
    try {
      console.log("title", amazonData);
      const response = await fetch(this.url("features"), {
        method: "POST",
        body: JSON.stringify({
          productTitle: amazonData.ItemInfo.Title.DisplayValue,
        }),
      });

      // let content = "";

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("ReadableStream not available");
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
              return completeJson;
            } catch (error) {
              console.error("Error parsing final JSON:", error);
            }
          }
          reader.releaseLock();
          // return;
        }

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;
        completeJson += chunk;
        // Extract and process complete JSON objects from the accumulated text
        let startIndex = accumulatedText.indexOf('{"image":');
        console.log("startIndex", startIndex);

        while (startIndex !== -1) {
          const endIndex = accumulatedText.indexOf("}", startIndex);
          if (endIndex === -1) {
            break; // No complete JSON object found, continue accumulating
          }

          const jsonString = accumulatedText.substring(
            startIndex,
            endIndex + 1,
          );

          try {
            const jsonObject = JSON.parse(jsonString);
            tempFeatures.push({
              ...jsonObject,
              image: amazonData.Images.Primary.Large.URL,
            });
            console.log("tempFeatures", tempFeatures);
            store.dispatch(
              updateAppState({
                ...getAppState(),
                aiContent: {
                  ...getAppState().aiContent,
                  features: [...tempFeatures],
                },
              }),
            );
            console.log("Complete JSON Object:", jsonObject);
            accumulatedText = accumulatedText.substring(endIndex + 1); // Remove processed JSON
          } catch (error) {
            // Ignore parsing errors for incomplete JSON strings
            console.log("error parsing JSON", error);
            break;
          }

          startIndex = accumulatedText.indexOf('{"image":');
        }

        reader.read().then(processText).catch(console.error);
      };

      reader.read().then(processText).catch(console.error);
      console.log("heelobrom");
      // return JSON.parse(accumulatedText);
      // Return the final parsed JSON content
    } catch (error) {
      console.error("Error fetching content:", error);
      return null;
    }
  }

  public async getDescription(amazonData: any) {
    try {
      console.log("title", amazonData);
      const response = await fetch(this.url("description"), {
        method: "POST",
        body: JSON.stringify({
          productTitle: amazonData.ItemInfo.Title.DisplayValue,
        }),
      });

      // let content = "";

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("ReadableStream not available");
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
              const parseJson = JSON.parse(completeJson);
              store.dispatch(
                updateAppState({
                  ...getAppState(),
                  aiContent: {
                    ...getAppState().aiContent,
                    description: parseJson.description,
                  },
                }),
              );
              return completeJson;
            } catch (error) {
              console.error("Error parsing final JSON:", error);
            }
          }
          reader.releaseLock();
          // return;
        }

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;
        completeJson += chunk;

        reader.read().then(processText).catch(console.error);
      };

      reader.read().then(processText).catch(console.error);
      console.log("heelobrom");
      // return JSON.parse(accumulatedText);
      // Return the final parsed JSON content
    } catch (error) {
      console.error("Error fetching content:", error);
      return null;
    }
  }
}

const AmazonContent = new AmazonContentApiService();
export default AmazonContent;
