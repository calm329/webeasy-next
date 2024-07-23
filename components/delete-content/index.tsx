import { useResponsiveDialog } from "@/lib/context/responsive-dialog-context";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  deleteSite,
} from "@/lib/store/slices/site-slice";

import React from "react";

type TProps = {
  action:()=>void;
  data:string
};

const DeleteContent = (props: TProps) => {
  const { action,data } = props;
  const dispatch = useAppDispatch();
  const {closeDialog} = useResponsiveDialog()
  return (
    <div className="rounded  p-4  text-center">
      <div className="mb-4 text-lg">
        Are you sure you want to delete this {data}?
      </div>
      <div className="flex justify-center">
        <button
          className="mr-2 rounded bg-indigo-600 px-4 py-2 text-white"
          onClick={() => {
            action()
            closeDialog('delete');
          }}
        >
          Delete
        </button>
        <button
          className="rounded bg-gray-500 px-4 py-2 text-white"
          onClick={() => {
            closeDialog('delete');
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteContent;
