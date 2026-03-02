<<<<<<< HEAD
import * as cheerio from 'cheerio';
=======
import * as cheerio from "cheerio";
>>>>>>> dev/improve-css-selectors
export const anthropicSource = {
    name: "Anthropic",
    async fetchNews() {
        try {
<<<<<<< HEAD
            const response = await fetch('https://www.anthropic.com/news');
            const html = await response.text();
            const $ = cheerio.load(html);
            const articles = [];
            $('article, .post, .news-item').slice(0, 5).each((i, elem) => {
                const title = $(elem).find('h2, h3, .title').first().text().trim();
                const url = $(elem).find('a').first().attr('href') || '';
                const dateText = $(elem).find('time, .date, .published').first().text().trim();
                const ariaLabel = $(elem).find('a').first().attr('aria-label') || '';
                if (title && url) {
                    articles.push({
                        title,
                        date: dateText || 'Date inconnue',
                        url: url.startsWith('http') ? url : `https://www.anthropic.com${url}`,
                        summary: $(elem).find('p, .excerpt, .summary').first().text().trim(),
                        details: ariaLabel
                    });
                }
            });
            return articles;
        }
        catch (error) {
            console.error('Erreur lors du scraping Anthropic:', error);
            return [];
        }
    }
=======
            const response = await fetch("https://www.anthropic.com/news");
            const $list = cheerio.load(await response.text());
            const articles = [];
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
                    summary: paragraphs.substring(0, 200) + "..."
                });
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            return articles;
        }
        catch (error) {
            console.error("Erreur lors du scraping Anthropic:", error);
            return [];
        }
    },
>>>>>>> dev/improve-css-selectors
};
