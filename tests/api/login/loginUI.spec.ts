import { expect, test } from '@ui/fixtures/baseFixture';

/**
 *  custom login fixture demo
 */
test('@browser login with fixture', async ({ page, loginPageAsAdmin }) => {
  test.skip(true, 'skip');
  await page.goto('https://automationintesting.online/admin');
  //use custom fixture
  await loginPageAsAdmin();
  //assertion
  await expect(page.getByTestId('roomName101')).toHaveText('101');
});
