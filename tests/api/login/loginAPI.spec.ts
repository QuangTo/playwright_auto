import { test, expect } from '@playwright/test';
import { AuthService } from '@api/service/AuthService';

test.describe.skip('Authentication', { tag: '@smoke' }, () => {
  let authService: AuthService;
  test.beforeEach(async ({ request }) => {
    const baseUrl = 'https://automationintesting.online';
    authService = new AuthService(request, baseUrl);
  });
  test('Send POST with valid credential @happy', async () => {
    const response = await authService.login('admin', 'password');
    expect(response.status()).toBe(200);
  });
  test('Send POST with invalid username', async () => {
    const response = await authService.login('admin1', 'password');
    expect(response.status()).toBe(403);
  });
  test('Send POST with invalid password', async () => {
    const response = await authService.login('admin', 'incorrectPassword');
    expect(response.status()).toBe(403);
  });
  test('Send POST with invalid username& password', async () => {
    const response = await authService.login('admin', 'incorrectPassword');
    expect(response.status()).toBe(403);
  });
  test('Send POST with no username no password', async () => {
    const response = await authService.login('', '');
    expect(response.status()).toBe(403);
  });
});
