# Component Development

## Purpose

This document defines the baseline expectations for reusable UI components in this template repository.

## Rules

- Reuse existing components before creating new ones.
- Keep reusable components outside page files.
- Document the expected states for each reusable component before implementation.
- Prefer small, composable components over large page-coupled abstractions.
- Add tests or stories when the repository supports them and the component behavior justifies them.

## Recommended Delivery Order

1. Define the component contract.
2. Identify states and accessibility expectations.
3. Implement the reusable component.
4. Add supporting validation artifacts such as stories or focused tests when applicable.
5. Integrate the component into the page or feature surface.
