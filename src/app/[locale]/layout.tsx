import type { ReactNode } from "react";

import { useLocale, useTranslations } from "next-intl";

import { Header } from "@/app/[locale]/components/header/Header";

type LocaleLayoutProps = {
  children: ReactNode;
};

export default function LocaleLayout({ children }: LocaleLayoutProps) {
  const tHeader = useTranslations("Header");

  const locale = useLocale();

  return (
    <main className="flex flex-grow flex-col">
      <Header
        links={{
          home: {
            href: `/${locale}`,
            text: tHeader("homeText"),
          },
          bonus: {
            href: `/${locale}/bonus`,
            text: tHeader("bonusText"),
          },
        }}
        banners={[
          tHeader("banner0Text"),
          tHeader("banner1Text"),
          tHeader("banner2Text"),
          tHeader("banner3Text"),
          tHeader("banner4Text"),
          tHeader("banner5Text"),
          tHeader("banner6Text"),
          tHeader("banner7Text"),
          tHeader("banner8Text"),
        ]}
      />
      {children}
    </main>
  );
}
