"use client";
import { CustomDrawer } from "@/components/drawer";
import { useMediaQuery } from "usehooks-ts";
import Loader from "@/components/loader";
import SlideOver from "@/components/slide-over";
import BasicTemplate from "@/components/templates/basic-template-csr";
import {
  checkSiteAvailability,
  createNewSite,
  updateSite,
} from "@/lib/actions";
import { getSiteData } from "@/lib/fetchers";
import { fetchData, getUsernameFromPosts } from "@/lib/utils";
import { FormField, TFields, TSection } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SiteHeader from "@/components/header";

export interface AppState {
  status: string;
  iPosts: any[];
  aiContent: any;
  logo: string;
  editable: boolean;
}

const initialState: AppState = {
  status: "Loading Instagram",
  iPosts: [],
  aiContent: {},
  logo: "",
  editable: false,
};

type TData = Partial<{
  logo: string;
  businessName: string;
  ctaLink: string;
  heading: string;
  subheading: string;
  imageUrl: string;
  cta: string;
}>;

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [appState, setAppState] = useState<AppState>(initialState);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [focusedField, setFocusedField] = useState<TFields>(null);
  const [section, setSection] = useState<TSection>("Banner");
  const [brandCustomizeFields, setBrandCustomizeFields] = useState<FormField[]>(
    [
      {
        name: "logo",
        type: "image",
        label: "Logo Image",
        defaultValue: "",
        placeholder: "Enter your first name",
        validation: {
          required: true,
        },
      },
      {
        name: "businessName",
        type: "text",
        label: "Business Name",
        defaultValue: "",
        placeholder: "Enter your business name",
        validation: {
          required: true,
        },
      },
      {
        name: "cta",
        type: "text",
        label: "Call To Action Text",
        defaultValue: "",
        placeholder: "Enter Call To Action Text",
        validation: {
          required: true,
        },
      },
      {
        name: "ctaLink",
        type: "text",
        label: "Call To Action Link",
        defaultValue: "",
        placeholder: "Enter a link",
        validation: {
          required: true,
        },
      },
    ],
  );

  const [heroCustomizeFields, setHeroCustomizeFields] = useState<FormField[]>([
    {
      name: "imageUrl",
      type: "image",
      label: "Banner Image",
      defaultValue: "",
      placeholder: "Select Banner Image",
      validation: {
        required: true,
      },
    },
    {
      name: "heading",
      type: "text",
      label: "Heading",
      defaultValue: "",
      placeholder: "Enter a Heading",
      validation: {
        required: true,
      },
    },
    {
      name: "subheading",
      type: "textarea",
      label: "Sub-Heading",
      defaultValue: "",
      placeholder: "Enter a Sub-Heading",
      validation: {
        required: true,
      },
    },
    {
      name: "cta",
      type: "text",
      label: "Call To Action Text",
      defaultValue: "",
      placeholder: "Enter Call To Action Text",
      validation: {
        required: true,
      },
    },
    {
      name: "ctaLink",
      type: "text",
      label: "Call To Action Link",
      defaultValue: "",
      placeholder: "Enter a link",
      validation: {
        required: true,
      },
    },
  ]);

  const updateDefaultValues = (data: TData) => {
    setBrandCustomizeFields((currentFields) =>
      currentFields.map((field) => ({
        ...field,
        defaultValue:
          data[field.name as keyof typeof data] ?? field.defaultValue,
      })),
    );
    setHeroCustomizeFields((currentFields) =>
      currentFields.map((field) => ({
        ...field,
        defaultValue:
          data[field.name as keyof typeof data] ?? field.defaultValue,
      })),
    );
  };

  const getData = async (flag: "init" | "regenerate" | "refresh" = "init") => {
    const { subdomain: siteAvailable, editable } = await checkSiteAvailability({
      userId: searchParams.get("user_id") || "",
    });

    setAppState((state) => ({
      ...state,
      status: "Loading Instagram",
      editable,
    }));

    // check if user data exists
    // const userData = flag === "init" ? await getUserData() : null;

    if (siteAvailable && flag === "init") {
      const siteData = await getSiteData(siteAvailable);

      if (!siteData) {
        return;
      }

      const aiContent = JSON.parse(siteData.aiResult);

      console.log(aiContent);

      setAppState((state) => ({
        ...state,
        status: "Done",
        aiContent: aiContent,
        iPosts: JSON.parse(siteData.posts),
        logo: siteData.logo || state.logo,
      }));

      // update default values
      updateDefaultValues({
        logo: siteData.logo || undefined,
        businessName: aiContent?.businessName,
        ctaLink: aiContent?.hero?.ctaLink,
        heading: aiContent?.hero?.heading,
        subheading: aiContent?.hero?.subheading,
        imageUrl: aiContent?.hero?.imageUrl,
        cta: aiContent?.hero?.cta,
      });

      return;
    }

    let imageIds: any = {};
    let iPosts: any[] = [];
    let mediaCaption = "";
    let aiContent: any = {};

    // get user media
    {
      const {
        mediaCaption: _mediaCaption,
        imageIds: _imageIds,
        posts: _posts,
      } = await fetchData(
        `/api/instagram/media?access_token=${searchParams.get("access_token")}&user_id=${searchParams.get("user_id")}`,
      );

      if (!_mediaCaption || !_imageIds || !_posts) {
        return;
      }

      mediaCaption = _mediaCaption || mediaCaption;
      imageIds = _imageIds || imageIds;
      iPosts = _posts || iPosts;

      setAppState((state) => ({
        ...state,
        status: flag === "refresh" ? "Done" : "Generating Content",
      }));
    }

    // generate content from user media using openai
    if (flag !== "refresh") {
      const { content } = await fetchData("/api/content", {
        method: "POST",
        body: JSON.stringify({ mediaCaption }),
      });

      if (content) {
        aiContent = JSON.parse(content);
        aiContent["hero"]["imageUrl"] = imageIds[aiContent["hero"]["imageId"]];
      } // else return;

      setAppState((state) => ({
        ...state,
        status: "Choosing Colors",
      }));
    }

    // generate colors from content using openai
    if (flag !== "refresh") {
      const { colors } = await fetchData("/api/color", {
        method: "POST",
        body: JSON.stringify({ imageUrl: aiContent["hero"]["imageUrl"] }),
      });

      if (colors) {
        const aiColors = JSON.parse(colors);
        aiContent = { ...aiContent, colors: aiColors };
      } // else return;

      setAppState((state) => ({
        ...state,
        status: "Done",
      }));
    }

    setAppState((state) => ({
      ...state,
      aiContent: Object.keys(aiContent).length ? aiContent : state.aiContent,
      iPosts: iPosts,
    }));

    if (!siteAvailable && flag === "init") {
      await createNewSite({
        aiResult: JSON.stringify(aiContent),
        posts: JSON.stringify(iPosts),
        accessToken: searchParams.get("access_token") || "",
        userId: searchParams.get("user_id") || "",
      });
    } else if (siteAvailable) {
      await updateSite(
        siteAvailable,
        {
          aiResult: JSON.stringify(aiContent),
          posts: JSON.stringify(iPosts),
        },
        ["aiResult", "posts"],
      );
    }
    console.log("updated", aiContent);
    // update default values
    updateDefaultValues({
      businessName: aiContent?.businessName,
      ctaLink: aiContent?.hero?.ctaLink,
      heading: aiContent?.hero?.heading,
      subheading: aiContent?.hero?.subheading,
      cta: aiContent?.hero?.cta,
    });
  };

  const handleChange = useDebouncedCallback((name: string, value: string) => {
    switch (name) {
      case "logo":
        setAppState((state) => ({ ...state, logo: value }));
        break;
      case "businessName":
        setAppState((state) => ({
          ...state,
          aiContent: {
            ...state.aiContent,
            ["businessName"]: value,
          },
        }));
        break;
      case "ctaLink":
        setAppState((state) => ({
          ...state,
          aiContent: {
            ...state.aiContent,
            ["hero"]: {
              ...state.aiContent["hero"],
              ["ctaLink"]: value,
            },
          },
        }));
        break;
      case "heading":
        setAppState((state) => ({
          ...state,
          aiContent: {
            ...state.aiContent,
            ["hero"]: {
              ...state.aiContent["hero"],
              ["heading"]: value,
            },
          },
        }));
        break;
      case "subheading":
        setAppState((state) => ({
          ...state,
          aiContent: {
            ...state.aiContent,
            ["hero"]: {
              ...state.aiContent["hero"],
              ["subheading"]: value,
            },
          },
        }));
        break;
      case "imageUrl":
        setAppState((state) => ({
          ...state,
          aiContent: {
            ...state.aiContent,
            ["hero"]: {
              ...state.aiContent["hero"],
              ["imageUrl"]: value,
            },
          },
        }));
        break;
      case "cta":
        setAppState((state) => ({
          ...state,
          aiContent: {
            ...state.aiContent,
            ["hero"]: {
              ...state.aiContent["hero"],
              ["cta"]: value,
            },
          },
        }));
        break;
      default:
        break;
    }
  }, 300);

  useEffect(() => {
    const getInstaCredentials = async () => {
      const { access_token, user_id } = await fetchData(
        `/api/instagram/access_token?code=${searchParams.get("code")}`,
      );

      if (access_token && user_id) {
        const newURLSearchParams = new URLSearchParams(searchParams);

        newURLSearchParams.delete("code");
        newURLSearchParams.set("access_token", access_token);
        newURLSearchParams.set("user_id", user_id);

        router.replace(`?${newURLSearchParams.toString()}`);
      }
    };

    if (searchParams.get("code") && !searchParams.get("access_token")) {
      getInstaCredentials();
    }
  }, []);

  useEffect(() => {
    if (searchParams.get("access_token") && searchParams.get("user_id")) {
      console.log(appState, "appState");
      getData();
    }
  }, [searchParams]);

  useEffect(() => {
    async function checkSiteEditable() {
      const { subdomain: siteAvailable, editable } =
        await checkSiteAvailability({
          userId: searchParams.get("user_id") || "",
        });

      setAppState((state) => ({
        ...state,
        editable: editable,
      }));
    }

    checkSiteEditable();
  }, [session]);

  useEffect(() => {
    console.log(appState, "appState");
  }, [appState]);

  const matches = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {appState.status === "Done" ? (
        <>
          <SiteHeader
            showNavigation={false}
            isAuth={true}
            getData={getData}
            appState={appState}
            handleChange={handleChange}
          />
          <div className="relative flex size-full pt-20">
            <div className="h-full w-full">
              {/* <div className="flex w-full justify-end gap-2 bg-gray-100 p-2">
              <button
                type="button"
                className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => getData("regenerate")}
              >
                Regenerate the content
              </button>
              <button
                type="button"
                className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => getData("refresh")}
              >
                Refresh Instagram feed
              </button>
            </div> */}

              <BasicTemplate
                editable={appState.editable}
                setSection={setSection}
                setIsOpen={setIsSideBarOpen}
                logo={appState.logo}
                businessName={appState.aiContent["businessName"]}
                hero={{
                  heading: appState.aiContent["hero"]["heading"],
                  subheading: appState.aiContent["hero"]["subheading"],
                  imageUrl: appState.aiContent["hero"]["imageUrl"],
                }}
                colors={appState.aiContent["colors"]}
                cta={{
                  text: appState.aiContent["hero"]["cta"],
                  link: appState.aiContent["hero"]["ctaLink"] || "#",
                }}
                services={appState.aiContent["services"]["list"]}
                posts={appState.iPosts}
                setFocusedField={setFocusedField}
              />
            </div>
            {appState.editable && (
              <>
                {matches ? (
                  <SlideOver
                    open={isSideBarOpen}
                    setIsOpen={setIsSideBarOpen}
                    section={section}
                    handleChange={handleChange}
                    subdomain={
                      getUsernameFromPosts(JSON.stringify(appState.iPosts)) ||
                      ""
                    }
                    brandCustomizeFields={brandCustomizeFields}
                    heroCustomizeFields={heroCustomizeFields}
                    focusedField={focusedField}
                  />
                ) : (
                  <CustomDrawer
                    open={isSideBarOpen}
                    setIsOpen={setIsSideBarOpen}
                    section={section}
                    handleChange={handleChange}
                    subdomain={
                      getUsernameFromPosts(JSON.stringify(appState.iPosts)) ||
                      ""
                    }
                    brandCustomizeFields={brandCustomizeFields}
                    heroCustomizeFields={heroCustomizeFields}
                    focusedField={focusedField}
                  />
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader text={appState.status} />
        </div>
      )}
    </>
  );
}
