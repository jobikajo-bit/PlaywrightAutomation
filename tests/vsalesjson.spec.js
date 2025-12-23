import { test, expect } from '@playwright/test';
const { AllureUtils } = require('../utils/allureUtils');
const testData = require('../testdatas/vsales.json');

// Increase test timeout for slow site
test.setTimeout(180000);

test('Vijaysales - JSON Driven Fully', async ({ page }) => {
  const loc = testData.locators; // shortcut for locators

  // Grant geolocation permission
  await page.context().grantPermissions(['geolocation']);

  // Go to homepage
  await page.goto(testData.url, { waitUntil: 'domcontentloaded' });
  await AllureUtils.takeScreenshot(page, 'VijaySales Home Page');

  // Verify logo
  await expect(page.locator(loc.logo)).toHaveAttribute('alt', 'vs-logo-img');
  await AllureUtils.takeScreenshot(page, 'VijaySales Title Verified');

  // Search for product
  const searchBox = page.getByRole(loc.searchBoxRole, { name: loc.searchBoxName });
  await searchBox.click();
  const searchInput = page.locator(loc.searchInput);
  await searchInput.click();
  await page.keyboard.type(testData.searchKeyword, { delay: 100 });
  await page.keyboard.press('Enter');

  await page.waitForLoadState('domcontentloaded');
  await AllureUtils.takeScreenshot(page, `Searched for ${testData.searchKeyword}`);

  // Open product in new tab
  const [newTab] = await Promise.all([
    page.context().waitForEvent('page', { timeout: 60000 }),
    page.locator(loc.productLink).click()
  ]);

  await newTab.waitForLoadState('domcontentloaded');
  await newTab.evaluate(() => {
    window.moveTo(0, 0);
    window.resizeTo(window.screen.availWidth, window.screen.availHeight);
  });
  console.log('New tab opened and maximized');

  // Add to Cart
  const addToCartBtn = newTab.locator(loc.addToCartBtn);
  await addToCartBtn.waitFor({ state: 'visible', timeout: 60000 });
  await addToCartBtn.click();

  // Handle Pincode modal
  const pincodeInput = newTab.locator(loc.pincodeInput);
  if (await pincodeInput.isVisible({ timeout: 5000 })) {
    await pincodeInput.fill(testData.pincode);
    await newTab.keyboard.press('Enter');

    const applyBtn = newTab.locator(loc.pincodeApplyBtn);
    await expect(applyBtn).toBeEnabled({ timeout: 10000 });
    await applyBtn.click();
  }

  // Wait for “Item Added” confirmation
  await newTab.locator(loc.addedToast).waitFor({ state: 'visible', timeout: 15000 });

  // Open Cart
  await newTab.click(loc.cartIcon);

  // Verify Cart has product
  const cartItem = newTab.locator(loc.cartItem);
  await expect(cartItem).toBeVisible({ timeout: 20000 });

  // Proceed to Checkout
  const checkoutBtn = newTab.locator(loc.checkoutBtn);
  await checkoutBtn.waitFor({ state: 'visible', timeout: 30000 });
  await checkoutBtn.click();
});
