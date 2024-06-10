import Image from "next/image";
import React from "react";
type TProps = {
  data:any
}
const ImageGallery = (props:TProps) => {
    const { data } = props;
  return (
    <div className={`sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 mx-auto max-w-2xl `}>
      <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
        <Image
          src={data.images?.primary?.Large?.URL??""}
          alt="Two each of gray, white, and black shirts laying flat."
          className="h-full w-full object-contain object-center"
          height={400}
          width={400}
        />
      </div>
      <div className={"hidden lg:grid lg:grid-cols-1 lg:gap-y-8"}>
        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg flex-1">
          <Image
            src={
              data?.images?.variant[0]?.Large?.URL ??
              data?.images?.primary?.Large?.URL??""
            }
            alt="Model wearing plain black basic tee."
            className="h-full w-full object-contain object-center"
            height={200}
            width={200}
          />
        </div>
        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg flex-1">
          <Image
            src={
              data?.images?.variant[1]?.Large?.URL ??
              data?.images?.primary?.Large?.URL??""
            }
            alt="Model wearing plain gray basic tee."
            className="h-full w-full object-contain object-center"
            height={200}
            width={200}
          />
        </div>
      </div>
      <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
        <Image
          src={
            data?.images?.variant[2]?.Large?.URL ??
            data?.images?.primary?.Large?.URL??""
          }
          alt="Model wearing plain white basic tee."
          className="h-full w-full object-contain object-center"
          height={400}
          width={400}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
