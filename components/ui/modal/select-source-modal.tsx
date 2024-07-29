import React from "react";
import { FaAmazon, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function SelectSourceContent() {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <Image
        className="mx-auto h-10 w-auto"
        src="/WebEasy-logo-dark.svg"
        alt="Your Company"
        height={40}
        width={200}
      />
      <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Select the content source
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-4">
        <Link
          href={`${process.env.NEXT_PUBLIC_INSTAGRAM_API_AUTH_ENDPOINT}authorize?client_id=${process.env.NEXT_PUBLIC_FB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_FB_REDIRECT_URL}&scope=user_profile,user_media&response_type=code`}
          className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
        >
          <FaInstagram className="size-5 text-[#4267B2]" />
          <span className="text-sm font-semibold leading-6">Instagram</span>
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4">
        <Link
          href="/website-builder/amazon"
          className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
        >
          <FaAmazon className="size-5" />
          <span className="text-sm font-semibold leading-6">Amazon</span>
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4">
        <Link
          href="/website-builder"
          className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
        >
          <span className="text-sm font-semibold leading-6">Custom</span>
        </Link>
      </div>
    </div>
  );
}
