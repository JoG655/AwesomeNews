import type { ButtonProps } from "../../components/button/Button";

import { useTranslations } from "next-intl";

import { Plus } from "lucide-react";

import { Button } from "../../components/button/Button";

const sizes: ButtonProps["size"][] = ["sm", "md", "lg", "xl", "xl"];
const variants: ButtonProps["variant"][] = ["primary", "outline", "ghost"];

export default function Home() {
  const t = useTranslations("Index");

  return (
    <div className="bg-theme-base text-theme-900 text-center">
      <div className="relative z-0 grid min-h-screen place-content-center overflow-hidden p-6 lg:p-8">
        <div className="mx-auto">
          <div className="mt-16 grid place-items-center gap-12">
            {variants.map((variant) => (
              <div
                className="flex items-center justify-center gap-6"
                key={variant}
              >
                <div className="grid gap-2">
                  <h2 className="text-xl font-bold uppercase tracking-wide">
                    {variant} Buttons
                  </h2>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    {sizes.map((size, index) => (
                      <Button
                        variant={variant}
                        size={size}
                        disabled={index === sizes.length - 1}
                        key={size}
                      >
                        <span>{t("buttonText")}</span>
                        <span>&rarr;</span>
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <h2 className="text-xl font-bold uppercase tracking-wide">
                    {variant} Icon
                  </h2>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    {sizes.map((size, index) => (
                      <Button
                        variant={variant}
                        size={size}
                        btnType="icon"
                        disabled={index === sizes.length - 1}
                        key={size}
                      >
                        <Plus />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
