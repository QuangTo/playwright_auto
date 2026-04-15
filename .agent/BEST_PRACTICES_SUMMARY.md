# Best Practices Summary

This document summarizes the key best practices and workflows from the `.agent` folder documentation, consolidated for easy reference when using the opencode agents.

## Playwright Best Practices

### Locators

- Prefer user-visible locators (e.g., `getByRole`, `getByText`, `getByLabel`)
- Avoid brittle CSS selectors or XPaths unless absolutely necessary
- Use `data-testid` as a fallback when user-visible locators are insufficient

### Assertions

- Always use web-first assertions (e.g., `expect(page.getByRole('button')).toBeVisible()`)
- Avoid manual timeouts; Playwright's auto-waiting handles most cases

### Test Isolation

- Ensure each test is independent
- Use `beforeEach` for common setup (e.g., logging in)

### Page Object Model (POM)

- Encapsulate page logic within Page Object classes
- Keep tests clean and focused on assertions

## Project Standards

### Naming Conventions

- Tests: `[feature].spec.ts`
- Page Objects: `[page-name].page.ts`
- Functions: `camelCase`
- Classes: `PascalCase`

### Language

- TypeScript is the primary language
- Use strict typing where possible

### Formatting

- Run `npm run lint` before committing
- Use Prettier for consistent formatting

### Directory Structure

- `tests/`: Feature-based test specifications
- `pages/`: Page Object classes
- `utils/`: Common utility functions
- `fixtures/`: Custom Playwright fixtures

## API Test Generation Workflow

### 6-Section Structure (Minimum 2 scenarios per section)

1. **Happy Path** - Successful requests, optional fields
2. **Invalid Input** - Auth & resource errors (401, 403, 404)
3. **Input Validation** - Malformed data (400 errors)
4. **Edge Cases** - Boundary conditions (large payloads, special chars)
5. **Security** - Injection & tampering (missing tokens, SQL/XSS)
6. **Contract** - Schema compliance (response structure, headers)

### Assertion Requirements

Every test must have 3+ checks:

1. Status code: `expect(response.status()).toBe(XXX)`
2. State: `expect(response.ok()).toBeTruthy()` or `.toBeFalsy()`
3. Content: Specific properties, types, or error messages

### Data & Code Rules

**DO:**

- Use Factory for dynamic data generation
- Enable parallel mode: `test.describe.configure({ mode: 'parallel' })`
- Use descriptive test names
- Validate response headers for contract tests
- Clean test data in hooks

**DON'T:**

- Hardcode test data
- Create duplicate tests for same status code unless different logic paths
- Add verbose comments (use descriptive naming)
- Use `page.waitForTimeout()` - use auto-waiting
- Skip error scenarios

### Test Title Format

Pattern: `[METHOD] [PATH] - returns [STATUS] [scenario]`

Examples:

- `POST /auth/login - returns 401 with invalid credentials`
- `GET /users/:id - returns 404 when user not found`

## UI Test Generation Workflow

### Prompt Structure

When generating UI tests:

1. **Imports:** Use `test`, `expect` from `src/core/ui/fixtures/uiFixture`
2. **Structure:** `test.describe('[Feature Name]', { tag: TestTags.UI }, ...)`
3. **Setup:** `test.beforeEach` for navigation, NOT for data seeding
4. **POM Principle:** No logic in spec - use Page Object methods
5. **Assertions:** Prefer Web-First Assertions
6. **Seeding:** Create state via API in `beforeAll`/`beforeEach`, then reload page

### UI Test Example

```typescript
test('User can purchase an item', async ({ loginPage, inventoryPage, cartPage }) => {
  await loginPage.navigate();
  await loginPage.loginAsStandardUser();

  await inventoryPage.addToCart('Backpack');
  await inventoryPage.goToCart();

  await expect(cartPage.cartItem('Backpack')).toBeVisible();
});
```

## Code Review Guidelines

### What to Check

1. **Architectural Issues** - Analyze diff for structural problems
2. **Locator Quality** - Check for brittle locators and non-web-first assertions
3. **POM Compliance** - Verify Page Objects follow encapsulation rules
4. **Security** - Ensure no secret keys or sensitive data are committed

### Anti-Patterns to Avoid

**API Tests:**

- Don't duplicate status codes testing same validation
- Do test different logic paths for same status code
- Always use factories for test data
- Never hardcode test data

**UI Tests:**

- Don't use direct locators in spec files
- Do use Page Object methods for all interactions
- Don't use manual waits (`page.waitForTimeout`)
- Do use web-first assertions

## Recommended Workflow

### Development Cycle

1. **Generate/Update Services:**

   ```bash
   npm run generated-api-type
   npm run generated-service
   npm run generated-factory
   npm run index-generated
   ```

2. **Generate Tests with Agents:**

   ```bash
   # For API tests
   /api-agent generate [service-name] [operation-id]

   # For UI tests
   /ui-agent generate [feature-name] [page-name]
   ```

3. **Review Code Quality:**

   ```bash
   /review-agent review src/
   /review-agent tests tests/
   ```

4. **Stabilize Tests:**

   ```bash
   /self-healing-agent analyze tests/
   /self-healing-agent enhance tests/[specific-test-file].spec.ts
   ```

5. **Run Tests:**
   ```bash
   npm run test:all          # All tests
   npm run test:api          # API tests only
   npm run test:happy        # Happy path tests only
   ```

### Pre-Commit Checklist

- [ ] Run `npm run lint` to check code quality
- [ ] Ensure no `.only` tests are committed
- [ ] Verify all tests follow naming conventions
- [ ] Check that Page Objects encapsulate all locator logic
- [ ] Confirm API tests use factories for test data
- [ ] Validate that tests have proper tags and parallel configuration

## Key Takeaways for Agent Usage

1. **Leverage Generated Code:** Agents work best after running the code generation scripts
2. **Follow Established Patterns:** Generated tests will follow your existing patterns and conventions
3. **Focus on Business Logic:** Agents handle boilerplate, you focus on validating business requirements
4. **Continuous Improvement:** Use review and self-healing agents to maintain quality over time
5. **Integration:** All agents work seamlessly with your existing scripts and folder structure

This summary captures the essence of the documentation in your `.agent` folder, providing a quick reference for best practices when using the opencode agents to enhance your automation framework.
