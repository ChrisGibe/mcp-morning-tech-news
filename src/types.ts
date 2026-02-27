export interface NewsArticle {
  title: string;
  date: string;
  url: string;
  summary?: string;
  details?: string;
}

export interface NewsSource {
  name: string;
  fetchNews(): Promise<NewsArticle[]>;
}