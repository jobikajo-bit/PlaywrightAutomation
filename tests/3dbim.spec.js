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


  test.setTimeout(180000);

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
  await page.waitForSelector('.project-is-ready', {
    state: 'attached',
    timeout: 60000
  });
await page.locator('//button[@data-tooltip-id="view-toggle-tooltip-3d"]').click();

await page.locator('//div[text()="BIM"]').click();
await page.locator('//img[@alt="draw"]').click();
await page.locator('#canvas').click({
    position: {
      x: 550,
      y: 357
    }
  });
  await page.locator('#canvas').click({
   position: {
      x: 701,
      y: 382
    }
  });
  await page.getByTestId('dimensionDistanceInput').press('Enter');

  await page.locator('//div[@id="doors"]').click();
 await page.waitForTimeout(3000);
  await page.locator('[id="library-babylon-800_x_2100_Glazed_3_Panelled_Swing_Single_Shutter_Metal_Frame.babylon.png-"] > div > .dark-mode').click();
 await page.waitForTimeout(3000);
  await page.locator('#canvas').click({
    position: {
      x: 560,
      y: 342
    }
  });
   await page.locator('#canvas').press('Enter');

   await page.locator('#canvas').press('Escape');
  await page.locator('//div[@id="windows"]').click();
await page.waitForTimeout(3000);

  await page.locator('[id="library-babylon-600_x_1200_Fixed_Window_Wood_Frame.babylon.png-"] > div > .dark-mode').click();
 
 await page.waitForTimeout(3000);
  await page.locator('#canvas').click({
  position: {
      x: 588,

      y: 346
    }
  });

   await page.locator('#canvas').press('Enter');
  await page.locator('#canvas').press('Escape');
  AllureUtils.takeScreenshot(page, 'Snaptrude Door and Window Added');
  /*
    await page.mouse.move(621, 334);
 await page.mouse.down();
 await page.mouse.move(544, 335);
 await page.mouse.up(); 


 await page.getByRole('img', { name: 'copy' }).click();
 await page.getByRole('img', { name: 'draw', exact: true }).click();
 
 
  await page.getByRole('img', { name: 'copy' }).click({
    position: {
      x: 656,
      y: 363
    }
  });
  await page.getByTestId('copy-array-distance-input').press('Enter');
  await page.locator('body').press('Escape');
  AllureUtils.takeScreenshot(page, 'Snaptrude Shape Copied'); */
});







