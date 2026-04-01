# Engineering Constitution

## Purpose

This document is the canonical engineering policy for this bootstrap repository. It defines mandatory standards for coding, branching, commits, review, and release-safe pull request behavior in a way that can be reused by downstream projects.

## Scope

Applies to all contributors, human and AI, across all repository directories.

## Core Principles

- Ship in small, reviewable increments.
- Keep planning and implementation traceable to an issue key or explicit `GRA-0` fallback.
- Prefer deterministic, automated quality gates over manual checks.
- Treat standards as defaults; exceptions require explicit documented rationale.
- Keep template guidance generic so downstream repositories can adapt the placeholder key family and process details without rewriting every rule.

## Coding Standards

- Use TypeScript strict mode for new code where applicable.
- Validate external input with Zod before business logic when shared contracts are involved.
- Keep modules cohesive and avoid hidden cross-package coupling.
- Add tests for behavior changes at the appropriate level when product behavior changes.
- Do not commit generated build artifacts unless explicitly required.
- Keep repository process docs and prompt contracts aligned when workflow behavior changes.

## Branching Standard

Branch naming maps to work type:

- Maintenance or setup work: `chore/GRA-<id>-<slug>`
- Feature work: `feat/GRA-<id>-<slug>`
- Bug work: `fix/GRA-<id>-<slug>`
- Urgent production fix work: `hotfix/GRA-<id>-<slug>`

For bootstrap or template maintenance work that does not yet have a real tracker issue, use `GRA-0` as the explicit no-Jira fallback.

## Commit Standard

Commit format:

- `<type>: GRA-<id> - <message>`

Type mapping derives from branch prefix:

- `chore` branch -> `chore` commit prefix
- `feat` branch -> `feat` commit prefix
- `fix` branch -> `fix` commit prefix
- `hotfix` branch -> `hotfix` commit prefix

When squash merge is used, the PR title must match the commit format exactly so the commit subject on `main` remains release-safe.

## Planning Gate

Before implementation of major features, complete the Spec Kit artifacts:

1. `/constitution`
2. `/specify`
3. `/plan`
4. `/tasks`

PRs for major features must reference these artifacts.

## Pull Request Standard

- PR description includes summary, issue linkage, and validation notes.
- Required checks must pass before merge.
- Keep PR scope aligned with the issue scope; split work when scope drifts.
- Prefer squash merge unless repository policy explicitly requires another merge strategy.

## Precedence

Order of precedence for repository rules:

1. This constitution: `docs/process/engineering-constitution.md`
2. `AGENTS.md`
3. `docs/process/spec-kit-workflow.md`
4. CI and hook automation rules
