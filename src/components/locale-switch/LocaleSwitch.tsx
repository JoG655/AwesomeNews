"use client";

import type { ChangeEvent, ComponentProps } from "react";
import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { useLocale } from "next-intl";

import type { Locale } from "@/supportedLanguages";
import { supportedLanguages } from "@/supportedLanguages";

import { twMerge } from "tailwind-merge";

import { buttonCVA } from "@/components/button/buttonCVA";

export type LocaleSwitchProps = ComponentProps<"select">;

export function LocalSwitch({ className, ...rest }: LocaleSwitchProps) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const localActive = useLocale() as Locale;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    startTransition(() => {
      router.replace(`/${e.target.value}`);
    });
  };

  return supportedLanguages.locales.length !== 0 ? (
    <>
      <label htmlFor="ChangeLanguage" className="sr-only">
        Change Language
      </label>
      <select
        id="ChangeLanguage"
        className={twMerge(
          buttonCVA({ variant: "outline", size: "md" }),
          className,
        )}
        onChange={handleChange}
        defaultValue={localActive}
        disabled={isPending}
        {...rest}
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
