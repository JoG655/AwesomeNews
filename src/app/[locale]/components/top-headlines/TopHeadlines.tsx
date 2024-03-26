import type { ApiNewsCountry, ApiNewsCategory } from "@/api/news-api/newsAPI";
import { getTopHeadlinesData } from "@/api/news-api/newsAPI";

import { Suspense } from "react";

import { Spinner } from "@/components/spinner/Spinner";

export type TopHeadlinesProps = {
  country?: ApiNewsCountry;
  category?: ApiNewsCategory;
  pageSize?: number;
};

export default async function TopHeadlines({
  country = "us",
  category = "sports",
  pageSize = 4,
}: TopHeadlinesProps) {
  const data = await getTopHeadlinesData({ country, category, pageSize });

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
