import {
  type ComponentPropsWithRef,
  type ComponentPropsWithoutRef,
} from "react";
import { forwardRef } from "react";

import { twMerge } from "tailwind-merge";

type SpinnerPartial = {
  animationCount?: 1 | 2 | 3 | 4 | 5 | 6;
};

type SpinnerProps = SpinnerPartial & ComponentPropsWithoutRef<"div">;

export type SpinnerArgs = SpinnerPartial & ComponentPropsWithRef<"div">;

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  function Spinner({ animationCount = 3, className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={twMerge("spinner", className)} {...rest}>
        {[...Array(animationCount)].map((_, i) => (
          <i key={i} className="spinner__animation"></i>
        ))}
        {children ? <span className="spinner__text">{children}</span> : null}
      </div>
    );
  },
);
