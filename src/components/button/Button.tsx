import type { VariantProps } from "class-variance-authority";

import type { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

import { buttonCVA } from "./buttonCVA";

export type ButtonProps = VariantProps<typeof buttonCVA> &
  ComponentProps<"button">;

export function Button({
  variant,
  size,
  btnType,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={twMerge(buttonCVA({ variant, size, btnType }), className)}
      {...rest}
    ></button>
  );
}
