import queryString from "query-string";

export function encodeString(keyValue: Record<string, any>) {
  return queryString.stringify(keyValue);
}
