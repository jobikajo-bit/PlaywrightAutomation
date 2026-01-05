import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
const { AllureUtils } = require('../utils/allureUtils');

test('Snaptrude', async ({ page }) => {
 /* await page.addInitScript(() => {
    "prevent-gpu-access-modal":'true'
  });*/
  await page.addInitScript(() => {
  localStorage.setItem('prevent-gpu-access-modal', 'true');
});

    test.setTimeout(90000);

   await page.goto('https://staging.snaptrude.xyz/login',{waitUntil:'domcontentloaded'});
    
   expect(page.locator('img[alt="Snaptrude"]'));
   
   await page.fill('//input[@id="identifier-field"]', 'automation1@snaptrude.com');
   
   await page.locator('//span[text()="Continue"]').click();
await page.fill('//input[@id="password-field"]', 'Automation1@123');
    
await page.locator('//span[text()="Continue"]').click();
await page.waitForLoadState('domcontentloaded');
//await page.click('.checkbox.grid.place-items-center.bg-fullWhite.h-\\[12px\\]');
//await page.click('div[class="flex h-5 w-5 cursor-pointer items-center justify-center p-2 active:scale-95"]');

await page.locator('//button[@id="ai-workflow-button"]').click();
await page.fill('//input[@name="projectName"]', 'Test Project');
await page.press('//input[@name="projectName"]', 'Enter');
//await page.click('//div[normalize-space()="cm"]//div[normalize-space()="m"]');
//await page.click('//span[text()="Next"]');
await page.locator('//div[text()="Start on blank canvas"]').click();
await page.waitForLoadState('domcontentloaded');
AllureUtils.takeScreenshot(page, 'Snaptrude Blank Canvas Loaded');

//await page.click('div[class="flex h-5 w-5 cursor-pointer items-center justify-center p-2 active:scale-95"]');

await page.locator('//img[@alt="draw"]').click();
await page.locator('//canvas[@id="canvas"]').click({

    position: {
      x: 467,
      y: 238
    }
  });
await page.locator('#canvas').click({
    position: {
      x: 469,
      y: 317
    }
  });
await page.locator('#canvas').click({
    position: {
      x: 579,
      y: 315
    }
  });
await page.getByRole('img', { name: 'arc', exact: true }).click({
    modifiers: ['Shift']
  });
await page.locator('#canvas').click({
    position: {
      x: 468,
      y: 235
    }
  });
await page.locator('#canvas').click({
    position: {
      x: 472,
      y: 234
    }
  });
await page.locator('#canvas').click({
    position: {
      x: 469,
      y: 241
    }
  });

AllureUtils.takeScreenshot(page, 'Snaptrude Shape Drawn');

await page.locator('//img[@id="img-top-menu-bar-design-copy"]').click();
await page.locator('//canvas[@id="canvas"]').click({
  position: {
      x: 469,
      y: 241
    }
  });

await page.mouse.move(690, 460);
    
   await page.getByTestId('copy-array-distance-input').press('Tab');
await page.getByTestId('copy-array-number-of-copies-input-input').fill('2');
await page.getByTestId('copy-array-number-of-copies-input-input').press('Enter');
await page.locator('body').press('Escape');

AllureUtils.takeScreenshot(page, 'Snaptrude Shape Copied');



})



