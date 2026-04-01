# Development Workflow

## Purpose

This document defines the ordered delivery flow for UI-heavy work started through the generic Spec Kit workflow.

## Ordered Flow For UI Work

1. Clarify API contract surface if the feature depends on backend changes.
2. Produce a wireframe spec at `specs/GRA-<id>/wireframe.md`.
3. Identify reusable versus page-local UI.
4. Create or update reusable components before page assembly.
5. Assemble pages from validated components.
6. Add behavior, state management, and integration logic.
7. Validate accessibility, responsive behavior, and required states before opening the PR.

## Required Pre-PR Validation

- Wireframe covers layout, actions, loading, empty, error, and success states.
- Reusable components are not built inline inside page files.
- Responsive behavior and keyboard accessibility are covered.
- Validation notes are included in the pull request description.
