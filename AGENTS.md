# AGENTS.md

## Mandatory Policy

All AI agents working in this repository must follow:

- `docs/process/engineering-constitution.md`
- `docs/process/spec-kit-workflow.md`
- `docs/process/ai-agent-prompt-help.md`
- `docs/process/development-workflow.md` for UI work
- `docs/process/component-development.md` for reusable UI components
- `docs/process/ui-guidlines.md` for UI consistency

This is mandatory for code changes, branch naming, commits, pull requests, and release-related work.

## Required Workflow

- Use issue-linked branches and commits per the constitution.
- For repositories that do not have a live Jira project yet, use `GRA-<id>` as the generic placeholder key family.
- For bootstrap/template maintenance work without a Jira ticket, use `GRA-0`.
- Use tagged workflow commands to select delivery mode:
  - `--help` for prompt discovery and supported command lookup
  - `--speckit GRA-<id>` for full Spec Kit delivery
  - `--implement GRA-<id>` for implementation-only delivery
- Use documented workflow-helper prompts from `docs/process/ai-agent-prompt-help.md` for audit, PR comment resolution, PR refresh, status, handoff, reconcile, review, test-fix, and scope-drift loops.
- Use `--clean-code-api` and `--clean-code-web` for workspace-scoped clean-code audits only; these prompts do not authorize implementation changes unless the user explicitly asks for them.
- Keep the prompt help registry in `docs/process/ai-agent-prompt-help.md` aligned with any documented prompt behavior changes.

## Prompt-Driven Start Workflow

When a user prompt is in the form `--speckit GRA-<id>` or `--implement GRA-<id>`:

1. Resolve the issue or work item first and use that scope only unless the user explicitly broadens it.
2. Use `docs/process/engineering-constitution.md` as the governing policy for branch naming, commits, pull requests, and release-safe metadata.
3. Before creating a new issue-linked branch, run `git checkout main && git pull`, then create the matching branch. If the branch already exists, validate and use that existing branch before editing files.
4. If the work item is tracked in Jira or another tracker, move it to `In Progress` when the branch is created.
5. If the prompt is `--implement GRA-<id>`, skip `/specify`, `/plan`, and `/tasks` and proceed directly to implementation.
6. If the prompt is `--speckit GRA-<id>`, begin with `/specify`, then continue in this order only: `/plan`, `/tasks`, implementation, and pull request creation.
7. For UI-related features under `--speckit`, enforce the ordered workflow from `docs/process/development-workflow.md`.
8. After completing `/specify`, `/plan`, `/tasks`, and implementation, commit and push that phase before moving to the next phase when no unresolved clarification remains.
9. Pause for clarification instead of auto-advancing when scope, requirements, repository state, validation evidence, or branch-to-issue alignment are ambiguous or blocked.
10. Create the final pull request only after implementation is complete, committed, and pushed. Include issue linkage, links to `spec.md`, `plan.md`, and `tasks.md` when the Spec Kit phases were used, a scope statement, and validation notes in the PR description.
11. If the work item is tracked in Jira or another tracker, move it to `In Review` when the pull request is created.

When a user prompt is `--help`:

1. Use `docs/process/ai-agent-prompt-help.md` as the source-of-truth registry for supported repository AI-agent prompt patterns.
2. Return the documented prompt patterns with concise behavior descriptions.
3. Keep the response limited to prompts that are actually documented in the repository.

When a user prompt matches a documented workflow-helper command such as `--audit`, `--resolve-pr-comments`, `--review`, `--refresh-pr`, `--status`, `--handoff`, `--reconcile`, `--test-fix`, or `--scope-drift`:

1. Treat the current issue-linked branch or specified PR/issue as the working scope unless the documented command explicitly requires follow-up work.
2. Preserve branch, commit, issue, and PR metadata required by `docs/process/engineering-constitution.md`.
3. Use `--audit` to report scope coverage, validation gaps, and out-of-scope changes without silently rewriting scope.
4. Use `--resolve-pr-comments` to inspect the current branch PR or a specified PR, make safe straightforward fixes, and reply when automation should not change behavior.
5. Use `--review`, `--refresh-pr`, `--status`, `--handoff`, `--reconcile`, `--test-fix`, and `--scope-drift` only for delivery-maintenance work that stays aligned with the branch and PR.
6. Pause for clarification or create follow-up work when a helper command reveals drift that should not be merged under the current issue key.

When a user prompt is `--clean-code-api` or `--clean-code-web`:

1. Treat the request as a review-only coding-standards audit, not an implementation task, unless the user explicitly asks for code changes.
2. Scope `--clean-code-api` to files under `apps/api` only.
3. Scope `--clean-code-web` to files under `apps/ui` only.
4. Evaluate findings against `docs/process/engineering-constitution.md` and any relevant engineering/process guidance referenced by the repository workflow documents.
5. Report findings first, before summaries, with concrete file references and clear coding-standard violations or maintainability risks.
6. Do not widen the audit into unrelated repository areas, feature design changes, or speculative implementation work.

## Operational Rules

- Do not bypass repository hooks, CI checks, or branch protection requirements.
- Do not widen PR scope beyond the issue(s) named in the branch and PR.
- Prefer additive, reviewable commits and explicit rationale for policy exceptions.
