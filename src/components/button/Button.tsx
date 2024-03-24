import type { VariantProps } from "class-variance-authority";

import type { ComponentPropsWithRef, ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { twMerge } from "tailwind-merge";

import { buttonCVA } from "./buttonCVA";

type ButtonPartial = VariantProps<typeof buttonCVA>;

type ButtonProps = ButtonPartial & ComponentPropsWithoutRef<"button">;

export type ButtonArgs = ButtonPartial & ComponentPropsWithRef<"button">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant, size, btnType, className, children, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={twMerge(buttonCVA({ variant, size, btnType }), className)}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
