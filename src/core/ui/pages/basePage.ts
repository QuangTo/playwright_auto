import { Page } from '@playwright/test';
import { BasePageObject } from './objects/base-page-object';

export class BasePage {
  readonly basePageObject: BasePageObject;

  constructor(readonly page: Page) {
    this.page = page;
    this.basePageObject = new BasePageObject(page);
  }
}
