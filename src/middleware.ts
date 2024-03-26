import createMiddleware from "next-intl/middleware";

export type Locale = "en" | "hr";

export type SupportedLanguages = { locales: Locale[]; description: string[] };

export const supportedLanguages: SupportedLanguages = {
  locales: ["en", "hr"],
  description: ["English", "Hrvatski"],
} as const;

export default createMiddleware<Locale[]>({
  // A list of all locales that are supported
  locales: supportedLanguages.locales,

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(hr|en)/:path*"],
};
