import { ReadonlyURLSearchParams } from "next/navigation";

export type CreateQueryStringParams = Record<string, string | number>;

export function createQueryString(
  searchParams: ReadonlyURLSearchParams,
  params: CreateQueryStringParams,
) {
  const currentParams = new URLSearchParams(searchParams.toString());

  Object.entries(params).forEach(([name, value]) => {
    currentParams.set(name, value.toString());
  });

  return currentParams.toString();
}
