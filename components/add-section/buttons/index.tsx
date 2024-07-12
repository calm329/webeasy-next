import React, { Dispatch, SetStateAction } from "react";
import { appState as AS } from '@/lib/store/slices/site-slice';
import { useAppSelector } from "@/lib/store/hooks";

type TProps = {
  setSectionModal: Dispatch<SetStateAction<boolean>>;
  setTriggerSection: Dispatch<
    SetStateAction<{
      section: string;
      position: number;
    }>
  >;
  sectionTitle: string;
  classNameUp?: string;
  classNameDown?: string;
};

const AddSectionButtons = ({
  setSectionModal,
  setTriggerSection,
  sectionTitle,
  classNameUp,
  classNameDown,
}: TProps) => {
  const appState = useAppSelector(AS)
  return (
    <>
      <button
        className={`z-1  top-0 absolute left-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform rounded-xl border bg-indigo-500 px-5 py-2 text-white group-hover:flex  ${classNameUp}`}
        onClick={(e) => {
          e.stopPropagation();
          setSectionModal(true);
          setTriggerSection({
            position: 0,
            section: sectionTitle,
          });
        }}
        disabled={appState?.generate?.generating}
      >
        + Add Section
      </button>
      <button
        className={`z-1 absolute -bottom-10 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform rounded-xl border bg-indigo-500 px-5 py-2 text-white group-hover:flex ${classNameDown}`}
        onClick={(e) => {
          e.stopPropagation();
          setSectionModal(true);
          setTriggerSection({
            position: 1,
            section: sectionTitle,
          });
        }}
        disabled={appState?.generate?.generating}
      >
        {" "}
        + Add Section
      </button>
    </>
  );
};

export default AddSectionButtons;
