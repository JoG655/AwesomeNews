import type { TopHeadlinesProps } from "./components/top-headlines/TopHeadlines";
import { TopHeadlines } from "./components/top-headlines/TopHeadlines";

import type { EverythingProps } from "./components/everything/Everything";
import { Everything } from "./components/everything/Everything";

type LocalePageProps = {
  searchParams: TopHeadlinesProps & EverythingProps;
};

export default function LocalePage({ searchParams }: LocalePageProps) {
  const topHeadlinesProps: TopHeadlinesProps = {
    country: searchParams.country ? searchParams.country : "us",
    category: searchParams.category ? searchParams.category : "sports",
    pageSize: 4,
  };

  const everythingProps: EverythingProps = {
    q: searchParams.q ? searchParams.q : undefined,
    qInTitle: searchParams.qInTitle ? searchParams.qInTitle : undefined,
    to: searchParams.to ? searchParams.to : undefined,
    from: searchParams.from ? searchParams.from : undefined,
    language: searchParams.language ? searchParams.language : "en",
    pageSize: searchParams.pageSize ? searchParams.pageSize : 5,
    page: searchParams.page ? searchParams.page : 1,
  };

  return (
    <>
      <TopHeadlines {...topHeadlinesProps} />
      <Everything {...everythingProps} />
    </>
  );
}
