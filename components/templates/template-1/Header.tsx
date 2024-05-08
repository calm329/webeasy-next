import Image from "next/image";
import { Button } from "./Button";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="relative z-50 flex-none lg:pt-11">
      <Container className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap">
        <div className="mt-10 flex items-center  gap-2 text-xl lg:mt-0 lg:grow lg:basis-0">
          <Image
            src={
              "https://xhq5zxhb2o7dgubv.public.blob.vercel-storage.com/2weWEVnPETmQLpQx52_W1-Ofz4wnOvkqM6307M1pfxfkLAZXXBbX.jpeg"
            }
            alt=""
            height={100}
            width={100}
          />
          Elegant Blossoms
        </div>
        <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
          <Button href="#">Explore Now</Button>
        </div>
      </Container>
    </header>
  );
}
