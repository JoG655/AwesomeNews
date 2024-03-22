export type Locale = "en" | "hr";

export type SupportedLanguages = { locales: Locale[]; description: string[] };

export const supportedLanguages: SupportedLanguages = {
  locales: ["en", "hr"],
  description: ["English", "Hrvatski"],
};
