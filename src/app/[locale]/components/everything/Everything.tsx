import type { NewsApiEverythingParams } from "@/api/news-api/newsAPI";
import { getEverythingData } from "@/api/news-api/newsAPI";

import { Suspense } from "react";

import { Spinner } from "@/components/spinner/Spinner";

type EverythingProps = Omit<
  NewsApiEverythingParams,
  "sources" | "domains" | "excludeDomains" | "sortBy"
>;

export type EverythingArgs = EverythingProps;

export async function Everything(props: EverythingProps) {
  const sources = !props.q ? ["bbc-news"] : undefined;

  const data = await getEverythingData({
    ...props,
    sources,
  });

  return (
    <>
      <h1>EVERYTHING {data.totalResults}</h1>
      <Suspense fallback={<Spinner>Loading Top Headlines...</Spinner>}>
        {data.totalResults &&
          data.articles.map((a) => <p key={a.title}>{a.title}</p>)}
      </Suspense>
    </>
  );
}
