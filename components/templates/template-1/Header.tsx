import Image from "next/image";
import { Button } from "./Button";
import { Container } from "./Container";

type TProps = {
  logo?: string;
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
    <header className={`relative z-10 flex-none lg:pt-11 `}>
      <Container
        className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap"
        style={{ color: colors.primary }}
      >
        <div className="mt-10 flex items-center  gap-2 text-xl lg:mt-0 lg:grow lg:basis-0">
          <Image src={logo ?? ""} alt="" height={100} width={100} />
          {businessName}
        </div>
        <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
          <Button href={cta.link} text={cta.text} bgColor={colors.secondary} />
        </div>
      </Container>
    </header>
  );
}
