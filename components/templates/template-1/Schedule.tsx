"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import { BackgroundImage } from "./BackgroundImage";
import { Container } from "./Container";

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

const services = {
  title: "Our Services",
  description: "Delivering Graceful Moments with Floral Art",
  list: [
    {
      name: "Custom Floral Arrangements",
      description:
        "Tailor-made arrangements that marry simplicity with elegance, perfect for every occasion from weddings to corporate events.",
      image: "url-to-service1-image.jpg",
    },
    {
      name: "Digital Floral Artistry",
      description:
        "Our expertly crafted digital images bring the delicate beauty of blooms to your digital spaces, ideal for creating serene backdrops and inspired settings.",
      image: "url-to-service2-image.jpg",
    },
    {
      name: "Romantic Floral Sets",
      description:
        "Experience the enchantment of meticulously designed floral sets that evoke romance and elegance, making every moment unforgettable.",
      image: "url-to-service3-image.jpg",
    },
    {
      name: "Seasonal Bloom Collections",
      description:
        "Explore the vibrant colors and fragrant scents of our seasonal bloom collections curated to reflect the beauty of each season.",
      image: "url-to-service4-image.jpg",
    },
  ],
};

const schedule: Array<Day> = [
  {
    date: "April 4",
    dateTime: "2022-04-04",
    summary:
      "The first day of the conference is focused on dark patterns for ecommerce.",
    timeSlots: [
      {
        name: "Steven McHail",
        description: "Not so one-time payments",
        start: "9:00AM",
        end: "10:00AM",
      },
      {
        name: "Jaquelin Isch",
        description: "The finer print",
        start: "10:00AM",
        end: "11:00AM",
      },
      {
        name: "Dianne Guilianelli",
        description: "Post-purchase blackmail",
        start: "11:00AM",
        end: "12:00PM",
      },
      {
        name: "Lunch",
        description: null,
        start: "12:00PM",
        end: "1:00PM",
      },
      {
        name: "Ronni Cantadore",
        description: "Buy or die",
        start: "1:00PM",
        end: "2:00PM",
      },
      {
        name: "Erhart Cockrin",
        description: "In-person cancellation",
        start: "2:00PM",
        end: "3:00PM",
      },
      {
        name: "Parker Johnson",
        description: "The pay/cancel switcheroo",
        start: "3:00PM",
        end: "4:00PM",
      },
    ],
  },
  {
    date: "April 5",
    dateTime: "2022-04-05",
    summary:
      "Next we spend the day talking about deceiving people with technology.",
    timeSlots: [
      {
        name: "Damaris Kimura",
        description: "The invisible card reader",
        start: "9:00AM",
        end: "10:00AM",
      },
      {
        name: "Ibrahim Frasch",
        description: "Stealing fingerprints",
        start: "10:00AM",
        end: "11:00AM",
      },
      {
        name: "Cathlene Burrage",
        description: "Voting machines",
        start: "11:00AM",
        end: "12:00PM",
      },
      {
        name: "Lunch",
        description: null,
        start: "12:00PM",
        end: "1:00PM",
      },
      {
        name: "Rinaldo Beynon",
        description: "Blackhat SEO that works",
        start: "1:00PM",
        end: "2:00PM",
      },
      {
        name: "Waylon Hyden",
        description: "Turning your audience into a botnet",
        start: "2:00PM",
        end: "3:00PM",
      },
      {
        name: "Giordano Sagucio",
        description: "Fly phishing",
        start: "3:00PM",
        end: "4:00PM",
      },
    ],
  },
  {
    date: "April 6",
    dateTime: "2022-04-06",
    summary:
      "We close out the event previewing new techniques that are still in development.",
    timeSlots: [
      {
        name: "Andrew Greene",
        description: "Neuralink dark patterns",
        start: "9:00AM",
        end: "10:00AM",
      },
      {
        name: "Heather Terry",
        description: "DALL-E for passports",
        start: "10:00AM",
        end: "11:00AM",
      },
      {
        name: "Piers Wilkins",
        description: "Quantum password cracking",
        start: "11:00AM",
        end: "12:00PM",
      },
      {
        name: "Lunch",
        description: null,
        start: "12:00PM",
        end: "1:00PM",
      },
      {
        name: "Gordon Sanderson",
        description: "SkyNet is coming",
        start: "1:00PM",
        end: "2:00PM",
      },
      {
        name: "Kimberly Parsons",
        description: "Dark patterns for the metaverse",
        start: "2:00PM",
        end: "3:00PM",
      },
      {
        name: "Richard Astley",
        description: "Knowing the game and playing it",
        start: "3:00PM",
        end: "4:00PM",
      },
    ],
  },
];

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
