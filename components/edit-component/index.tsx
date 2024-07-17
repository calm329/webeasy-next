import React, { Dispatch, SetStateAction } from "react";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { VscLayoutSidebarLeft } from "react-icons/vsc";
import { BsThreeDots } from "react-icons/bs";
import { TSection } from "@/types";


const EditComponent = () => {
    
  return (
    <div className="group-hover:flex hidden absolute rounded-xl bg-white shadow p-5 gap-5 border right-0 top-0 z-10">
      <button>Restyle</button>
      <button>Regenerate images</button>
      <FaArrowUpLong />
      <FaArrowDownLong />
      <VscLayoutSidebarLeft />
      <BsThreeDots />
    </div>
  );
};

export default EditComponent;
