# Feature Docs Index

Use this directory for major feature artifacts and supporting records.

## Major Feature Folder Convention

- `docs/features/GRA-<id>/spec.md`
- `docs/features/GRA-<id>/plan.md`
- `docs/features/GRA-<id>/tasks.md`

There is only one canonical engineering constitution:

- `docs/process/engineering-constitution.md`

Feature folders must not define alternative constitutions.

## Drift Records

Use:

```bash
pnpm specify.drift -- "<short reason>"
```

to append manual or small-change drift entries under:

- `docs/features/drift/GRA-<id>.md`

## Traceability Rules

- Issue trackers should link to repo artifacts by stable relative path when available.
- PR descriptions should include the issue key and relevant artifact paths for major features.
- Update links if files move; avoid stale references.
