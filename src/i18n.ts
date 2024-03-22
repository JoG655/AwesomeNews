import { getRequestConfig } from "next-intl/server";

import type { Locale } from "@/supportedLanguages";
import { supportedLanguages } from "@/supportedLanguages";

import { notFound } from "next/navigation";

export default getRequestConfig(async ({ locale }) => {
  if (!supportedLanguages.locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
