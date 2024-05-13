"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import { BackgroundImage } from "./BackgroundImage";
import { Container } from "@/components/container/Container";

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
