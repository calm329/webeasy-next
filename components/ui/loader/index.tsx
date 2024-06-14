"use client";
import Image from "next/image";
import { useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";

export default function Loader({ text }: { text: string }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-30 flex h-full w-full items-center justify-center">
      {/* Translucent Background */}
      <div className="fixed inset-0 z-10 bg-black opacity-30 backdrop-blur-lg backdrop-filter"></div>

      {/* Loader Container */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Spinning Border */}
        <div className="animate-spin-slow relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-white p-2">
          {/* Logo */}
          <div className="absolute h-40 w-40 animate-spin rounded-full border-2 border-l-0 text-lg text-white" />
          <div className="  mr-2 flex h-16 w-16 items-center justify-center overflow-hidden">
            <Image
              src={"/logo.png"}
              alt="Logo"
              className="object-contain"
              height={64}
              width={64}
            />
          </div>
        </div>

        {/* Text */}

        <div className="mt-4 text-xl  text-white">{text}</div>
      </div>
    </div>
  );
}
