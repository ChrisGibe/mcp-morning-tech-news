export interface NewsArticle {
  title: string;
  date: string;
  url: string;
  summary?: string;
  details?: string;
  fullContent?: string;
}

export interface NewsXml {
  title: string;
  url: string;
  date: string;
  fullContent?: string;
  summary: string;
}

export interface NewsSource {
  name: string;
  fetchNews(): Promise<NewsArticle[]>;
}