import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import React from "react";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";

const AiAssist = () => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
  return (
    <div
      className="ml-3 mt-1 flex flex-col items-center gap-2 cursor-pointer"
      onClick={() =>
        dispatch(updateAppState({ ...appState, openedSlide: null }))
      }
    >
      <Image src={"/ai.png"} height={25} width={25} alt="ai" />
      <span className="rounded-m inline-flex flex-col items-center  justify-center gap-2  text-sm font-semibold text-black max-sm:text-xs">
        AI Assist
      </span>
    </div>
  );
};

export default AiAssist;
