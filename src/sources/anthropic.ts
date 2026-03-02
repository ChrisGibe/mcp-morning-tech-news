import * as cheerio from "cheerio";
import { NewsArticle, NewsSource } from "../types.js";

export const anthropicSource: NewsSource = {
  name: "Anthropic",

  async fetchNews(): Promise<NewsArticle[]> {
    try {
      const response = await fetch("https://www.anthropic.com/news");
      const $list = cheerio.load(await response.text());

      const articles: NewsArticle[] = [];

      for (const elem of $list('li a[href^="/news/"]').slice(0, 5).toArray()) {
        const url = $list(elem).attr("href") || "";
        const title = $list(elem).children("span").text().trim();
        const date = $list(elem).find("time").text().trim();

        // Fetch l'article complet
        const articleResponse = await fetch(`https://www.anthropic.com${url}`);
        const $article = cheerio.load(await articleResponse.text());

        const paragraphs = $article("article p")
          .slice(0, 3)
          .map((i, p) => $article(p).text().trim())
          .get()
          .join("\n\n");

        articles.push({
          title: title,
          date: date || "",
          url: `https://www.anthropic.com${url}`,
          fullContent: paragraphs,
          summary: paragraphs.substring(0, 500) + "..."
        });
        

        await new Promise(resolve => setTimeout(resolve, 500));
      }

      return articles;
    } catch (error) {
      console.error("Erreur lors du scraping Anthropic:", error);
      return [];
    }
  },
};