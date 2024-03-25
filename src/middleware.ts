import createMiddleware from "next-intl/middleware";

import type { Locale } from "./supportedLanguages";

export default createMiddleware<Locale[]>({
  // A list of all locales that are supported
  locales: ["en", "hr"],

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(hr|en)/:path*"],
};
