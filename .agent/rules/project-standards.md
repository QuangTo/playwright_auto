---
name: Project Standards
description: General coding standards and project structure for the automation suite.
---

# Project Standards

## Naming Conventions
- Tests: `[feature].spec.ts`
- Page Objects: `[page-name].page.ts`
- Functions: `camelCase`
- Classes: `PascalCase`

## Language
- TypeScript is the primary language.
- Use strict typing where possible.

## Formatting
- Run `npm run lint` before committing.
- Use Prettier for consistent formatting.

## Directory Structure
- `tests/`: Feature-based test specifications.
- `pages/`: Page Object classes.
- `utils/`: Common utility functions.
- `fixtures/`: Custom Playwright fixtures.
