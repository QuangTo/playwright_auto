import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private page: Page;
  private userName: Locator;
  private password: Locator;
  private letMeIn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator("#");
    this.password = page.locator("#");
    this.letMeIn = page.locator("#");
  }

  async inputLogin(userName: string, password: string): Promise<void> {
    await this.userName.fill(userName);
    await this.password.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.letMeIn.click();
  }
}
