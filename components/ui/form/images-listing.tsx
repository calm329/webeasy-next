import React, { SetStateAction, useEffect, useState } from "react";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getAllUnsplashImages } from "@/lib/utils/function";
import Image from "next/image";

type TProps = {
  selectedImage: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImagesListing = (props: TProps) => {
  const { selectedImage, setOpen } = props;
  const appState = useAppSelector(AS);
  const [images, setImages] = useState([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    getAllUnsplashImages(appState.aiContent?.businessType ?? "").then(
      (images) => {
        setImages(images);
      },
    );
  }, [appState]);
  console.log("images", images);
  return (
    <div className="mt-10 grid grid-cols-3 gap-10">
      {images?.map((data: any, i) => (
        <div
          key={i}
          className="relative h-44 cursor-pointer hover:border hover:border-indigo-600 hover:shadow-xl"
          onClick={() => {
            dispatch(
              updateAppState({
                ...appState,
                aiContent: {
                  ...appState.aiContent,
                  gallery: {
                    ...appState.aiContent.gallery,
                    list: appState.aiContent.gallery.list.map((image, i) => {
                      if (parseInt(selectedImage) === i) {
                        return data.urls.small;
                      } else {
                        return image;
                      }
                    }),
                  },
                },
              }),
            );
            setOpen(false);
          }}
        >
          <Image
            alt=""
            src={data.urls.small}
            height={200}
            width={200}
            className=" absolute h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ImagesListing;
