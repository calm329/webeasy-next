"use client";
import SiteHeader from "@/components/header";
import PageStatus from "@/components/ui/pagestatus";
import Link from "next/link";
import LearnMoreButton from "@/components/ui/button/learn-more-button";
import { useState } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { updateAmazonSite } from "@/lib/store/slices/amazon-slice";
import { useRouter } from "next/navigation";
import { extractASIN, generateUniqueHash } from "@/lib/utils/function";
import { createNewSite } from "@/lib/actions";
import { ImSpinner2 } from "react-icons/im";

export default function Example() {
  const [productUrl, setProductUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const createNewAmazonSite = async (amazonData: any) => {
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
      console.log(
        `Content fetch took ${endContentFetch - startContentFetch} ms`,
      );
      const data = JSON.parse(content);
      const finalData = {
        ...data,
        images: {
          primary: amazonData?.Images?.Primary,
          variant: amazonData?.Images?.Variants,
        },
        price: amazonData?.Offers?.Listings[0]?.Price?.DisplayAmount ?? "",
        title: amazonData?.ItemInfo?.Title?.DisplayValue,
      };
      // setAiData(data);
      const responseSite = await createNewSite({
        subdomain: await generateUniqueHash("subdomain"),
        aiResult: JSON.stringify(finalData),
        type: "Amazon",
      });

      dispatch(updateAmazonSite(finalData));
      router.push("/amazon?site_id=" + responseSite.id);
    } catch (error) {
      console.log("errorAmazonGeneration", error);
    }
  };
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 ">
        <div className="mx-auto  max-w-3xl lg:mx-0 lg:flex-shrink-0 ">
          {/* <Image src={tailwindIcon} alt="Your Company" className="h-11 ml-auto" /> */}
          {/* <PageStatus /> */}
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Instantly create your website from your Amazon Product
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Enter your amazon&apos;s product url below and we will create a
            website for you.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <div className="flex gap-2">
              <input
                type="text"
                className="border-1 rounded-md border-gray-300"
                placeholder={"Product Url"}
                onChange={(e) => setProductUrl(e.target.value)}
              />
              <button
                type="button"
                className={`mx-auto  flex gap-2 rounded-md px-3 py-2 text-sm  font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 items-center focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "bg-indigo-500" : "bg-indigo-600 hover:bg-indigo-500 "}`}
                disabled={loading}
                onClick={() => {
                  if (productUrl) {
                    setLoading(true);
                    const url = "/api/amazon";

                    const requestData = {
                      itemIds: [extractASIN(productUrl)],
                    };

                    fetch(url, {
                      method: "POST", // Assuming this is a POST request
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(requestData),
                    })
                      .then((response) => {
                        if (!response.ok) {
                          throw new Error(
                            "Network response was not ok " +
                              response.statusText,
                          );
                        }
                        return response.json();
                      })
                      .then(async(data) => {
                        console.log(data);
                        await createNewAmazonSite(data.ItemsResult.Items[0]);
                      })
                      .catch((error) => {
                        console.error(
                          "There was a problem with the fetch operation:",
                          error,
                        );
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }
                }}
              >
                {loading && (
                  <ImSpinner2 className="animate-spin text-lg text-white" />
                )}
                Create
              </button>
            </div>

            <LearnMoreButton />
          </div>
        </div>
      </div>
    </div>
  );
}
