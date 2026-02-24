# Morning Tech News - MCP Server

An MCP (Model Context Protocol) server that fetches the latest tech news and generates a concise morning briefing. Built with the official `@modelcontextprotocol/sdk`.

## Features

- **Tool: `get_morning_news`** — Scrapes the latest articles from tech sources (currently Anthropic) and returns a formatted list with titles, dates, URLs, and summaries.
- **Prompt: `morning_tech_brief`** — Pre-built prompt that calls the tool and formats the results into a structured morning briefing tailored for front-end / WordPress / Vue.js developers.
- Extensible architecture with typed `NewsSource` interface — easy to add new sources.

## Project Structure

```
src/
├── index.ts                  # MCP server entry point (tool + prompt registration)
├── types.ts                  # NewsArticle & NewsSource interfaces
├── tools/
│   └── get_morning_news.ts   # Aggregates news from all sources
└── sources/
    └── anthropic.ts          # Scrapes anthropic.com/news using Cheerio
```

## Prerequisites

- **Node.js** >= 18

### Configure in Claude Desktop

Add the server to your Claude Desktop configuration file (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "morning-tech-news": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-morning-tech-news/dist/index.js"]
    }
  }
}
```

Then restart Claude Desktop. You can now:

1. Use the **`get_morning_news`** tool to fetch raw tech news.
2. Use the **`morning_tech_brief`** prompt to get a formatted daily briefing.

## Tech Stack

- **TypeScript** — Strict mode, ES2022 target
- **@modelcontextprotocol/sdk** — MCP server framework
- **Cheerio** — HTML parsing / web scraping

## License

MIT
