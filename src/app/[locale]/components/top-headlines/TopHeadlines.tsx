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
      <h1>TOP HEADLINES {data.totalResults}</h1>
      <Suspense fallback={<Spinner>Loading Top Headlines...</Spinner>}>
        <section>
          <Article {...mainArticleData} category="business" />
        </section>

        <section>
          {articlesData.map((article) => (
            <Article key={article.title} {...article} category="business" />
          ))}
        </section>
      </Suspense>
    </section>
  );
}
