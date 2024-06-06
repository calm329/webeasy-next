import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  appState as AS,
  clearPastAndFuture,
  deleteSite,
  fetchSitesByDomain,
  updateAppState,
} from "@/lib/store/slices/site-slice";
import { saveState } from "@/lib/utils/function";
import { useRouter } from "next/navigation";
import React, { SetStateAction } from "react";

type TProps = {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  id: string;
};

const DeleteContent = (props: TProps) => {
  const { setOpen, id } = props;
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);

  const router = useRouter();
  return (
    <div className="rounded  p-4  text-center">
      <div className="mb-4 text-lg">
        Are You Sure You Wanna Delete This Site?
      </div>
      <div className="flex justify-center">
        <button
          className="mr-2 rounded bg-indigo-600 px-4 py-2 text-white"
          onClick={() => {
            console.log("id", id);
            dispatch(deleteSite({ id }));
            setOpen(false);
          }}
        >
          Delete
        </button>
        <button
          className="rounded bg-gray-500 px-4 py-2 text-white"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteContent;
