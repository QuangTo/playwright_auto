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
3.  **Happy Path & State (High Priority): * CRUD Lifecycle** 
    * If the operation is a POST or PUT, the test should follow up with a GET to verify the persistence of data.
    *   Use the builder to generate valid data.
    *   Validate a `200` or `201` status.
    *   Perform a "deep equal" check on key fields between the request payload and the response body.
    * Data Consistency: Compare the request payload with the response body using toStrictEqual() or a subset match.
    * Performance: Assert that response.duration() is within acceptable limits (e.g., < 800ms).
4.  **Negative & Edge Case Scenarios :** Generate at least 5 negative tests:
  * **Required Fields:** Systematically remove mandatory properties from the builder output.
* **Data Constraints:** Test string length limits, numeric boundaries (min/max), and invalid Enum values.
* **Type Safety:** Pass incorrect data types (e.g., sending a boolean where a string is expected) using `as any`.
* **Security & Auth:** * Validate `401 Unauthorized` (no token).
    * Validate `403 Forbidden` (valid token, wrong permissions).
* **Business Logic:** Test logical conflicts, such as attempting to create a duplicate resource or using a non-existent ID.
### 5. Contract & Schema
* Verify `Content-Type` headers.
* Ensure no unexpected `null` values are returned for fields marked as mandatory in the `.d.ts` file.
6.  **Formatting:** Do not use `beforeEach` to instantiate services; always use the injected fixture (e.g., `{ [SERVICE_NAME]Api }`).

**Task:**
Generate the full content of `tests/api/[SERVICE_NAME]-api.spec.ts` for the `[OPERATION_NAME]` operation.
