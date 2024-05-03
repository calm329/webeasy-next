"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Security() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState();
  return (
    <main className="px-4 py-10 sm:px-6 lg:flex-auto lg:px-0 lg:py-10">
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Security
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            This information is confidential so please don&apos;t share it.
          </p>
          <div className="flex flex-col gap-10">
            <dl className="mt-6 justify-center space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
              <div className="items-center gap-2 pt-6 sm:flex">
                <label
                  htmlFor="current_password"
                  className="font-medium text-gray-900 sm:w-40 sm:flex-none sm:pr-6"
                >
                  Current Password :
                </label>
                <dd className="mt-1 flex max-w-80 justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="******"
                    id="current_password"
                  />
                </dd>
              </div>
              <div className="items-center gap-2 pt-6 sm:flex">
                <label
                  htmlFor="new_password"
                  className="font-medium text-gray-900 sm:w-40 sm:flex-none sm:pr-6"
                >
                  New Password :
                </label>
                <dd className="mt-1 flex max-w-80 justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                    placeholder="******"
                    id="new_password"
                  />
                </dd>
              </div>
            </dl>
            <div className="">
              <button
                type="button"
                className={`mx-auto  flex gap-2 rounded-md px-3 py-2 text-sm  font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "bg-indigo-500" : "bg-indigo-600 hover:bg-indigo-500 "}`}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
