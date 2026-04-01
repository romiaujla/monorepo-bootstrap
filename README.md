# monorep-bootstrap

Reusable monorepo starter for a `Next.js` UI and `Express` REST API with shared TypeScript and `zod` contracts, `PostgreSQL`, `Prisma`, and CI guardrails.

## AI-Agent Workflow

This template includes a generic AI-agent delivery contract that downstream projects can keep as-is or tailor after generation.

- agent operating instructions: `AGENTS.md`
- prompt registry: `docs/process/ai-agent-prompt-help.md`
- Spec Kit workflow: `docs/process/spec-kit-workflow.md`
- Spec Kit installation runbook: `docs/process/spec-kit-installation.md`
- constitution: `docs/process/engineering-constitution.md`

Supported prompt patterns include:

- `--help`
- `--speckit GRA-<id>`
- `--implement GRA-<id>`
- workflow-helper prompts such as `--audit GRA-<id>`, `--review [PR-NUMBER]`, and `--resolve-pr-comments [PR-NUMBER]`
- clean-code audits: `--clean-code-api` for `apps/api` and `--clean-code-web` for `apps/ui`

Use `GRA-<id>` as the generic issue placeholder family in the template. For bootstrap maintenance work without a real tracker ticket, use `GRA-0`.

Before creating a new issue-linked branch for `--speckit GRA-<id>` or `--implement GRA-<id>`, run `git checkout main && git pull`. If you are working against a live tracker, move the issue to `In Progress` when the branch is created and to `In Review` when the issue-linked pull request is opened.

To verify the docs and prompt contract wiring:

```bash
pnpm specify.audit
```

## Current Scope

The repository currently includes:

- root `pnpm` workspace
- `turbo` task orchestration
- shared `tsconfig` package
- shared `eslint-config` package
- shared `types` package with a starter `zod` contract
- `apps/ui` with Next.js, React, and TypeScript
- `apps/api` with Express and TypeScript

Implementation spec: [docs/implementation-spec.md](/Users/ramanpreetaujla/Documents/AI-Projects/monorep-bootstrap/docs/implementation-spec.md)

## Planned Structure

```txt
apps/
  api/
  ui/

packages/
  eslint-config/
  tsconfig/
  types/
```

## Quickstart

```bash
pnpm install
pnpm build
pnpm lint
pnpm typecheck
```

## Local PostgreSQL

Run the guided local database setup:

```bash
pnpm local:postgres:setup
```

The script will:

- ask whether to use Docker or Podman
- ask for the local PostgreSQL port
- ask for the database name
- suggest a strong password and let you accept or replace it
- ask for the schema name, defaulting to `public`
- create the local PostgreSQL container
- generate `.env.local` with the connection settings

After setup, you can manage the container with:

```bash
pnpm local:postgres:start
pnpm local:postgres:stop
pnpm local:postgres:status
pnpm local:postgres:logs
pnpm local:postgres:remove
```

To run the apps locally:

```bash
pnpm --filter @repo/api dev
pnpm --filter @repo/ui dev
```
