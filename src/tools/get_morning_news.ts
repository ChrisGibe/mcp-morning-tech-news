import { anthropicSource } from '../sources/anthropic.js';

export async function getMorningNews() {
  const allNews: string[] = [];
  
  const anthropicNews = await anthropicSource.fetchNews();
  
  if (anthropicNews.length > 0) {
    allNews.push(`\n🤖 ANTHROPIC\n`);
    
    anthropicNews.forEach(article => {
      allNews.push(`• ${article.title} (${article.date})`);
      allNews.push(`  ${article.url}`);
      if (article.summary) {
        allNews.push(`  📝 ${article.summary.substring(0, 100)}...`);
      }
      allNews.push('');
    });
  }
  
  return allNews.join('\n');
}