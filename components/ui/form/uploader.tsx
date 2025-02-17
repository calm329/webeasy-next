"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type TProps = {
  defaultValue?: string | null;
  name: string;
  label?: string;
  onChange?: (value: string) => void;
  contain?: boolean;
  multimedia?: boolean;
};

export const isImage = (url: string) => {
  const imageFormats = ["jpg", "jpeg", "png"];
  console.log("url: " + imageFormats.some((format) => url?.includes(format)));
  return imageFormats.some((format) => url?.includes(format));
};

export default function Uploader(props: TProps) {
  const { defaultValue, name, label, onChange, contain, multimedia } = props;
  const aspectRatio = "aspect-video"; // Since both images and videos can use this aspect ratio

  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState({
    [name]: defaultValue,
  });

  const [dragActive, setDragActive] = useState(false);

  const handleUpload = (file: File | null) => {
    if (file) {
      if (file.size / 1024 / 1024 > 100) {
        toast.error("File size too big (max 100MB)");
      } else if (
        !file.type.includes("png") &&
        !file.type.includes("jpg") &&
        !file.type.includes("jpeg") &&
        (!multimedia ||
          (!file.type.includes("mp4") &&
            !file.type.includes("avi") &&
            !file.type.includes("mov")))
      ) {
        toast.error(
          "Invalid file type (must be .png, .jpg, .jpeg" +
            (multimedia ? ", .mp4, .avi, or .mov)" : ")"),
        );
      } else {
        fetch("/api/upload", {
          method: "POST",
          headers: { "content-type": file?.type || "application/octet-stream" },
          body: file,
        }).then(async (res) => {
          if (res.status === 200) {
            const { url } = await res.json();

            setData((prev) => ({ ...prev, [name]: url }));

            onChange && onChange(url);
          } else {
            const error = await res.text();
            toast.error(error);
          }
        });
      }
    }
  };

  useEffect(() => {
    console.log("Upload", data[name]);
    if (defaultValue) {
      setData((prev) => ({ ...prev, [name]: defaultValue }));
    }
  }, [defaultValue]);

  return (
    <div className="mx-auto flex items-center">
      {label && <div>{label}:</div>}
      <label
        htmlFor={`${name}-upload`}
        className={cn(
          "group relative mx-auto mt-2 flex size-44 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50",
          aspectRatio,
          {
            "max-w-screen-md": aspectRatio === "aspect-video",
            // "max-w-xs": aspectRatio === "aspect-square",
          },
        )}
      >
        <div
          className="absolute z-[5] h-full w-full rounded-md"
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            const file = e.dataTransfer.files && e.dataTransfer.files[0];
            inputRef.current!.files = e.dataTransfer.files; // set input file to dropped file
            handleUpload(file);
          }}
        />
        <div
          className={`${
            dragActive ? "border-2 border-black" : ""
          } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
            data[name]
              ? "bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md"
              : "bg-white opacity-100 hover:bg-gray-50"
          }`}
        >
          <svg
            className={`${
              dragActive ? "scale-110" : "scale-100"
            } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
            <path d="M12 12v9"></path>
            <path d="m16 16-4-4-4 4"></path>
          </svg>
          <p className="mt-2 text-center text-xs text-gray-500">
            Drag and drop or click to upload.
          </p>
          <p className="mt-2 text-center text-xs text-gray-500">
            Max file size: 100MB
          </p>
          <span className="sr-only">Upload</span>
        </div>
        {data[name] && !multimedia ? (
          <Image
            src={data[name] as string}
            alt="Preview"
            className={`h-full w-full rounded-md ${
              contain ? "object-contain" : "object-cover"
            }`}
            height={400}
            width={400}
          />
        ) : isImage(data[name] as string) ? (
          <Image
            src={data[name] as string}
            alt="Preview"
            className={`h-full w-full rounded-md ${
              contain ? "object-contain" : "object-cover"
            }`}
            height={400}
            width={400}
          />
        ) : (
          <video
            src={data[name] as string}
            controls
            className={`h-full w-full rounded-md ${
              contain ? "object-contain" : "object-cover"
            }`}
            height={400}
            width={400}
          />
        )}
      </label>

      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          id={`${name}-upload`}
          ref={inputRef}
          name={name}
          type="file"
          accept={multimedia ? "image/*,video/*" : "image/*"}
          className="sr-only"
          onChange={(e) => {
            const file = e.currentTarget.files && e.currentTarget.files[0];
            handleUpload(file);
          }}
        />
      </div>
    </div>
  );
}
