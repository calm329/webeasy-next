import Image from "next/image";
import Link from "next/link";

type PostCardProps = {
  id: string;
  permalink: string;
  media_url: string;
  media_type: string;
  caption: string;
  timestamp: string;
};

export default function PostCard({
  id,
  permalink,
  media_url,
  media_type,
  caption,
  timestamp,
}: PostCardProps) {
  return (
    <Link href={permalink} className="group">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
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
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="group-hover:opacity-75"
          />
        )}
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{caption}</h3>
      <p className="mt-1 text-xs font-medium text-gray-900">{timestamp}</p>
    </Link>
  );
}
