import type { ApiNewsLanguage } from "@/api/news-api/newsAPI";
import { getEverythingData } from "@/api/news-api/newsAPI";

import { Suspense } from "react";

import { useLocale } from "next-intl";

import { Spinner } from "@/components/spinner/Spinner";

import { Article } from "@/components/article/Article";

import { EverythingSearch } from "../everything-search/EverythingSearch";

import { EverythingNavigation } from "../everything-navigation/EverythingNavigation";

import { encodeString } from "@/utils/string-manipulation/encodeString";

import type { SlugPageArgs } from "../../[slug]/page";

type EverythingProps = {
  q?: string;
  language: ApiNewsLanguage;
  pageSize: "5" | "10" | "20";
  page: string;
};

export type EverythingArgs = EverythingProps;

export async function Everything({
  q,
  language,
  pageSize,
  page,
}: EverythingProps) {
  const locale = useLocale();

  const sources = !q ? ["bbc-news"] : undefined;

  const data = await getEverythingData({
    q,
    language,
    pageSize: parseInt(pageSize),
    page: parseInt(page),
    sources,
  });

  return (
    <>
      <Suspense fallback={<Spinner>Loading...</Spinner>}>
        <EverythingSearch
          q={q}
          language={language}
          pageSize={+pageSize}
          totalResults={data.totalResults}
        />
        <section className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-2">
          {data.articles.map((article) => (
            <Article
              variant="sm"
              key={article.title}
              {...article}
              href={{
                pathname: `/${locale}/}`,
                query: encodeString({
                  qInTitle: article.title.slice(0, 200),
                }),
              }}
            />
          ))}
        </section>
        <EverythingNavigation
          pageSize={+pageSize}
          page={+page}
          totalResults={data.totalResults}
        />
      </Suspense>
    </>
  );
}
