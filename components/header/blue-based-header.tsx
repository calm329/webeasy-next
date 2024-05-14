import Image from "next/image";
import { Button } from "../ui/button/template-button";
import { Container } from "../container";

type TProps = {
  logo: {
    link: string;
    alt: string;
  };
  businessName: string;
  cta: {
    text: string;
    link: string;
  };
  colors: {
    primary: string;
    secondary: string;
  };
};

export function Header(props: TProps) {
  const { logo, businessName, cta, colors } = props;
  return (
    <header className={`relative z-10 flex-none lg:pt-20 `}>
      <Container
        className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap"
        style={{ color: colors.primary }}
      >
        <div className="mt-10 flex items-center  gap-2 text-xl lg:mt-0 lg:grow lg:basis-0">
          <Image
            src={logo.link ?? ""}
            alt={logo.alt}
            height={100}
            width={100}
          />
          {businessName}
        </div>
        <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
          <Button href={cta.link} text={cta.text} bgColor={colors.secondary} />
        </div>
      </Container>
    </header>
  );
}
