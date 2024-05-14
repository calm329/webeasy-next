import Image from "next/image";

import { Button } from "../ui/button/template-button";
import { Container } from "../container";
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
    <Container className="flex gap-5 pb-16 pt-20 text-center max-lg:flex-col lg:pt-32">
      <Image
        src={hero.imageUrl}
        alt=""
        height={400}
        width={300}
        className="mt-5 rounded-lg object-contain drop-shadow max-lg:mx-auto"
      />
      <div>
        <h1
          className="font-display ml-auto max-w-4xl text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl"
          style={{ color: colors.primary }}
        >
          {hero.heading}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          {hero.subheading}
        </p>
        <div className="mx-auto ml-0 mt-10 flex justify-center gap-x-6">
          <Button href={cta.link} bgColor={colors.secondary} text={cta.text} />
        </div>
      </div>
    </Container>
  );
}
