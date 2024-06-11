"use client";
import SiteHeader from "@/components/header";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import ProductTemplate from "@/templates/product-template/product-template-csr";
import React, { Dispatch, SetStateAction, useState } from "react";
import { appState as AS, loading as LD } from "@/lib/store/slices/site-slice";
import SlideOver from "@/components/ui/slide-over";
import FontSlideOver from "@/components/ui/slide-over/font-slide";
import { CustomDrawer } from "@/components/ui/drawer/custom-drawer";
import { FontsDrawer } from "@/components/ui/drawer/fonts-drawer";
import { useMediaQuery } from "usehooks-ts";
import { TFields, TSection } from "@/types";
import { getUsernameFromPosts } from "@/lib/utils";
import { handleChangeAppState } from "@/lib/utils/function";
import Loader from "@/components/ui/loader";

const Amazon = () => {
  const [isFontOpen, setIsFontOpen] = useState(false);
  const appState = useAppSelector(AS);
  const matches = useMediaQuery("(min-width: 768px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [section, setSection] = useState<TSection>("Gallery");
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState({
    form: "",
    edit: "",
    show: false,
  });
  const loading = useAppSelector(LD);
  const handleChange = (name: string, value: string) => {
    handleChangeAppState(dispatch, appState, name, value);
  };
  console.log("hide", appState.openedSlide === "Customize" && isSideBarOpen);
  return (
    <>
     {loading  && <Loader text="Loading" />}
      <SiteHeader
        showNavigation={false}
        setIsFontOpen={setIsFontOpen}
        isAuth={true}
        handleChange={handleChange}
      />
      <div className="relative flex size-full ">
        <ProductTemplate
          setIsSideBarOpen={setIsSideBarOpen}
          setSection={setSection}
          showForm={showForm}
          setShowForm={setShowForm}
        />
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
    </>
  );
};

export default Amazon;
