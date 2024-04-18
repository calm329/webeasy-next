import Link from "next/link";

export default function CTA({
  text,
  bgColor,
  link,
  external,
}: {
  text: string;
  bgColor: string;
  link: string;
  external?: boolean;
}) {
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
