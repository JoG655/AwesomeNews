import type { NewsApiArticle } from "@/api/news-api/newsAPI";

import { useTranslations } from "next-intl";

import { ArticlePicture } from "@/components/article-picture/ArticlePicture";

import { readingTime } from "@/utils/reading-time/readingTime";

type MainArticleProps = Omit<NewsApiArticle, "url" | "source" | "author">;

export function MainArticle({
  title,
  description,
  urlToImage,
  publishedAt,
  content,
}: MainArticleProps) {
  const tArticle = useTranslations("Article");

  const date = new Date(publishedAt);

  return (
    <article className="flex w-full flex-col gap-2 p-2 lg:mt-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-pretty text-3xl text-primary-600">{title}</h2>
        <div className="flex flex-wrap gap-2">
          <div className="text-nowrap border-2 border-solid border-primary-600 p-2 text-center text-lg uppercase">
            {`${tArticle("readingTimeText")} ${readingTime(content)} min`}
          </div>
        </div>
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
      </div>
      <ArticlePicture
        className="mt-6 h-[400px] w-full"
        image={{ src: urlToImage, alt: title }}
      />
      <div className="font-bold">{description}</div>
      <div className="">{content}</div>
    </article>
  );
}
