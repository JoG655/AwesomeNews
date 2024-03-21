import { cva } from "class-variance-authority";

export const buttonCVA = cva(
  [
    "leading-none",
    "flex",
    "gap-2",
    "items-center",
    "justify-center",
    "rounded-lg",
    "ring-focus",
    "focus-visible:ring-4",
    "focus:outline-none",
    "disabled:cursor-not-allowed",
    "transition",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary-600",
          "hover:bg-primary-500",
          "active:bg-primary-700",
          "disabled:bg-primary-200",
          "text-primary-50",
          "disabled:text-primary-400",
        ],
        outline: [
          "bg-primary",
          "hover:bg-primary-100",
          "active:bg-primary-200",
          "disabled:bg-primary",
          "text-primary-600",
          "disabled:text-primary-400",
          "border-2",
          "border-primary-600",
          "disabled:border-primary-200",
        ],
        ghost: [
          "bg-primary",
          "hover:bg-primary-50",
          "active:bg-primary-100",
          "disabled:bg-primary",
          "text-primary-600",
          "disabled:text-primary-400",
          "disabled:border-primary-200",
        ],
      },
      size: {
        sm: ["text-sm", "py-1.5", "min-h-9", "px-3"],
        md: ["text-sm", "py-2", "min-h-10", "px-5"],
        lg: ["text-md", "py-2.5", "min-h-11", "px-5"],
        xl: ["text-md", "py-3", "min-h-12", "px-6"],
      },
      btnType: {
        button: "",
        icon: ["px-0", "rounded-full"],
      },
    },
    compoundVariants: [
      { btnType: "icon", size: "sm", class: "size-9" },
      { btnType: "icon", size: "md", class: "size-10" },
      { btnType: "icon", size: "lg", class: "size-11" },
      { btnType: "icon", size: "xl", class: "size-12" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      btnType: "button",
    },
  },
);
