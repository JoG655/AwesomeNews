import type { TopHeadlinesArgs } from "./components/top-headlines/TopHeadlines";
import { TopHeadlines } from "./components/top-headlines/TopHeadlines";

import type { EverythingArgs } from "./components/everything/Everything";
import { Everything } from "./components/everything/Everything";

import { useTranslations } from "next-intl";

type LocalePageProps = {
  searchParams: Omit<TopHeadlinesArgs, "pageSize"> & EverythingArgs;
};

export default function LocalePage({ searchParams }: LocalePageProps) {
  const tEverything = useTranslations("Everything");

  const pageSizeText = tEverything("pageSizeText");
  const languageText = tEverything("languageText");
  const queryText = tEverything("queryText");

  return (
    <>
      <TopHeadlines
        country={searchParams.country ? searchParams.country : "us"}
        category={searchParams.category ? searchParams.category : "business"}
        pageSize={4}
      />
      <Everything
        q={searchParams.q}
        language={searchParams.language ? searchParams.language : "en"}
        pageSize={searchParams.pageSize ? searchParams.pageSize : "5"}
        page={searchParams.page ? searchParams.page : "1"}
        pageSizeText={pageSizeText}
        languageText={languageText}
        queryText={queryText}
      />
    </>
  );
}
