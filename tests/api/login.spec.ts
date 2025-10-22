import { test, expect } from '@playwright/test';
import { AuthService } from '@api/service/AuthService';
import { TestTags } from 'tests/config/Tags';

/**
 * Authentication API tests
 */

test.describe('Authentication', { tag: TestTags.API }, () => {
  let auth: AuthService;
  test.beforeEach(async ({ request }) => {
    const baseUrl = 'https://automationintesting.online';
    auth = new AuthService(request, baseUrl);
  });
  test.describe.configure({ mode: 'parallel' });

  test('Send POST with valid credential @happy', async () => {
    const response = await auth.login('admin', 'password');
    expect(response.status()).toBe(200);
  });
  test('Send POST with invalid username', async () => {
    const response = await auth.login('admin1', 'password');
    expect(response.status()).toBe(401);
  });
  test('Send POST with invalid password', async () => {
    const response = await auth.login('admin', 'incorrectPassword');
    expect(response.status()).toBe(401);
  });
  test('Send POST with invalid username& password', async () => {
    const response = await auth.login('admin', 'incorrectPassword');
    expect(response.status()).toBe(401);
  });
  test('Send POST with no username no password', async () => {
    const response = await auth.login('', '');
    expect(response.status()).toBe(401);
  });
});
