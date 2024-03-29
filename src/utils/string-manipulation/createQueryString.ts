import { ReadonlyURLSearchParams } from "next/navigation";

export function createQueryString(
  searchParams: ReadonlyURLSearchParams,
  params: Record<string, string | number>,
) {
  const currentParams = new URLSearchParams(searchParams.toString());

  Object.entries(params).forEach(([name, value]) => {
    currentParams.set(name, value.toString());
  });

  return currentParams.toString();
}
