import { Selector } from '@playwright/test';

class HeaderComponent {
  constructor() {
    this.searchBar = Selector('#search');
  }
}

export default new HeaderComponent();
