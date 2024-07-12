import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { TSection } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import AddSectionButtons from "@/components/add-section/buttons";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

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
};

const ImageGallerySection = ({
  editable,
  setIsOpen,
  setSection,
  setShowForm,
  setSectionModal,
  setTriggerSection,
  showForm,
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
      <div className="grid grid-cols-3 gap-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {galleryList.map((image, i) => (
          <button
            key={image}
            className={`${editable && "rounded-xl border-2 border-transparent hover:border-indigo-500"} h-[400px] w-[400px] rounded-lg border border-gray-300 shadow-lg max-sm:mx-0`}
            onClick={handleClick}
          >
            <Image
              src={image}
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

  const isGalleryActive = galleryShow ? galleryContent : skeletonContent;

  return (
    <section className="flex justify-center">
      <button
        className={`${editable && "group relative rounded-xl border-2 border-transparent hover:border-indigo-500"} container mb-20 mt-20`}
        onClick={handleClick}
      >
        <AddSectionButtons
          classNameUp="top-0"
          setSectionModal={setSectionModal}
          setTriggerSection={setTriggerSection}
          sectionTitle="Image Gallery Section"
        />
        {galleryList ? isGalleryActive : skeletonContent}
      </button>
    </section>
  );
};

export default ImageGallerySection;
