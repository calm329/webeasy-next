import Image from "next/image";
import { Button } from "../ui/button/template-button";
import { Container } from "../container";
import { TBanner, TColors } from "@/types";

type TProps = {
 banner:TBanner
  colors:TColors
};

export function Header(props: TProps) {
  const { banner, colors } = props;
  return (
    <header className={`relative z-10 flex-none lg:pt-20 `}>
      <Container
        className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap"
        style={{ color: colors.primary }}
      >
        <div className="mt-10 flex items-center  gap-2 text-xl lg:mt-0 lg:grow lg:basis-0">
          <Image
            src={banner.logo.link ?? ""}
            alt={banner.logo.alt}
            height={100}
            width={100}
          />
          {banner.businessName}
        </div>
        <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
        {banner.button.map((data,i)=>
      <div key={i}>
          <Button href={data.value} text={data.label} bgColor={colors.secondary} />
          </div>
        )}
        </div>
      </Container>
    </header>
  );
}
