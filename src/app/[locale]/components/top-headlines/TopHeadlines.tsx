import type { NewsApiTopHeadlinesParams } from "@/api/news-api/newsAPI";
import { getTopHeadlinesData } from "@/api/news-api/newsAPI";

import { Suspense } from "react";

import { Spinner } from "@/components/spinner/Spinner";

type TopHeadlinesProps = Omit<
  NewsApiTopHeadlinesParams,
  "q" | "sources" | "page"
>;

export type TopHeadlinesArgs = TopHeadlinesProps;

export async function TopHeadlines(props: TopHeadlinesProps) {
  const data = await getTopHeadlinesData(props);

  return (
    <>
      <h1>TOP HEADLINES {data.totalResults}</h1>
      <Suspense fallback={<Spinner>Loading Top Headlines...</Spinner>}>
        {data.totalResults &&
          data.articles.map((a) => <p key={a.title}>{a.title}</p>)}
      </Suspense>
    </>
  );
}
