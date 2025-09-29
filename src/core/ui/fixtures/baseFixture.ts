import { PageFixtures } from './type/Test.type';
import { test as base, mergeTests } from '@playwright/test';
import { test as loginPage } from './loginFixture';
import { test as schemaCheck } from './validSchema';

export const loginInfo = base.extend<{ beforeEachTest: void }>({
  beforeEachTest: [
    async ({}, use) => {
      // do somethings
      await use();
    },
    { scope: 'test', auto: true }
  ]
  // add another for worker scope
});

export { expect, Page, Locator } from '@playwright/test';
export const test = mergeTests(loginPage, schemaCheck);
