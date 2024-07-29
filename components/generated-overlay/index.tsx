import React, { useEffect } from "react";

const GeneratedOverlay = () => {
  useEffect(() => {
    window.document.body.style.overflow = "hidden";
    return () => {
      window.document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="overlay-animate absolute z-50 flex  w-full items-center justify-center text-2xl font-bold text-white backdrop-blur">
      Site Generation Complete
    </div>
  );
};

export default GeneratedOverlay;
