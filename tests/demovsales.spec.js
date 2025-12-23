import { test, expect } from '@playwright/test';
const { AllureUtils } = require('../utils/allureUtils');

// Increase test timeout for slow VijaySales site
test.setTimeout(180000); // 3 minutes

test('Vijaysales', async ({ page }) => {
  // Grant geolocation permission
  await page.context().grantPermissions(['geolocation']);

  // Go to homepage
  await page.goto('https://www.vijaysales.com/', { waitUntil: 'domcontentloaded' });
  await AllureUtils.takeScreenshot(page, 'VijaySales Home Page');

  // Verify logo
  await expect(page.locator('(//img[@alt="vs-logo-img"])[2]')).toHaveAttribute('alt', 'vs-logo-img');
  await AllureUtils.takeScreenshot(page, 'VijaySales Title Verified');

  // Search for product
  const searchBox = page.getByRole('textbox', { name: 'Search for phone, TV, home' });
  await searchBox.click();
  const searchInput = page.locator('div.searchContainer__searchAndInput--inputContainer input[placeholder*="Search for"]');
  await searchInput.click();
  await page.keyboard.type('iphone 16 plus', { delay: 100 });
  await page.keyboard.press('Enter');

  await page.waitForLoadState('domcontentloaded');
  await AllureUtils.takeScreenshot(page, 'Searched for Apple iPhone 16 Plus');

  // Open product in new tab safely
  const [newTab] = await Promise.all([
    page.context().waitForEvent('page', { timeout: 60000 }),
    page.locator('//div[text()="Apple iPhone 16 Plus (256GB Storage, Pink)"][1]').click()
  ]);

  await newTab.waitForLoadState('domcontentloaded');
  await newTab.evaluate(() => {
    window.moveTo(0, 0);
    window.resizeTo(window.screen.availWidth, window.screen.availHeight);
  });
  console.log('New tab opened and maximized');

  // 1️⃣ Click Add to Cart
const addToCartBtn = newTab.locator('(//button[@data-id="add-to-cart"])[1]');
await addToCartBtn.waitFor({ state: 'visible', timeout: 60000 });
await addToCartBtn.click();

// 2️⃣ Wait for Pincode modal
const pincodeInput = newTab.locator('#pincode-inputbox');
if (await pincodeInput.isVisible({ timeout: 5000 })) {
    await pincodeInput.fill('400005');
    await newTab.keyboard.press('Enter');

    const applyBtn = newTab.locator('#pincode-btn');
    await expect(applyBtn).toBeEnabled({ timeout: 10000 });
    await applyBtn.click();
}

// 3️⃣ Wait for “Item Added” confirmation
const addedToast = newTab.locator('//div[@class="toastnotification"]');
await addedToast.waitFor({ state: 'visible', timeout: 15000 });

// 4️⃣ Open Cart
await newTab.click('(//a[.//img[@alt="cart-icon"]])[1]');

// 5️⃣ Verify Cart has product
//const cartItem = newTab.page.getByText('Apple iPhone 16 Plus (256GB Storage, Pink)', { exact: true });
const cartItem = newTab.locator('(//h5[normalize-space()="Apple iPhone 16 Plus (256GB Storage, Pink)"])[1]');
await expect(cartItem).toBeVisible({ timeout: 20000 });


// 6️⃣ Now Proceed to Checkout
const checkoutBtn = newTab.locator('//a[normalize-space()="Proceed to Checkout"]');
await checkoutBtn.waitFor({ state: 'visible', timeout: 30000 });
await checkoutBtn.click();


});

