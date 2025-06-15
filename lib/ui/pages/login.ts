import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private userName: Locator;
  private password: Locator;
  private letMeIn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.letMeIn = page.getByRole('button', { name: 'Login' });
  }

  async inputLogin(userName: string, password: string): Promise<void> {
    await this.userName.fill(userName);
    await this.password.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.letMeIn.click();
  }
}
