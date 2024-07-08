import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { Dispatch, SetStateAction } from "react";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { TSection } from "@/types";
import AddSectionButtons from "@/components/add-section/buttons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/select-template-carousel";
import Image from "next/image";

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
};

const CustomTestimonial = ({
  editable,
  setIsOpen,
  setSection,
  setShowForm,
  setSectionModal,
  setTriggerSection,
}: TProps) => {
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (setIsOpen && setSection) {
      setIsOpen(true);
      setSection("Testimonials");
      dispatch(
        updateAppState({
          ...appState,
          openedSlide: "Customize",
        })
      );
    }
  };

  const renderTestimonials = () => (
    <Carousel className="h-full w-full">
      <CarouselContent>
        {appState.aiContent.testimonials.list.map((testimonial) => (
          <CarouselItem key={testimonial.id}>
            <button
              className="h-full w-full text-justify rounded-lg border border-gray-300 p-8 shadow-lg"
              onClick={handleClick}
            >
              <div className="flex flex-col gap-5">
                <div className="h-30 w-30 overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    height={100}
                    width={100}
                    className="h-[100px] w-[100px] rounded-full object-cover"
                  />
                </div>
                <h3 className="text-3xl font-bold">{testimonial.name}</h3>
                <p className="text-xl">{testimonial.content}</p>
              </div>
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );

  const renderEmptyState = () => (
    <button
      className={`h-[100px] ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
      onClick={handleClick}
    ></button>
  );

  const renderSkeleton = () => (
    <div className="h-full rounded-lg border border-gray-300 p-8 shadow-lg">
      <div className="flex flex-col gap-5">
        <div className="h-44 w-44 overflow-hidden">
          <Skeleton className="h-[100px] w-[100px] rounded-full object-cover" />
        </div>
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );

  let content;
  if (appState?.aiContent?.testimonials?.list) {
    content = appState.aiContent.testimonials.show ? renderTestimonials() : renderEmptyState();
  } else {
    content = renderSkeleton();
  }

  return (
    <section
      className={`group container relative mb-20 mt-20 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
    >
      <AddSectionButtons
        classNameDown="z-10"
        classNameUp="top-0 z-10"
        setSectionModal={setSectionModal}
        setTriggerSection={setTriggerSection}
        sectionTitle="Testimonial Section"
      />
      {content}
    </section>
  );
};

export default CustomTestimonial;
