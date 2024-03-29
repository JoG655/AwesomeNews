"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { useRouter } from "next/navigation";

import { Fragment, useTransition } from "react";

import { createQueryString } from "@/utils/string-manipulation/createQueryString";

import { createRange } from "@/utils/range/createRange";

import { Button } from "@/components/button/Button";

import { ChevronLeft, ChevronRight } from "lucide-react";

type EverythingNavigationProps = {
  pageSize: number;
  page: number;
  totalResults: number;
  maxPageButtons?: number;
};

const MAX_TOTAL_RESULTS = 100;

export function EverythingNavigation({
  pageSize,
  page,
  totalResults,
  maxPageButtons = 5,
}: EverythingNavigationProps) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  function handleDirectionClick(variant: "Back" | "Next") {
    startTransition(() => {
      const nextPage = variant === "Back" ? page - 1 : page + 1;

      const queryString = createQueryString(searchParams, {
        page: nextPage,
      });

      router.replace(`${pathname}?${queryString}`, { scroll: false });
    });
  }

  function handlePageClick(page: number) {
    startTransition(() => {
      const queryString = createQueryString(searchParams, {
        page: page,
      });

      router.replace(`${pathname}?${queryString}`, { scroll: false });
    });
  }

  function getPageButtons() {
    const pageLimit = getPageLimit();

    if (pageLimit < maxPageButtons) {
      return createRange(1, pageLimit);
    }

    const maxOffset = Math.floor(maxPageButtons / 2);

    if (page - maxOffset < 1) {
      return createRange(1, maxPageButtons);
    }

    if (page + maxOffset >= pageLimit) {
      return createRange(pageLimit - maxPageButtons + 1, pageLimit);
    }

    return createRange(page - maxOffset, page + maxOffset);
  }

  function getPageLimit() {
    const pageCap = Math.ceil(totalResults / pageSize);

    const maxPageCap = Math.floor(MAX_TOTAL_RESULTS / pageSize);

    return pageCap < maxPageCap ? pageCap : maxPageCap;
  }

  return (
    <fieldset className="flex justify-center gap-4 p-2" disabled={isPending}>
      <Button
        size="sm"
        onClick={() => handleDirectionClick("Back")}
        disabled={page === 1}
      >
        <ChevronLeft />
      </Button>
      <div className="relative flex gap-1">
        {getPageButtons().map((pageNumber, i, arr) => (
          <Fragment key={pageNumber}>
            {i === 0 && pageNumber !== 1 ? (
              <div className="absolute left-0 z-20 h-full w-6 bg-gradient-to-r from-white from-50% to-transparent pl-1"></div>
            ) : null}
            <Button
              variant="outline"
              size="sm"
              className="px-5 disabled:bg-primary-200 disabled:text-primary-600"
              onClick={() => handlePageClick(pageNumber)}
              disabled={page === pageNumber}
            >
              {pageNumber}
            </Button>
            {i === arr.length - 1 && pageNumber !== getPageLimit() ? (
              <div className="absolute right-0 z-20 h-full w-6 bg-gradient-to-l from-white from-50% to-transparent pr-1"></div>
            ) : null}
          </Fragment>
        ))}
      </div>
      <Button
        size="sm"
        onClick={() => handleDirectionClick("Next")}
        disabled={page === getPageLimit()}
      >
        <ChevronRight />
      </Button>
    </fieldset>
  );
}
