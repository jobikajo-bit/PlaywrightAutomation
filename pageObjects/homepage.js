const { expect } = require('@playwright/test');
class HomePage {
  constructor(page, testData) {
    this.page = page;
    this.data = testData;
    this.loc = testData.locators;

    this.searchBox = this.page.getByRole(this.loc.searchBoxRole, { name: this.loc.searchBoxName });
  }

  async gotoHomePage() {
    await this.page.goto(this.data.url, { waitUntil: 'domcontentloaded' });
  }

  async verifyLogo() {
    await expect(this.page.locator(this.loc.logo)).toHaveAttribute('alt', 'vs-logo-img');
  }

  async searchProduct() {
    await this.searchBox.click();
    const searchInput = this.page.locator(this.loc.searchInput);
    await searchInput.click();
    await this.page.keyboard.type(this.data.searchKeyword, { delay: 100 });
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = { HomePage };
