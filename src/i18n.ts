import { getRequestConfig } from "next-intl/server";

import { supportedLocales } from "./supportedLocales";

import { notFound } from "next/navigation";

export default getRequestConfig(async ({ locale }) => {
  if (!Object.keys(supportedLocales).includes(locale)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
