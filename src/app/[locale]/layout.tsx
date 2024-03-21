import { Header } from "../../components/header/header";

type LocaleLayoutProps = {
  children: React.ReactNode;
};

export default function LocaleLayout({ children }: LocaleLayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
