import type {
  NewsApiArticle,
  NewsApiTopHeadlinesParams,
} from "@/api/news-api/newsAPI";

import { ComponentPropsWithoutRef } from "react";

import { useTranslations } from "next-intl";

import Link from "next/link";

import { twMerge } from "tailwind-merge";

import { ArticleImage } from "@/components/article-image/ArticleImage";

import { readingTime } from "@/utils/reading-time/readingTime";

type LinkPartial = {
  category: NewsApiTopHeadlinesParams["category"];
  className?: ComponentPropsWithoutRef<"a">["className"];
};

type ArticlePartial = Omit<NewsApiArticle, "source" | "author" | "description">;

type ArticleProps = ArticlePartial & LinkPartial;

export function Article({
  title,
  urlToImage,
  publishedAt,
  content,
  url,
  category,
  className,
}: ArticleProps) {
  const tArticle = useTranslations("Article");

  const tCategory = useTranslations("Category");

  const dateObject = new Date(publishedAt);

  const date = dateObject.getDate();

  const time = dateObject.getTime();

  return (
    <article>
      <Link
        href={url}
        className={twMerge(
          "relative h-80 ring-focus transition hover:cursor-pointer hover:bg-primary-400 focus:outline-none focus-visible:ring-4 md:flex-row-reverse",
          className,
        )}
      >
        {urlToImage ? <ArticleImage src={urlToImage} alt="logo" /> : null}

        <div className="flex w-full flex-col items-start">
          <h2 className="text-balance text-2xl text-primary-600">{title}</h2>
          <div className="flex flex-shrink-0 flex-col gap-2">
            <div className="border-2 border-solid border-primary-600 px-1 py-2 text-center text-lg uppercase">
              {category ? tCategory(category) : "/"}
            </div>
            <div className="border-2 border-solid border-primary-600 px-1 py-2 text-center text-lg uppercase">
              {`${tArticle("readingTimeText")} ${readingTime(content)} min`}
            </div>
          </div>
          <div className="flex flex-shrink-0 justify-between border-b-2 border-solid border-b-primary-600">
            <div>{date}</div>
            <div>{time}</div>
          </div>
        </div>
      </Link>
    </article>
  );
}
