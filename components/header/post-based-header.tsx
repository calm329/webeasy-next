"use client";

import Link from "next/link";

import { Button } from "../ui/button/Button";
import Image from "next/image";
import { Container } from "@/components/container/Container";

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
    <header className="py-10">
      <Container>
        <nav className="relative z-10 flex justify-between">
          <div
            className="flex items-center md:gap-x-12 "
            style={{ color: colors.primary }}
          >
            <Link
              href="#"
              aria-label="Home"
              className="flex items-center gap-5"
            >
              <Image src={logo ?? ""} alt="" height={100} width={100} />
              {businessName}
            </Link>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <Button
              href={cta.link}
              bgColor={colors.secondary}
              text={cta.text}
            />
            <div className="-mr-1 md:hidden">{/* <MobileNavigation /> */}</div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
