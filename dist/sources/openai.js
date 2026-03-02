import * as cheerio from "cheerio";
export const openaiSource = {
    name: "OpenAi",
    async fetchNews() {
        try {
            const response = await fetch("https://openai.com/news/rss.xml");
            const xml = await response.text();
            const $ = cheerio.load(xml, { xmlMode: true });
            const articles = [];
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
                        summary: fullContent.substring(0, 200) + "..."
                    });
                }
            }
            return articles;
        }
        catch (error) {
            console.error("Erreur lors du scraping OpenAI:", error);
            return [];
        }
    },
};
