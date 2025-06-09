import { expect, test } from "@fixtures/baseFixture";

/**
 *  custom login fixture
 */
test("login with fixture", { tag: "@desktop" }, async ({ page, loginPage }) => {
  await page.goto("https://automationintesting.online/admin");
  await loginPage();
  //assertion
  await expect(page.getByTestId("roomName101")).toHaveText("101");
});
