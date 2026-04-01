# AI-Agent Prompt Help Registry

Use `--help` to discover the repository-supported AI-agent prompt patterns without scanning multiple files.

## Contract

- `--help` is the canonical discovery command for repository AI-agent prompts.
- The help surface is a registry: add new documented prompt patterns here instead of redefining the contract in multiple files.
- Workflow semantics for each prompt remain governed by `AGENTS.md`, `docs/process/spec-kit-workflow.md`, and `docs/process/engineering-constitution.md`.

## Supported Prompt Patterns

| Prompt pattern                      | Behavior                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--help`                            | Show this help registry so engineers can discover the supported repository AI-agent prompts.                                                                                                                                                                                                                                 |
| `--speckit GRA-<id>`                | Start the full Spec Kit delivery path for the issue: resolve the issue, run `git checkout main && git pull` before creating a new issue-linked branch, then create or validate the branch and proceed through `/specify`, `/plan`, `/tasks`, implementation, and pull request creation.                                      |
| `--implement GRA-<id>`              | Start the implementation-only path for the issue: resolve the issue, run `git checkout main && git pull` before creating a new issue-linked branch, then create or validate the branch and skip `/specify`, `/plan`, and `/tasks` to proceed directly to implementation.                                                     |
| `--audit GRA-<id>`                  | Audit the current branch or working tree against the issue and report covered scope, missing acceptance-criteria coverage, validation gaps, and changes that appear out of scope.                                                                                                                                            |
| `--clean-code-api`                  | Audit only `apps/api` for clean-code and coding-standard issues using `docs/process/engineering-constitution.md` and related repository process guidance, then return findings first with concrete file references and actionable violations or risks without making implementation changes unless the user explicitly asks. |
| `--clean-code-web`                  | Audit only `apps/ui` for clean-code and coding-standard issues using `docs/process/engineering-constitution.md` and related repository process guidance, then return findings first with concrete file references and actionable violations or risks without making implementation changes unless the user explicitly asks.  |
| `--resolve-pr-comments [PR-NUMBER]` | Inspect review comments for the current branch PR or the specified PR, apply safe straightforward fixes, and reply with rationale when changes are not safe.                                                                                                                                                                 |
| `--review [PR-NUMBER]`              | Review the current branch PR or specified PR for scoped bugs, regressions, missing tests, and policy drift, then report findings in priority order.                                                                                                                                                                          |
| `--refresh-pr [PR-NUMBER]`          | Refresh the active PR or specified PR with the latest scope summary, validation evidence, and completed review follow-up that should be reflected in the PR body.                                                                                                                                                            |
| `--status [GRA-<id>]`               | Report the current delivery state for the active branch or issue, including branch alignment, completed validation, open review debt, and readiness for handoff or pull request creation.                                                                                                                                    |
| `--handoff GRA-<id>`                | Prepare a concise handoff summary for the scoped work that captures implemented behavior, remaining risks, validation evidence, and the next expected operator action.                                                                                                                                                       |
| `--reconcile GRA-<id>`              | Reconcile issue, branch, PR, and local implementation state; identify drift between them; and recommend the smallest safe corrective action before more work proceeds.                                                                                                                                                       |
| `--test-fix [TARGET]`               | Run the relevant failing validation target, make the smallest scoped fix that addresses the failure, and report the cause, code change, and rerun result without widening scope unnecessarily.                                                                                                                               |
| `--scope-drift GRA-<id>`            | Evaluate whether current changes still match the issue scope, highlight scope growth or unrelated edits, and recommend trim-back or follow-up work before merge.                                                                                                                                                             |

## Extending The Registry

When a new prompt pattern is introduced:

1. Add the prompt pattern and short behavior description to this registry.
2. Treat this registry as the future command catalog; add future prompt patterns here before repeating the contract elsewhere.
3. Update the governing workflow and policy documents only where the prompt changes actual behavior.
4. Extend `scripts/specify-audit.mjs` so documented help coverage does not drift.

## Clean-Code Audit Output Contract

- `--clean-code-api` must stay scoped to `apps/api`.
- `--clean-code-web` must stay scoped to `apps/ui`.
- Both prompts evaluate code against `docs/process/engineering-constitution.md` plus relevant engineering and process documents that govern the repository workflow.
- Findings should focus on clean-code, coding-standard, and maintainability issues rather than feature implementation unless the user explicitly requests changes.
- Findings should be reported first, before summaries or change suggestions, with concrete file references and actionable explanations of the observed violation or risk.
