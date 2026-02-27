import { influencerSource } from '../sources/influencers.js';
export async function getInfluencerInsights() {
    // Exécution parallèle pour la rapidité
    const [jack, boris, amanda, dario] = await Promise.all([
        influencerSource.fetchJackClark(),
        influencerSource.fetchSocialPost('bcherny', 'Boris Cherny', 'Engineering'),
        influencerSource.fetchSocialPost('amandaskell', 'Amanda Askell', 'Research'),
        influencerSource.fetchSocialPost('darioamodei', 'Dario Amodei', 'Policy')
    ]);
    const allPosts = [...jack, ...boris, ...amanda, ...dario];
    if (allPosts.length === 0) {
        return "Aucune publication récente trouvée pour les experts Anthropic.";
    }
    // Construction du rapport final
    let output = "📋 **ANTHROPIC INSIDER INSIGHTS**\n";
    output += "Dernières réflexions du staff technique et stratégique.\n\n";
    const categories = ['Engineering', 'Research', 'Policy'];
    for (const cat of categories) {
        const catPosts = allPosts.filter(p => p.category === cat);
        if (catPosts.length > 0) {
            output += `--- ${cat.toUpperCase()} ---\n`;
            catPosts.forEach(post => {
                output += `👤 **${post.author}** (${post.date})\n`;
                output += `💬 ${post.content}\n`;
                output += `🔗 ${post.url}\n\n`;
            });
        }
    }
    return output;
}
