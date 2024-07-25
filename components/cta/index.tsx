import { AppState } from "@/types";
import Link from "next/link";
import TypewriterEffect from "../typewriter-effect";

type TProps = {
  text: string;
  bgColor: string;
  link: string;
  type: string;
  external?: boolean;
  appState?: AppState;
};

export default function CTA(props: TProps) {
  const { text, bgColor, link, external, appState, type } = props;

  const renderLink = () => {
    switch (type) {
      case "External":
        return (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-full bg-blue-500 px-8 py-3.5 text-center text-lg font-bold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
            style={{ backgroundColor: bgColor }}
          >
            {appState?.generate?.generating ? (
              <TypewriterEffect text={text} />
            ) : (
              text
            )}
          </a>
        );
      case "Section":
        return (
          <a
            href={`#${link}`}
            className="block w-full rounded-full bg-blue-500 px-8 py-3.5 text-center text-lg font-bold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
            style={{ backgroundColor: bgColor }}
          >
            {appState?.generate?.generating ? (
              <TypewriterEffect text={text} />
            ) : (
              text
            )}
          </a>
        );
      case "Page":
        return (
          <Link href={link}>
            <a
              className="block w-full rounded-full bg-blue-500 px-8 py-3.5 text-center text-lg font-bold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
              style={{ backgroundColor: bgColor }}
            >
              {appState?.generate?.generating ? (
                <TypewriterEffect text={text} />
              ) : (
                text
              )}
            </a>
          </Link>
        );
      case "Email":
        return (
          <a
            href={`mailto:${link}`}
            className="block w-full rounded-full bg-blue-500 px-8 py-3.5 text-center text-lg font-bold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
            style={{ backgroundColor: bgColor }}
          >
            {appState?.generate?.generating ? (
              <TypewriterEffect text={text} />
            ) : (
              text
            )}
          </a>
        );
      case "Phone":
        return (
          <a
            href={`tel:${link}`}
            className="block w-full rounded-full bg-blue-500 px-8 py-3.5 text-center text-lg font-bold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
            style={{ backgroundColor: bgColor }}
          >
            {appState?.generate?.generating ? (
              <TypewriterEffect text={text} />
            ) : (
              text
            )}
          </a>
        );
      default:
        return (
          <a
            href={link}
            className="block w-full rounded-full bg-blue-500 px-8 py-3.5 text-center text-lg font-bold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
            style={{ backgroundColor: bgColor }}
          >
            {appState?.generate?.generating ? (
              <TypewriterEffect text={text} />
            ) : (
              text
            )}
          </a>
        );
    }
  };

  return renderLink();
}
