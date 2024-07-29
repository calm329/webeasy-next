import AddSectionButtons from '@/components/add-section/buttons';
import EditComponent from '@/components/edit-component';
import { CardContent } from '@/components/ui/card';
import { Card } from '@/components/ui/card/general-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/select-template-carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { sectionsData as SD } from '@/lib/store/slices/section-slice';
import { appState as AS, updateAppState } from '@/lib/store/slices/site-slice';
import { BROKEN_IMAGE } from '@/lib/utils/common-constant';
import { TSection } from '@/types';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';

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

  id: string;
};

const PartnersSection = ({
  editable,
  setIsOpen,
  setSection,
  setShowForm,
  setSectionModal,
  setTriggerSection,
  showForm,

  id,
}: TProps) => {
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();

  const partnersContent = appState?.aiContent?.partners;

  const handleSectionClick = () => {
    if (setIsOpen && setSection) {
      setIsOpen(true);
      setSection('Partners');
      setShowForm({ show: false, edit: '', form: '' });
      dispatch(
        updateAppState({
          ...appState,
          openedSlide: 'Customize',
        })
      );
    }
  };

  let contentToRender;

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
      container: 'flex flex-col gap-5 text-left ',
      listContainer: 'flex gap-10',
      contentContainer: 'flex flex-col gap-5',
      listCard:
        'relative flex  w-auto flex-shrink-0 rounded-lg p-2 transition-all  md:rounded-xl lg:rounded-2xl',
    },
    2: {
      container: 'flex  gap-10 text-left justify-between w-full  items-center',
      listContainer: 'grid grid-cols-2  gap-10 ',
      contentContainer: 'flex flex-col gap-5 w-1/2 ',
      listCard:
        'relative flex  w-auto flex-shrink-0 rounded-lg p-2 transition-all  md:rounded-xl lg:rounded-2xl',
    },
    3: {
      container: 'flex flex-col gap-5 text-center ',
      listContainer: 'flex gap-10',
      contentContainer: 'flex flex-col gap-5',
      listCard:
        'relative flex  w-auto flex-shrink-0 rounded-lg p-2 transition-all  md:rounded-xl lg:rounded-2xl',
    },
    4: {
      container:
        'flex  gap-10 text-left flex-row-reverse justify-between w-full  items-center',
      listContainer: 'grid grid-cols-2  gap-10 ',
      contentContainer: 'flex flex-col gap-5 w-1/2 ',
      listCard:
        'relative flex  w-auto flex-shrink-0 rounded-lg p-2 transition-all  md:rounded-xl lg:rounded-2xl',
    },
    5: {
      container: 'flex flex-col gap-5 text-left ',
      listContainer: 'flex gap-10',
      contentContainer: 'flex flex-col gap-5',
      listCard:
        'relative flex  w-auto flex-shrink-0 rounded-lg p-2 transition-all  md:rounded-xl lg:rounded-2xl',
    },
  };

  const { container, listContainer, listCard, contentContainer } =
    styles[variation];

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
              mask: 'linear-gradient(90deg, transparent, white 5%, white 95%, transparent)',
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
        className={`h-[100px] ${editable && 'rounded border-2 border-transparent hover:border-indigo-500'}`}
        onClick={handleSectionClick}
      ></button>
    );
  } else {
    contentToRender = (
      <button
        className={`${container} ${editable && ' group relative rounded border-2 border-transparent hover:border-indigo-500'}`}
        onClick={handleSectionClick}
      >
        <EditComponent id={id} />
        <AddSectionButtons
          setSectionModal={setSectionModal}
          setTriggerSection={setTriggerSection}
          id={id}
        />
        <div className={contentContainer}>
          <h2 className="text-3xl font-bold text-gray-900">
            {partnersContent.title}
          </h2>
          <p>{partnersContent.description}</p>
        </div>
        <div className="inline-edit  flex-1 px-5 md:px-6">
          {partnersContent.list.length <= 5 ? (
            <div className="flex w-full overflow-auto">
              <div className={listContainer}>
                {partnersContent.list.map((src, index) =>
                  src.link ? (
                    <a
                      key={src.id}
                      className={listCard}
                      href={src.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image
                        className=" aspect-1 object-contain  grayscale transition-all duration-300 hover:grayscale-0"
                        src={src.logo || BROKEN_IMAGE}
                        alt={`Logo ${index + 1}`}
                        height={200}
                        width={200}
                      />
                    </a>
                  ) : (
                    <div key={src.id} className={listCard}>
                      <Image
                        className=" aspect-1 object-contain  grayscale transition-all duration-300 hover:grayscale-0"
                        src={src.logo || BROKEN_IMAGE}
                        alt={`Logo ${index + 1}`}
                        height={200}
                        width={200}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            <Carousel className="w-full">
              <CarouselContent>
                {partnersContent.list.map((src, index) => (
                  <CarouselItem
                    key={src.id}
                    className="max-sm:basis-1/1 basis-1/5 max-xl:basis-1/4 max-lg:basis-1/3 max-md:basis-1/2"
                  >
                    <div className="p-1">
                      <Card className="border-0">
                        <CardContent className="flex border-0 p-6">
                          {src.link ? (
                            <a
                              href={src.link}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                cursor: 'pointer',
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="relative flex flex-shrink-0 rounded-lg p-2 transition-all md:rounded-xl lg:rounded-2xl"
                            >
                              <Image
                                className="h-24 object-contain grayscale transition-all duration-300 hover:grayscale-0"
                                src={src.logo || BROKEN_IMAGE}
                                alt={`Logo ${index + 1}`}
                                height={200}
                                width={200}
                              />
                            </a>
                          ) : (
                            <div className="relative flex flex-shrink-0 rounded-lg p-2 transition-all md:rounded-xl lg:rounded-2xl">
                              <Image
                                className="h-24 object-contain grayscale transition-all duration-300 hover:grayscale-0"
                                src={src.logo || BROKEN_IMAGE}
                                alt={`Logo ${index + 1}`}
                                height={200}
                                width={200}
                              />
                            </div>
                          )}
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
    <section className={` group container relative mb-20 mt-20`}>
      {contentToRender}
    </section>
  );
};

export default PartnersSection;
