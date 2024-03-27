import type { ImageProps } from "next/image";
import Image from "next/image";

type ArticleImageProps = Omit<ImageProps, "width" | "height" | "fill">;

export type ArticleImageArgs = ImageProps;

export function ArticleImage({
  src,
  alt,
  style = {
    objectFit: "contain",
  },
  ...rest
}: ArticleImageProps) {
  return <Image src={src} alt={alt} fill={true} style={style} {...rest} />;
}
