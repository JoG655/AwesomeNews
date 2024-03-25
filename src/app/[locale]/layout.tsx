import type { ReactNode } from "react";

import { useLocale, useTranslations } from "next-intl";

import { Header } from "@/app/[locale]/components/header/Header";

type LocaleLayoutProps = {
  children: ReactNode;
};

export default function LocaleLayout({ children }: LocaleLayoutProps) {
  const t = useTranslations("Header");

  const locale = useLocale();

  return (
    <>
      <Header
        links={{
          home: {
            href: `/${locale}`,
            text: t("homeText"),
          },
          calendar: {
            href: `/${locale}/calendar`,
            text: t("calendarText"),
          },
        }}
      />
      {children}
    </>
  );
}
