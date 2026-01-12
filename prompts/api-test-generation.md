# AI Prompt: API Test Case Generation

Use this prompt when you want an AI agent to generate new API tests for this project. It ensures the AI respects the **Service Object Model**, **Builder Pattern**, and **Centralized Fixtures**.

---

## The Prompt

**Context:**
I need you to write a Playwright API test spec for the `[SERVICE_NAME]` service. We use a project structure that includes centralized fixtures, auto-generated services, and builders for data factories.

**Reference Materials:**
1.  **Types:** `src/core/api/types/[SERVICE_NAME]-type.d.ts` (For request/response schemas).
2.  **Service:** `src/core/api/services/[SERVICE_NAME]Service.ts` (For available methods).
3.  **Factory:** `src/core/api/factories/[SERVICE_NAME]-factory.ts` (Use the builders here).
4.  **Fixture:** `src/core/api/fixtures/apiFixture.ts` (Inject the `[SERVICE_NAME]Api` fixture).

**Instructions:**
1.  **Imports:** Use `test` and `expect` from `@api/fixtures/apiFixture`. Import builders from `@api/factories`.
2.  **Structure:** 
    *   Use `test.describe('[SERVICE_NAME] API', { tag: TestTags.API }, () => { ... })`.
    *   Configure parallel mode: `test.describe.configure({ mode: 'parallel' });`.
    *   Test titles should follow the format: `@api [METHOD] [PATH] - [Scenario description]`.
3.  **Happy Path:** 
    *   Use the builder to generate valid data.
    *   Validate a `200` or `201` status.
    *   Perform a "deep equal" check on key fields between the request payload and the response body.
4.  **Negative Scenarios:** Generate at least 3 negative tests:
    *   **Missing Required Fields:** Manually remove a required property from the builder output.
    *   **Invalid Data Types:** Pass a string to a field that expects a number (use `as any`).
    *   **Boundary/Enum Cases:** Pass invalid values or out-of-range numbers.
5.  **Formatting:** Do not use `beforeEach` to instantiate services; always use the injected fixture (e.g., `{ [SERVICE_NAME]Api }`).

**Task:**
Generate the full content of `tests/api/[SERVICE_NAME]-api.spec.ts` for the `[OPERATION_NAME]` operation.
