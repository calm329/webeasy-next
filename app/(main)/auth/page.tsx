"use client";
import { CustomDrawer } from "@/components/ui/drawer/custom-drawer";
import { useMediaQuery } from "usehooks-ts";
import Loader from "@/components/ui/loader";
import SlideOver from "@/components/ui/slide-over";
import { checkSiteAvailability } from "@/lib/actions";
import { fetchData, getUsernameFromPosts } from "@/lib/utils";
import { AppState, FormField, TFields, TSection, TTemplateName } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SiteHeader from "@/components/header";
import SelectedTemplate from "@/components/selected-template";
import { getData, handleChangeAppState } from "@/lib/utils/function";
import EditWebsiteHeader from "@/components/header/edit-website-header";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { appState as AS, updateAppState, loading as LD } from '@/lib/store/slices/site-slice';
import BottomToolBar from "@/components/bottom-bar";

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  // const [appState, setAppState] = useState<AppState>(initialState);
  const appState = useAppSelector(AS);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [focusedField, setFocusedField] = useState<TFields>(null);
  const [section, setSection] = useState<TSection>("Banner");
  const [selectedTemplate, setSelectedTemplate] =
    useState<TTemplateName>("Basic template");
  const dispatch = useAppDispatch();
  const saveLoading = useAppSelector(LD)
  const [showButtonForm, setShowButtonForm] = useState({
    edit: "",
    show: false,
  });
  const [brandCustomizeFields, setBrandCustomizeFields] = useState<FormField[]>(
    [
      {
        name: "logo",
        show: true,
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
        show: true,
        type: "button",
        children: [],
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
      show: true,
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
      show: true,
      type: "button",
      validation: {
        required: true,
      },
      children: [],
    },
  ]);

  const handleChange = useDebouncedCallback((name: string, value: string) => {
    handleChangeAppState(dispatch, appState, name, value);
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
      getData({
        flag: "init",
        searchParams,
        appState,
        dispatch,
        // setAppState,
        setBrandCustomizeFields,
        setHeroCustomizeFields,
      });
    }
  }, [searchParams]);

  useEffect(() => {
    async function checkSiteEditable() {
      const { subdomain: siteAvailable, editable } =
        await checkSiteAvailability({
          userId: searchParams.get("user_id") || "",
        });

      dispatch(
        updateAppState({
          ...appState,
          editable: editable,
        }),
      );
    }

    checkSiteEditable();
  }, [session]);

  const matches = useMediaQuery("(min-width: 768px)");
  
  return (
    <>
      {appState.status === "Done" ? (
        <>
          <SiteHeader
            showNavigation={false}
            isAuth={true}
            getData={(flag) =>
              getData({
                flag: flag ?? "init",
                searchParams,
                dispatch,
                appState,
                // setAppState,
                setBrandCustomizeFields,
                setHeroCustomizeFields,
              })
            }

            handleChange={handleChange}
            setSelectedTemplate={setSelectedTemplate}
          />
          <EditWebsiteHeader />
          <div className="relative flex size-full ">
            <SelectedTemplate
              appState={appState}
              selectedTemplate={selectedTemplate}
              setFocusedField={setFocusedField}
              setIsSideBarOpen={setIsSideBarOpen}
              setSection={setSection}
              showButtonForm={showButtonForm}
              setShowButtonForm={setShowButtonForm}
            />
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
                    setBrandCustomizeFields={setBrandCustomizeFields}
                    setHeroCustomizeFields={setHeroCustomizeFields}
                    showButtonForm={showButtonForm}
                    setShowButtonForm={setShowButtonForm}
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
                    setBrandCustomizeFields={setBrandCustomizeFields}
                    setHeroCustomizeFields={setHeroCustomizeFields}
                    focusedField={focusedField}
                    showButtonForm={showButtonForm}
                    setShowButtonForm={setShowButtonForm}
                  />
                )}
              </>
            )}
          </div>
          {saveLoading && <Loader text="Saving Data"/>}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader text={appState.status} />
        </div>
      )}
    </>
  );
}
