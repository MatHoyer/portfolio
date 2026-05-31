import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: ["json"],
    });
  }
  return highlighterPromise;
}

export async function highlightJson(data: unknown): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(JSON.stringify(data, null, 2), {
    lang: "json",
    theme: "github-dark",
  });
}
