import { defineConfig, devices } from '@playwright/test';
import { loadEnvironment } from './load-env';

/**
 * Load the environment variables
 */
loadEnvironment();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: 'tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 3 : 0,
  workers: 3,

  /* Opt out of parallel tests on CI. */
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [process.env.CI ? ['list'] : ['list', { printSteps: true }], ['html', { noSnippets: true }]],

  // ["@reportportal/agent-js-playwright", RPconfig],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    baseURL: process.env.BASE_API,
    extraHTTPHeaders: {},
    trace: 'on-first-retry',
    testIdAttribute: 'id'
  },
  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'setup data',
    //   testMatch: /global\.setup\.ts/
    // },
    // {
    //   name: 'clean up data',
    //   testMatch: /.teardown.ts/
    // },
    {
      name: 'browser',
      grep: /@browser/,
      fullyParallel: true,
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'api',
      grep: /@api/,
      fullyParallel: true,
      use: {
        headless: true
      }
    }
  ]

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
