#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { execSync } from "node:child_process";

const ROOT = process.cwd();
const BASE_REF = process.env.SPECIFY_DRIFT_BASE || "main";

const run = (cmd) =>
  execSync(cmd, { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] })
    .toString()
    .trim();

const getIssueKey = (branch) => branch.match(/GRA-\d+/)?.[0] ?? "GRA-0";

const parseNumstat = (raw) => {
  const files = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((row) => {
      const [addedRaw, deletedRaw, ...fileParts] = row.split("\t");
      const added = Number.parseInt(addedRaw, 10);
      const deleted = Number.parseInt(deletedRaw, 10);

      return {
        file: fileParts.join("\t"),
        added: Number.isNaN(added) ? 0 : added,
        deleted: Number.isNaN(deleted) ? 0 : deleted,
      };
    });

  const additions = files.reduce((sum, file) => sum + file.added, 0);
  const deletions = files.reduce((sum, file) => sum + file.deleted, 0);

  return { files, additions, deletions, total: additions + deletions };
};

const main = async () => {
  const branch = run("git branch --show-current");
  const issueKey = getIssueKey(branch);
  const stats = parseNumstat(run(`git diff --numstat ${BASE_REF}...HEAD`));
  const note = process.argv
    .slice(2)
    .filter((arg) => arg !== "--")
    .join(" ")
    .trim();

  if (stats.files.length === 0) {
    console.log(
      "No drift recorded: no committed changes detected against the base ref.",
    );
    return;
  }

  const date = new Date().toISOString().slice(0, 10);
  const driftDir = path.join(ROOT, "docs", "features", "drift");
  const driftFile = path.join(driftDir, `${issueKey}.md`);

  let output = `# Drift Log: ${issueKey}\n\n`;
  try {
    output = await readFile(driftFile, "utf8");
    if (!output.endsWith("\n")) {
      output += "\n";
    }
  } catch {
    // Keep the default heading for first write.
  }

  const lines = [
    `## Drift Entry - ${date}`,
    "",
    `- Issue: ${issueKey}`,
    `- Branch: ${branch}`,
    `- Base ref: ${BASE_REF}`,
    `- Files changed: ${stats.files.length}`,
    `- Lines changed: ${stats.total}`,
  ];

  if (note) {
    lines.push(`- Manual note: ${note}`);
  }

  lines.push("", "### File breakdown");
  for (const file of stats.files) {
    lines.push(`- ${file.file} (+${file.added} / -${file.deleted})`);
  }
  lines.push("");

  await mkdir(driftDir, { recursive: true });
  await writeFile(driftFile, `${output}${lines.join("\n")}\n`, "utf8");

  console.log(`Drift updated: docs/features/drift/${issueKey}.md`);
};

await main();
