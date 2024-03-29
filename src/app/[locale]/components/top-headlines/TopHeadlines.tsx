import type { ApiNewsCategory, ApiNewsCountry } from "@/api/news-api/newsAPI";
import { getTopHeadlinesData } from "@/api/news-api/newsAPI";

import { Suspense } from "react";

import { useLocale } from "next-intl";

import { Spinner } from "@/components/spinner/Spinner";

import { Article } from "@/app/[locale]/components/article/Article";

import { encodeString } from "@/utils/string-manipulation/encodeString";

type TopHeadlinesProps = {
  country: ApiNewsCountry;
  category: ApiNewsCategory;
  pageSize: number;
};

export type TopHeadlinesArgs = TopHeadlinesProps;

export async function TopHeadlines({
  country,
  category,
  pageSize,
}: TopHeadlinesProps) {
  const locale = useLocale();

  const data = await getTopHeadlinesData({
    country,
    category,
    pageSize,
  });

  const [mainArticle, ...articles] = data.articles;

  return (
    <section className="flex flex-col gap-5">
      <Suspense fallback={<Spinner>Loading Top Headlines...</Spinner>}>
        <section>
          <Article
            variant="lg"
            {...mainArticle}
            category="business"
            href={{
              pathname: `/${locale}/article`,
              query: encodeString({ id: mainArticle.title.slice(0, 400) }),
            }}
          />
        </section>

        <section className="lg:flex lg:flex-nowrap">
          {articles.map((article) => (
            <Article
              variant="md"
              key={article.title}
              {...article}
              href={{
                pathname: `/${locale}/article`,
                query: encodeString({ id: article.title.slice(0, 400) }),
              }}
            />
          ))}
        </section>
      </Suspense>
    </section>
  );
}
