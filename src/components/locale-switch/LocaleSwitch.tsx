"use client";

import type { Locale } from "../../supportedLocales";

import type { ChangeEvent } from "react";

import { supportedLocales } from "../../supportedLocales";

import { useLocale } from "next-intl";

import { useRouter } from "next/navigation";

import { buttonCVA } from "../button/buttonCVA";

import { useTransition } from "react";

export function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const localActive = useLocale() as Locale;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    startTransition(() => {
      router.replace(`/${e.target.value}`);
    });
  };
  return Object.keys(supportedLocales).length !== 0 ? (
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
        {Object.entries(supportedLocales).map(([locale, description]) => {
          return (
            <option key={locale} value={locale}>
              {description}
            </option>
          );
        })}
      </select>
    </>
  ) : null;
}
