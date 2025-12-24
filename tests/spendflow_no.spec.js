import { test, expect } from '@playwright/test';
test('Spendflow test flow', async ({ page }) => {

    test.setTimeout(90000);
    await page.goto('https://test.spendflo.com/',{waitUntil:'domcontentloaded'});
   
await page.goto('https://test.spendflo.com/account/login');
await page.locator('[data-test-id="input-identifier"]').fill('prabhakaran.s@trackdfect.com');
await page.locator('[data-test-id="submit-btn"]').click();
await page.locator('[data-test-id="input-password"]').click();
await page.locator('[data-test-id="input-password"]').fill('Test@123$');
await page.locator('[data-test-id="submit-btn"]').click();
await page.waitForLoadState('domcontentloaded');
 await page.locator('//h5[text()="Vendor Management"]').click();
 await page.locator('(//h5[text()="Agreements"])[1] ').click();
  await page.locator('//p[text()="+ Add Agreement"]').click();
//await page.getByText('Drop a file here to upload, or click here to browseMaximum file size 5MB').click();
 const filePath = "C:\Users\TD\Downloads\aggrement";
await page.locator('input[type="file"]').setInputFiles("C:/Users/TD/Downloads/aggrement/Order_Agreement.pdf");
await page.waitForTimeout(15000);
await page.locator('//p[text()="Continue"]').click();
//await page.waitForTimeout(30000);


//*[text()="Vendor Name"]//following::input



await expect(page.locator('//p[text()="Vendor Name"]'))
  .toHaveText('Vendor Name');
  

await expect(page.locator('//input[@value="ABC Technologies Pvt Ltd"]'))
  .toHaveValue('ABC Technologies Pvt Ltd');
await page.locator('//p[text()="Save & Continue"]').click();

await expect(page.locator('//p[normalize-space()="2/8 fields remaining"]'))
  .toHaveText('2/8 fields remaining');

})
