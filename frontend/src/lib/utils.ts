import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetaData({
  title = "JobHive",
  description = "Job tracker and finder with a social media aspect to it",
  image = "thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    icons,
    // TODO: Get URL
    // metadataBase: new URL(
    // "https://www.justinvariara.com"
    // ),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}