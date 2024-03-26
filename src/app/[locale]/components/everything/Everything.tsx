import type { ApiNewsLanguage } from "@/api/news-api/newsAPI";
import { getEverythingData } from "@/api/news-api/newsAPI";

import { Suspense } from "react";

import { Spinner } from "@/components/spinner/Spinner";

export type EverythingProps = {
  q?: string;
  qInTitle?: string;
  language?: ApiNewsLanguage;
  pageSize?: number;
  page?: number;
};

export default async function Everything({
  q,
  qInTitle,
  language = "en",
  pageSize = 5,
  page = 1,
}: EverythingProps) {
  const sources = !q ? ["bbc-news"] : undefined;

  const data = await getEverythingData({
    q,
    qInTitle,
    sources,
    language,
    pageSize,
    page,
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
