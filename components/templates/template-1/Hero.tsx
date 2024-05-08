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
          src={"/images/bird.jpg"}
          alt=""
          height={400}
          width={300}
          className="mt-5 rounded-lg object-contain drop-shadow max-lg:mx-auto"
        />
        <div className="ml-auto max-w-2xl max-lg:mx-auto lg:max-w-4xl lg:px-12">
          <h1 className="font-display text-5xl font-bold tracking-tighter text-blue-600 sm:text-7xl">
            <span className="sr-only">DeceptiConf - </span>A design conference
            for the dark side.
          </h1>
          <div className="font-display mt-6 space-y-6 text-2xl tracking-tight text-blue-900">
            <p>
              The next generation of web users are tech-savvy and suspicious.
              They know how to use dev tools, they can detect a phishing scam
              from a mile away, and they certainly aren’t accepting any checks
              from Western Union.
            </p>
            <p>
              At DeceptiConf you’ll learn about the latest dark patterns being
              developed to trick even the smartest visitors, and you’ll learn
              how to deploy them without ever being detected.
            </p>
          </div>
          <Button href="#" className="mt-10 w-full ">
            Get your tickets
          </Button>
        </div>
      </Container>
    </div>
  );
}
