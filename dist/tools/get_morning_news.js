import { anthropicSource } from '../sources/anthropic.js';
import { openaiSource } from '../sources/openai.js';
export async function getMorningNews() {
    const allNews = [];
    const anthropicNews = await anthropicSource.fetchNews();
    const openaiNews = await openaiSource.fetchNews();
    if (anthropicNews.length > 0) {
        allNews.push(`\n🤖 ANTHROPIC\n`);
        anthropicNews.forEach(article => {
            allNews.push(`• ${article.title} (${article.date})`);
            allNews.push(`  ${article.url}`);
            if (article.summary) {
<<<<<<< HEAD
                allNews.push(`  📝 ${article.summary.substring(0, 100)}...`);
=======
                allNews.push(`  📝 ${article.summary}`);
>>>>>>> dev/improve-css-selectors
            }
            allNews.push('');
        });
    }
    if (openaiNews.length > 0) {
        allNews.push(`\n🤖 OPENAI\n`);
        openaiNews.forEach(article => {
            allNews.push(`• ${article.title} (${article.date})`);
            allNews.push(`  ${article.url}`);
            if (article.summary) {
<<<<<<< HEAD
                allNews.push(`  📝 ${article.summary.substring(0, 100)}...`);
=======
                allNews.push(`  📝 ${article.summary}`);
>>>>>>> dev/improve-css-selectors
            }
            allNews.push('');
        });
    }
    return allNews.join('\n');
}
