import type { ReactNode } from "react";

import { Header } from "@/components/header/Header";

export type LocaleLayoutProps = {
  children: ReactNode;
};

export default function LocaleLayout({ children }: LocaleLayoutProps) {
  return (
    <>
      <Header />
      <main className="flex flex-grow flex-col">{children}</main>
    </>
  );
}
