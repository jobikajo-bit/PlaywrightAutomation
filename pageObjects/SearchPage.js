class SearchPage {
  constructor(page, testData) {
    this.page = page;
    this.data = testData;
    this.loc = testData.locators;
  }

  async openProductInNewTab() {
    const [newTab] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 60000 }),
      this.page.locator(this.loc.productLink).click()
    ]);

    await newTab.waitForLoadState('domcontentloaded');
    await newTab.evaluate(() => {
      window.moveTo(0, 0);
      window.resizeTo(window.screen.availWidth, window.screen.availHeight);
    });
    return newTab;
  }
}

module.exports = { SearchPage };
