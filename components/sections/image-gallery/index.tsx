import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { TSection, TSectionsType } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import AddSectionButtons from "@/components/add-section/buttons";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import EditComponent from "@/components/edit-component";
import { generateUniqueId } from "@/lib/utils/function";
import { BROKEN_IMAGE } from "@/lib/utils/common-constant";

type TProps = {
  editable?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  setShowForm: React.Dispatch<
    SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
  setSectionModal: React.Dispatch<SetStateAction<boolean>>;
  setTriggerSection: React.Dispatch<
    SetStateAction<{ section: string; position: number }>
  >;
  showForm?: {
    form: string;
    edit: string;
    show: boolean;
  };

  id:string
};

const ImageGallerySection = ({
  editable,
  setIsOpen,
  setSection,
  setShowForm,
  setSectionModal,
  setTriggerSection,
  showForm,

  id,
}: TProps) => {
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (setIsOpen && setSection) {
      setIsOpen(true);
      setSection("Image Gallery");
      setShowForm({ show: false, edit: "", form: "" });
      dispatch(
        updateAppState({
          ...appState,
          openedSlide: "Customize",
        }),
      );
    }
  };

  const galleryList = appState?.aiContent?.gallery?.list;
  const galleryShow = appState?.aiContent?.gallery?.show;

  let galleryContent: React.JSX.Element;

  if (galleryList && galleryShow) {
    galleryContent = (
      <div className={`grid  gap-10 ${appState.view === "Tablet" &&"grid-cols-2"} ${appState.view === "Mobile" &&"grid-cols-1"} ${appState.view === "Desktop" &&"grid-cols-3"} max-xl:grid-cols-2 max-md:grid-cols-1`}>
        {galleryList.map((image, i) => (
          <button
            key={image}
            className={`${editable && "rounded-xl border-2 border-transparent hover:border-indigo-500"}  max-h-[400px] max-w-[400px] rounded-lg border border-gray-300 shadow-lg aspect-1 max-sm:mx-0`}
            onClick={handleClick}
          >
            <Image
              src={image || BROKEN_IMAGE}
              alt=""
              height={1000}
              width={1000}
              className="w-full object-cover"
              style={{
                height: 400,
                width: 400,
              }}
            />
          </button>
        ))}
      </div>
    );
  } else {
    galleryContent = (
      <button
        className={`h-[100px] ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
        onClick={handleClick}
      ></button>
    );
  }

  const skeletonContent = (
    <div className="h-[500px] rounded-lg border border-gray-300 p-8 shadow-lg">
      <Skeleton
        className="h-[500px] w-full"
        style={{
          height: 500,
        }}
      />
    </div>
  );


  return (
    <section className="relative flex justify-center group">
  
      <button
        className={`${editable && "group relative rounded-xl border-2 border-transparent hover:border-indigo-500"} container mb-20 mt-20`}
        onClick={handleClick}
      >
            <EditComponent id={id} />
        <AddSectionButtons
          classNameUp="top-0"
          setSectionModal={setSectionModal}
          setTriggerSection={setTriggerSection}
          id={id}
        />
        {galleryList ? galleryContent : skeletonContent}
      </button>
    </section>
  );
};

export default ImageGallerySection;
