---
description: Guidelines for creating robust Page Object classes with proper encapsulation
---

# AI Prompt: Page Object Generation

Use this prompt when creating or updating Page Objects. It ensures we produce robust, reusable, and self-contained UI abstractions.

---

## The Prompt

**Context:**
I need you to create a Page Object class for `[PAGE_NAME]`.

**Role:**
The Page Object is the **single source of truth** for the selectors and interactions of a specific page. It should hide the underlying HTML/CSS complexity from the test.

**Instructions:**

1.  **Location:** `src/core/ui/pages/[PageName]Page.ts`.
2.  **Class Structure:**
    - Properties: `readonly page: Page;`
    - Properties: `readonly [elementName]: Locator;` (Define locators as properties).
    - Constructor: Initialize `page` and all `locators`.
3.  **Locator Strategy:**
    - Priority 1: `getByRole`, `getByText`, `getByLabel` (User-facing attributes).
    - Priority 2: `getByTestId` (if available).
    - Priority 3: CSS/XPath (Avoid unless necessary).
4.  **Methods:**
    - Methods should represent **User Actions** (`login()`, `searchFor()`), not low-level interactions (`clickButton()`).
    - Complex sequences (e.g., "Fill form and submit") should be a single method.
5.  **No Assertions (Soft Rule):**
    - Generally, avoid putting `expect()` inside the Page Object. Return the `Locator` or a value so the Test Spec can assert.
    - _Exception:_ Methods like `waitForLoaded()` usually wait for a specific state.

**Template:**

```typescript
import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async login(user: string, pass: string) {
    await this.usernameInput.fill(user);
    // ...
    await this.loginButton.click();
  }
}
```

**Task:**
Create the `[PAGE_NAME]Page` class for the URL `[URL_PATH]`.
