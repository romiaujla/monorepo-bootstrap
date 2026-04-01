#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { execSync } from "node:child_process";

const ROOT = process.cwd();
const BRANCH_PATTERN = /^(chore|feat|fix|hotfix)\/GRA-\d+(-[a-z0-9-]+)?$/;
const REQUIRED_DOCS = [
  "AGENTS.md",
  "docs/process/engineering-constitution.md",
  "docs/process/ai-agent-prompt-help.md",
  "docs/process/spec-kit-workflow.md",
  "docs/process/spec-kit-installation.md",
  "docs/features/README.md",
];
const PROMPT_PATTERNS = [
  "--help",
  "--speckit GRA-<id>",
  "--implement GRA-<id>",
  "--audit GRA-<id>",
  "--clean-code-api",
  "--clean-code-web",
  "--resolve-pr-comments [PR-NUMBER]",
  "--review [PR-NUMBER]",
  "--refresh-pr [PR-NUMBER]",
  "--status [GRA-<id>]",
  "--handoff GRA-<id>",
  "--reconcile GRA-<id>",
  "--test-fix [TARGET]",
  "--scope-drift GRA-<id>",
];

const checks = [];

const addCheck = (name, ok, detail) => {
  checks.push({ name, ok, detail });
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const ensureFileContains = async (filePath, pattern, label) => {
  try {
    const content = await readFile(path.join(ROOT, filePath), "utf8");
    addCheck(
      label,
      pattern.test(content),
      pattern.test(content) ? "Found" : "Missing required content",
    );
  } catch (error) {
    addCheck(label, false, `Unable to read ${filePath}: ${error.message}`);
  }
};

const getCurrentBranch = () => {
  try {
    return execSync("git branch --show-current", {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "pipe"],
    })
      .toString()
      .trim();
  } catch (error) {
    addCheck(
      "Branch naming follows constitution",
      false,
      `Unable to detect branch: ${error.message}`,
    );
    return "";
  }
};

const main = async () => {
  const branch = getCurrentBranch();
  if (branch) {
    addCheck(
      "Branch naming follows constitution",
      BRANCH_PATTERN.test(branch),
      BRANCH_PATTERN.test(branch) ? branch : `Invalid branch: ${branch}`,
    );
  }

  for (const docPath of REQUIRED_DOCS) {
    try {
      await access(path.join(ROOT, docPath));
      addCheck(`Required doc exists: ${docPath}`, true, "Present");
    } catch {
      addCheck(`Required doc exists: ${docPath}`, false, "Missing");
    }
  }

  for (const promptPattern of PROMPT_PATTERNS) {
    await ensureFileContains(
      "docs/process/ai-agent-prompt-help.md",
      new RegExp(escapeRegExp(promptPattern), "i"),
      `Prompt help registry documents ${promptPattern}`,
    );
  }

  await ensureFileContains(
    "AGENTS.md",
    /--speckit GRA-<id>[\s\S]*\/specify/i,
    "AGENTS documents /specify for --speckit runs",
  );
  await ensureFileContains(
    "AGENTS.md",
    /--implement GRA-<id>[\s\S]*skip[\s\S]*\/specify[\s\S]*\/plan[\s\S]*\/tasks/i,
    "AGENTS documents the --implement shortcut",
  );
  await ensureFileContains(
    "docs/process/spec-kit-installation.md",
    /pnpm specify\.audit/i,
    "Spec Kit installation doc references pnpm specify.audit",
  );
  await ensureFileContains(
    "README.md",
    /AGENTS\.md|spec-kit|specify\.audit/i,
    "README links the AI-agent and Spec Kit workflow",
  );

  const failed = checks.filter((check) => !check.ok);

  console.log("specify.audit report");
  console.log("");
  for (const check of checks) {
    console.log(
      `${check.ok ? "PASS" : "FAIL"} - ${check.name}: ${check.detail}`,
    );
  }

  if (failed.length > 0) {
    process.exitCode = 1;
    console.log("");
    console.log(`Result: ${failed.length} check(s) failed.`);
    return;
  }

  console.log("");
  console.log("Result: all checks passed.");
};

await main();
