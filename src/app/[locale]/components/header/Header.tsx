"use client";

import type { LinkProps } from "next/link";
import Link from "next/link";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../../tailwind.config";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

import { categories } from "@/data/categories";

import { usePathname } from "next/navigation";

import { twMerge } from "tailwind-merge";
import { buttonCVA } from "@/components/button/buttonCVA";

import Image from "next/image";

import infozona from "@/data/infozona.svg";

import Hamburger from "hamburger-react";

import { LocalSwitch } from "./locale-switch/LocaleSwitch";
import { CategorySlider } from "./category-slider/CategorySlider";

type LinkPartial = { href: LinkProps["href"]; text: string };

type HeaderProps = { links: { home: LinkPartial; calendar: LinkPartial } };

const LOGO_HEIGHT = 100;
const MD_BREAKPOINT = parseInt(resolveConfig(tailwindConfig).theme.screens.md);

export function Header({ links }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MD_BREAKPOINT) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white text-primary-900">
      <nav className="relative mb-2 flex w-full flex-wrap items-center justify-between gap-4 border-b-4 border-solid border-b-primary-400 text-lg">
        <Link
          href="/"
          className={twMerge(
            buttonCVA({
              variant: "ghost",
            }),
            "relative p-0",
          )}
        >
          <Image src={infozona} alt="logo" height={LOGO_HEIGHT} />
        </Link>
        <div className="md:hidden">
          <Hamburger toggled={isOpen} toggle={setIsOpen} />
        </div>
        <div
          className={twMerge(
            "absolute top-[104px] z-50 grid w-full grid-rows-[0fr] transition-[grid-template-rows] duration-500 md:static md:flex md:w-auto md:items-center",
            isOpen
              ? "h-[calc(100dvh-var(--logo-height))] grid-rows-[1fr]"
              : null,
          )}
          style={{ "--logo-height": `${LOGO_HEIGHT}px` } as CSSProperties}
        >
          <ul className="mt-4 flex flex-grow-0 flex-col items-start gap-4 overflow-hidden bg-white px-6 text-base text-gray-700 md:mt-0 md:flex md:flex-row md:items-center md:justify-between md:border-none">
            <li className="p-1">
              <Link
                className={buttonCVA({
                  variant: links.home.href === pathname ? "primary" : "outline",
                  size: "md",
                })}
                href={links.home.href}
              >
                {links.home.text}
              </Link>
            </li>
            <li>
              <Link
                className={buttonCVA({
                  variant:
                    links.calendar.href === pathname ? "primary" : "outline",
                  size: "md",
                })}
                href={links.calendar.href}
              >
                {links.calendar.text}
              </Link>
            </li>
            <li>
              <LocalSwitch />
            </li>
          </ul>
        </div>
      </nav>
      <section>
        <div className="border-b-2 border-solid border-b-primary-400 border-t-primary-800 p-1">
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
    </header>
  );
}
