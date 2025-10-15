import { expect, test } from '@ui/fixtures/baseFixture';

/**
 *  custom login fixture demo
 *  aria assertion strict matching
 */
test('@browser @happy login with fixture', async ({ page, loginPageAsAdmin }) => {
  await page.goto('https://automationintesting.online/admin');
  const roomAPIRes = page.waitForResponse((res) => res.url().endsWith('api/room') && res.status() === 200);
  await loginPageAsAdmin();
  await roomAPIRes;
  await expect(page.getByText('SingleTwinDoubleFamilySuitefalsetrueWiFiTVRadioRefreshmentsSafeViewsCreate')).toMatchAriaSnapshot(`- textbox
- combobox:
  - option "Single" [selected]
  - option "Twin"
  - option "Double"
  - option "Family"
  - option "Suite"
- combobox:
  - option "false" [selected]
  - option "true"
- textbox
- checkbox "WiFi"
- text: WiFi
- checkbox "TV"
- text: TV
- checkbox "Radio"
- text: Radio
- checkbox "Refreshments"
- text: Refreshments
- checkbox "Safe"
- text: Safe
- checkbox "Views"
- text: Views
- button "Create"`);
});
