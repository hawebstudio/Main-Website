import {
  pathExists,
  printResult,
  type AuditMessage,
} from "../shared/toolkit.mts";

const messages: AuditMessage[] = [];

for (const required of [
  "app/sitemap.ts",
  "app/robots.ts",
  "app/rss.xml/route.ts",
  "app/atom.xml/route.ts",
  "public/llms.txt",
]) {
  if (!pathExists(required))
    messages.push({
      level: "issue",
      message: `Missing generated or source build asset: ${required}`,
    });
}

if (!pathExists("public/search/search-index.json")) {
  messages.push({
    level: "warning",
    message:
      "Search index missing. Run `pnpm search:build` before deployment if site search is enabled.",
  });
}

printResult("Build verify", messages);
