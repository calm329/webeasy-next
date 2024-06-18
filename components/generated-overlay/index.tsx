import React, { useEffect } from "react";

const GeneratedOverlay = () => {
  useEffect(() => {
    window.document.body.style.overflow = "hidden";
    return () => {
      window.document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="overlay-animate absolute z-50 w-full  backdrop-blur text-2xl font-bold justify-center flex items-center text-white">
      Site Generation Complete
    </div>
  );
};

export default GeneratedOverlay;
