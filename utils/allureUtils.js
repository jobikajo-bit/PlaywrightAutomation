const { allure } = require('allure-playwright');

class AllureUtils {
  static async takeScreenshot(page, stepName) {
    const screenshot = await page.screenshot();
    await allure.attachment(stepName, screenshot, 'image/png');
  }
}

module.exports = { AllureUtils };
