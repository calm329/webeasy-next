"use client";
import { CustomDrawer } from "@/components/ui/drawer/custom-drawer";
import { useMediaQuery } from "usehooks-ts";
import Loader from "@/components/ui/loader";
import SlideOver from "@/components/ui/slide-over";
import { checkSiteAvailability, createNewSite } from "@/lib/actions";
import { fetchData, getUsernameFromPosts } from "@/lib/utils";
import { TFields, TSection } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SiteHeader from "@/components/header";
import SelectedTemplate from "@/components/selected-template";
import {
  generateNewCustomSite,
  generateUniqueHash,
  getInstagramData,
  handleChangeAppState,
} from "@/lib/utils/function";
import EditWebsiteHeader from "@/components/header/edit-website-header";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  appState as AS,
  updateAppState,
  loading as LD,
  fetchSitesByDomain,
  fetchSiteById,
} from "@/lib/store/slices/site-slice";
import FontSlideOver from "@/components/ui/slide-over/font-slide";
import { FontsDrawer } from "@/components/ui/drawer/fonts-drawer";
import { ProgressLoader } from "@/components/progress-loader";

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

  const handleChange = (name: string, value: string) => {
    handleChangeAppState(dispatch, appState, name, value);
  };

  useEffect(() => {
    const business = searchParams.get("business");
    const businessName = searchParams.get("businessName");
    const location = searchParams.get("location");
    if (business && businessName && location) {
      generateNewCustomSite({
        businessName: businessName,
        businessType: business,
        location: location,
      }).then(async (data) => {
        console.log("data", data);
        const site = await createNewSite({
          subdomain: await generateUniqueHash("subdomain"),
          aiResult: JSON.stringify({
            ...data,
            businessType: business,
            businessName,
            location,
          }),
          type: "Custom",
        });
        router.push("/custom/" + site.id);
      });
    }
  }, []);
  return (
    <>
      {appState?.generate?.generating && <ProgressLoader />}
      <SiteHeader
        showNavigation={false}
        isAuth={true}
        handleChange={handleChange}
        setIsFontOpen={setIsFontOpen}
      />
      <EditWebsiteHeader />

      <div className="relative flex size-full ">
        <div style={{ fontFamily: appState.selectedFont }} className="w-full">
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
          </div>
        </div>
      </div>
    </>
  );
}
