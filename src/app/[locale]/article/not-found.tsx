import { Send } from "lucide-react";

import Link from "next/link";

import { buttonCVA } from "@/components/button/buttonCVA";
import { useLocale, useTranslations } from "next-intl";

export default function NotFound() {
  const locale = useLocale();

  const tArticleNotFound = useTranslations("ArticleNotFound");

  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-semibold text-red-500">404</h1>
      <p className="text-lg text-gray-600">{tArticleNotFound("titleText")}</p>
      <Link
        href={`/${locale}`}
        className={buttonCVA({ variant: "outline", size: "xl" })}
      >
        {tArticleNotFound("buttonText")}
        <div className="animate-pulse">
          <Send />
        </div>
      </Link>
    </div>
  );
}
