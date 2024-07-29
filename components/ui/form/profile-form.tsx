"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchUser, UsersData as UD } from "@/lib/store/slices/user-slice";
import ResponsiveDialog from "@/components/ui/responsive-dialog";
import UpdateUser from "./update-user";
import { useResponsiveDialog } from "@/lib/context/responsive-dialog-context";

export default function Profileform() {
  const { data: session } = useSession();
  // const [user, setUser] = useState<TUser>(null);
  const [loading, setLoading] = useState(false);
  const { openDialog } = useResponsiveDialog();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(UD);
  const getUserData = async () => {
    setLoading(true);
    try {
      // const user = await getUserById();
      const res = await dispatch(fetchUser()).unwrap();

      // setUser({ ...user });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (session?.user?.email) {
    !userData && getUserData();
    // }
  }, []);

  return (
    <>
      <ResponsiveDialog id="updateUser">
        <UpdateUser getUserData={getUserData} user={userData} />
      </ResponsiveDialog>

      <div>
        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <Loader text="Fetching User Data" />
          </div>
        ) : (
          <dl className="mt-6 space-y-6 divide-y divide-gray-100 text-sm leading-6">
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Avatar
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                {userData?.image ? (
                  <Image
                    src={userData?.image}
                    className="aspect-1 h-12 w-12 rounded-full object-cover text-gray-900"
                    alt=""
                    width={100}
                    height={100}
                  />
                ) : (
                  <Image
                    src={"/Default_pfp.png"}
                    className="aspect-1 h-12 w-12 rounded-full object-cover text-gray-900"
                    alt=""
                    width={100}
                    height={100}
                  />
                )}

                <button
                  onClick={() => openDialog("updateUser")}
                  className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Update
                </button>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Name
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900"> {userData?.name}</div>
                <button
                  type="button"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                  onClick={() => openDialog("updateUser")}
                >
                  Update
                </button>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Email address
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{userData?.email}</div>
                <button
                  type="button"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                  onClick={() => openDialog("updateUser")}
                >
                  Update
                </button>
              </dd>
            </div>
          </dl>
        )}
      </div>
    </>
  );
}
