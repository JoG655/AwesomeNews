import queryString from "query-string";

export function decodeString(value: string) {
  return queryString.parse(value);
}
