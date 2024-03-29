import type { UrlObject } from "query-string";
import queryString from "query-string";

export function encodeUrl(value: UrlObject) {
  return queryString.stringifyUrl(value);
}
