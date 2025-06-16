import { expect, test } from 'src/utils/pageFixtures/baseFixture';

/**
 *  custom login fixture demo
 */
test('login with fixture', { tag: '@desktop' }, async ({ page, loginPageAsAdmin }) => {
  // navigate
  await page.goto('https://automationintesting.online/admin');
  //use custom fixture
  await loginPageAsAdmin();
  //assertion
  await expect(page.getByTestId('roomName101')).toHaveText('101');
});
