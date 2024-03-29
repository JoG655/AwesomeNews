import { useTranslations } from "next-intl";

import Link from "next/link";

import { twMerge } from "tailwind-merge";

import { buttonCVA } from "@/components/button/buttonCVA";

import { Facebook, Mail, Twitter, Youtube } from "lucide-react";

export function Footer() {
  const tFooter = useTranslations("Footer");

  return (
    <footer className="mt-4 flex flex-col gap-4 border-t-primary-500 p-4 lg:flex-row lg:justify-between lg:border-t-4">
      <div className="flex flex-grow items-center">
        <div className="flex flex-grow items-center gap-2">
          <Link
            href="https://www.facebook.com/"
            className={twMerge(
              buttonCVA({
                variant: "outline",
                size: "md",
                btnType: "icon",
              }),
              "text-primary-800",
            )}
          >
            <Facebook />
          </Link>
          <Link
            href="https://twitter.com/"
            className={twMerge(
              buttonCVA({
                variant: "outline",
                size: "md",
                btnType: "icon",
              }),
              "text-primary-800",
            )}
          >
            <Twitter />
          </Link>
          <Link
            href="https://www.youtube.com/"
            className={twMerge(
              buttonCVA({
                variant: "outline",
                size: "md",
                btnType: "icon",
              }),
              "text-primary-800",
            )}
          >
            <Youtube />
          </Link>
          <Link
            href="https://mail.google.com/"
            className={twMerge(
              buttonCVA({
                variant: "outline",
                size: "md",
                btnType: "icon",
              }),
              "text-primary-800",
            )}
          >
            <Mail />
          </Link>
        </div>
        <div className="text-primary-500">2024 Awesome News</div>
      </div>
      <hr className="h-1 bg-primary-500 lg:hidden" />
      <div className="flex justify-end gap-6 lg:gap-3">
        <Link
          href="#"
          className={twMerge(
            buttonCVA({
              variant: "ghost",
              size: "md",
            }),
            "text-primary-800",
          )}
        >
          {tFooter("impressumText")}
        </Link>
        <Link
          href="#"
          className={twMerge(
            buttonCVA({
              variant: "ghost",
              size: "md",
            }),
            "text-primary-800",
          )}
        >
          {tFooter("rulesText")}
        </Link>
        <Link
          href="#"
          className={twMerge(
            buttonCVA({
              variant: "ghost",
              size: "md",
            }),
            "text-primary-800",
          )}
        >
          {tFooter("contactText")}
        </Link>
      </div>
    </footer>
  );
}
