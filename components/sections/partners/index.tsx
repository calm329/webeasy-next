import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/select-template-carousel";
import { CardContent } from "@/components/ui/card";
import { Card } from "@/components/ui/card/general-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import AddSectionButtons from "@/components/add-section/buttons";
import { TSection, TSectionsType } from "@/types";
import EditComponent from "@/components/edit-component";

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
  setSections: Dispatch<SetStateAction<TSectionsType[]>>
  sections:TSectionsType[]
  id:string
};

const PartnersSection = ({
  editable,
  setIsOpen,
  setSection,
  setShowForm,
  setSectionModal,
  setTriggerSection,
  showForm,
  sections,
  setSections,
  id
}: TProps) => {
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();

  const partnersContent = appState?.aiContent?.partners;

  const handleSectionClick = () => {
    if (setIsOpen && setSection) {
      setIsOpen(true);
      setSection("Partners");
      setShowForm({ show: false, edit: "", form: "" });
      dispatch(
        updateAppState({
          ...appState,
          openedSlide: "Customize",
        }),
      );
    }
  };

  let contentToRender;

  if (!partnersContent) {
    contentToRender = (
      <div className="flex flex-col gap-5">
        <Skeleton className="h-12 w-1/4" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-1/2" />
        </div>
        <div className="">
          <div
            className="flex h-full w-full overflow-hidden"
            style={{
              mask: "linear-gradient(90deg, transparent, white 5%, white 95%, transparent)",
            }}
          >
            <div className="flex w-full items-center justify-center gap-10">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="relative flex h-24 w-auto flex-shrink-0 rounded-lg p-2 transition-all md:h-16 md:rounded-xl lg:rounded-2xl"
                >
                  <Skeleton style={{ height: 100, width: 300 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (!partnersContent.show) {
    contentToRender = (
      <button
        className={`h-[100px] ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
        onClick={handleSectionClick}
      ></button>
    );
  } else {
    contentToRender = (
      <button
        className={`group relative flex flex-col gap-5 text-left ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
        onClick={handleSectionClick}
      >
        <AddSectionButtons
          setSectionModal={setSectionModal}
          setTriggerSection={setTriggerSection}
          id={id}
        />
        <h2 className="text-3xl font-bold text-gray-900">
          {partnersContent.title}
        </h2>
        <p>{partnersContent.description}</p>
        <div className="inline-edit my-10 flex-1 px-5 md:px-6">
          {partnersContent.list.length <= 5 ? (
            <div className="flex w-full overflow-auto">
              <div className="flex gap-10">
                {partnersContent.list.map((src, index) => (
                  <div
                    key={src.id}
                    className="relative flex  w-auto flex-shrink-0 rounded-lg p-2 transition-all  md:rounded-xl lg:rounded-2xl"
                  >
                    <Image
                      className=" object-contain grayscale transition-all duration-300 hover:grayscale-0"
                      src={src.logo}
                      alt={`Logo ${index + 1}`}
                      height={200}
                      width={200}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Carousel className="w-full">
              <CarouselContent>
                {partnersContent.list.map((src, index) => (
                  <CarouselItem key={src.id} className="basis-1/5 max-xl:basis-1/4 max-lg:basis-1/3 max-md:basis-1/2 max-sm:basis-1/1">
                    <div className="p-1">
                      <Card className="border-0">
                        <CardContent className="flex border-0 p-6">
                          <div className="relative flex h-24 flex-shrink-0 rounded-lg p-2 transition-all md:h-16 md:rounded-xl lg:rounded-2xl">
                            <Image
                              className="h-24 object-contain grayscale transition-all duration-300 hover:grayscale-0"
                              src={src.logo}
                              alt={`Logo ${index + 1}`}
                              height={200}
                              width={200}
                              onClick={() => window.open(src.link, "_blank")}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <button onClick={(e) => e.stopPropagation()}>
                <CarouselPrevious />
              </button>
              <button onClick={(e) => e.stopPropagation()}>
                <CarouselNext />
              </button>
            </Carousel>
          )}
        </div>
      </button>
    );
  }

  return (
    <section className={` container relative mb-20 mt-20 group`}>
      <EditComponent id={id} sections={sections} setSections={setSections}/>
      {contentToRender}
    </section>
  );
};

export default PartnersSection;
