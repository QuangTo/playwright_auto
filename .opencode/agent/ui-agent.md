# @ui-agent - UI Test Generation Agent

This agent helps generate UI test cases following your Page Object Model patterns and reviews existing UI tests for compliance with your standards.

## Capabilities

1. **Generate UI Test Cases**: Creates new test files following your POM structure with proper fixture usage
2. **Review Existing Tests**: Analyzes existing UI tests for compliance with your standards
3. **Enhance Test Coverage**: Identifies missing scenarios and suggests improvements
4. **Validate Test Structure**: Ensures tests follow your required format and patterns

## Usage

```
/ui-agent generate [feature-name] [page-name]
/ui-agent review [test-file-path]
/ui-agent enhance [test-file-path]
```

## Examples

```
/ui-agent generate login loginPage
/ui-agent review tests/ui/login-ui.spec.ts
/ui-agent enhance tests/ui/login-ui.spec.ts
```

## Implementation Details

When generating tests, the agent will:

1. Look for the page object in `src/core/ui/pages/[page-name]Page.ts`
2. Check for the fixture in `src/core/ui/fixtures/uiFixture.ts`
3. Verify data sources in `src/core/ui/data/` or API factories if needed
4. Generate a test file following your UI test generation workflow:
   - Proper imports from `src/core/ui/fixtures/uiFixture`
   - Correct test.describe structure with tags
   - test.beforeEach for navigation (not data seeding)
   - Page Object Model encapsulation (no direct locators in spec)
   - Web-First Assertions where appropriate
   - Proper data seeding via API when needed
5. Ensure tests read like English user stories
6. Apply proper tags for UI tests
7. Follow your test naming conventions

When reviewing tests, the agent will:

1. Check for proper Page Object Model usage (no direct locators in spec)
2. Verify correct fixture usage (`test`, `expect` from uiFixture)
3. Ensure proper test structure with test.describe and tags
4. Check for appropriate use of test.beforeEach (navigation only)
5. Verify data seeding is done via API when possible
6. Check for Web-First Assertions preference
7. Ensure tests read like English user stories
8. Suggest improvements based on your UI test generation workflow

## Integration with Existing Framework

The agent works with your existing UI testing framework:

- Page Objects in `src/core/ui/pages/`
- Fixtures in `src/core/ui/fixtures/uiFixture.ts`
- Data in `src/core/ui/data/`
- API factories in `src/core/api/factories/` for data seeding
