import { encodeString } from "@/utils/string-manipulation/encodeString";

export type ApiNewsCountry =
  | "ae"
  | "ar"
  | "at"
  | "au"
  | "be"
  | "bg"
  | "br"
  | "ca"
  | "ch"
  | "cn"
  | "co"
  | "cu"
  | "cz"
  | "de"
  | "eg"
  | "fr"
  | "gb"
  | "gr"
  | "hk"
  | "hu"
  | "id"
  | "ie"
  | "il"
  | "in"
  | "it"
  | "jp"
  | "kr"
  | "lt"
  | "lv"
  | "ma"
  | "mx"
  | "my"
  | "ng"
  | "nl"
  | "no"
  | "nz"
  | "ph"
  | "pl"
  | "pt"
  | "ro"
  | "rs"
  | "ru"
  | "sa"
  | "se"
  | "sg"
  | "si"
  | "sk"
  | "th"
  | "tr"
  | "tw"
  | "ua"
  | "us"
  | "ve"
  | "za";

export type ApiNewsLanguage =
  | "ar"
  | "de"
  | "en"
  | "es"
  | "fr"
  | "he"
  | "it"
  | "nl"
  | "no"
  | "pt"
  | "ru"
  | "se"
  | "ud"
  | "zh";

export type ApiNewsResponseStatus = "ok" | "error";

export type ApiNewsCategory =
  | "business"
  | "entertainment"
  | "general"
  | "health"
  | "science"
  | "sports"
  | "technology";

export type ApiNewsSort = "relevancy" | "popularity" | "publishedAt";

export type NewsApiTopHeadlinesParams = {
  country?: ApiNewsCountry;
  category?: ApiNewsCategory;
  sources?: string[];
  q?: string;
  pageSize?: number;
  page?: number;
};

export type NewsApiResponse = {
  status: ApiNewsResponseStatus;
  code?: string;
  error?: string;
  totalResults: number;
  articles: NewsApiArticle[];
};

export type NewsApiArticle = {
  source: NewsApiSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

export type NewsApiSource = {
  id: string | null;
  name: string;
};

export type NewsApiEverythingParams = {
  q?: string;
  qInTitle?: string;
  sources?: string[];
  domains?: string[];
  excludeDomains?: string[];
  from?: string;
  to?: string;
  language?: ApiNewsLanguage;
  sortBy?: ApiNewsSort;
  pageSize?: number;
  page?: number;
};

export type NewsApiSourceParams = {
  category?: ApiNewsCategory;
  language?: ApiNewsLanguage;
  country?: ApiNewsCountry;
};

export type NewsApiSourcesResponse = {
  status: ApiNewsResponseStatus;
  code?: string;
  error?: string;
  sources: NewsApiSourceItem[];
};

export type NewsApiSourceItem = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: ApiNewsCategory;
  language: ApiNewsLanguage;
  country: ApiNewsCountry;
};

export async function getTopHeadlinesData(
  params: NewsApiTopHeadlinesParams,
): Promise<NewsApiResponse> {
  if (params.sources && params.sources.length) {
    if (params.country) {
      throw new Error(
        "Not possible to mix 'country' with the 'sources' param.",
      );
    }
    if (params.category) {
      throw new Error(
        "Not possible to mix 'category' with the 'sources' param.",
      );
    }
  }

  const queries = [];

  if (params.q) {
    queries.push(encodeString({ q: params.q }));
  }

  if (params.country) {
    queries.push(encodeString({ country: params.country }));
  }

  if (params.category) {
    queries.push(encodeString({ category: params.category }));
  }

  if (params.sources && params.sources.length) {
    queries.push(encodeString({ sources: params.sources.join(",") }));
  }

  if (params.pageSize) {
    queries.push(encodeString({ pageSize: params.pageSize }));
  }

  if (params.page) {
    queries.push(encodeString({ page: params.page }));
  }

  const res = await fetch(
    "https://newsapi.org/v2/top-headlines?" + queries.join("&"),
    {
      headers: {
        Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
      },
    },
  );

  if (!res.ok) {
    try {
      const resError = await res.json();

      throw new Error(`Failed to fetch data: ${resError.message}`);
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error}`);
    }
  }

  return res.json();
}

export async function getEverythingData(
  params: NewsApiEverythingParams,
): Promise<NewsApiResponse> {
  const queries = [];

  if (params.q) {
    queries.push(encodeString({ q: params.q }));
  }

  if (params.qInTitle) {
    queries.push(encodeString({ qInTitle: params.qInTitle }));
  }

  if (params.sources && params.sources.length) {
    queries.push(encodeString({ sources: params.sources.join(",") }));
  }

  if (params.domains && params.domains.length) {
    queries.push(encodeString({ domains: params.domains.join(",") }));
  }

  if (params.excludeDomains && params.excludeDomains.length) {
    queries.push(
      encodeString({
        excludeDomains: params.excludeDomains.join(","),
      }),
    );
  }

  if (params.from) {
    queries.push(encodeString({ from: params.from }));
  }

  if (params.to) {
    queries.push(encodeString({ to: params.to }));
  }

  if (params.language) {
    queries.push(encodeString({ language: params.language }));
  }

  if (params.sortBy) {
    queries.push(encodeString({ sortBy: params.sortBy }));
  }

  if (params.pageSize) {
    queries.push(encodeString({ pageSize: params.pageSize }));
  }

  if (params.page) {
    queries.push(encodeString({ page: params.page }));
  }

  const res = await fetch(
    "https://newsapi.org/v2/everything?" + queries.join("&"),
    {
      headers: {
        Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
      },
    },
  );

  if (!res.ok) {
    try {
      const resError = await res.json();

      throw new Error(`Failed to fetch data: ${resError.message}`);
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error}`);
    }
  }

  return res.json();
}
