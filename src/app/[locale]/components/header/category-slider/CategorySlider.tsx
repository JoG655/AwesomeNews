"use client";

import type {
  Dispatch,
  FocusEvent,
  ReactElement,
  RefObject,
  SetStateAction,
} from "react";
import {
  Fragment,
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { twMerge } from "tailwind-merge";

import { Button } from "@/components/button/Button";

import { ChevronLeft, ChevronRight } from "lucide-react";

type CategorySliderProps = {
  separator?: ReactElement;
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
}: CategorySliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const categoriesRef = useRef<HTMLDivElement>(null);

  const categoriesButtonsRef = useRef<RefObject<HTMLButtonElement>[]>([]);

  categoriesButtonsRef.current = categories.map(
    (_, i) => categoriesButtonsRef.current[i] ?? createRef<HTMLButtonElement>(),
  );

  const [isLeftVisible, setIsLeftVisible] = useState(false);

  const [isRightVisible, setIsRightVisible] = useState(false);

  const [translateOffset, setTranslateOffset] = useState(0);

  const translateButton = useCallback((target: HTMLButtonElement) => {
    if (containerRef.current == null) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    const elementRect = target.getBoundingClientRect();

    if (elementRect.x - NAVIGATION_WIDTH < containerRect.x) {
      translateLeft(containerRect.x - elementRect.x + NAVIGATION_WIDTH);
    } else if (
      elementRect.x + elementRect.width + NAVIGATION_WIDTH >
      containerRect.x + containerRect.width
    ) {
      translateRight(
        elementRect.x +
          elementRect.width +
          NAVIGATION_WIDTH -
          containerRect.x -
          containerRect.width,
      );
    }
  }, []);

  useEffect(() => {
    if (containerRef.current == null) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;

      if (container == null) return;

      setIsLeftVisible(translateOffset > 0);

      setIsRightVisible(
        translateOffset + container.clientWidth < container.scrollWidth,
      );

      if (categoriesRef.current == null) return;

      const categoriesRect = categoriesRef.current.getBoundingClientRect();

      if (
        container.clientWidth >
        Math.ceil(categoriesRect.x + categoriesRect.width)
      ) {
        translateRight(container.scrollWidth);
      }
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [categories, translateOffset]);

  useEffect(() => {
    if (categoriesButtonsRef.current.length === 0) return;

    const selectedCategoryIndex = categories.indexOf(selectedCategory);

    const selectedCategoryTarget =
      categoriesButtonsRef.current[selectedCategoryIndex].current;

    if (selectedCategoryTarget == null) return;

    translateButton(selectedCategoryTarget);
  }, [categories, selectedCategory, translateButton]);

  function translateLeft(delta: number) {
    setTranslateOffset((t) => {
      const newTranslateOffset = t - delta;

      return newTranslateOffset <= 0 ? 0 : newTranslateOffset;
    });
  }

  function translateRight(delta: number) {
    setTranslateOffset((t) => {
      if (!containerRef.current) return t;

      const width = containerRef.current.clientWidth;

      const edge = containerRef.current.scrollWidth;

      const newTranslate = t + delta;

      return newTranslate + width >= edge ? edge - width : newTranslate;
    });
  }

  function handleButtonFocus(e: FocusEvent<HTMLButtonElement>) {
    if (e.target === e.relatedTarget) return;

    translateButton(e.target);
  }

  function handleNavigationMouseDown(variant: "Left" | "Right") {
    const translateDirection =
      variant === "Left" ? translateLeft : translateRight;

    translateDirection(TRANSLATE_DELTA);
  }

  return (
    <div
      ref={containerRef}
      className="relative flex items-center overflow-x-hidden px-1 py-2"
    >
      {isLeftVisible ? (
        <div
          className="absolute left-0 z-20 h-5/6 bg-gradient-to-r from-white from-50% to-transparent pl-1"
          style={{ width: `${NAVIGATION_WIDTH}px` }}
        >
          <Button
            variant="outline"
            btnType="icon"
            size="sm"
            className="aspect-square h-full w-auto py-1.5"
            onMouseDown={() => handleNavigationMouseDown("Left")}
          >
            <ChevronLeft />
          </Button>
        </div>
      ) : null}
      <div
        ref={categoriesRef}
        className="flex w-[max-content] transform gap-3 whitespace-nowrap transition-transform"
        style={{ transform: `translateX(-${translateOffset}px)` }}
      >
        {categories.map((category, i) => (
          <Fragment key={category}>
            <Button
              ref={categoriesButtonsRef.current[i]}
              variant={selectedCategory === category ? "primary" : "ghost"}
              className="whitespace-nowrap rounded-lg px-3 py-1"
              onMouseDown={() => onSelectCategory(category)}
              onFocus={(e) => handleButtonFocus(e)}
            >
              {category}
            </Button>
            {i < categories.length - 1 ? separator : null}
          </Fragment>
        ))}
      </div>
      {isRightVisible ? (
        <div
          className="absolute right-0 z-20 h-5/6 bg-gradient-to-l from-white from-50% to-transparent pr-1"
          style={{ width: `${NAVIGATION_WIDTH}px` }}
        >
          <Button
            variant="outline"
            btnType="icon"
            size="sm"
            className="ml-auto aspect-square h-full w-auto py-1.5"
            onMouseDown={() => handleNavigationMouseDown("Right")}
          >
            <ChevronRight />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
