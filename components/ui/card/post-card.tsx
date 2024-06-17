import Image from "next/image";
import Link from "next/link";

type PostCardProps = {
  id: string;
  permalink: string;
  media_url: string;
  media_type: string;
  caption: string;
  timestamp: string;
  showHash:boolean
};

export default function PostCard(props: PostCardProps) {
  const { id, permalink, media_url, media_type, caption, timestamp,showHash } = props;
  return (
    <Link href={permalink} className="group max-w-96 ">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        {media_type === "VIDEO" ? (
          <video
            src={media_url}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <Image
            src={media_url}
            alt={caption}
            fill
            sizes="100%"
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="group-hover:opacity-75"
          />
        )}
      </div>
      <h3 className="mt-4 text-sm text-gray-700">
        {showHash ? caption : caption.split("#")[0].trim()}
      </h3>
      <p className="mt-1 text-xs font-medium text-gray-900">{timestamp}</p>
    </Link>
  );
}
