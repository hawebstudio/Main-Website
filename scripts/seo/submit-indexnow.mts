import {
  absoluteUrl,
  readAllContentEntries,
  siteUrl,
  staticRoutes,
  type AuditMessage,
} from "../shared/toolkit.mts";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

async function run() {
  const messages: AuditMessage[] = [];

  if (process.env.INDEXNOW_ENABLED !== "true") {
    console.log(
      'IndexNow submission skipped (INDEXNOW_ENABLED is not "true").',
    );
    return;
  }

  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    messages.push({
      level: "warning",
      message:
        "INDEXNOW_ENABLED is true but INDEXNOW_KEY is not set. Skipping submission.",
    });
    printAndExit("IndexNow submission", messages);
    return;
  }

  // Every collection, so the submitted list matches app/sitemap.ts: services,
  // service families and projects are real, indexable pages there. Submission
  // only happens when INDEXNOW_ENABLED is "true".
  const contentEntries = await readAllContentEntries();
  const urlList = [
    ...staticRoutes.map((route) => absoluteUrl(route)),
    ...contentEntries.map((entry) => absoluteUrl(entry.url)),
  ];

  const payload = {
    host: new URL(siteUrl).host,
    key,
    keyLocation: `${siteUrl}/${key}.txt`,
    urlList,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(
        `IndexNow: submitted ${urlList.length} URL(s), status ${response.status}.`,
      );
    } else {
      messages.push({
        level: "warning",
        message: `IndexNow submission returned ${response.status} ${response.statusText}.`,
      });
    }
  } catch (error) {
    messages.push({
      level: "warning",
      message: `IndexNow submission failed: ${error instanceof Error ? error.message : String(error)}`,
    });
  }

  printAndExit("IndexNow submission", messages);
}

function printAndExit(title: string, messages: AuditMessage[]) {
  const warnings = messages.filter((item) => item.level === "warning");
  if (warnings.length) {
    console.warn(`${title} had ${warnings.length} warning(s):`);
    for (const warning of warnings) console.warn(`- ${warning.message}`);
  } else {
    console.log(`${title} passed.`);
  }
}

run();
