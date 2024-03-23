import type { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

export type SpinnerProps = ComponentProps<"div"> & {
  text?: string;
  animationCount?: 1 | 2 | 3 | 4 | 5 | 6;
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
        <i key={i} className="spinner__animation"></i>
      ))}
      {text ? <span className="spinner__text">{text}</span> : null}
    </div>
  );
}
