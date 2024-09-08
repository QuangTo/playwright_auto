import { test, expect } from "@playwright/test";
import { AuthService } from "../../../src/core/api/AuthService";

test.describe("Authentication Tests", () => {
  let authService: AuthService;
  test.beforeEach(async ({ request }) => {
    const baseUrl = "https://automationintesting.online";
    authService = new AuthService(request, baseUrl);
  });

  test("User can login successfully", async () => {
    const response = await authService.login("admin", "password");
    expect(response.status()).toEqual(200);
  });
});
