"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { Container } from "./Container";

const days = [
  {
    name: "Opening Day",
    date: "April 4",
    dateTime: "2022-04-04",
    speakers: [
      {
        name: "Steven McHail",
        role: "Designer at Globex Corporation",
        image: "/images/avatars/steven-mchail.jpg",
      },
      {
        name: "Jaquelin Isch",
        role: "UX Design at InGen",
        image: "/images/avatars/jaquelin-isch.jpg",
      },
      {
        name: "Dianne Guilianelli",
        role: "General Manager at Initech",
        image: "/images/avatars/dianne-guilianelli.jpg",
      },
      {
        name: "Ronni Cantadore",
        role: "Design Engineer at Weyland-Yutani",
        image: "/images/avatars/ronni-cantadore.jpg",
      },
      {
        name: "Erhart Cockrin",
        role: "Product Lead at Cyberdyne Systems",
        image: "/images/avatars/erhart-cockrin.jpg",
      },
      {
        name: "Parker Johnson",
        role: "UI Designer at MomCorp",
        image: "/images/avatars/parker-johnson.jpg",
      },
    ],
  },
  {
    name: "Speakers & Workshops",
    date: "April 5",
    dateTime: "2022-04-05",
    speakers: [
      {
        name: "Damaris Kimura",
        role: "Senior Engineer at OCP",
        image: "/images/avatars/damaris-kimura.jpg",
      },
      {
        name: "Ibrahim Frasch",
        role: "Programmer at Umbrella Corp",
        image: "/images/avatars/ibrahim-frasch.jpg",
      },
      {
        name: "Cathlene Burrage",
        role: "Frontend Developer at Buy n Large",
        image: "/images/avatars/cathlene-burrage.jpg",
      },
      {
        name: "Rinaldo Beynon",
        role: "Data Scientist at Rekall",
        image: "/images/avatars/rinaldo-beynon.jpg",
      },
      {
        name: "Waylon Hyden",
        role: "DevOps at RDA Corporation",
        image: "/images/avatars/waylon-hyden.jpg",
      },
      {
        name: "Giordano Sagucio",
        role: "Game Developer at Soylent Corp",
        image: "/images/avatars/giordano-sagucio.jpg",
      },
    ],
  },
  {
    name: "Interviews",
    date: "April 6",
    dateTime: "2022-04-06",
    speakers: [
      {
        name: "Andrew Greene",
        role: "Frontend Developer at Ultratech",
        image: "/images/avatars/andrew-greene.jpg",
      },
      {
        name: "Heather Terry",
        role: "Backend Developer at Xanatos Enterprises",
        image: "/images/avatars/heather-terry.jpg",
      },
      {
        name: "Piers Wilkins",
        role: "Full stack Developer at BiffCo",
        image: "/images/avatars/piers-wilkins.jpg",
      },
      {
        name: "Gordon Sanderson",
        role: "Mobile Developer at Cobra Industries",
        image: "/images/avatars/gordon-sanderson.jpg",
      },
      {
        name: "Kimberly Parsons",
        role: "Game Developer at Tyrell Corporation",
        image: "/images/avatars/kimberly-parsons.jpg",
      },
      {
        name: "Richard Astley",
        role: "CEO at Roll Out",
        image: "/images/avatars/richard-astley.jpg",
      },
    ],
  },
];

function ImageClipPaths({
  id,
  ...props
}: React.ComponentPropsWithoutRef<"svg"> & { id: string }) {
  return (
    <svg aria-hidden="true" width={0} height={0} {...props}>
      <defs>
        <clipPath id={`${id}-0`} clipPathUnits="objectBoundingBox">
          <path d="M0,0 h0.729 v0.129 h0.121 l-0.016,0.032 C0.815,0.198,0.843,0.243,0.885,0.243 H1 v0.757 H0.271 v-0.086 l-0.121,0.057 v-0.214 c0,-0.032,-0.026,-0.057,-0.057,-0.057 H0 V0" />
        </clipPath>
        <clipPath id={`${id}-1`} clipPathUnits="objectBoundingBox">
          <path d="M1,1 H0.271 v-0.129 H0.15 l0.016,-0.032 C0.185,0.802,0.157,0.757,0.115,0.757 H0 V0 h0.729 v0.086 l0.121,-0.057 v0.214 c0,0.032,0.026,0.057,0.057,0.057 h0.093 v0.7" />
        </clipPath>
        <clipPath id={`${id}-2`} clipPathUnits="objectBoundingBox">
          <path d="M1,0 H0.271 v0.129 H0.15 l0.016,0.032 C0.185,0.198,0.157,0.243,0.115,0.243 H0 v0.757 h0.729 v-0.086 l0.121,0.057 v-0.214 c0,-0.032,0.026,-0.057,0.057,-0.057 h0.093 V0" />
        </clipPath>
      </defs>
    </svg>
  );
}

