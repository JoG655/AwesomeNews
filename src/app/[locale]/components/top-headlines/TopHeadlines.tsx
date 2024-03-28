import type { NewsApiTopHeadlinesParams } from "@/api/news-api/newsAPI";
import { getTopHeadlinesData } from "@/api/news-api/newsAPI";

import { Suspense } from "react";

import { Spinner } from "@/components/spinner/Spinner";

import { Article } from "./article/Article";

type TopHeadlinesProps = Omit<
  NewsApiTopHeadlinesParams,
  "q" | "sources" | "page"
>;

export type TopHeadlinesArgs = TopHeadlinesProps;

export async function TopHeadlines(props: TopHeadlinesProps) {
  const data = await getTopHeadlinesData(props);

  const [mainArticleData, ...articlesData] = data.articles;

  return (
    <section className="flex flex-col gap-5">
      <Suspense fallback={<Spinner>Loading Top Headlines...</Spinner>}>
        <section>
          <Article variant="lg" {...mainArticleData} category="business" />
        </section>

        <section className="lg:flex lg:flex-nowrap">
          {articlesData.map((article) => (
            <Article
              variant="md"
              key={article.title}
              {...article}
              category="business"
            />
          ))}
        </section>
      </Suspense>
    </section>
  );
}
