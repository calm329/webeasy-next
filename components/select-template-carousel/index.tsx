import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { useMediaQuery } from "usehooks-ts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllTemplates } from "@/lib/fetchers";
import { TTemplate } from "../header";
import Image from "next/image";
import { TTemplateName } from "@/types";

type TProps = {
  templates: TTemplate | null;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<TTemplateName>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SelectTemplateCarousel = (props: TProps) => {
  const { templates, setSelectedTemplate, setOpen } = props;
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [activeIndex, setActiveIndex] = React.useState(0);

  function handleSwitchTemplate() {
    if (templates) {
      const templateData = templates[activeIndex];
      setSelectedTemplate(templateData.name);
      setOpen(false);
    }
  }
  return (
    <div className="flex flex-col gap-5 text-center">
      {!isMobile && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Switch Template
          </h2>
        </div>
      )}
      <Carousel className=" w-full max-w-xs" setActiveIndex={setActiveIndex}>
        <CarouselContent>
          {templates?.map((data, i) => (
            <CarouselItem key={data.id}>
              <div className=" p-1">
                <Card className="">
                  <CardContent className="aspect-square flex h-96 flex-col items-center  justify-center p-6">
                    <Image
                      alt=""
                      src={data.previewUrl}
                      height={400}
                      width={400}
                    />
                    <span className="text-xl font-semibold">{data.name}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <button
        type="submit"
        className={`ml-auto  flex gap-2 rounded-md bg-indigo-600 px-3 py-2  text-sm font-semibold text-white  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 `}
        onClick={handleSwitchTemplate}
      >
        Switch
      </button>
    </div>
  );
};

export default SelectTemplateCarousel;
