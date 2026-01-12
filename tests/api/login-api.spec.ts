import { TestTags } from 'tests/config/Tags';
import { test, expect } from '@api/fixtures/apiFixture';

/**
 * Authentication API tests
 */

test.describe('Authentication', { tag: TestTags.API }, () => {
  test.describe.configure({ mode: 'parallel' });

  test('Send POST with valid credential @happy', async ({ authApi }) => {
    const response = await authApi.login('admin', 'password');
    expect(response.status()).toBe(200);
  });
  test('Send POST with invalid username', async ({ authApi }) => {
    const response = await authApi.login('admin1', 'password');
    expect(response.status()).toBe(401);
  });
  test('Send POST with invalid password', async ({ authApi }) => {
    const response = await authApi.login('admin', 'incorrectPassword');
    expect(response.status()).toBe(401);
  });
  test('Send POST with invalid username& password', async ({ authApi }) => {
    const response = await authApi.login('admin', 'incorrectPassword');
    expect(response.status()).toBe(401);
  });
  test('Send POST with no username no password', async ({ authApi }) => {
    const response = await authApi.login('', '');
    expect(response.status()).toBe(401);
  });
});
