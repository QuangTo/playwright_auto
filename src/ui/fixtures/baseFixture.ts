import { PageFixtures } from './type/Test.type';
import { test as base, mergeTests } from '@playwright/test';
import { test as loginPage } from './loginFixture';
import { test as schemaCheck } from './validSchema';

export const loginInfo = base.extend<{ beforeEachTest: void }>({
  beforeEachTest: [
    async ({}, use, worker) => {
      console.log('worker', worker.workerIndex, worker.project.name);
      await use();
    },
    { auto: true }
  ]
});

export const test = mergeTests(loginPage, schemaCheck);
export { expect, Page, Locator } from '@playwright/test';
