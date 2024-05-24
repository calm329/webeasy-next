import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  appState as AS,
  clearPastAndFuture,
  fetchSitesByDomain,
  updateAppState,
} from "@/lib/store/slices/site-slice";
import { saveState } from "@/lib/utils/function";
import { useRouter } from "next/navigation";
import React, { SetStateAction } from "react";

type TProps = {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const BackContent = (props: TProps) => {
  const { setOpen } = props;
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);

  const router = useRouter();
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
            setOpen(false);
            saveState(appState, dispatch).then(() => {
              dispatch(clearPastAndFuture());
              router.push("/settings/websites");
            });
          }}
        >
          Save
        </button>
        <button
          className="rounded bg-gray-500 px-4 py-2 text-white"
          onClick={() => {
            setOpen(false);
            dispatch(clearPastAndFuture());
            dispatch(
              updateAppState({
                ...appState,
                status: "Loading Instagram ....",
              }),
            );
            router.push("/settings/websites");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BackContent;
