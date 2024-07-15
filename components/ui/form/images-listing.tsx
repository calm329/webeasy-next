import React, { SetStateAction, useEffect, useState } from "react";
import { appState as AS } from "@/lib/store/slices/site-slice";
import { useAppSelector } from "@/lib/store/hooks";
import { getAllUnsplashImages } from "@/lib/utils/function";
import Image from "next/image";

type TProps = {
  selectedImage: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const ImagesListing = (props: TProps) => {
  const { selectedImage } = props;
  const appState = useAppSelector(AS);
  const [images, setImages] = useState([]);
  useEffect(() => {
    getAllUnsplashImages(appState.aiContent?.businessType ?? "").then(
      (images) => {
        setImages(images);
      },
    );
  }, [appState]);
  console.log("images",images)
  return (
    <div className="grid grid-cols-3 gap-10">
      {images?.map((data: any, i) => (
        <Image alt="" src={data.urls.full} key={i} height={200} width={200} />
      ))}
    </div>
  );
};

export default ImagesListing;
