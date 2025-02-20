// import { LoginRequest, LoginResponse } from "@api/api-clients/client";
import { test, expect } from "@playwright/test";
import type { components, paths } from "@api/types/auth";

test.describe("OpenAPI", { tag: "@smoke" }, () => {
  test("login auth via components", async ({ request }) => {
    const loginPayload: components["schemas"]["Auth"] = {
      username: "admin",
      password: "password",
    };
    const response = await request.post(
      "https://automationintesting.online/auth/login",
      { data: loginPayload }
    );
    expect(response.status()).toBe(200);
  });

  test("login auth via paths", async ({ request }) => {
    const loginPayload: paths["/login"]["post"]["requestBody"]["content"]["application/json"] =
      {
        username: "admin",
        password: "password",
      };
    const response = await request.post(
      "https://automationintesting.online/auth/login",
      { data: loginPayload }
    );
    expect(response.status()).toBe(200);
  });
});
