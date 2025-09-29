import { LoginPage } from '../pages/login';
import { test as base } from '@playwright/test';

type LoginFixture = {
  // optional return page or void
  loginPageAsAdmin: (userName?: string, password?: string) => Promise<LoginPage>;
};

export const test = base.extend<LoginFixture>({
  loginPageAsAdmin: async ({ page }, use) => {
    const login = async (userName: string = 'admin', password: string = 'password') => {
      const loginPage = new LoginPage(page);
      await loginPage.inputLogin(userName, password);
      await loginPage.clickLogin();
      // optional
      return loginPage;
    };
    await use(login);
  }
});
