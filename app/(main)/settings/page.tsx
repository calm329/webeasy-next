"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { getUserById } from "@/lib/fetchers";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import { FormField, TFields } from "@/types";
import UserModal from "@/components/modal/user-modal";
import { UserDrawer } from "@/components/drawer/user-drawer";
import { useMediaQuery } from "usehooks-ts";

export type TUser = {
  id: string;
  name: string;
  image: string | null;
  emailVerified: boolean | null;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
} | null;

export default function General() {
  const { data: session } = useSession();
  const [user, setUser] = useState<TUser>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<TFields>(null);
  const getUserData = async () => {
    setLoading(true);
    try {
      const user = await getUserById();
      console.log("user", user);
      setUser({ ...user });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (session?.user?.email) {
    getUserData();
    // }
  }, []);
  const matches = useMediaQuery("(max-width: 1024px)");
  return (
    <>
      {matches ? (
        <UserDrawer
          open={open}
          setOpen={setOpen}
          user={user}
          getUserData={getUserData}
        />
      ) : (
        <UserModal
          open={open}
          setOpen={setOpen}
          user={user}
          getUserData={getUserData}
        />
      )}
      <main className="px-4 py-10 sm:px-6 lg:flex-auto lg:px-0 lg:py-10">
        <div className="mx-auto max-w-2xl space-y-16 max-lg:m-0 max-lg:max-w-full sm:space-y-20 lg:mx-0 lg:max-w-none">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>
            {loading ? (
              <div className="flex h-96 items-center justify-center ">
                <Loader text="Fetching User Data" />
              </div>
            ) : (
              <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Avatar
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    {user?.image ? (
                      <Image
                        src={user?.image}
                        className="aspect-1 h-12 w-12 rounded-full object-cover text-gray-900"
                        alt=""
                        width={100}
                        height={100}
                      />
                    ) : (
                      <Image
                        src={"/Default_pfp.svg"}
                        className="aspect-1 h-12 w-12 rounded-full object-cover text-gray-900"
                        alt=""
                        width={100}
                        height={100}
                      />
                    )}

                    <button
                      onClick={() => setOpen("avatar")}
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
                    <div className="text-gray-900"> {user?.name}</div>
                    <button
                      type="button"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                      onClick={() => setOpen("name")}
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
                    <div className="text-gray-900">{user?.email}</div>
                    <button
                      type="button"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                      onClick={() => setOpen("email")}
                    >
                      Update
                    </button>
                  </dd>
                </div>
              </dl>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
