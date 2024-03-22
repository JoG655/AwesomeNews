"use client";

import type {
  ComponentProps,
  Dispatch,
  FocusEvent,
  ReactNode,
  SetStateAction,
} from "react";
import { Fragment, useEffect, useRef, useState } from "react";

import { twMerge } from "tailwind-merge";

import { Button } from "@/components/button/Button";

import { ChevronLeft, ChevronRight } from "lucide-react";

export type CategorySliderProps = ComponentProps<"div"> & {
  separator?: ReactNode;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: Dispatch<SetStateAction<string>>;
};

const TRANSLATE_DELTA = 200;
const NAVIGATION_WIDTH = 96;

export function CategorySlider({
  separator,
  categories,
  selectedCategory,
  onSelectCategory,
  className,
  ...rest
}: CategorySliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLeftVisible, setIsLeftVisible] = useState(false);

  const [isRightVisible, setIsRightVisible] = useState(false);

  const [translateOffset, setTranslateOffset] = useState(0);

  useEffect(() => {
    if (containerRef.current == null) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;

      if (container == null) return;

      setIsLeftVisible(translateOffset > 0);

      setIsRightVisible(
        translateOffset + container.clientWidth < container.scrollWidth,
      );
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [categories, translateOffset]);

  function translateLeftCalc(
    currentTranslateOffset: number,
    delta: number,
  ): number {
    const newTranslateOffset = currentTranslateOffset - delta;

    return newTranslateOffset <= 0 ? 0 : newTranslateOffset;
  }

  function translateRightCalc(
    currentTranslateOffset: number,
    delta: number,
  ): number {
    if (!containerRef.current) return currentTranslateOffset;

    const width = containerRef.current.clientWidth;

    const edge = containerRef.current.scrollWidth;

    const newTranslate = currentTranslateOffset + delta;

    return newTranslate + width >= edge ? edge - width : newTranslate;
  }

  function handleButtonFocus(e: FocusEvent) {
    if (e.target === e.relatedTarget) return;

    if (containerRef.current == null) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const elementRect = e.target.getBoundingClientRect();

    if (elementRect.x - NAVIGATION_WIDTH < containerRect.x) {
      setTranslateOffset((t) => {
        return translateLeftCalc(t, elementRect.width + TRANSLATE_DELTA);
      });
    } else if (
      elementRect.x + elementRect.width + NAVIGATION_WIDTH >
      containerRect.x + containerRect.width
    ) {
      setTranslateOffset((t) => {
        return translateRightCalc(t, elementRect.width + TRANSLATE_DELTA);
      });
    }
  }

  function handleVariantMouseDown(variant: "Left" | "Right") {
    setTranslateOffset((t) => {
      return (
        variant === "Left" ? translateLeftCalc : translateRightCalc
      ).apply(null, [t, TRANSLATE_DELTA]);
    });
  }

  return (
    <div
      ref={containerRef}
      className={twMerge(
        "relative flex items-center overflow-x-hidden px-1 py-2",
        className,
      )}
      {...rest}
    >
      {isLeftVisible && (
        <div
          className="absolute left-0 z-20 h-5/6 bg-gradient-to-r from-white from-50% to-transparent pl-1"
          style={{ width: `${NAVIGATION_WIDTH}px` }}
        >
          <Button
            variant="outline"
            btnType="icon"
            size="sm"
            className="aspect-square h-full w-auto py-1.5"
            onMouseDown={() => handleVariantMouseDown("Left")}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      <div
        className="flex w-[max-content] transform gap-3 whitespace-nowrap transition-transform"
        style={{ transform: `translateX(-${translateOffset}px)` }}
      >
        {categories.map((c, i) => (
          <Fragment key={c}>
            <Button
              variant={selectedCategory === c ? "primary" : "ghost"}
              className="whitespace-nowrap rounded-lg px-3 py-1"
              onMouseDown={() => onSelectCategory(c)}
              onFocus={(e) => handleButtonFocus(e)}
            >
              {c}
            </Button>
            {i < categories.length - 1 && separator}
          </Fragment>
        ))}
      </div>
      {isRightVisible && (
        <div
          className="absolute right-0 z-20 h-5/6 bg-gradient-to-l from-white from-50% to-transparent pr-1"
          style={{ width: `${NAVIGATION_WIDTH}px` }}
        >
          <Button
            variant="outline"
            btnType="icon"
            size="sm"
            className="ml-auto aspect-square h-full w-auto py-1.5"
            onMouseDown={() => handleVariantMouseDown("Right")}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
