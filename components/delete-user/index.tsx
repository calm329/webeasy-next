import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  appState as AS,
  clearPastAndFuture,
  deleteSite,
  fetchSitesByDomain,
  updateAppState,
} from "@/lib/store/slices/site-slice";
import { saveState } from "@/lib/utils/function";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";

type TProps = {
  setOpen: React.Dispatch<SetStateAction<boolean>>;

};

const DeleteUser = (props: TProps) => {
  const { setOpen,  } = props;
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session?.user?.email }),
      });

      const response = await res.json();

      if (res.ok) {
        setOpen(false)
        signOut();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="rounded  p-4  text-center">
      <div className="mb-4 text-lg">
        Are you sure you want to delete this account?
      </div>
      <div className="flex justify-center">
        <button
          className={`ml-0 mr-auto flex gap-2 rounded-md px-3 py-2 text-sm  font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${isLoading ? "bg-red-500" : "bg-red-600 hover:bg-red-500 max-lg:ml-auto max-lg:mr-0"}`}
          onClick={handleDelete}
          type="button"
          disabled={isLoading}
        >
          {isLoading && (
            <ImSpinner2 className="animate-spin text-lg text-white" />
          )}
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

export default DeleteUser;
