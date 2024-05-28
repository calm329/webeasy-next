import Image from "next/image";
import React from "react";

const AiAssist = () => {
  return (
    <div className="flex flex-col items-center gap-2 ml-3 mt-1">
      <Image src={"/ai.png"} height={25} width={25} alt="ai" />
      <span className="rounded-m inline-flex flex-col items-center  justify-center gap-2  text-sm font-semibold text-black max-sm:text-xs">
        AI Assist
      </span>
    </div>
  );
};

export default AiAssist;