const posts = [
  {
    id: "17992177787631482",
    media_url:
      "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/437744448_1650562725747887_5533449689565553880_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=18de74&_nc_ohc=rCB-VYS59LEQ7kNvgGIHTuV&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfAEwks0rJUMdW7FFOposwqmplr9ywkZNdhcedO9uGUJhg&oe=6641039E",
    permalink: "https://www.instagram.com/p/C5upAB2Lb39/",
    caption:
      "Elegance in simplicity: A study in refined grace, where cream and brown hues meet delicate orange accents, against a backdrop of understated sophistication. 🌼✨ #SimpleElegance #GracefulComposition",
    media_type: "IMAGE",
    username: "floristspot",
    timestamp: "2024-04-14T04:38:16+0000",
  },
  {
    id: "17998340189573005",
    media_url:
      "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/438313698_807950531233515_624202370052354155_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=18de74&_nc_ohc=LCF9eW5EWFIQ7kNvgFBtKfd&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfA6tbAcAxc8j4lhjSb5IDyN4eXpToM9l5CmH1AWgcDRWQ&oe=66411245",
    permalink: "https://www.instagram.com/p/C5uo8zXLtmB/",
    caption:
      "Lost in a sea of dreams: A moment frozen in time, where soft pastels meet the gentle breeze, and the only soundtrack is the rhythm of the waves. 🌊🌸 #SeasideSerendipity #RomanticEscapes",
    media_type: "IMAGE",
    username: "floristspot",
    timestamp: "2024-04-14T04:37:50+0000",
  },
  {
    id: "18033367591911603",
    media_url:
      "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/438331114_845484867388418_1892693704403091366_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=18de74&_nc_ohc=U1ArxxGe27kQ7kNvgHCOufe&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDNuSk1VCXurjTj-BQr5fll_SPmFSMN7alnsck15Prwzg&oe=6640ECC8",
    permalink: "https://www.instagram.com/p/C5uod2lrKC3/",
    caption:
      "Blooming tranquility: Delicate peach blossoms captured in crisp detail, their gentle elegance bringing serenity to your feed. 🌸✨ #PeachyPerfection #DigitalArtistry",
    media_type: "IMAGE",
    username: "floristspot",
    timestamp: "2024-04-14T04:33:36+0000",
  },
  {
    id: "17863388415103336",
    media_url:
      "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/438362156_426101496781933_4333242100074241071_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=18de74&_nc_ohc=5W6HdNXMIyYQ7kNvgE_IlHk&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDXHmIwyLGUKUlLlV2oIowqpYzHhgJr6Xd326-7FsNsFA&oe=6640E6FF",
    permalink: "https://www.instagram.com/p/C5uiN1Brfn5/",
    caption:
      "Captured in petals: A girl, a bouquet, and a windowpane—where beauty meets serenity. 🌸✨ #FloralWhispers #ElegantMoments",
    media_type: "IMAGE",
    username: "floristspot",
    timestamp: "2024-04-14T03:38:59+0000",
  },
  {
    id: "18054139096587151",
    media_url:
      "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/438189906_934731618125271_1300104843356179889_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=18de74&_nc_ohc=_YRdY8w6oWoQ7kNvgETebwM&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBJWA1VblrusYqrBzp2CQfA158P7kAFuAqoEK4oDiUwEg&oe=6640F368",
    permalink: "https://www.instagram.com/p/C5uiJo9rMWV/",
    caption:
      "Simple elegance: A serene tableau of white blooms and magnolia branches against a backdrop of understated beauty. 🌿✨ #MinimalistFlorals #SereneDetails",
    media_type: "IMAGE",
    username: "floristspot",
    timestamp: "2024-04-14T03:38:25+0000",
  },
  {
    id: "17922319832891007",
    media_url:
      "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/437987835_761278419136613_5992371005942316359_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=18de74&_nc_ohc=_A4wjtA_mG8Q7kNvgGqRpjA&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfAbne8Hw1hLFMLuithHWKYXuMdKvjJPscBvq1oJNusfMw&oe=6640EF94",
    permalink: "https://www.instagram.com/p/C5uiDUGLAOH/",
    caption:
      "Captured in a moment of pure romance: Sunlight dancing on her face, petals swirling around, and the scent of roses filling the air. 🌹💖 #RomanticVibes #SunlitBeauty",
    media_type: "IMAGE",
    username: "floristspot",
    timestamp: "2024-04-14T03:37:33+0000",
  },
  {
    id: "18285508885162189",
    media_url:
      "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/438550911_926679105820688_6929754093722155761_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=kxC2_oVEuFkQ7kNvgEczPqt&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBDgvyy_M0qCaEsHLiUNL8OTcC9bIhJNBdWdB88Gtqckg&oe=664108B6",
    permalink: "https://www.instagram.com/p/C5uhKeKL3o7/",
    caption:
      "Blooms in town: A burst of color against a sunlit backdrop, where vibrant petals paint a picture-perfect scene of a sunny day. 🌹🌞 #SunnyBlooms #TownViews #flowers",
    media_type: "IMAGE",
    username: "floristspot",
    timestamp: "2024-04-14T03:29:47+0000",
  },
  {
    id: "17912941733924009",
    media_url:
      "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/437978171_941722194098516_5800734239187215233_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=r9-7hpmTCxQQ7kNvgEXQ3c5&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfB4fYEfM_ferg6ZmZpxyh1P1aVgWbxeU0CN0l60rxxhtw&oe=664100DD",
    permalink: "https://www.instagram.com/p/C5uf7YAr5x7/",
    caption:
      "Embracing simplicity: A serene tableau of peach blossoms bathed in soft sunlight, inviting you to bask in the tranquility of the moment. 🌸✨ #TranquilBlooms #SimplicityInStyle",
    media_type: "IMAGE",
    username: "floristspot",
    timestamp: "2024-04-14T03:18:59+0000",
  },
  {
    id: "18048586222719748",
    media_url:
      "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/438037760_3932835233610613_1484942645255600024_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=18de74&_nc_ohc=0JEOT8orv0kQ7kNvgGevPZk&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfABaYJmyr8qHJAP5zphpf8ich2pOldBqBXr2MU9WuSFPw&oe=66410493",
    permalink: "https://www.instagram.com/p/C5ufk-Er2xk/",
    caption:
      "Captured moments: A vibrant bouquet basks in the gentle sunlight, a canvas of pink lilies, white roses, and orange daisies against a backdrop of serene blue walls. 🌸✨ #ElegantFloral #SunlitSplendor #flowers",
    media_type: "IMAGE",
    username: "floristspot",
    timestamp: "2024-04-14T03:15:56+0000",
  },
];

