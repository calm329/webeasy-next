"use client";
import { CustomDrawer } from "@/components/ui/drawer/custom-drawer";
import { useMediaQuery } from "usehooks-ts";
import Loader from "@/components/ui/loader";
import SlideOver from "@/components/ui/slide-over";
import { checkSiteAvailability } from "@/lib/actions";
import { fetchData, getUsernameFromPosts } from "@/lib/utils";
import { TFields, TSection } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SiteHeader from "@/components/header";
import SelectedTemplate from "@/components/selected-template";
import { getInstagramData, handleChangeAppState } from "@/lib/utils/function";
import EditWebsiteHeader from "@/components/header/edit-website-header";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  appState as AS,
  updateAppState,
  loading as LD,
  fetchSitesByDomain,
} from "@/lib/store/slices/site-slice";
import FontSlideOver from "@/components/ui/slide-over/font-slide";
import { FontsDrawer } from "@/components/ui/drawer/fonts-drawer";

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
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

  const handleChange = useDebouncedCallback((name: string, value: string) => {
    handleChangeAppState(dispatch, appState, name, value);
  }, 300);

  const matches = useMediaQuery("(min-width: 768px)");
  useEffect(() => {
    if (searchParams.get("subdomain")) {
      dispatch(
        fetchSitesByDomain({ subdomain: searchParams.get("subdomain") ?? "" }),
      );
    }
  }, [searchParams]);
  useEffect(() => {
    const WebFontLoader = require("webfontloader");
    if (appState.selectedFont) {
      window &&
        WebFontLoader.load({
          google: {
            families: [appState.selectedFont],
          },
        });
    }
  }, [appState.selectedFont]);
  console.log("appState", appState);
  return (
    <>
      <SiteHeader
        showNavigation={false}
        isAuth={true}
        handleChange={handleChange}
        setIsFontOpen={setIsFontOpen}
      />
      <EditWebsiteHeader />

      <div className="relative flex size-full ">
        <div style={{ fontFamily: appState.selectedFont }} className="w-full">
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
                  open={appState.openedSlide === "Customize" && isSideBarOpen}
                  setIsOpen={setIsSideBarOpen}
                  section={section}
                  handleChange={handleChange}
                  subdomain={
                    getUsernameFromPosts(JSON.stringify(appState.iPosts)) || ""
                  }
                  showForm={showForm}
                  setShowForm={setShowForm}
                />

                <FontSlideOver
                  open={appState.openedSlide === "Font" && isFontOpen}
                  setIsOpen={setIsFontOpen}
                />
              </>
            ) : (
              <>
                <CustomDrawer
                  open={isSideBarOpen}
                  setIsOpen={setIsSideBarOpen}
                  section={section}
                  handleChange={handleChange}
                  subdomain={
                    getUsernameFromPosts(JSON.stringify(appState.iPosts)) || ""
                  }
                  showForm={showForm}
                  setShowForm={setShowForm}
                />
                <FontsDrawer open={isFontOpen} setIsOpen={setIsFontOpen} />
              </>
            )}
          </>
        )}
      </div>
      {(saveLoading || appState.status !== "Done") && <Loader text={appState.status === "Done"?"Loading":appState.status} />}
    </>
  );
}
