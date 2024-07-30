import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/core/page-model/pages/login";

test.describe("Login UI", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://applicintweb.com/Eslip_APPS_DEV");
  });

  test("Admin can access test4service", async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    await loginPage.inputLogin("admin", "111");
    await loginPage.clickLetMeIn();
    await expect(page).toHaveTitle("User Management");
    await page.goto("https://applicintweb.com/Eslip_APPS_DEV/test4service/");
    expect(page).toBeTruthy();
  });
  test.only("Call user CANNOT access test4service", async ({
    page,
    context,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.inputLogin("examiner", "test)");
    await loginPage.clickLetMeIn();
    await expect(page).toHaveURL("/Eslip_APPS_DEV/App/Pending/");
    await page.goto("https://applicintweb.com/Eslip_APPS_DEV/test4service/");
    expect(page).toHaveURL("/Eslip_APPS_DEV/Restrict/");
  });
});
