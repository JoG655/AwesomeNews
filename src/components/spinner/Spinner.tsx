import type { CSSProperties, ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

export type SpinnerProps = ComponentProps<"div"> & {
  text?: string;
  animationCount?: number;
};

export function Spinner({
  text,
  animationCount = 3,
  className,
  ...rest
}: SpinnerProps) {
  return (
    <div className={twMerge("spinner", className)} {...rest}>
      {[...Array(animationCount)].map((_, i) => (
        <i
          key={i}
          className="spinner__animation"
          style={{ "--_spinner-animation-index": i + 1 } as CSSProperties}
        ></i>
      ))}
      {text && <span className="spinner__text">{text}</span>}
    </div>
  );
}
