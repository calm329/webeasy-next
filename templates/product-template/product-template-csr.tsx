"use client";
import ImageGallery from "@/components/image-gallery";
import ProductBreadCrumbs from "@/components/product-breadcrumbs";
import ProductInfo from "@/components/product-info";
import SuggestedProducts from "@/components/suggested-products";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ProductCategory from "../../components/product-category/index";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  amazonData as AD,
  updateAmazonSite,
} from "@/lib/store/slices/amazon-slice";
import { useSearchParams } from "next/navigation";
import { getSiteDataById } from "@/lib/fetchers";
import Loader from "@/components/ui/loader";
import {
  appState as AS,
  fetchSiteById,
  loading as LD,
  updateAppState,
} from "@/lib/store/slices/site-slice";
import { TSection } from "@/types";

type TProps = {
  setSection?: Dispatch<SetStateAction<TSection>>;
  setIsSideBarOpen?: Dispatch<SetStateAction<boolean>>;
  showForm?: {
    form: string;
    edit: string;
    show: boolean;
  };
  setShowForm?: React.Dispatch<
    React.SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
};

const ProductTemplate = (props:TProps) => {
  const {setSection,setIsSideBarOpen,setShowForm,showForm} = props;
  const appState = useAppSelector(AS);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(LD);
  useEffect(() => {
    if (searchParams.get("site_id")) {
      // setLoading(true);
      dispatch(fetchSiteById({ id: searchParams.get("site_id") ?? "" }));
    }
  }, [searchParams]);
  return (
    <div
      className={` mx-auto overflow-auto ${appState.view === "Mobile" && "no-scrollbar h-[800px] w-[480px] rounded-xl border-8 border-black"} ${appState.view === "Tablet" && "no-scrollbar h-[1024px] w-[768px] rounded-xl  border-8 border-black"} ${appState.view === "Desktop" && "h-full w-full"}`}
    >
      {loading && <Loader text="Loading" />}
      <ProductCategory />
      <main className="">
        {/* <ProductBreadCrumbs /> */}
        {appState && (
          <>
            <div
              className={`${appState.editable && "rounded border-2 border-transparent hover:border-indigo-500"} ${appState.view === "Mobile" ? "flex flex-col" : "sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8"} mx-auto  max-w-2xl `}
              onClick={()=>{
                if (setIsSideBarOpen && setSection) {
                  console.log("hideSideBar")
                  setIsSideBarOpen(true);
                  setSection("Gallery");
                  dispatch(
                    updateAppState({
                     ...appState,
                      openedSlide: "Customize",
                    }),
                  );
                }
              }}
            >
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <Image
                  src={appState?.aiContent?.images?.primary?.Large?.URL ?? ""}
                  alt="Two each of gray, white, and black shirts laying flat."
                  className="h-full w-full object-contain object-center"
                  height={400}
                  width={400}
                />
              </div>
              <div
                className={
                  appState.view === "Mobile"
                    ? "flex "
                    : "hidden lg:grid lg:grid-cols-1 lg:gap-y-8"
                }
              >
                <div className="aspect-h-2 aspect-w-3 flex-1 overflow-hidden rounded-lg">
                  <Image
                    src={
                      appState.aiContent?.images?.variant[0]?.Large?.URL ??
                      appState.aiContent?.images?.primary?.Large?.URL ??
                      ""
                    }
                    alt="Model wearing plain black basic tee."
                    className="h-full w-full object-contain object-center"
                    height={200}
                    width={200}
                  />
                </div>
                <div className="aspect-h-2 aspect-w-3 flex-1 overflow-hidden rounded-lg">
                  <Image
                    src={
                      appState.aiContent?.images?.variant[1]?.Large?.URL ??
                      appState.aiContent?.images?.primary?.Large?.URL ??
                      ""
                    }
                    alt="Model wearing plain gray basic tee."
                    className="h-full w-full object-contain object-center"
                    height={200}
                    width={200}
                  />
                </div>
              </div>
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <Image
                  src={
                    appState.aiContent?.images?.variant[2]?.Large?.URL ??
                    appState.aiContent?.images?.primary?.Large?.URL ??
                    ""
                  }
                  alt="Model wearing plain white basic tee."
                  className="h-full w-full object-contain object-center"
                  height={400}
                  width={400}
                />
              </div>
            </div>

            <div
              className={` 
                ${appState.view === "Mobile"
                  ? "flex flex-col px-5"
                  : "mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16"}`
              }
             
            >
              {loading && <Loader text="Generating Content" />}
              <div
                className={`${appState.editable && "rounded border-2 border-transparent hover:border-indigo-500"}  
                  ${appState?.view === "Mobile"
                    ? ""
                    : "lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"}`
                }
                onClick={()=>{
                  if (setIsSideBarOpen && setSection) {
                    setIsSideBarOpen(true);
                    setSection("Title");
                    dispatch(
                      updateAppState({
                       ...appState,
                        openedSlide: "Customize",
                      }),
                    );
                  }
                }}
              >
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {appState.aiContent?.title ?? ""}
                </h1>
              </div>

              <div className={`mt-4 lg:row-span-3 lg:mt-0 ${appState.editable && "rounded border-2 border-transparent hover:border-indigo-500"} `} onClick={()=>{
                if (setIsSideBarOpen && setSection) {
                  setIsSideBarOpen(true);
                  setSection("Description");
                  dispatch(
                    updateAppState({
                     ...appState,
                      openedSlide: "Customize",
                    }),
                  );
                }
              }}>
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {appState.aiContent?.price ?? ""}
                </p>
                <div className="mt-10">
                  <p>{appState.aiContent?.description ?? ""}</p>
                </div>
              </div>

              <div
                className={`${appState.editable && "rounded border-2 border-transparent border-white hover:border-indigo-500"}
                  ${appState?.view === "Mobile"
                    ? "flex flex-col gap-10 py-10"
                    : "flex flex-col gap-10 py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6"}`
                }
                onClick={()=>{
                  if (setIsSideBarOpen && setSection) {
                    setIsSideBarOpen(true);
                    setSection("Features");
                    dispatch(
                      updateAppState({
                       ...appState,
                        openedSlide: "Customize",
                      }),
                    );
                  }
                }}
              >
                {appState.aiContent?.features?.map((feature: any, i: any) => (
                  <div
                    className={`flex items-center justify-center gap-5 ${i % 2 !== 0 ? "flex-row-reverse" : ""}`}
                    key={i}
                  >
                    <Image
                      src={
                        i === 0
                          ? appState.aiContent?.images?.primary?.Large?.URL ??
                            ""
                          : appState.aiContent?.images?.variant[i - 1]?.Large
                              ?.URL ??
                            appState.aiContent?.images?.primary?.Large?.URL ??
                            ""
                      }
                      alt=""
                      width={200}
                      height={200}
                    />
                    <div className="w-1/2">
                      <h2 className="text-xl font-semibold">{feature.title}</h2>
                      <p className="text-sm text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ProductTemplate;
