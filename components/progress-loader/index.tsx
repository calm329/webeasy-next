"use client";

import * as React from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { appState as AS } from "@/lib/store/slices/site-slice";
import { ImSpinner2 } from "react-icons/im";

export function ProgressLoader() {
  const appState = useAppSelector(AS);
  const progress = appState.generate.progress;
  console.log("Progress", progress);
  return (
    <div className="fixed   bottom-5 z-50 flex  h-10 w-full items-center justify-center ">
      <div className="relative h-full w-96 shadow-lg">
        <div
          className="absolute  left-0 top-0 h-10 rounded"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(to right, #4ade80, #06b6d4)`,
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-[90%] w-[23.5rem] items-center justify-center rounded bg-white text-center text-sm  text-black">
            <ImSpinner2 className="animate-spin text-lg text-indigo-600 mr-5" />
            Your site is being generated {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
