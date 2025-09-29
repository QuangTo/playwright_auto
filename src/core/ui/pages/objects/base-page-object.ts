import { Page } from '@playwright/test';

export class BasePageObject {
  constructor(private page: Page) {}
  get cancelButton() {
    return this.page.getByText('Cancel', { exact: true });
  }
}
