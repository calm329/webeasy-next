import Image from "next/image";
import { ImSpinner2 } from "react-icons/im";

export default function Loader({ text }: { text: string }) {
  // Prevent scrolling when loader is active
  if (typeof window !== "undefined") {
    if (text) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-30">
      {/* Translucent Background */}
      <div className="fixed inset-0 bg-black opacity-30 backdrop-filter backdrop-blur-lg z-10"></div>
   
      {/* Loader Container */}
      <div className="relative flex flex-col items-center z-20">
        {/* Spinning Border */}
        <div className="rounded-full border-4 border-white bg-white animate-spin-slow w-32 h-32 p-2 flex justify-center items-center relative">
          {/* Logo */}
          <div className="animate-spin text-lg text-white absolute h-40 w-40 border-2 border-l-0 rounded-full"  />
          <div className="  w-16 h-16 overflow-hidden flex justify-center items-center mr-2">
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
       
        <div className="mt-4 text-white  text-xl">{text}</div>
      </div>
    </div>
  );
}
