import { Suspense } from "react";

import { Spinner } from "@/components/spinner/Spinner";

import { getEverythingData } from "@/api/news-api/newsAPI";

import { notFound } from "next/navigation";

import { MainArticle } from "./components/main-article/MainArticle";

type ArticlePageProps = { searchParams: { id: string } };

export default async function ArticlePage({ searchParams }: ArticlePageProps) {
  const { id } = searchParams;

  if (!id) notFound();

  const data = await getEverythingData({
    q: id,
  });

  const article = data.articles[0];

  if (!article) notFound();

  return (
    <Suspense fallback={<Spinner>Loading Top Headlines...</Spinner>}>
      <MainArticle {...article} />
    </Suspense>
  );
}
