import { LocalSwitcher } from "../locale-switch/LocaleSwitch";

export function Header() {
  return (
    <header className="p-4">
      <nav className="flex items-center justify-end gap-4">
        <LocalSwitcher />
      </nav>
    </header>
  );
}
