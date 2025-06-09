import { Page, BrowserContext } from "@playwright/test";

export interface PageFixtures {
  newContext: BrowserContext;
  newPage: Page;
}
