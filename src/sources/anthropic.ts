import * as cheerio from 'cheerio';
import { NewsArticle, NewsSource } from '../types.js';

export const anthropicSource: NewsSource = {
  name: "Anthropic",
  
  async fetchNews(): Promise<NewsArticle[]> {
    try {
      const response = await fetch('https://www.anthropic.com/news');
      const html = await response.text();
      
      const $ = cheerio.load(html);
      
      const articles: NewsArticle[] = [];
      
      $('article, .post, .news-item').slice(0, 5).each((i, elem) => {
        const title = $(elem).find('h2, h3, .title').first().text().trim();
        const url = $(elem).find('a').first().attr('href') || '';
        const dateText = $(elem).find('time, .date, .published').first().text().trim();
        
        if (title && url) {
          articles.push({
            title,
            date: dateText || 'Date inconnue',
            url: url.startsWith('http') ? url : `https://www.anthropic.com${url}`,
            summary: $(elem).find('p, .excerpt, .summary').first().text().trim()
          });
        }
      });
      
      return articles;
      
    } catch (error) {
      console.error('Erreur lors du scraping Anthropic:', error);
      return [];
    }
  }
};