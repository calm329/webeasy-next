import Link from "next/link";

type TProps ={
  text: string;
  bgColor: string;
  link: string;
  external?: boolean;
}

export default function CTA(props: TProps) {
  const {
    text,
    bgColor,
    link,
    external,
  } = props;
  return (
    <Link
      className="block w-full rounded-full bg-blue-500 px-8 py-3.5 text-center text-lg font-bold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
      style={{
        backgroundColor: bgColor,
      }}
      href={link}
      target={external ? "_blank" : "_self"}
    >
      {text}
    </Link>
  );
}
