---
name: Playwright Best Practices
description: Core principles for writing robust Playwright tests.
---

# Playwright Best Practices

## Locators
- Prefer user-visible locators (e.g., `getByRole`, `getByText`, `getByLabel`).
- Avoid brittle CSS selectors or XPaths unless absolutely necessary.
- Use `data-testid` as a fallback when user-visible locators are insufficient.

## Assertions
- Always use web-first assertions (e.g., `expect(page.getByRole('button')).toBeVisible()`).
- Avoid manual timeouts; Playwright's auto-waiting handles most cases.

## Test Isolation
- Ensure each test is independent.
- Use `beforeEach` for common setup (e.g., logging in).

## Page Object Model (POM)
- Encapsulate page logic within Page Object classes.
- Keep tests clean and focused on assertions.
