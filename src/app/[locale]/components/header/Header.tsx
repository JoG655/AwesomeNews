"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useState } from "react";

import useDebounceValue from "@/hooks/useDebounceValue/useDebounceValue";

import { twMerge } from "tailwind-merge";

import { categories } from "@/data/categories";

import { LocalSwitch } from "./locale-switch/LocaleSwitch";
import { CategorySlider } from "./category-slider/CategorySlider";

type HeaderProps = ComponentPropsWithoutRef<"header">;

export function Header({ className, ...rest }: HeaderProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const [inputTest, setInputTest] = useState("");

  const debouncedInputTest = useDebounceValue(inputTest, 250);

  return (
    <header
      className={twMerge(
        "sticky top-0 z-50 bg-white p-2 text-primary-900",
        className,
      )}
      {...rest}
    >
      <nav className="mb-2 flex items-center gap-4">
        <h1>Header</h1>
        <LocalSwitch className="ml-auto" />
      </nav>
      <section>
        <div className="border-y-2 border-solid border-b-primary-400 border-t-primary-800 p-1">
          <CategorySlider
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            separator={
              <div className="mx-1 border-r-2 border-solid border-b-primary-400"></div>
            }
          />
        </div>
      </section>
      <input
        className="outline-dotted"
        type="text"
        onChange={(e) => setInputTest(e.target.value)}
      />
      <p>{inputTest}</p>
      <p>{debouncedInputTest}</p>
    </header>
  );
}
