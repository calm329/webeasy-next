import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { Dispatch, SetStateAction } from "react";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { TSection, TSectionsType } from "@/types";
import AddSectionButtons from "@/components/add-section/buttons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/select-template-carousel";
import Image from "next/image";
import EditComponent from "@/components/edit-component";
import { BROKEN_IMAGE } from "@/lib/utils/common-constant";
import { sectionsData as SD } from '@/lib/store/slices/section-slice';

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

  id:string
};

const CustomTestimonial = ({
  editable,
  setIsOpen,
  setSection,
  setShowForm,
  setSectionModal,
  setTriggerSection,

  id
}: TProps) => {
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (setIsOpen && setSection) {
      setIsOpen(true);
      setSection("Testimonials");
      console.log("clickcing")
      setShowForm({ show: false, edit: "", form: "" });
      dispatch(
        updateAppState({
          ...appState,
          openedSlide: "Customize",
        })
      );
    }
  };

  const sections = useAppSelector(SD);

  // Find the section by ID and get the variation
  const section = sections.find((section) => section.id === id);
  const variation = section?.variation || 1;

  const styles: {
    [key: number]: {
      container: string;
      listContainer: string;
      contentContainer: string;
      listCard: string;
    };
  } = {
    1: {
      container: "",
      listContainer: "flex flex-col gap-10",
      contentContainer: "flex flex-col gap-5",
      listCard: "flex flex-col gap-10",
    },
    2: {
      container: "md:basis-1/2 lg:basis-1/3",
      listContainer: "flex gap-10",
      contentContainer: "flex flex-col gap-5",
      listCard: "flex flex-col gap-10",
    },
    3: {
      container: "",
      listContainer: "grid grid-cols-2  gap-10 ",
      contentContainer: "flex flex-col gap-5",
      listCard: "flex  gap-10",
    },
    
    4: {
      container: "",
      listContainer: "flex flex-row-reverse gap-10",
      contentContainer: "flex flex-col gap-5",
      listCard: "flex flex-row-reverse gap-10",
    },
    5: {
      container: "md:basis-1/2 lg:basis-1/3",
      listContainer: "flex gap-10",
      contentContainer: "flex flex-col gap-5",
      listCard: "flex flex-col gap-10",
    },
  };
  console.log(variation)
  const { container, listContainer, listCard, contentContainer } =
    styles[5];


  const renderTestimonials = () => (
    <Carousel className="h-full w-full">
      <CarouselContent>
        {appState.aiContent.testimonials.list.map((testimonial) => (
          <CarouselItem key={testimonial.id} className={container}>
            <button
              className="h-full w-full text-justify rounded-lg border border-gray-300 p-8 shadow-lg"
              onClick={handleClick}
            >
              <div className={listCard}>
                <div className="h-30 w-30 overflow-hidden">
                  <Image
                    src={testimonial.avatar || BROKEN_IMAGE}
                    alt={testimonial.name}
                    height={100}
                    width={100}
                    className="h-[100px] w-[100px] rounded-full object-cover"
                  />
                </div>
                <div className={contentContainer}>
                <h3 className="text-3xl font-bold">{testimonial.name}</h3>
                <p className="text-xl">{testimonial.content}</p>
                </div>
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
      className={`group container relative  mb-20 mt-20 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
    >
      <EditComponent id={id} />
      <AddSectionButtons
        classNameDown="z-10"
        classNameUp="top-0 z-10"
        setSectionModal={setSectionModal}
        setTriggerSection={setTriggerSection}
        id={id} 
      />
      {content}
    </section>
  );
};

export default CustomTestimonial;
