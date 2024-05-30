"use client";
import { CustomDrawer } from "@/components/ui/drawer/custom-drawer";
import { useMediaQuery } from "usehooks-ts";
import Loader from "@/components/ui/loader";
import SlideOver from "@/components/ui/slide-over";
import { checkSiteAvailability } from "@/lib/actions";
import { fetchData, getUsernameFromPosts } from "@/lib/utils";
import { AppState, FormField, TFields, TSection, TTemplateName } from "@/types";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SiteHeader from "@/components/header";
import SelectedTemplate from "@/components/selected-template";
import { getData, handleChangeAppState, saveState } from "@/lib/utils/function";
import EditWebsiteHeader from "@/components/header/edit-website-header";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  appState as AS,
  updateAppState,
  loading as LD,
  pastAppState as PAS,
  futureAppState as FAS,
  undo,
  redo,
  clearPastAndFuture,
} from "@/lib/store/slices/site-slice";
import FontSlideOver from "@/components/ui/slide-over/font-slide";
import { FontsDrawer } from "@/components/ui/drawer/fonts-drawer";
import { IoMdAdd } from "react-icons/io";
import { FaRedoAlt, FaUndoAlt } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlineDownloadDone } from "react-icons/md";

export default function Page() {
  const router = useRouter();
  const { data: session,status } = useSession();
  const searchParams = useSearchParams();
  // const [appState, setAppState] = useState<AppState>(initialState);
  const appState = useAppSelector(AS);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isFontOpen, setIsFontOpen] = useState(false);
  const [focusedField, setFocusedField] = useState<TFields>(null);
  const [section, setSection] = useState<TSection>("Banner");
  const dispatch = useAppDispatch();
  const saveLoading = useAppSelector(LD);
  const [showForm, setShowForm] = useState({
    form: "",
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

  useEffect(() => {
    const WebFontLoader = require("webfontloader");
    if(appState.selectedFont){
      window && WebFontLoader.load({
        google: {
          families: [appState.selectedFont],
        },
      });
    }
  }, [appState.selectedFont]);
  const isBottomBar = useMediaQuery("(min-width: 900px)");
  const pathname = usePathname();
  const pastAppState = useAppSelector(PAS);
  const futureAppState = useAppSelector(FAS);
  return (
    <>
      {appState.status === "Done" ? (
        <>
          {/* !isBottomBar && pathname.startsWith("/auth") && (
            <div className="fixed top-0 z-10 mt-5 flex w-full justify-around border-b pb-5">
              <button className="flex flex-col items-center">
                <IoMdAdd size={20} />
              
              </button>
              <button
                className={`flex flex-col items-center ${pastAppState.length === 0 && "text-gray-500"}`}
                onClick={() => dispatch(undo())}
                disabled={pastAppState.length === 0}
              >
                <FaUndoAlt />
           
              </button>
              <button
                className={`flex flex-col items-center ${futureAppState.length === 0 && "text-gray-500"}`}
                onClick={() => dispatch(redo())}
                disabled={futureAppState.length === 0}
              >
                <FaRedoAlt />
           
              </button>
              <button className="flex flex-col items-center">
                <ImCancelCircle
                  size={18}
                  onClick={() => {
                    if (getData) {
                      getData({
                        flag: "init",
                        searchParams,
                        appState,
                        dispatch,
                        // setAppState,
                        setBrandCustomizeFields,
                        setHeroCustomizeFields,
                      });
                      dispatch(clearPastAndFuture());
                    }
                  }}
                />
          
              </button>
              <button className="flex flex-col items-center">
                <MdOutlineDownloadDone
                  size={20}
                  onClick={() => {
                    if (status === "authenticated") {
                      saveState(appState, dispatch).then(() =>
                        dispatch(clearPastAndFuture()),
                      );
                    } else {
                      // setShowAuthModal(true);
                    }
                  }}
                />
            
              </button>
            </div>
          )} */}
          <SiteHeader
            showNavigation={false}
            isAuth={true}
            getData={(flag, fieldName) =>
              getData({
                flag: flag ?? "init",
                searchParams,
                dispatch,
                appState,
                // setAppState,
                setBrandCustomizeFields,
                setHeroCustomizeFields,
                fieldName,
              })
            }
            handleChange={handleChange}
            setIsFontOpen={setIsFontOpen}
          />
          <EditWebsiteHeader />

          <div className="relative flex size-full ">
            <div
              style={{ fontFamily: appState.selectedFont }}
              className="w-full"
            >
              <SelectedTemplate
                appState={appState}
                setFocusedField={setFocusedField}
                setIsSideBarOpen={setIsSideBarOpen}
                setSection={setSection}
                showForm={showForm}
                setShowForm={setShowForm}
              />
            </div>
            {appState.editable && (
              <>
                {matches ? (
                  <>
                    <SlideOver
                      open={
                        appState.openedSlide === "Customize" && isSideBarOpen
                      }
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
                      showForm={showForm}
                      setShowForm={setShowForm}
                      getData={(flag, fieldName) =>
                        getData({
                          flag: flag ?? "init",
                          searchParams,
                          dispatch,
                          appState,
                          // setAppState,
                          setBrandCustomizeFields,
                          setHeroCustomizeFields,
                          fieldName,
                        })
                      }
                    />

                    <FontSlideOver
                      open={appState.openedSlide === "Font" && isFontOpen}
                      setIsOpen={setIsFontOpen}
                    />
                  </>
                ) : (
                  <>
                    <CustomDrawer
                      getData={(flag, fieldName) =>
                        getData({
                          flag: flag ?? "init",
                          searchParams,
                          dispatch,
                          appState,
                          // setAppState,
                          setBrandCustomizeFields,
                          setHeroCustomizeFields,
                          fieldName,
                        })
                      }
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
                      showForm={showForm}
                      setShowForm={setShowForm}
                    />
                    <FontsDrawer open={isFontOpen} setIsOpen={setIsFontOpen} />
                  </>
                )}
              </>
            )}
          </div>
          {saveLoading && <Loader text="Saving Data" />}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader text={appState.status} />
        </div>
      )}
    </>
  );
}
