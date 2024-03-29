import type {
  NewsApiArticle,
  NewsApiTopHeadlinesParams,
} from "@/api/news-api/newsAPI";

import type { Url } from "next/dist/shared/lib/router/router";

import { ComponentPropsWithoutRef } from "react";

import { useTranslations } from "next-intl";

import Link from "next/link";

import { twMerge } from "tailwind-merge";

import { ArticlePicture } from "@/components/article-picture/ArticlePicture";

import { readingTime } from "@/utils/reading-time/readingTime";

type LinkPartial = {
  category?: NewsApiTopHeadlinesParams["category"];
  className?: ComponentPropsWithoutRef<"a">["className"];
  href: Url;
};

type ArticlePartial = Omit<
  NewsApiArticle,
  "url" | "source" | "author" | "description"
> & {
  variant: "sm" | "md" | "lg";
};

type ArticleProps = ArticlePartial & LinkPartial;

export function Article({
  variant,
  title,
  urlToImage,
  publishedAt,
  content,
  category,
  className,
  href,
}: ArticleProps) {
  const tArticle = useTranslations("Article");

  const tCategory = useTranslations("Category");

  const date = new Date(publishedAt);

  return (
    <article className="basis-full p-2">
      <Link
        href={href}
        className={twMerge(
          "relative flex scale-[0.98] flex-col gap-4 overflow-hidden rounded-lg bg-white p-2 ring-focus transition hover:scale-100 hover:cursor-pointer focus:scale-100 focus:outline-none focus-visible:ring-4",
          className,
          variant === "sm" ? "max-h-[200px] flex-row" : null,
          variant === "md" ? "max-h-[600px] lg:max-h-[400px]" : null,
          variant === "lg" ? "lg:max-h-[400px] lg:flex-row-reverse" : null,
        )}
      >
        <ArticlePicture
          className={twMerge(
            "h-[200px]",
            variant === "md" ? "h-[400px] flex-shrink-0 lg:h-[200px]" : null,
            variant === "lg" ? "h-[400px] flex-shrink-0 lg:basis-3/5" : null,
          )}
          image={{ src: urlToImage, alt: title }}
        />

        <div
          className={twMerge(
            "flex w-full flex-col justify-start gap-2",
            variant === "lg" ? "flex-col-reverse justify-end" : null,
          )}
        >
          <div className="relative flex justify-between text-primary-600">
            <div className="space-x-2">
              <span className="bg-white">{date.getDate()}</span>
              <span className="bg-white">{date.getMonth() + 1}</span>
              <span className="bg-white">{date.getFullYear() % 1000}</span>
            </div>
            <div>
              <span className="bg-white">{`${date.getHours()}:${date.getMinutes() < 10 ? 0 : ""}${date.getMinutes()}h`}</span>
            </div>
            <span className="absolute bottom-1 -z-10 h-px w-full bg-primary-600"></span>
          </div>
          {variant === "lg" ? (
            <div className="flex flex-wrap gap-2">
              <div className="text-nowrap border-2 border-solid border-primary-600 p-2 text-center text-lg uppercase">
                {category ? tCategory(category) : "/"}
              </div>
              <div className="text-nowrap border-2 border-solid border-primary-600 p-2 text-center text-lg uppercase">
                {`${tArticle("readingTimeText")} ${readingTime(content)} min`}
              </div>
            </div>
          ) : null}
          <h2
            className={twMerge(
              "text-pretty text-primary-600",
              variant === "sm" ? "text-lg" : null,
              variant === "md" ? "text-xl" : null,
              variant === "lg"
                ? "overflow-hidden text-2xl lg:max-h-[300px]"
                : null,
            )}
          >
            {title}
          </h2>
        </div>
      </Link>
    </article>
  );
}
