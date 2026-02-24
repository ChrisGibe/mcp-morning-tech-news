// src/index.ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getMorningNews } from './tools/get_morning_news.js';
// Création du serveur MCP
const server = new McpServer({
    name: 'morning-tech-news',
    version: '0.1.0',
});
// ===== TOOL =====
server.tool('get_morning_news', 'Récupère les dernières actualités tech (Anthropic, OpenAI, Vue.js, etc.)', {}, async () => {
    const news = await getMorningNews();
    return {
        content: [
            {
                type: 'text',
                text: news,
            },
        ],
    };
});
// ===== PROMPT =====
server.prompt('morning_tech_brief', 'Génère un brief matinal concis des actualités tech', {}, async () => {
    return {
        messages: [
            {
                role: 'user',
                content: {
                    type: 'text',
                    text: `Tu es mon assistant tech matinal. 

                    Utilise le tool get_morning_news pour récupérer les dernières actualités tech.

                    Puis génère un brief matinal au format suivant :

                    📰 BRIEF TECH DU MATIN
                    Date : [aujourd'hui]

                    🔥 TOP 3 ACTUS À RETENIR
                    1. [Titre de l'actu la plus importante]
                    → Pourquoi c'est important : [1 phrase]

                    2. [Deuxième actu importante]
                    → Pourquoi c'est important : [1 phrase]

                    3. [Troisième actu importante]
                    → Pourquoi c'est important : [1 phrase]

                    💡 CE QUE ÇA SIGNIFIE POUR MOI
                    [2-3 phrases sur l'impact potentiel pour un dev front-end WordPress/Vue.js]

                    Sois concis, clair et va droit au but. Le brief ne doit pas dépasser 300 mots.`
                }
            }
        ]
    };
});
// Démarre le serveur
async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Morning Tech News MCP Server démarré ✅');
}
runServer().catch((error) => {
    console.error('Erreur fatale:', error);
    process.exit(1);
});
