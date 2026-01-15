---
description: Standard operating procedure for generating UI tests using Page Object Model
---

# AI Prompt: UI Test Case Generation

Use this prompt when generating new Playwright UI tests. It ensures adherence to the **Page Object Model (POM)**, **Fixtures**, and **Atomic Testing** principles.

---

## The Prompt

**Context:**
I need you to write a Playwright UI test spec for the `[FEATURE_NAME]` feature. We use strict Page Object Model encapsulation and custom fixtures.

**Reference Materials:**
1.  **Page Object:** `src/core/ui/pages/[PAGE_NAME]Page.ts` (For actions and assertions).
2.  **Fixture:** `src/core/ui/fixtures/uiFixture.ts` (Top-level injection).
3.  **Data:** `src/core/ui/data/` (If static data is needed) or `src/core/api/factories` (if seeding data via API).

**Instructions:**
1.  **Imports:** Use `test`, `expect` from `src/core/ui/fixtures/uiFixture`. 
    *   *Note:* Do not import from `@playwright/test` directly unless you need specific types not covered by the fixture.
2.  **Structure:**
    *   `test.describe('[Feature Name]', { tag: TestTags.UI }, ...)`
    *   `test.beforeEach` should be used for navigation, NOT for data seeding (use API for seeding if possible).
3.  **The "No Logic in Spec" Rule:**
    *   ❌ `await page.locator('#login').fill('user')`
    *   ✅ `await loginPage.enterUsername('user')`
    *   Specs should read like English user stories.
4.  **Assertions:**
    *   Prefer **Web-First Assertions** (`await expect(locator).toBeVisible()`).
    *   Place distinct verification steps in the Page Object if they involve complex logic, otherwise simple assertions in the spec are fine.
5.  **Seeding Data:**
    *   If the test requires a specific state (e.g., a "Logged In User" or "Existing Order"), create it via API in a `beforeAll` or `beforeEach` hook, then reload the page. Avoid UI-driven setup if API is available.

**Formatting:**
```typescript
test('User can purchase an item', async ({ loginPage, inventoryPage, cartPage }) => {
  await loginPage.navigate();
  await loginPage.loginAsStandardUser();
  
  await inventoryPage.addToCart('Backpack');
  await inventoryPage.goToCart();
  
  await expect(cartPage.cartItem('Backpack')).toBeVisible();
});
```

**Task:**
Generate `tests/ui/[FEATURE]-ui.spec.ts` for the `[SCENARIO_NAME]` scenario.
