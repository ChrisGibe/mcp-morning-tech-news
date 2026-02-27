import * as cheerio from 'cheerio';
import Parser from 'rss-parser';

export interface InfluencerPost {
  author: string;
  content: string;
  date: string;
  url: string;
  category: 'Research' | 'Engineering' | 'Policy';
}

const parser = new Parser();

export class InfluencerSource {
  private readonly nitterInstances = [
    'https://nitter.net',
    'https://nitter.privacydev.net',
    'https://nitter.cz'
  ];

  // Récupère les tweets via Nitter (Proxy Twitter)
  async fetchSocialPost(handle: string, authorName: string, category: any): Promise<InfluencerPost[]> {
    try {
      // On utilise la première instance par défaut
      const response = await fetch(`${this.nitterInstances[1]}/${handle}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      const html = await response.text();
      const $ = cheerio.load(html);
      
      const posts: InfluencerPost[] = [];
      $('.timeline-item').slice(0, 3).each((_, elem) => {
        const text = $(elem).find('.tweet-content').text().trim();
        const link = $(elem).find('.tweet-link').attr('href');
        if (text) {
          posts.push({
            author: authorName,
            content: text,
            date: $(elem).find('.tweet-date a').attr('title') || 'Récemment',
            url: `https://twitter.com${link}`,
            category
          });
        }
      });
      return posts;
    } catch (e) {
      console.error(`Erreur pour ${authorName}:`, e);
      return [];
    }
  }

  // Récupère la newsletter de Jack Clark
  async fetchJackClark(): Promise<InfluencerPost[]> {
    try {
      const feed = await parser.parseURL('https://importai.substack.com/feed');
      return feed.items.slice(0, 2).map(item => ({
        author: 'Jack Clark',
        content: `[Newsletter] ${item.title}: ${item.contentSnippet?.substring(0, 200)}...`,
        date: new Date(item.pubDate || '').toLocaleDateString(),
        url: item.link || '',
        category: 'Policy'
      }));
    } catch (e) { return []; }
  }
}

export const influencerSource = new InfluencerSource();