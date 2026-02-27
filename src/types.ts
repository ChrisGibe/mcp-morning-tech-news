export interface NewsArticle {
  title: string;
  date: string;
  url: string;
  summary?: string;
  sourceName?: string;
}

export interface NewsSource {
  name: string;
  fetchNews(): Promise<NewsArticle[]>;
}