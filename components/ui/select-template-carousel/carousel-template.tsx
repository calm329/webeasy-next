import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { useMediaQuery } from "usehooks-ts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/select-template-carousel";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setSelectedTemplate,
  TemplatesData as TD,
} from "@/lib/store/slices/template-slice";
import { useResponsiveDialog } from "@/lib/context/responsive-dialog-context";

const SelectTemplateCarousel = () => {
  const { closeDialog } = useResponsiveDialog();
  const templates = useAppSelector(TD);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const dispatch = useAppDispatch();
  const sortedTemplates = templates
    ? [...templates].sort((a, b) => a.name.localeCompare(b.name))
    : null;
  function handleSwitchTemplate() {
    if (sortedTemplates) {
      const templateData = sortedTemplates[activeIndex];
      dispatch(setSelectedTemplate(templateData));
      closeDialog("selectTemplate");
    }
  }

  console.log("sortedTemplates", sortedTemplates);
  return (
    <div className="mt-5 flex flex-col gap-5 text-center">
      {!isMobile && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Switch Template
          </h2>
        </div>
      )}
      <Carousel
        className=" mx-auto w-full max-w-xs"
        setActiveIndex={setActiveIndex}
      >
        <CarouselContent>
          {sortedTemplates?.map((data, i) => (
            <CarouselItem key={data.id}>
              <div className=" p-1">
                <Card className="">
                  <CardContent className="aspect-square flex h-56 flex-col items-center  justify-center p-6">
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
