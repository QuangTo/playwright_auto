# @review-agent - Code Review Agent

This agent reviews code against your project standards and best practices, providing actionable feedback for improvement.

## Capabilities

1. **Review Code Standards**: Checks adherence to your coding conventions (naming, formatting, etc.)
2. **Review Test Quality**: Evaluates test cases against your API and UI test generation workflows
3. **Identify Anti-Patterns**: Finds common mistakes and suggests improvements
4. **Check Best Practices**: Verifies compliance with your documented best practices
5. **Suggest Enhancements**: Recommends ways to improve code quality and maintainability

## Usage

```
/review-agent review [file-path-or-glob]
/review-agent standards [file-path-or-glob]
/review-agent tests [test-file-path-or-glob]
```

## Examples

```
/review-agent review src/
/review-agent standards src/core/api/services/*.ts
/review-agent tests tests/api/pet-api.spec.ts
```

## Implementation Details

When reviewing code, the agent will:

1. Check file and variable naming against your conventions (camelCase, kebab-case, PascalCase)
2. Verify code formatting and style (Prettier, ESLint)
3. Review test files for compliance with your 6-section API test structure or UI test patterns
4. Identify anti-patterns such as:
   - Hardcoded test data
   - Duplicate tests for same status code
   - Missing assertions
   - Improper use of waits (page.waitForTimeout)
   - Direct locators in UI test specs (violating POM)
   - Missing parallel configuration
   - Improper fixture usage
5. Check for proper use of your project's patterns:
   - Page Object Model for UI tests
   - Factory pattern for test data
   - Service layer for API calls
   - Custom fixtures for test setup
6. Validate compliance with your documented best practices in:
   - .agent/rules/project-standards.md
   - .agent/rules/playwright-best-practices.md
   - .agent/workflows/api-test-generation.md
   - .agent/workflows/ui-test-generation.md
7. Provide specific, actionable feedback with line numbers when possible
8. Suggest enhancements based on industry best practices and your project's patterns

When reviewing tests specifically, the agent will:

1. For API tests:

   - Check for 6 sections with 2+ scenarios each
   - Verify 3+ assertions per test
   - Ensure proper use of factories
   - Validate parallel configuration
   - Check for proper tagging
   - Identify missing scenarios (happy path, invalid input, etc.)
   - Detect anti-patterns (duplicate tests, hardcoded data, etc.)

2. For UI tests:
   - Check for proper POM usage (no direct locators in spec)
   - Verify correct fixture usage
   - Ensure proper test structure with tags
   - Validate use of test.beforeEach (navigation only)
   - Check for Web-First Assertions preference
   - Verify data seeding via API when possible
   - Ensure tests read like English user stories

## Integration with Existing Tools

The agent complements your existing quality tools:

- ESLint for code quality and formatting
- Prettier for code formatting
- Your custom workflows in .agent/workflows/
- Your rules in .agent/rules/
- Your skills in .agent/skills/

The agent can be run as part of your pre-commit hooks or CI pipeline to ensure ongoing code quality.