export function Speakers() {
  let id = useId();
  let [tabOrientation, setTabOrientation] = useState("horizontal");

  useEffect(() => {
    let lgMediaQuery = window.matchMedia("(min-width: 1024px)");

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);

  return (
    <section
      id="speakers"
      aria-labelledby="speakers-title"
      className="py-20 sm:py-32"
    >
      <ImageClipPaths id={id} />
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="speakers-title"
            className="font-display text-4xl font-medium tracking-tighter text-blue-600 sm:text-5xl"
          >
            Posts
          </h2>
          <p className="font-display mt-4 text-2xl tracking-tight text-blue-900">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            blanditiis quam quia suscipit.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:mt-16 sm:gap-y-16 lg:mt-24 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div className="ui-not-focus-visible:outline-none grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-16 md:grid-cols-3">
              {posts.map((data, i) => (
                <div key={data.id}>
                  <div className="rounded-4xl group relative h-[17.5rem] transform overflow-hidden">
                    <div
                      className={clsx(
                        "rounded-4xl absolute bottom-6 left-0 right-4 top-0 border transition duration-300 group-hover:scale-95 xl:right-6",
                        [
                          "border-blue-300",
                          "border-indigo-300",
                          "border-sky-300",
                        ][i % 3],
                      )}
                    />
                    <div
                      className="absolute inset-0 bg-indigo-50"
                      style={{ clipPath: `url(#${id}-${i % 3})` }}
                    >
                      <Image
                        className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110"
                        src={data.media_url}
                        alt=""
                        priority
                        sizes="(min-width: 1280px) 17.5rem, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                        height={400}
                        width={400}
                      />
                    </div>
                  </div>
                  <h3 className="font-display mt-8 text-xl font-bold tracking-tight text-slate-900">
                    {data.username}
                  </h3>
                  <p className="mt-1 text-base tracking-tight text-slate-500">
                    {data.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
