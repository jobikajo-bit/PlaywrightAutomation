import { test } from '@playwright/test';
const { AllureUtils } = require('../utils/allureUtils');
const testData = require('../testdatas/vsales.json');
const { HomePage } = require('../pageObjects/homepage');
const { SearchPage } = require('../pageObjects/SearchPage');
const { ProductPage } = require('../pageObjects/ProductPage');

test.setTimeout(180000);

test('Vijaysales - JSON Driven POM', async ({ page }) => {
  await page.context().grantPermissions(['geolocation']);

  const homePage = new HomePage(page, testData);
  const searchPage = new SearchPage(page, testData);

  // Home Page Actions
  await homePage.gotoHomePage();
  await AllureUtils.takeScreenshot(page, 'Home Page');
  await homePage.verifyLogo();
  await AllureUtils.takeScreenshot(page, 'Logo Verified');
  await homePage.searchProduct();
  await AllureUtils.takeScreenshot(page, `Searched ${testData.searchKeyword}`);

  // Search Page Actions
  const productTab = await searchPage.openProductInNewTab();

  // Product Page Actions
  const productPage = new ProductPage(productTab, testData);
  await productPage.addToCart();
  await productPage.handlePincode();
  await productPage.verifyItemAdded();
  await productPage.openCart();
  await productPage.verifyCartItem();
  await productPage.proceedToCheckout();
});
