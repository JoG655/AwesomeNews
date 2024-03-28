import type { ImageProps } from "next/image";
import Image from "next/image";

import type { ComponentPropsWithRef, ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

import { twMerge } from "tailwind-merge";

type ArticlePicturePartial = {
  image: Omit<ImageProps, "src" | "width" | "height" | "fill"> & {
    src: ImageProps["src"] | null;
  };
};

type ArticlePictureProps = ArticlePicturePartial &
  ComponentPropsWithoutRef<"picture">;

export type ArticlePictureArgs = ArticlePicturePartial &
  ComponentPropsWithRef<"picture">;

const MD_BREAKPOINT = parseInt(resolveConfig(tailwindConfig).theme.screens.md);
const XL_BREAKPOINT = parseInt(resolveConfig(tailwindConfig).theme.screens.xl);

export const ArticlePicture = forwardRef<
  HTMLPictureElement,
  ArticlePictureProps
>(function ArticlePicture({ className, image, ...rest }, ref) {
  const {
    src,
    alt,
    style = { objectFit: "cover" },
    sizes = `(max-width: ${MD_BREAKPOINT}px) 100vw, (max-width: ${XL_BREAKPOINT}px) 50vw, 33vw`,
    ...imageRest
  } = image;

  if (!src) return;

  return (
    <picture
      ref={ref}
      className={twMerge("relative block h-80 w-full", className)}
      {...rest}
    >
      <Image
        src={src}
        alt={alt}
        fill={true}
        style={style}
        sizes={sizes}
        {...imageRest}
      />
    </picture>
  );
});
