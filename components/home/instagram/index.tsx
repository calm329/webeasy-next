import Link from "next/link";

import React from "react";

const InstagramHomeTab = () => {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 ">
        <div className="mx-auto  max-w-3xl lg:mx-0 lg:flex-shrink-0 ">
          {/* <Image src={tailwindIcon} alt="Your Company" className="h-11 ml-auto" /> */}
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            AI-Powered InstaSite Builder
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Instantly elevate your online presence with our cutting-edge AI
            website builder. Link your Instagram profile and let&apos;s craft
            your exclusive website straight from your feed!
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <div className="flex gap-2">
              <Link
                href="/website-builder/instagram"
                className="mt-auto rounded-md bg-indigo-600 px-10  py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Build
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramHomeTab;
