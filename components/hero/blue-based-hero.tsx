import { BackgroundImage } from "../templates/blue-based/BackgroundImage";
import { Button } from "../button/Button";
import { Container } from "../container/Container";
import Image from "next/image";

type TProps = {
  hero: {
    heading: string;
    subheading: string;
    imageUrl: string;
  };
  cta: {
    link: string;
    text: string;
  };
  colors: {
    primary: string;
    secondary: string;
  };
};

export function Hero(props: TProps) {
  const { hero, cta, colors } = props;
  return (
    <div className="relative py-20 sm:pb-24 sm:pt-36 ">
      <BackgroundImage className="-bottom-14 -top-36 " />
      <Container className="relative flex max-lg:flex-col-reverse">
        <Image
          src={hero.imageUrl}
          alt=""
          height={400}
          width={300}
          className="mt-5 rounded-lg object-contain drop-shadow max-lg:mx-auto"
        />
        <div className="ml-auto max-w-2xl max-lg:mx-auto lg:max-w-4xl lg:px-12">
          <h1
            className="font-display text-5xl font-bold tracking-tighter text-blue-600 sm:text-7xl"
            style={{ color: colors.primary }}
          >
            <span className="sr-only">DeceptiConf - </span>
            {hero.heading}
          </h1>
          <div className="font-display mt-6 space-y-6 text-2xl tracking-tight text-blue-900">
            <p>{hero.subheading}</p>
          </div>
          <Button
            href={cta.link}
            className="mt-10 w-full "
            text={cta.text}
            bgColor={colors.secondary}
          />
        </div>
      </Container>
    </div>
  );
}
