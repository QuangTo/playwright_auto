# 🗺️ Project Architecture Map

This document helps AI agents and new developers understand the high-level layout of the `playwright_sample_template` project.

## 📂 Directory Structure

### `src/core`
The heart of the testing logic. We separate generic logic (`core`) from test execution (`tests`).

| Path | Purpose | Key Patterns |
| :--- | :--- | :--- |
| **`src/core/api`** | API Testing Support | Service Object Model |
| `├── services` | API wrappers (Axios/Playwright request) | `[Service]Service.ts` |
| `├── factories` | Data generation (Builders) | `[Service]Factory.ts` |
| `├── fixtures` | Test Dependency Injection | `apiFixture.ts` |
| `└── types` | TypeScript definitions | `[Service]-type.d.ts` |
| | | |
| **`src/core/ui`** | UI Testing Support | Page Object Model |
| `├── pages` | Page Objects (Selectors + Actions) | `[PageName]Page.ts` |
| `├── components` | Reusable UI widgets (Modals, Navs) | `[Component].ts` |
| `├── fixtures` | Page/Component Injection | `uiFixture.ts` |
| `└── data` | Static test data (Credentials, etc.) | |

### `tests`
Where the actual Spec files live. Contains **NO** logic, only calls to steps defined in `core`.

| Path | Purpose | Naming Convention |
| :--- | :--- | :--- |
| `tests/api` | API Test Specs | `[feature]-api.spec.ts` |
| `tests/ui` | UI Test Specs | `[feature]-ui.spec.ts` |

---

## 🏗️ Key Design Patterns

### 1. Dependency Injection (Fixtures)
**Rule:** NEVER instantiate a Page or Service manually in a test with `new Class()`.
**Instead:** Use the fixtures provided by Playwright.

```typescript
// ❌ BAD
test('Login', async ({ page }) => {
  const loginPage = new LoginPage(page); // Don't do this
});

// ✅ GOOD
test('Login', async ({ loginPage }) => { // Injected via fixture
  await loginPage.login();
});
```

### 2. Builders (Data Factories)
**Rule:** Do not hardcode complex JSON objects in tests.
**Instead:** Use the Builder pattern to generate data.

```typescript
// ✅ GOOD
const petData = PetBuilder.valid().withName('Fluffy').build();
```

### 3. Service Object Model (SOM) for API
**Rule:** Tests do not make raw HTTP calls (`request.post()`).
**Instead:** Tests call methods on a Service class (`petService.createPet()`) which handles the implementation details.

---

## 🤖 AI Workflow Map
When generating code, refer to these specific guides:

*   **API Tests:** `.agent/workflows/api-test-generation.md`
*   **UI Tests:** `.agent/workflows/ui-test-generation.md`
*   **Page Objects:** `.agent/workflows/page-object-generation.md`
