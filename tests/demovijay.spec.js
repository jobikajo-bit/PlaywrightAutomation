import { test, expect } from '@playwright/test';
const { AllureUtils } = require('../utils/allureUtils');

test('Vijaysales', async ({ page }) => {
await page.context().grantPermissions(['geolocation']);
   await page.goto('https://www.vijaysales.com/',{waitUntil:'domcontentloaded'});
   await AllureUtils.takeScreenshot(page, 'VijaySales Home Page');
   await expect(page.locator('(//img[@alt=\'vs-logo-img\'])[2]')).toHaveAttribute('alt', 'vs-logo-img');

    AllureUtils.takeScreenshot(page, 'VijaySales Title Verified');


await page.getByRole('textbox', { name: 'Search for phone, TV, home' }).click();
await page.click('div[class=\'searchContainer__searchAndInput--inputContainer\'] input[placeholder=\'Search for phone, TV, home appliances...\']');
   //await page.click('(//div[@data-jsname="searchfield"])[1]');

await page.keyboard.type('iphone 16 plus', { delay: 100 });

await page.keyboard.press('Enter');
AllureUtils.takeScreenshot(page, 'Searched for apple iphone 16plus');
 await page.waitForLoadState('domcontentloaded');
 AllureUtils.takeScreenshot(page, 'iphone 16 plus Search Results');

/* await page.click('//div[text()="Apple iPhone 16 Plus (256GB Storage, Pink)"][1]');
 AllureUtils.takeScreenshot(page, 'Apple iPhone 16 Plus Product Page');*/
 
 const [newTab] = await Promise.all([
  page.context().waitForEvent('page'),
  await page.locator('//div[text()="Apple iPhone 16 Plus (256GB Storage, Pink)"][1]').click(), // Opens a new tab
 ]);


await newTab.waitForLoadState(); 
         // Wait until tab is fully loaded
        await newTab.evaluate(() => {

          window.moveTo(0, 0);
          window.resizeTo(window.screen.availWidth, window.screen.availHeight);
        });
        console.log('New tab opened and maximized');
/// add to cart flow
const addToCartBtn = newTab.locator('(//button[contains(@class,"add-to-cart")])[1]');
await expect(addToCartBtn).toBeVisible({ timeout: 20000 });
await addToCartBtn.scrollIntoViewIfNeeded();
await AllureUtils.takeScreenshot(newTab, 'Before Add To Cart');
await addToCartBtn.click({ force: true });

//  Wait for page dom update instead of cart count
await newTab.waitForTimeout(4000);
await AllureUtils.takeScreenshot(newTab, 'After Add To Cart');
 await expect(newTab.locator('//div[@id="text-d776941630"]').getByText('Enter your pincode')).toBeVisible();
   await AllureUtils.takeScreenshot(newTab, 'Pincode Entry Visible');
   await newTab.fill('//input[@id="pincode-inputbox"]',"400005");
   await newTab.keyboard.press('Enter');  
   await newTab.waitForTimeout(1000);
   await AllureUtils.takeScreenshot(newTab, 'Pincode Entered');
  // await page.click('//button[@id="pincode-btn"]')
const applyBtn = newTab.locator('//button[@id="pincode-btn"]');

await expect(applyBtn).toBeEnabled({ timeout: 10000 });
await newTab.click('//button[@id="pincode-btn"]');
   await AllureUtils.takeScreenshot(newTab, 'Pincode Applied');
   
  await newTab.waitForLoadState('domcontentloaded');



//  OPEN CART (THIS ALWAYS EXISTS)
const cartBtn = newTab.locator('(//a[.//img[@alt="cart-icon"]])[1]');
await expect(cartBtn).toBeVisible({ timeout: 15000 });
await cartBtn.click({ force: true });

//  WAIT FOR CART PAGE
await newTab.waitForLoadState('domcontentloaded');
await AllureUtils.takeScreenshot(newTab, 'Cart Opened');

//  VERIFY PRODUCT EXISTS IN CART
await expect(
  newTab.locator('text=iPhone').first()
).toBeVisible({ timeout: 15000 });

//  PROCEEDING TO CHECKOUT
const checkoutBtn = newTab.locator('//a[normalize-space()="Proceed to Checkout"]');
await expect(checkoutBtn).toBeVisible({ timeout: 15000 });
await checkoutBtn.scrollIntoViewIfNeeded();
await checkoutBtn.click({ force: true });

await newTab.waitForLoadState('domcontentloaded');
await AllureUtils.takeScreenshot(newTab, 'Checkout Page');

});
