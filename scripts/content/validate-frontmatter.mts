import {
  printResult,
  readContentEntries,
  wordCount,
  type AuditMessage,
} from "../shared/toolkit.mts";

interface FrontmatterData {
  title?: string;
  description?: string;
  status?: string;
  readingTime?: number;
  seo?: { title?: string; description?: string };
  author?: { name?: string };
}

const messages: AuditMessage[] = [];

for (const entry of await readContentEntries()) {
  const data = entry.data as FrontmatterData;
  const title = data.seo?.title ?? data.title;
  const description = data.seo?.description ?? data.description;

  if (!title)
    messages.push({
      level: "issue",
      message: `${entry.relativePath}: missing title`,
    });
  if (!description)
    messages.push({
      level: "issue",
      message: `${entry.relativePath}: missing description`,
    });
  if (!entry.slug)
    messages.push({
      level: "issue",
      message: `${entry.relativePath}: missing slug`,
    });
  if (
    entry.collection === "insights" &&
    data.status === "published" &&
    !data.author?.name
  ) {
    messages.push({
      level: "issue",
      message: `${entry.relativePath}: published insight missing author`,
    });
  }
  if (entry.collection === "insights" && !data.readingTime) {
    messages.push({
      level: "warning",
      message: `${entry.relativePath}: missing readingTime`,
    });
  }
  if (wordCount(entry.content) < 250) {
    messages.push({
      level: "warning",
      message: `${entry.relativePath}: thin content under 250 words`,
    });
  }
}

printResult("Content frontmatter validation", messages);
