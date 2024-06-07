import { useAppSelector } from "@/lib/store/hooks";
import { amazonData as AD } from "@/lib/store/slices/amazon-slice";
import Image from "next/image";
import React from "react";

const ImageGallery = () => {
  const amazonData = useAppSelector(AD);
  console.log("amazonData", amazonData);
  return (
    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
        <Image
          src={amazonData.Images.Variants[0].Large.URL}
          alt="Two each of gray, white, and black shirts laying flat."
          className="h-full w-full object-cover object-center"
          height={400}
          width={400}
        />
      </div>
      <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          <Image
            src={amazonData.Images.Variants[1].Large.URL}
            alt="Model wearing plain black basic tee."
            className="h-full w-full object-cover object-center"
            height={200}
            width={200}
          />
        </div>
        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          <Image
            src={amazonData.Images.Variants[2].Large.URL}
            alt="Model wearing plain gray basic tee."
            className="h-full w-full object-cover object-center"
            height={200}
            width={200}
          />
        </div>
      </div>
      <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
        <Image
          src={amazonData.Images.Variants[3].Large.URL}
          alt="Model wearing plain white basic tee."
          className="h-full w-full object-cover object-center"
          height={400}
          width={400}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
