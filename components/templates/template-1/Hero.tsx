import { BackgroundImage } from "./BackgroundImage";
import { Button } from "./Button";
import { Container } from "./Container";
import Image from "next/image";
export function Hero() {
  return (
    <div className="relative py-20 sm:pb-24 sm:pt-36 ">
      <BackgroundImage className="-bottom-14 -top-36 " />
      <Container className="relative flex max-lg:flex-col-reverse">
        <Image
          src={
            "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/438189906_934731618125271_1300104843356179889_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=18de74&_nc_ohc=_YRdY8w6oWoQ7kNvgETebwM&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBJWA1VblrusYqrBzp2CQfA158P7kAFuAqoEK4oDiUwEg&oe=6640F368"
          }
          alt=""
          height={400}
          width={300}
          className="mt-5 rounded-lg object-contain drop-shadow max-lg:mx-auto"
        />
        <div className="ml-auto max-w-2xl max-lg:mx-auto lg:max-w-4xl lg:px-12">
          <h1 className="font-display text-5xl font-bold tracking-tighter text-blue-600 sm:text-7xl">
            <span className="sr-only">DeceptiConf - </span>
            Experience Serenity in Every Blossom
          </h1>
          <div className="font-display mt-6 space-y-6 text-2xl tracking-tight text-blue-900">
            <p>
              Discover the art of floral elegance with our carefully curated
              blooms.
            </p>
          </div>
          <Button href="#" className="mt-10 w-full ">
            Explore Now
          </Button>
        </div>
      </Container>
    </div>
  );
}
