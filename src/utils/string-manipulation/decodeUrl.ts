import queryString from "query-string";

export function decodeUrl(value: string) {
  const parsedUrl = queryString.parseUrl(value);

  return parsedUrl.url;
}
