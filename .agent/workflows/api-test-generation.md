---
description: How to generate comprehensive API test cases with 6-section structure
---

# API Test Generator - Playwright TypeScript

## Context
Generate production-ready Playwright API tests in TypeScript following strict architectural patterns.

### Required Files
if service does not exist you must take a look on package.json and perfom some script below. Those are stored in `src/core/scripts/codegen`

```
npm run generated-api-type
npm run generated-service  
npm run generated-factory
npm run index-generated
```


Reference: 
- Service: `src/core/api/services/[SERVICE_NAME]Service.ts`
- Types: `src/core/api/types/[SERVICE_NAME]-type.d.ts`
- Factory: `src/core/api/factories/[SERVICE_NAME]-factory.ts`
- Fixture: `src/core/api/fixtures/apiFixture.ts`
- Tags: `tests/config/Tags.ts`



---

## Test Title Format
Pattern: `[METHOD] [PATH] - returns [STATUS] [scenario]`

Examples:
- `POST /auth/login - returns 401 with invalid credentials`
- `GET /users/:id - returns 404 when user not found`

---

## Test Structure (6 Required Sections)

Each section needs **minimum 2 unique scenarios**:

| Section | Focus | Examples |
|---------|-------|----------|
| **Happy Path** | Successful requests, optional fields | 200/201 responses, omitted optional fields |
| **Invalid Input** | Auth & resource errors | 401 unauthorized, 403 forbidden, 404 not found |
| **Input Validation** | Malformed data | 400 errors: min/max length, null/empty, invalid format |
| **Edge Cases** | Boundary conditions | Large payloads, special chars, Unicode |
| **Security** | Injection & tampering | Missing tokens, SQL/XSS strings, header manipulation |
| **Contract** | Schema compliance | Response structure, headers, content-type |

---

## Assertion Requirements

**Every test must have 3+ checks:**
1. Status code: `expect(response.status()).toBe(XXX)`
2. State: `expect(response.ok()).toBeTruthy()` or `.toBeFalsy()`
3. Content: Specific properties, types, or error messages

---

## Data & Code Rules

### DO:
- Use Factory for dynamic data generation
- Enable parallel mode: `test.describe.configure({ mode: 'parallel' })`
- Use descriptive test names
- Validate response headers for contract tests
- Clean test data in hooks

### DON'T:
- Hardcode test data
- Create duplicate tests for same status code unless different logic paths
- Add verbose comments (use descriptive naming)
- Use `page.waitForTimeout()` - use auto-waiting
- Skip error scenarios

---

## Code Template

```typescript
import { TestTags } from 'tests/config/Tags';
import { test, expect } from '@api/fixtures/apiFixture';
import type { [Type] } from '@api/types/[service]-type';
import { [Factory] } from '@api/factories/[service]-factory';

test.describe('[SERVICE] API - [Operation]', { 
  tag: [TestTags.API, TestTags.[FEATURE]] 
}, () => {
  test.describe.configure({ mode: 'parallel' });

  test.describe('Happy path', () => {
    test('[METHOD] [PATH] - returns [STATUS] [description]', async ({ [service]Api }) => {
      const payload = [Factory].create();
      
      const response = await [service]Api.[method](payload);
      
      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
      
      const data = await response.json();
      expect(data).toHaveProperty('id');
    });
  });

  test.describe('Invalid input', () => {
    test('[METHOD] [PATH] - returns 401 with missing token', async ({ [service]Api }) => {
      // Test implementation
    });
  });

  test.describe('Input validation', () => {
    test('[METHOD] [PATH] - returns 400 with invalid format', async ({ [service]Api }) => {
      // Test implementation
    });
  });

  test.describe('Edge cases', () => {
    test('[METHOD] [PATH] - handles special characters', async ({ [service]Api }) => {
      // Test implementation
    });
  });

  test.describe('Security', () => {
    test('[METHOD] [PATH] - prevents SQL injection', async ({ [service]Api }) => {
      // Test implementation
    });
  });

  test.describe('Contract', () => {
    test('[METHOD] [PATH] - returns correct schema', async ({ [service]Api }) => {
      const response = await [service]Api.[method]();
      
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('application/json');
      
      const data = await response.json();
      expect(data).toMatchObject({
        id: expect.any(String),
        name: expect.any(String)
      });
    });
  });
});
```

---

## Best Practices from Industry



### Unique Test Data
```typescript
import { faker } from '@faker-js/faker';

const uniqueEmail = `test-${Date.now()}@example.com`;
const uniqueId = faker.string.uuid();
```

### API Mocking (when needed)
```typescript
await page.route('**/api/third-party/**', route => {
  route.fulfill({ 
    status: 200, 
    body: JSON.stringify({ data: 'mocked' }) 
  });
});
```

---

## Do not repeat same test


## Anti-Patterns to Avoid

❌ **Don't duplicate status codes**
```typescript
// BAD: Testing 400 twice for same validation
test('returns 400 with empty email', ...)
test('returns 400 with null email', ...) // Same logic path
```

✅ **Do test different logic paths**
```typescript
// GOOD: Different validation failures
test('returns 400 with invalid email format', ...)
test('returns 400 when email exceeds max length', ...)
```

---

## Output Checklist

Before finalizing tests, verify:
- [ ] All 6 sections implemented with 2+ scenarios each
- [ ] Every test has 3+ assertions
- [ ] Parallel mode enabled
- [ ] Factory used for test data
- [ ] No hardcoded values
- [ ] Descriptive test titles follow format
- [ ] Tags applied correctly
- [ ] Contract tests validate schema
- [ ] Security tests include injection attempts
- [ ] Cleanup in hooks