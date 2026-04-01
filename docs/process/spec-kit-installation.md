# Spec Kit Installation (Project-Level)

This repository uses a project-level Spec Kit workflow.
Do not clone and maintain a separate local copy of `github/spec-kit` for day-to-day usage.

## Prerequisites

- `uv` installed and available on PATH.
- Run commands from repository root.

## Install / Run Strategy

Use `uvx` to run Spec Kit directly from the upstream repository.

Example project bootstrap:

```bash
uvx --from git+https://github.com/github/spec-kit.git specify init . --here --ai codex
```

## Required Artifact Flow For Prompt-Driven Starts

After initialization, generate and maintain these artifacts for `--speckit GRA-<id>` runs:

1. `/constitution`
2. `/specify`
3. `/plan`
4. `/tasks`

Use `--help` to read the prompt registry in `docs/process/ai-agent-prompt-help.md` before starting work if you need a concise list of the supported repository AI-agent prompts.

When work starts from `--speckit GRA-<id>`, follow the repository AI-agent workflow in `AGENTS.md` and the phase-gate rules in `docs/process/spec-kit-workflow.md`. Before creating a new issue-linked branch, run `git checkout main && git pull`. Do not skip `/specify`, `/plan`, or `/tasks` before implementation.

When work starts from `--implement GRA-<id>`, skip the Spec Kit phases and proceed directly to implementation under the same branch and commit controls.

For bootstrap or template work without a live issue, use the no-Jira fallback key `GRA-0`.

## Verification

Run:

```bash
pnpm specify.audit
```

Expect:

- policy files present
- help registry present and aligned with documented prompt commands
- documentation linkage for Spec Kit guidance present

## Drift Tracking For Small Manual Changes

Capture unplanned or small manual adjustments:

```bash
pnpm specify.drift -- "<short reason for manual change>"
```

This updates:

- `docs/features/drift/GRA-<id>.md` when the branch name contains a `GRA-<id>` key

## Notes

- Keep installation guidance aligned with the tagged workflow instructions in `AGENTS.md` so the repository has one canonical command contract.
- Downstream repositories may replace `GRA` with their own project initials after generation.
