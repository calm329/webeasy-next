"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import SettingMenu from "../header/settings-menu";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import WidgetModal from "../ui/modal/widget-modal";
import ViewMenu from "../menu/view-menu";
import PublishMenu from "../menu/publish-menu";
import { DebouncedState, useMediaQuery } from "usehooks-ts";
import { AppState, TTemplateName } from "@/types";
import { useAppSelector } from "@/lib/store/hooks";
import { TemplatesData as TD } from "@/lib/store/slices/template-slice";

type TProps = {
  showNavigation: boolean;
  isAuth?: boolean;
  getData?: (flag?: "init" | "regenerate" | "refresh") => Promise<void>;
  appState?: AppState;
  handleChange?: DebouncedState<(name: string, value: string) => void>;
  setSelectedTemplate?: Dispatch<SetStateAction<TTemplateName>>;
  setShowAuthModal: Dispatch<SetStateAction<boolean>>;
};

const BottomToolBar = (props: TProps) => {
  const [showWidgetModal, setWidgetModal] = useState(false);
  const templates = useAppSelector(TD);
  const {
    showNavigation,
    isAuth,
    setShowAuthModal,
    getData,
    appState,
    handleChange,
    setSelectedTemplate,
  } = props;
  const matches = useMediaQuery("(max-width: 500px)");
  return (
    <div className="fixed bottom-0 z-10   flex w-full justify-around border border-gray-200 bg-white p-5  shadow-xl">
      <div className=" flex justify-end gap-5  max-sm:gap-2">
        {getData && setSelectedTemplate && appState && (
          <SettingMenu
            getData={getData}
            handleChange={handleChange ?? undefined}
            appState={appState}
            templates={templates}
            setSelectedTemplate={setSelectedTemplate}
            setShowAuthModal={setShowAuthModal}
          />
        )}
      </div>

      <span className="ml-3">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 max-sm:flex-col max-sm:gap-1"
          onClick={() => setWidgetModal(true)}
        >
          <ChatBubbleLeftIcon
            className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
           Widget
     
        </button>
      </span>
      <WidgetModal open={showWidgetModal} setOpen={setWidgetModal} />
      <ViewMenu />

      <PublishMenu />
    </div>
  );
};

export default BottomToolBar;
