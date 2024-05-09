import Image, { type ImageProps } from "next/image";
import clsx from "clsx";

import { Button } from "./Button";
import { Card } from "./Card";
import { Container } from "./Container";
import { Header } from "./Header";

function Service({
  service,
}: {
  service: { name: string; description: string; image: string };
}) {
  return (
    <Card className="max-w-96">
      <Card.Title>{service.name}</Card.Title>
      <Card.Description>{service.description}</Card.Description>
    </Card>
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

function Photos() {
  let rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2",
  ];

  return (
    <>
      <div className="mt-16 sm:mt-20">
        <div className="-my-4 flex flex-wrap justify-center gap-10 overflow-hidden py-4 ">
          {posts.map((data, i) => (
            <div className="flex w-72 flex-col" key={data.id}>
              <div
                className={clsx(
                  "relative aspect-[9/10] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl",
                  rotations[i % rotations.length],
                )}
              >
                <Image
                  src={data.media_url}
                  alt=""
                  className=" inset-0 h-full w-full object-cover"
                  height={300}
                  width={300}
                />
              </div>
              <h2>{data.username}</h2>
              <p>{data.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
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

export default function Home() {
  return (
    <>
      <div className=" inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <Header />
        <main className="flex-auto">
          <Container className="mt-9 flex w-full">
            <div className="flex max-lg:flex-col">
              <div className="">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  Experience Serenity in Every Blossom
                </h1>
                <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                  Discover the art of floral elegance with our carefully curated
                  blooms.
                </p>
                <Button href="#" className="mt-10  ">
                  Explore Now
                </Button>
              </div>
              <div>
                <Image
                  src={
                    "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/438189906_934731618125271_1300104843356179889_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=18de74&_nc_ohc=_YRdY8w6oWoQ7kNvgETebwM&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBJWA1VblrusYqrBzp2CQfA158P7kAFuAqoEK4oDiUwEg&oe=6640F368"
                  }
                  alt=""
                  height={400}
                  width={300}
                  className="mt-5 rounded-lg object-contain drop-shadow max-lg:mx-auto"
                />
              </div>
            </div>
          </Container>
          <Container>
            <Photos />
          </Container>
          <Container className="my-24 md:mt-28">
            <div className="mx-auto  gap-y-20 lg:max-w-none lg:grid-cols-2">
              <div className="flex  flex-wrap gap-10">
                {services.list.map((data) => (
                  <Service key={data.name} service={data} />
                ))}
              </div>
            </div>
          </Container>
        </main>
      </div>
    </>
  );
}
