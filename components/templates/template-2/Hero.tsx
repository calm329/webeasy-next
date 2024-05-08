import Image from "next/image";

import { Button } from "./Button";
import { Container } from "./Container";

export function Hero() {
  return (
    <Container className="flex gap-5 pb-16 pt-20 text-center max-lg:flex-col lg:pt-32">
      <Image
        src={
          "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/438189906_934731618125271_1300104843356179889_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=18de74&_nc_ohc=_YRdY8w6oWoQ7kNvgETebwM&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBJWA1VblrusYqrBzp2CQfA158P7kAFuAqoEK4oDiUwEg&oe=6640F368"
        }
        alt=""
        height={400}
        width={300}
        className="mt-5 rounded-lg object-contain drop-shadow max-lg:mx-auto"
      />
      <div>
        <h1 className="font-display ml-auto max-w-4xl text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
          Experience Serenity in Every Blossom
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          Discover the art of floral elegance with our carefully curated blooms.
        </p>
        <div className="mx-auto ml-0 mt-10 flex justify-center gap-x-6">
          <Button href="#">Explore Now</Button>
        </div>
        {/* <div className="mt-36 lg:mt-44">
          <p className="font-display text-base text-slate-900">
            Trusted by these six companies so far
          </p>
          <ul
            role="list"
            className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
          >
            {[
              [
                { name: 'Transistor', logo: logoTransistor },
                { name: 'Tuple', logo: logoTuple },
                { name: 'StaticKit', logo: logoStaticKit },
              ],
              [
                { name: 'Mirage', logo: logoMirage },
                { name: 'Laravel', logo: logoLaravel },
                { name: 'Statamic', logo: logoStatamic },
              ],
            ].map((group, groupIndex) => (
              <li key={groupIndex}>
                <ul
                  role="list"
                  className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
                >
                  {group.map((company) => (
                    <li key={company.name} className="flex">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        unoptimized
                      />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </Container>
  );
}
