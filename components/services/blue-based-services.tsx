"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import clsx from "clsx";

import { Container } from "@/components/container";
import Image from "next/image";
import { TColors, TFields, TSection } from "@/types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { appState } from "../../lib/store/slices/site-slice";
import { Skeleton } from "@/components/ui/skeleton";

export function BackgroundImage({
  className,
  position = "left",
}: {
  className?: string;
  position?: "left" | "right";
}) {
  return (
    <div
      className={clsx(
        "absolute inset-0 overflow-hidden bg-indigo-50",
        className,
      )}
    >
      <Image
        className={clsx(
          "absolute top-0",
          position === "left" &&
            "left-0 translate-x-[-55%] translate-y-[-10%] -scale-x-100 sm:left-1/2 sm:translate-x-[-98%] sm:translate-y-[-6%] lg:translate-x-[-106%] xl:translate-x-[-122%]",
          position === "right" &&
            "left-full -translate-x-1/2 sm:left-1/2 sm:translate-x-[-20%] sm:translate-y-[-15%] md:translate-x-0 lg:translate-x-[5%] lg:translate-y-[4%] xl:translate-x-[27%] xl:translate-y-[-8%]",
        )}
        src={"/images/background.jpg"}
        alt=""
        width={918}
        height={1495}
        priority
        unoptimized
      />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
    </div>
  );
}

interface Day {
  date: React.ReactNode;
  dateTime: string;
  summary: string;
  timeSlots: Array<{
    name: string;
    description: string | null;
    start: string;
    end: string;
  }>;
}

type TProps = {
  colors: TColors;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
  showForm?: {
    form: string;
    edit: string;
    show: boolean;
  };
  setShowForm?: React.Dispatch<
    React.SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
  services: any[];
};

export function Services(props: TProps) {
  const { services, colors, setIsOpen, setSection, editable, setShowForm } =
    props;
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
  return (
    <section id="schedule" aria-label="Schedule" className="py-14">
      <div className="relative ">
        <BackgroundImage position="right" />

        <Container
          className={`relative ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
          onClick={() => {
            if (setIsOpen && setSection) {
              setIsOpen(true);
              setSection("Services");
              dispatch(
                updateAppState({
                  ...appState,
                  openedSlide: "Customize",
                }),
              );
            }
          }}
        >
          <div className="grid  lg:gap-x-8">
            {/* <DaySummary day={day} /> */}
            {appState?.aiContent?.services?.show && (
              <ol
                role="list"
                className={
                  " mt-10  space-y-8 bg-white px-10 py-14 text-center shadow-xl shadow-blue-900/5"
                }
              >
                {services?.map((data, i) => (
                  <li
                    key={i}
                    className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                    onClick={(e) => {
                      setShowForm &&
                        setShowForm({
                          edit: data.id,
                          form: "Service",
                          show: true,
                        });
                    }}
                  >
                    {i > 0 && (
                      <div className="mx-auto mb-8 h-px  border-b-2 border-gray-400 bg-white" />
                    )}
                    <h4 className="text-lg font-semibold tracking-tight text-blue-900">
                      {data.name}
                    </h4>
                    {data.description && (
                      <p className="mt-1 tracking-tight text-blue-900">
                        {data.description}
                      </p>
                    )}
                  </li>
                ))}

                {Array.from({ length: 6 })?.map(
                  (data, i) =>
                    (services?.length ?? 0) < i && (
                      <li key={i}>
                        {i > 0 && (
                          <div className="mx-auto  mb-8 h-px  border-b-2 border-gray-400 bg-white" />
                        )}
                        <h4 className="mx-auto text-center text-lg font-semibold tracking-tight text-blue-900">
                          <Skeleton className="h-12 w-44 border-gray-400" />
                        </h4>

                        <p className="mt-1 flex flex-col gap-2 text-center tracking-tight text-blue-900">
                          <Skeleton className="h-10 w-44 border-gray-400" />
                          <Skeleton className="h-10 w-20 border-gray-400" />
                        </p>
                      </li>
                    )
                )}
              </ol>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
