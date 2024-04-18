import Link from "next/link";
import CTA from "./cta";

type TopBarProps = {
  businessName: string;
  colors: {
    primary: string;
    secondary: string;
  };
  cta: {
    text: string;
    link: string;
    external?: boolean;
  };
};

export default function TopBar({ businessName, colors, cta }: TopBarProps) {
  return (
    <div className="flex items-center justify-between rounded-full border border-gray-100 bg-gray-100 px-6 py-3.5">
      <div className="w-auto">
        <div className="flex flex-wrap items-center">
          <div
            className="text-black-300 w-auto text-xl font-medium"
            style={{ color: colors.primary }}
          >
            <Link href="#">{businessName}</Link>
          </div>
        </div>
      </div>
      <div className="w-auto">
        <div className="flex flex-wrap items-center">
          <div className="w-auto lg:block">
            <div className="-m-2 flex flex-wrap">
              <div className="w-full p-2 md:w-auto">
                <CTA
                  text={cta.text}
                  bgColor={colors.secondary}
                  link={cta.link}
                  external={cta.external}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
