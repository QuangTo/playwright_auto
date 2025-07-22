import { Page, Locator } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {
    this.page = page;
  }
  get userName() {
    return this.page.getByTestId('username');
  }
  get password() {
    return this.page.getByTestId('password');
  }
  get letMeIn() {
    return this.page.getByRole('button', { name: 'Login' });
  }
  async inputLogin(userName: string, password: string): Promise<void> {
    await this.userName.fill(userName);
    await this.password.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.letMeIn.click();
  }
}
