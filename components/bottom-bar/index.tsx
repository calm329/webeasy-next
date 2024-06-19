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
import {
  fetchTemplates,
  TemplatesData as TD,
} from "@/lib/store/slices/template-slice";
import { WidgetDrawer } from "../ui/drawer/widget-drawer";
import { FaUndoAlt, FaRedoAlt } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlineDownloadDone } from "react-icons/md";
import {
  appState as AS,
  clearPastAndFuture,
  futureAppState as FAS,
  fetchSiteById,
  fetchSitesByDomain,
  loading as LD,
  pastAppState as PAS,
  redo,
  undo,
} from "@/lib/store/slices/site-slice";
import { getInstagramData, saveState } from "@/lib/utils/function";
import Loader from "../ui/loader";
import { getAllTemplates } from "@/lib/fetchers";
import { useSession } from "next-auth/react";
import Image from "next/image";
import AiAssist from "../ai-assist";
import { usePathname, useSearchParams } from "next/navigation";

type TProps = {
  showNavigation: boolean;
  isAuth?: boolean;
  handleChange?: (name: string, value: string) => void;
  setSelectedTemplate?: Dispatch<SetStateAction<TTemplateName>>;
  setShowAuthModal: Dispatch<SetStateAction<boolean>>;
  setIsFontOpen: Dispatch<SetStateAction<boolean>>;
};

const BottomToolBar = (props: TProps) => {
  const [showWidgetModal, setWidgetModal] = useState(false);

  const {
    showNavigation,
    isAuth,
    setShowAuthModal,
    handleChange,
    setSelectedTemplate,
    setIsFontOpen,
  } = props;
  const matches = useMediaQuery("(max-width: 500px)");
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const isBottomBar = useMediaQuery("(max-width: 900px)");
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(LD);
  const pastAppState = useAppSelector(PAS);
  const futureAppState = useAppSelector(FAS);
  const templates = useAppSelector(TD);
  const { status } = useSession();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  return (
    <div className="z-1 fixed bottom-0   flex w-full justify-around border border-gray-200 bg-white   py-2 shadow-xl ">
      {isBottomBar ? (
        <div className="flex max-w-7xl justify-between">
          <div className=" flex justify-end gap-5  max-sm:gap-2">
            {appState && (
              <SettingMenu
                handleChange={handleChange ?? undefined}
                appState={appState}
                templates={templates}
                setShowAuthModal={setShowAuthModal}
                setIsFontOpen={setIsFontOpen}
              />
            )}
          </div>

          {status === "authenticated" && (
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
          )}

          {isMobile ? (
            <WidgetDrawer open={showWidgetModal} setOpen={setWidgetModal} />
          ) : (
            <WidgetModal open={showWidgetModal} setOpen={setWidgetModal} />
          )}

          {/* <ViewMenu /> */}

          <PublishMenu setShowAuthModal={setShowAuthModal} />
          {status === "authenticated" && <AiAssist />}
        </div>
      ) : (
        <div className="flex w-full max-w-7xl justify-around">
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
            <ImCancelCircle
              size={18}
              onClick={() => {
                if (pathname.startsWith("/custom")) {
                  if (searchParams.get("id")) {
                    dispatch(
                      fetchSiteById({
                        id: searchParams.get("id") ?? "",
                      }),
                    );
                  }
                } else if (pathname.startsWith("/amazon")) {
                  if (searchParams.get("site_id")) {
                    dispatch(
                      fetchSiteById({
                        id: searchParams.get("site_id") ?? "",
                      }),
                    );
                  }
                } else {
                  getInstagramData({
                    appState,
                    dispatch,
                    searchParams,
                  });
                }
                dispatch(clearPastAndFuture());
              }}
            />
            Cancel
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
                  setShowAuthModal(true);
                }
              }}
            />
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default BottomToolBar;
