import * as cheerio from 'cheerio';
import { NewsArticle, NewsSource } from '../types.js';

export const openaiSource: NewsSource = {
    name: "OpenAi",

    async fetchNews(): Promise<NewsArticle[]> {
        try {
            const response = await fetch("https://openai.com/fr-FR/news/")
            const html = await response.text()

            const $ = cheerio.load(html)

            const articles: NewsArticle[] = []

            $('a, div, div.group').slice(0, 5).each((i, elem) => {
                const title = $(elem).find('h2, h3, .title').first().text().trim();
                const url = $(elem).find('a').first().attr('href') || '';
                const dateText = $(elem).find('time, .date, .published').first().text().trim();
                const ariaLabel = $(elem).find('a').first().attr('aria-label') || '';

                if(title && url) {
                    articles.push({
                        title,
                        date: dateText || 'Date inconnue',
                        url: url.startsWith('http') ? url : `https://openai.com/fr-FR/news/${url}`,
                        summary: $(elem).find('p, .excerpt, .summary').first().text().trim(),
                        details: ariaLabel
                    })
                }
            })

            return articles
            
        } catch (error) {
            console.error('Erreur lors du scraping OpenAI:', error)
            return []
        }
    }
}