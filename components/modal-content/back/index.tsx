import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  appState as AS,
  clearPastAndFuture,
  updateAppState,
} from "@/lib/store/slices/site-slice";
import { saveState } from "@/lib/utils/function";
import { useRouter } from "next/navigation";
import React from "react";
import { selectedTemplate as ST } from "@/lib/store/slices/template-slice";
import { useResponsiveDialog } from "@/lib/context/responsive-dialog-context";
import { sectionsData as SD } from '@/lib/store/slices/section-slice';

const BackContent = () => {
  const { closeDialog} = useResponsiveDialog();
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
  const selectedTemplate = useAppSelector(ST);
  const router = useRouter();
  const sections = useAppSelector(SD);
  return (
    <div className="rounded  p-4  text-center">
      <div className="mb-4 text-lg">
        Your changes haven&apos;t been saved. If you go back now, they&apos;ll
        be lost. Would you like to save or cancel?
      </div>
      <div className="flex justify-center">
        <button
          className="mr-2 rounded bg-indigo-600 px-4 py-2 text-white"
          onClick={() => {
            closeDialog('back');
            saveState(appState, dispatch, selectedTemplate?.id ?? "",sections).then(
              () => {
                dispatch(clearPastAndFuture());
                router.push("/dashboard");
              },
            );
          }}
        >
          Save
        </button>
        <button
          className="rounded bg-gray-500 px-4 py-2 text-white"
          onClick={() => {
            closeDialog('back');
            dispatch(clearPastAndFuture());
            dispatch(
              updateAppState({
                ...appState,
                status: "Loading Instagram ....",
              }),
            );
            router.push("/dashboard");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BackContent;
