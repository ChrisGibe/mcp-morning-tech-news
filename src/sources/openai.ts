import * as cheerio from "cheerio";
import { NewsXml, NewsSource } from "../types.js";

export const openaiSource: NewsSource = {
  name: "OpenAi",

  async fetchNews(): Promise<NewsXml[]> {
    try {
      const response = await fetch("https://openai.com/news/rss.xml");
      const xml = await response.text();

      const $ = cheerio.load(xml, { xmlMode: true });

      const articles: NewsXml[] = [];

      for (const elem of $("item").slice(0, 5).toArray()) {
        const title = $(elem).find("title").first().text().trim();
        const url = $(elem).find("link").first().text().trim();
        const dateText = $(elem).find("pubDate").first().text().trim();
        const fullContent = $(elem).find("description").first().text().trim();

        if (title && url) {
          articles.push({
            title: title,
            date: dateText || "Date inconnue",
            url: url,
            fullContent: fullContent,
            summary: fullContent.substring(0, 500) + "..."
          });
        }
      }

      return articles;
    } catch (error) {
      console.error("Erreur lors du scraping OpenAI:", error);
      return [];
    }
  },
};
