import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private page: Page;
  private userName: Locator;
  private password: Locator;
  private letMeIn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator("#login-input");
    this.password = page.locator("#password-input");
    this.letMeIn = page.locator("#BSign"); // Corrected the method used for locating the element
  }

  async inputLogin(userName: string, password: string): Promise<void> {
    await this.userName.fill(userName);
    await this.password.fill(password);
  }

  async clickLetMeIn(): Promise<void> {
    await this.letMeIn.click();
  }
}
