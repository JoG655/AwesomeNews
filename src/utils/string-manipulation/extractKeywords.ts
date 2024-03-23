type ExtractKeywordsOptions = {
  excludeStopWords?: boolean;
};

export function extractKeywords(
  value: string,
  options: ExtractKeywordsOptions = { excludeStopWords: false },
) {
  const stopWords = [
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "for",
    "from",
    "has",
    "he",
    "in",
    "is",
    "it",
    "its",
    "of",
    "on",
    "that",
    "the",
    "to",
    "was",
    "were",
    "with",
  ];

  const words = value
    .trim()
    .toLowerCase()
    .match(/\b[\w']+\b/g);

  if (options.excludeStopWords)
    return [
      ...Array.from(new Set(words?.filter((w) => w && !stopWords.includes(w)))),
    ];

  return [...Array.from(new Set(words))];
}
