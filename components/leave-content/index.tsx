import { useResponsiveDialog } from "@/lib/context/responsive-dialog-context";
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
  redirectUrl?: string;
};

const LeaveContent = (props: TProps) => {
  const { redirectUrl } = props;
  const { closeDialog } = useResponsiveDialog();
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);

  const router = useRouter();
  return (
    <div className="rounded  p-4  text-center">
      <div className="mb-4 text-lg">
        Are you sure you wish to exit the website builder? All your content will
        be lost.
      </div>
      <div className="flex justify-center">
        <button
          className="mr-2 rounded bg-indigo-600 px-4 py-2 text-white"
          onClick={() => {
            closeDialog("leave");
          }}
        >
          Continue building
        </button>
        <button
          className="rounded bg-gray-500 px-4 py-2 text-white"
          onClick={() => {
            closeDialog("leave");
            dispatch(clearPastAndFuture());
            router.push(redirectUrl ?? "/");
          }}
        >
          Yes, leave now
        </button>
      </div>
    </div>
  );
};

export default LeaveContent;
