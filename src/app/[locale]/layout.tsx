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
    <main className="flex flex-grow flex-col">
      <Header
        links={{
          home: {
            href: `/${locale}`,
            text: t("homeText"),
          },
          bonus: {
            href: `/${locale}/bonus`,
            text: t("bonusText"),
          },
        }}
        banners={[
          t("banner0Text"),
          t("banner1Text"),
          t("banner2Text"),
          t("banner3Text"),
          t("banner4Text"),
          t("banner5Text"),
          t("banner6Text"),
          t("banner7Text"),
          t("banner8Text"),
        ]}
      />
      {children}
    </main>
  );
}
