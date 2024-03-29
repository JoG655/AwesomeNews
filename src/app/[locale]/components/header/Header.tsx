"use client";

import type { LinkProps } from "next/link";
import Link from "next/link";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../../tailwind.config";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

import { usePrevious } from "@/hooks/usePrevious/usePrevious";

import { trapFocus } from "@/utils/focus/trapFocus";

import { usePathname } from "next/navigation";

import { twMerge } from "tailwind-merge";
import { buttonCVA } from "@/components/button/buttonCVA";

import Image from "next/image";

import infozona from "@/data/infozona.svg";

import { Button } from "@/components/button/Button";

import Hamburger from "hamburger-react";

import { LocalSwitch } from "./locale-switch/LocaleSwitch";

import { BannerSlider } from "./banner-slider/BannerSlider";

type LinkPartial = { href: LinkProps["href"]; text: string };

type BannerPartial = string[];

type HeaderProps = {
  links: { home: LinkPartial; bonus: LinkPartial };
  banners: BannerPartial;
};

const LOGO_HEIGHT = 100;
const MD_BREAKPOINT = parseInt(resolveConfig(tailwindConfig).theme.screens.md);

export function Header({ links, banners }: HeaderProps) {
  const navRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(0);

  const previousWidth = usePrevious<number>(width);

  const [isOpen, setIsOpen] = useState(false);

  const [selectedBanner, setSelectedBanner] = useState(banners[0]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    const NavRefElement = navRef.current;

    if (!NavRefElement) return;

    const hamburgers =
      NavRefElement.querySelectorAll<HTMLElement>(".hamburger-react");

    hamburgers.forEach((hamburger) => {
      hamburger.removeAttribute("tabindex");
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (previousWidth == null) return;

    if (previousWidth < MD_BREAKPOINT && width >= MD_BREAKPOINT)
      setIsOpen(false);
  }, [previousWidth, width]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      const navRefElement = navRef.current;

      if (!navRefElement) return;

      trapFocus<HTMLDivElement>(navRefElement, e);
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen]);

  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white text-primary-900">
      <nav
        ref={navRef}
        className="relative flex w-full flex-wrap items-center justify-between gap-4 text-lg"
      >
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
        <Button
          variant={"ghost"}
          className="mr-1 min-h-fit p-0 md:hidden"
          onClick={() => setIsOpen((i) => !i)}
        >
          <Hamburger toggled={isOpen} />
        </Button>
        <div
          className={twMerge(
            "pointer-events-none absolute top-[--logo-height] z-50 grid h-[calc(100dvh-var(--logo-height))] w-full grid-rows-[0fr] transition-[grid-template-rows] duration-500 md:pointer-events-auto md:static md:flex md:h-auto md:w-auto md:items-center",
            isOpen ? "pointer-events-auto grid-rows-[1fr]" : null,
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
                tabIndex={!isOpen && width < MD_BREAKPOINT ? -1 : undefined}
                href={links.home.href}
              >
                {links.home.text}
              </Link>
            </li>
            <li className="p-1">
              <Link
                className={buttonCVA({
                  variant:
                    links.bonus.href === pathname ? "primary" : "outline",
                  size: "md",
                })}
                tabIndex={!isOpen && width < MD_BREAKPOINT ? -1 : undefined}
                href={links.bonus.href}
              >
                {links.bonus.text}
              </Link>
            </li>
            <li className="p-1">
              <LocalSwitch
                tabIndex={!isOpen && width < MD_BREAKPOINT ? -1 : undefined}
              />
            </li>
          </ul>
        </div>
      </nav>
      <section>
        <div className="mt-2 border-b-2 border-t-4 border-solid border-b-primary-400 border-t-primary-800 p-1">
          <BannerSlider
            banners={banners}
            selectedBanner={selectedBanner}
            onSelectBanner={setSelectedBanner}
            separator={
              <div className="mx-1 border-r-2 border-solid border-b-primary-400"></div>
            }
          />
        </div>
      </section>
    </header>
  );
}
