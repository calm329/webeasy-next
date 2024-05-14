"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import { Container } from "@/components/container";
import Image from "next/image";

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
  colors: {
    primary: string;
    secondary: string;
  };
  services: any[];
};

export function Schedule(props: TProps) {
  const { services, colors } = props;
  return (
    <section id="schedule" aria-label="Schedule" className="py-20 sm:py-32">
      <div className="relative mt-14 sm:mt-24">
        <BackgroundImage position="right" className="-bottom-32 -top-40" />
        <Container className="relative">
          <div className="grid  lg:gap-x-8">
            {/* <DaySummary day={day} /> */}
            <ol
              role="list"
              className={
                " mt-10  space-y-8 bg-white px-10 py-14 text-center shadow-xl shadow-blue-900/5"
              }
            >
              {services?.map((data, i) => (
                <li key={i}>
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
            </ol>
          </div>
        </Container>
      </div>
    </section>
  );
}
