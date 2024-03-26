"use client";

import type { ChangeEvent } from "react";
import { useTransition } from "react";

import { usePathname, useRouter } from "next/navigation";

import { useLocale } from "next-intl";

import type { Locale } from "@/middleware";
import { supportedLanguages } from "@/middleware";

import { buttonCVA } from "@/components/button/buttonCVA";

export function LocalSwitch() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const localActive = useLocale() as Locale;

  const pathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    startTransition(() => {
      const pathnameSegments = pathname.split("/");

      if (pathnameSegments.length === 2) {
        router.replace(`/${e.target.value}`);

        return;
      }

      pathnameSegments.splice(1, 1, e.target.value);

      router.replace(pathnameSegments.join("/"));
    });
  };

  return supportedLanguages.locales.length !== 0 ? (
    <>
      <label htmlFor="ChangeLanguage" className="sr-only">
        Change Language
      </label>
      <select
        id="ChangeLanguage"
        className={buttonCVA({ variant: "outline", size: "md" })}
        onChange={handleChange}
        defaultValue={localActive}
        disabled={isPending}
      >
        {supportedLanguages.locales.map((locale, i) => {
          return (
            <option key={locale} value={locale}>
              {supportedLanguages.description[i]}
            </option>
          );
        })}
      </select>
    </>
  ) : null;
}
