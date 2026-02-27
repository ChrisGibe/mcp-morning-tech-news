#!/usr/bin/env node
// src/index.ts

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getMorningNews } from "./tools/get_morning_news.js";
import { getInfluencerInsights } from "./tools/get_influencer_insights.js";

// Création du serveur MCP
const server = new McpServer({
  name: "morning-tech-news",
  version: "0.1.0",
});

// ===== TOOL 1 : NEWS GÉNÉRALES =====
server.registerTool(
  "get_morning_news",
  {
    description: "Récupère les dernières actualités tech (Anthropic, OpenAI, Vue.js, etc.)",
  },
  async () => {
    const news = await getMorningNews();
    return {
      content: [{ type: "text", text: news }],
    };
  }
);

// ===== TOOL 2 : INSIGHTS EXPERTS =====
server.registerTool(
  "get_influencer_insights",
  {
    description: "Récupère les dernières réflexions et tweets techniques du staff d'Anthropic (Boris Cherny, Amanda Askell, etc.)",
  },
  async () => {
    // On appelle la fonction que tu as déjà définie dans tools/get_influencer_insights.ts
    const insights = await getInfluencerInsights();
    return {
      content: [{ type: "text", text: insights }],
    };
  }
);

// ===== PROMPT =====
// Tu peux maintenant mettre à jour ton prompt pour qu'il utilise les DEUX tools si besoin
server.registerPrompt(
  "morning_tech_brief",
  {
    description: "Génère un brief matinal complet (News + Staff Insights)",
  },
  async () => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Tu es mon assistant tech matinal. 

                    1. Utilise get_morning_news pour l'actu officielle.
                    2. Utilise get_influencer_insights pour voir ce que disent les experts d'Anthropic (notamment Boris Cherny sur Claude Code).

                    Génère un brief concis, clair et va droit au but.`,
          },
        },
      ],
    };
  },
);

// Démarre le serveur
async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Morning Tech News MCP Server démarré ✅");
}

runServer().catch((error) => {
  console.error("Erreur fatale:", error);
  process.exit(1);
});