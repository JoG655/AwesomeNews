import type { ReactNode } from "react";

import { Header } from "@/app/[locale]/components/header/Header";

type LocaleLayoutProps = {
  children: ReactNode;
};

export default function LocaleLayout({ children }: LocaleLayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
