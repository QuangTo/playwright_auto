---
description: How to generate comprehensive API test cases with 6-section structure
---

# AI Prompt: API Test Case Generation

Use this prompt when generating comprehensive API tests. This workflow emphasizes **structured test organization**, **consistent naming**, and **thorough assertions**.

---

## The Prompt

**Context:**
I need you to write comprehensive Playwright API tests for the `[SERVICE_NAME]` service.

**Reference Materials:**
1.  **Service:** `src/core/api/services/[SERVICE_NAME]Service.ts`
2.  **Types:** `src/core/api/types/[SERVICE_NAME]-type.d.ts` (if available)
3.  **Factory:** `src/core/api/factories/[SERVICE_NAME]-factory.ts` (if available)
4.  **Fixture:** `src/core/api/fixtures/apiFixture.ts`
5.  **Test Tags:** `tests/config/Tags.ts`

---

## Rules

### Rule 1: Test Title Format
**Pattern:** `[METHOD] [PATH] - returns [STATUS_CODE] [use case]`

Common Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid credentials)
- `403` - Forbidden (no permission)
- `404` - Not Found (resource doesn't exist)
- `405` - Method Not Allowed
- `422` - Unprocessable Entity

Examples:
- `POST /auth/login - returns 200 with valid credentials`
- `POST /auth/login - returns 401 with invalid credentials`
- `GET /pet/{id} - returns 404 with non-existent id`
- `DELETE /user/{id} - returns 403 without admin permission`
- `PUT /order/{id} - returns 400 with invalid payload`

### Rule 2: Minimum 2 Assertions Per Test
Every test must have at least 2 assertions:
- Primary: Status code check
- Secondary: Response body, header, or behavior validation

```typescript
test('POST /api/resource - returns 200 with valid data', async ({ api }) => {
  const response = await api.create(payload);
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body).toHaveProperty('id');
});
```

### Rule 3: Required Test Structure
**Every API test file MUST include these 6 sections:**

```
[Service] API - [Operation]
├── Happy Path          (minimum 2 tests)
├── Invalid Input       (minimum 2 tests)
├── Input Validation    (minimum 2 tests)
├── Edge Cases          (minimum 2 tests)
├── Security            (minimum 2 tests)
└── Contract            (minimum 2 tests)
```

### Rule 4: Avoid duplicate test case
- Carefuly review and remove redudant or duplicate test case
- Keep valueable that can actual prevent api bug due to change


### Rule 5: No Verbose Comments
- Code should be self-documenting
- Use descriptive test names and variable names
- Only add comments for non-obvious business logic

### Rule 6: Imports
```typescript
import { test, expect } from '@api/fixtures/apiFixture';
import { TestTags } from 'tests/config/Tags';
```

### Rule 7: Test Structure Template
```typescript
test.describe('[Service] API - [Operation]', { tag: [TestTags.API, TestTags.FEATURE] }, () => {
  test.describe.configure({ mode: 'parallel' });

  test.describe('Happy Path', () => { /* ... */ });
  test.describe('Invalid Input', () => { /* ... */ });
  test.describe('Input Validation', () => { /* ... */ });
  test.describe('Edge Cases', () => { /* ... */ });
  test.describe('Security', { tag: TestTags.SECURITY }, () => { /* ... */ });
  test.describe('Contract', { tag: TestTags.CONTRACT }, () => { /* ... */ });
});
```

---

## Test Categories Guide

### 1. Happy Path (minimum 2 tests)
| Scenario | Status | Assertions |
|----------|--------|------------|
| Valid request with all fields | 200/201 | Response body structure |
| Valid request with minimal fields | 200 | Required fields present |

### 2. Invalid Input (minimum 2 tests)
| Scenario | Status | Assertions |
|----------|--------|------------|
| Wrong credentials | 401 | ok() is false |
| Non-existent resource | 404 | Error message defined |
| No permission to access | 403 | Forbidden response |
| Invalid data type | 400| No server error |

### 3. Input Validation (minimum 2 tests)
| Scenario | Status | Assertions |
|----------|--------|------------|
| Empty required field | 400/401 | ok() is false |
| Null/undefined value | 400/401 | Proper handling |
| Whitespace-only value | 400/401 | Validation works |

### 4. Edge Cases (minimum 2 tests)
| Scenario | Status | Assertions |
|----------|--------|------------|
| Extremely long input | 400/413 | No crash (not 500) |
| Special characters | 400/401 | Proper handling |
| Unicode characters | 400/401 | No encoding errors |

### 5. Security (minimum 2 tests)
| Scenario | Status | Assertions |
|----------|--------|------------|
| SQL injection attempt | 400/401 | No data leak |
| XSS attempt | 400/401 | Response sanitized |
| Missing auth token | 401 | Unauthorized response |
| Invalid auth token | 401/403 | Proper rejection |



## Task

Generate comprehensive tests for `tests/api/[SERVICE_NAME]-api.spec.ts` following all rules above.