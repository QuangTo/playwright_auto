import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';

// config();
function loadEnvFile() {
  const envFile = `.env.${process.env.NODE_ENV || 'dev'}`;
  const envPath = resolve(__dirname, envFile);

  if (fs.existsSync(envPath)) {
    config({ path: envPath });
    // console.log(`Loaded environment variables from ${envFile}`);
  } else {
    console.error(`Environment file ${envFile} not found`);
    process.exit(1);
  }
}

// Load the environment variables
loadEnvFile();
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

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
      name: 'desktop',
      grep: /@desktop/,
      fullyParallel: true,
      use: {
        browserName: 'firefox',
        ...devices['Desktop Firefox']
        // viewport:[]
      }
    },
    {
      name: 'mobile',
      grep: /@mobile/,
      workers: 1,
      use: {
        ...devices['iPhone 13 Pro Max'],
        browserName: 'chromium'
      }
    }

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ]

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
