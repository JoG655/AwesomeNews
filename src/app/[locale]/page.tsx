import type { TopHeadlinesArgs } from "./components/top-headlines/TopHeadlines";
import { TopHeadlines } from "./components/top-headlines/TopHeadlines";

import type { EverythingArgs } from "./components/everything/Everything";
import { Everything } from "./components/everything/Everything";

type LocalePageProps = {
  searchParams: TopHeadlinesArgs & EverythingArgs;
};

export default function LocalePage({ searchParams }: LocalePageProps) {
  return (
    <>
      <TopHeadlines
        country={searchParams.country ? searchParams.country : "us"}
        category={searchParams.category ? searchParams.category : "business"}
        pageSize={4}
      />
      <Everything
        q={searchParams.q}
        qInTitle={searchParams.qInTitle}
        to={searchParams.to}
        from={searchParams.from}
        language={searchParams.language ? searchParams.language : "en"}
        pageSize={searchParams.pageSize ? searchParams.pageSize : 5}
        page={searchParams.page ? searchParams.page : 1}
      />
    </>
  );
}
