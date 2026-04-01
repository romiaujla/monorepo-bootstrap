# Spec Kit Workflow (Tagged Command Contract)

Canonical governance policy lives in:

- `docs/process/engineering-constitution.md`
- `docs/process/ai-agent-prompt-help.md`

For prompts in the form `--speckit GRA-<id>`, complete these artifacts before implementation:

1. `/constitution`
2. `/specify`
3. `/plan`
4. `/tasks`

## Constitution Rule

- This repository has one canonical constitution: `docs/process/engineering-constitution.md`.
- Feature documentation must extend planning detail only and must not introduce alternate constitutions.

## Prerequisite Setup

- Install and use Spec Kit at the project level via `docs/process/spec-kit-installation.md`.

## Prompt-Driven Start Contract

For tagged workflow commands:

0. If the prompt is `--help`, return the supported prompt patterns and behavior descriptions from `docs/process/ai-agent-prompt-help.md`.
1. Resolve the issue and determine the work type before branch creation.
2. Use `docs/process/engineering-constitution.md` as the canonical policy source.
3. Before creating a new issue-linked branch, run `git checkout main && git pull`, then create the matching branch. If the issue-linked branch already exists, validate and use that existing branch.
4. If the work item is tracked in a system such as Jira, move it to `In Progress` when the branch is created.
5. If the prompt is `--implement GRA-<id>`, skip `/specify`, `/plan`, and `/tasks` and proceed directly to implementation.
6. If the prompt is `--speckit GRA-<id>`, start the workflow with `/specify`.

## Workflow Helper Prompt Contract

- `--audit GRA-<id>` audits the active implementation against issue scope, acceptance criteria, validation evidence, and out-of-scope changes before merge or handoff.
- `--clean-code-api` runs a review-only clean-code audit scoped to `apps/api`.
- `--clean-code-web` runs a review-only clean-code audit scoped to `apps/ui`.
- `--resolve-pr-comments [PR-NUMBER]`, `--review [PR-NUMBER]`, `--refresh-pr [PR-NUMBER]`, `--status [GRA-<id>]`, `--handoff GRA-<id>`, `--reconcile GRA-<id>`, `--test-fix [TARGET]`, and `--scope-drift GRA-<id>` are governed by the help registry and must remain limited to delivery-maintenance, validation, and scope-reconciliation work for the current issue-linked branch or PR.

## Required Phase Sequence

For work started with `--speckit GRA-<id>`, advance in this order only:

1. `/specify`
2. `/plan`
3. `/tasks`
4. implementation
5. pull request creation

When the prompt is `--implement GRA-<id>`, the workflow bypasses `/specify`, `/plan`, and `/tasks` and starts at implementation.

## Phase Gate Rules

- `/specify` may advance to `/plan` only after the specification is complete, no unresolved clarification remains, and the phase changes are committed and pushed.
- `/plan` may advance to `/tasks` only after the planning artifacts are complete, no unresolved clarification remains, and the phase changes are committed and pushed.
- `/tasks` may advance to implementation only after the task breakdown is complete, no unresolved clarification remains, and the phase changes are committed and pushed.
- Implementation may advance to pull request creation only after the scoped work is complete, validation is captured, no unresolved clarification remains, and the phase changes are committed and pushed.

## Clarification Stop Conditions

- Ambiguous or conflicting issue scope
- Missing or contradictory requirements
- Dirty repository state that conflicts with the target issue
- Branch, spec artifact, or PR metadata drift away from the issue
- Incomplete validation evidence required for a compliant pull request

If any stop condition is active, pause for clarification instead of auto-advancing.

## UI Feature Integration

For `--speckit GRA-<id>` when the feature involves UI work:

1. During `/specify`, include the API contract surface if applicable and wireframe spec requirements.
2. During `/plan`, reference the wireframe spec location `specs/GRA-<id>/wireframe.md` and identify which components are new versus reused.
3. During `/tasks`, structure tasks in this order:
   - UI spec tasks
   - component tasks
   - page assembly tasks
   - API tasks if applicable
4. Before generating implementation tasks, the wireframe spec must exist at `specs/GRA-<id>/wireframe.md`.
5. Follow `docs/process/development-workflow.md` for the full ordered flow and `docs/process/component-development.md` for component delivery rules.
