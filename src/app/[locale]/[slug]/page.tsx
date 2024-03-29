import { Suspense } from "react";

import { Spinner } from "@/components/spinner/Spinner";

import { decodeString } from "@/utils/string-manipulation/decodeString";

import { getTopHeadlinesData } from "@/api/news-api/newsAPI";

import { getEverythingData } from "@/api/news-api/newsAPI";

type SlugPageProps = {
  searchParams: { qInTitle: string };
};

export type SlugPageArgs = SlugPageProps;

export default async function SlugPage({ searchParams }: SlugPageProps) {
  const { qInTitle } = searchParams;

  const data = await getEverythingData({
    qInTitle: qInTitle,
  });

  const article = data.articles[0];

  if (!article) return <div>Weeeeeel</div>;

  return (
    <Suspense fallback={<Spinner>Loading Top Headlines...</Spinner>}>
      <h2>{article.title}</h2>
      <a>{article.urlToImage}</a>
      <p>{article.content}</p>
      <p>{qInTitle}</p>
    </Suspense>
  );
}
