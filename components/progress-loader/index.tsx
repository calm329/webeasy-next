"use client";

import * as React from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { appState as AS } from "@/lib/store/slices/site-slice";

export function ProgressLoader() {
  const appState = useAppSelector(AS);
  const progress = appState.regenerate.progress;
    console.log("Progress",progress)
  return (
    <div className="fixed   h-10 z-50 bottom-5  flex justify-center items-center w-full">
      <div className="relative h-full w-96">
        <div
          className="absolute  top-0 left-0 h-10 rounded"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(to right, #4ade80, #06b6d4)`,
          }}
        ></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <span className="text-black bg-white w-[23.5rem] h-[90%] text-sm text-center  rounded">Your site is being generated</span>
        </div>
      </div>
    </div>
  );
}
