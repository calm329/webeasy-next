"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SettingMenu from "../header/settings-menu";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import WidgetModal from "../ui/modal/widget-modal";
import ViewMenu from "../menu/view-menu";
import PublishMenu from "../menu/publish-menu";
import { DebouncedState, useMediaQuery } from "usehooks-ts";
import { AppState, TTemplate, TTemplateName } from "@/types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchTemplates,TemplatesData as TD } from "@/lib/store/slices/template-slice";
import { WidgetDrawer } from "../ui/drawer/widget-drawer";
import { FaUndoAlt, FaRedoAlt } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlineDownloadDone } from "react-icons/md";
import {
  appState as AS,
  clearPastAndFuture,
  futureAppState as FAS,
  loading as LD,
  pastAppState as PAS,
  redo,
  undo,
} from "@/lib/store/slices/site-slice";
import { saveState } from "@/lib/utils/function";
import Loader from "../ui/loader";
import { getAllTemplates } from "@/lib/fetchers";

type TProps = {
  showNavigation: boolean;
  isAuth?: boolean;
  getData?: (flag?: "init" | "regenerate" | "refresh") => Promise<void>;
  handleChange?: DebouncedState<(name: string, value: string) => void>;
  setSelectedTemplate?: Dispatch<SetStateAction<TTemplateName>>;
  setShowAuthModal: Dispatch<SetStateAction<boolean>>;
};

const BottomToolBar = (props: TProps) => {
  const [showWidgetModal, setWidgetModal] = useState(false);


  const {
    showNavigation,
    isAuth,
    setShowAuthModal,
    getData,
    handleChange,
    setSelectedTemplate,
  } = props;
  const matches = useMediaQuery("(max-width: 500px)");
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const isBottomBar = useMediaQuery("(max-width: 900px)");
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(LD);
  const pastAppState = useAppSelector(PAS);
  const futureAppState = useAppSelector(FAS);
  const templates= useAppSelector(TD)

  return (
    <div className="fixed bottom-0 z-1   flex w-full justify-around border border-gray-200 bg-white p-5  shadow-xl">
      {isBottomBar ? (
        <>
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
              className="rounded-m inline-flex flex-col items-center  justify-center gap-2  px-3 py-2 text-sm font-semibold text-black max-sm:text-xs"
              onClick={() => setWidgetModal(true)}
            >
              <ChatBubbleLeftIcon
                className="ml-0.5 mr-1.5 h-5 w-5 max-sm:m-0"
                aria-hidden="true"
              />
              Widget
            </button>
          </span>
          {isMobile ? (
            <WidgetDrawer open={showWidgetModal} setOpen={setWidgetModal} />
          ) : (
            <WidgetModal open={showWidgetModal} setOpen={setWidgetModal} />
          )}

          <ViewMenu />

          <PublishMenu />
        </>
      ) : (
        <div className="flex w-full justify-around">
          <button
            className={`flex flex-col items-center ${pastAppState.length === 0 && "text-gray-500"}`}
            onClick={() => dispatch(undo())}
            disabled={pastAppState.length === 0}
          >
            <FaUndoAlt />
            Undo
          </button>
          <button
            className={`flex flex-col items-center ${futureAppState.length === 0 && "text-gray-500"}`}
            onClick={() => dispatch(redo())}
            disabled={futureAppState.length === 0}
          >
            <FaRedoAlt />
            Redo
          </button>
          <button className="flex flex-col items-center">
            <ImCancelCircle size={18} onClick={() => getData && getData()} />
            Cancel
          </button>
          <button className="flex flex-col items-center">
            <MdOutlineDownloadDone
              size={20}
              onClick={() =>
                saveState(appState, dispatch).then(() =>
                  dispatch(clearPastAndFuture()),
                )
              }
            />
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default BottomToolBar;
