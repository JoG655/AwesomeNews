import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Header } from "@/app/[locale]/components/header/Header";

type LocaleLayoutProps = {
  children: ReactNode;
};

export default function LocaleLayout({ children }: LocaleLayoutProps) {
  const t = useTranslations("Header");

  return (
    <>
      <Header
        items={{
          homeText: t("homeText"),
          calendarText: t("calendarText"),
        }}
      />
      {children}
    </>
  );
}
