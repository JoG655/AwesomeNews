"use client";

import type { EverythingArgs } from "../everything/Everything";

import type { ApiNewsLanguage } from "@/api/news-api/newsAPI";

import { usePathname, useSearchParams } from "next/navigation";

import { useRouter } from "next/navigation";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from "react";

import { useDebounceValue } from "@/hooks/useDebounceValue/useDebounceValue";

import type { CreateQueryStringParams } from "@/utils/string-manipulation/createQueryString";
import { createQueryString } from "@/utils/string-manipulation/createQueryString";

import { BookOpenCheck, Layers, Newspaper, Search } from "lucide-react";

import { twMerge } from "tailwind-merge";

type EverythingSearchProps = {
  q: string;
  language: string;
  pageSize: number;
  totalResults: number;
  pageSizeText: string;
  languageText: string;
  queryText: string;
};

const PAGE_SIZE_OPTIONS: EverythingArgs["pageSize"][] = ["5", "10", "20"];

const LANGUAGE_OPTIONS: ApiNewsLanguage[] = [
  "ar",
  "de",
  "en",
  "es",
  "fr",
  "he",
  "it",
  "nl",
  "no",
  "pt",
  "ru",
  "se",
  "ud",
  "zh",
];

export function EverythingSearch({
  q,
  language,
  pageSize,
  totalResults,
  pageSizeText,
  languageText,
  queryText,
}: EverythingSearchProps) {
  const [query, setQuery] = useState(q);

  const debouncedQuery = useDebounceValue(query, 1000);

  const searchParams = useSearchParams();

  const router = useRouter();

  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const detachedSearchParams = useRef(searchParams);

  const detachedRouter = useRef(router);

  const detachedPathname = useRef(pathname);

  useLayoutEffect(() => {
    detachedSearchParams.current = searchParams;

    detachedRouter.current = router;

    detachedPathname.current = pathname;
  }, [searchParams, router, pathname]);

  const transitionCallback = useCallback((params?: CreateQueryStringParams) => {
    startTransition(() => {
      const queryString = createQueryString(detachedSearchParams.current, {
        page: 1,
        ...params,
      });

      detachedRouter.current.replace(
        `${detachedPathname.current}?${queryString}`,
        { scroll: false },
      );
    });
  }, []);

  useEffect(() => {
    transitionCallback({ q: debouncedQuery });
  }, [debouncedQuery, transitionCallback]);

  return (
    <fieldset
      className="flex flex-col items-start gap-2 bg-primary-200 p-2 text-sm md:flex-row md:items-center md:justify-between lg:text-base"
      disabled={isPending}
    >
      <div className="group flex items-center gap-2">
        <label
          htmlFor="ChangePageSize"
          className="flex w-20 flex-col items-center hover:cursor-pointer md:w-auto"
        >
          <Layers />
          {pageSizeText}
        </label>
        <div className="grid-cols-[0fr] transition-[grid-template-columns] group-focus-within:grid-cols-[1fr] group-hover:grid-cols-[1fr] md:grid">
          <select
            id="ChangePageSize"
            className="min-h-10 min-w-0 rounded-lg border-primary-600 bg-primary px-5 py-2 text-sm text-primary-600 ring-focus transition hover:cursor-pointer focus:cursor-auto focus:border-2 focus:outline-none focus-visible:ring-4 disabled:cursor-not-allowed group-focus-within:px-5 group-hover:px-5 md:px-0"
            onChange={(e) => transitionCallback({ pageSize: e.target.value })}
            defaultValue={pageSize}
          >
            {PAGE_SIZE_OPTIONS.map((pageSizeOption) => (
              <option key={pageSizeOption} value={pageSizeOption}>
                {pageSizeOption}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="group flex items-center gap-2">
        <label
          htmlFor="ChangeSearchLanguage"
          className="flex w-20 flex-col items-center hover:cursor-pointer md:w-auto"
        >
          <BookOpenCheck />
          {languageText}
        </label>
        <div className="grid-cols-[0fr] transition-[grid-template-columns] group-focus-within:grid-cols-[1fr] group-hover:grid-cols-[1fr] md:grid">
          <select
            id="ChangeSearchLanguage"
            className="min-h-10 min-w-0 rounded-lg border-primary-600 bg-primary px-5 py-2 text-sm text-primary-600 ring-focus transition hover:cursor-pointer focus:cursor-auto focus:border-2 focus:outline-none focus-visible:ring-4 disabled:cursor-not-allowed group-focus-within:px-5 group-hover:px-5 md:px-0"
            onChange={(e) => transitionCallback({ language: e.target.value })}
            defaultValue={language}
          >
            {LANGUAGE_OPTIONS.map((languageOption) => (
              <option key={languageOption} value={languageOption}>
                {languageOption}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="group flex items-center gap-2">
        <label
          htmlFor="ChangeSearchQuery"
          className="flex w-20 flex-col items-center hover:cursor-pointer md:w-auto"
        >
          <Search />
          {queryText}
        </label>
        <div className="grid-cols-[0fr] transition-[grid-template-columns] group-focus-within:grid-cols-[1fr] group-hover:grid-cols-[1fr] md:grid">
          <input
            id="ChangeSearchQuery"
            className="min-h-10 min-w-0 rounded-lg border-primary-600 bg-primary px-5 py-2 text-sm text-primary-600 ring-focus transition hover:cursor-pointer focus:cursor-auto focus:border-2 focus:outline-none focus-visible:ring-4 disabled:cursor-not-allowed group-focus-within:px-5 group-hover:px-5 md:px-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Newspaper
          className={twMerge(
            "w-20 text-green-500 md:w-auto",
            !totalResults ? "text-red-500" : null,
          )}
        />
        <div>{totalResults}</div>
      </div>
    </fieldset>
  );
}
