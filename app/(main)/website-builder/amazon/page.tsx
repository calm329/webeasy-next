"use client";
import SiteHeader from "@/components/header";
import PageStatus from "@/components/ui/pagestatus";
import Link from "next/link";
import LearnMoreButton from "@/components/ui/button/learn-more-button";
import { useState } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { updateAmazonSite } from "@/lib/store/slices/amazon-slice";
import { useRouter } from "next/navigation";
import { extractASIN } from "@/lib/utils/function";
export default function Example() {
  const [productUrl, setProductUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter()
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
                // href={`/amazon/producturl`}
                type="button"
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
                      .then((data) => {
                        console.log(data);
                        dispatch(updateAmazonSite(data.ItemsResult.Items[0]));
                        router.push("/amazon")
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
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
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
