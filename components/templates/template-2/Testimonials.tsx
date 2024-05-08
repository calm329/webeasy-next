import Image from "next/image";

import { Container } from "./Container";

function QuoteIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg aria-hidden="true" width={105} height={78} {...props}>
      <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
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

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="bg-slate-50 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Posts
          </h2>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {posts.map((data, i) => (
            <li key={i}>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                <li key={i}>
                  <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                    <QuoteIcon className="absolute left-6 top-6 fill-slate-100" />
                    <blockquote className="relative">
                      <p className="text-lg tracking-tight text-slate-900">
                        {data.caption}
                      </p>
                    </blockquote>
                    <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                      <div>
                        <div className="font-display text-base text-slate-900">
                          {data.username}
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-full bg-slate-50">
                        <Image
                          className="h-14 w-14 object-cover"
                          src={data.media_url}
                          alt=""
                          width={56}
                          height={56}
                        />
                      </div>
                    </figcaption>
                  </figure>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
