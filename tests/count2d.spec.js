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
await page.locator('//img[@id="img-top-menu-bar-design-drawCircle"]').click();

await page.locator('#canvas').click({
    position: {
      x: 363,
      y: 236
    }
  });
await page.locator('#canvas').click({
    position: {
      x: 384,
      y: 272
    }
});
await page.locator('//img[@id="img-top-menu-bar-design-rectangle"]').click();
await page.locator('#canvas').click({
    position: {
      x: 456,
      y: 211
    }
  });
await page.locator('//canvas[@id="canvas"]').click({
    position: {
      x: 524,
      y: 271
    }
  });

await page.locator('//img[@alt="draw"]').click(); 
await page.locator('#canvas').click({
    position: {
      x: 573,
      y: 221
    }
  });
await page.locator('#canvas').click({
    position: {
      x: 690,
      y: 217
    }
  });
await page.locator('#canvas').click({
    position: {
      x: 696,
      y: 313
    }
  });
await page.locator('#canvas').click({
    position: {
      x: 569,
      y: 311
    }
  });
await page.locator('#canvas').click({
    position: {
      x: 571,
      y: 225
    }
  });
  await page.locator('//img[@id="img-top-menu-bar-design-arc"]').click();
  await page.locator('#canvas').click({
    position: {
      x: 487,
      y: 360
    }
  });
await page.locator('#canvas').click({
    position: {
      x: 414,
      y: 362
    }
  });
await page.locator('#canvas').click({
    position: {
      x: 457,
      y: 401
    }
  });
await page.locator('#canvas').click({
    position: {
      x: 485,
      y: 358
    }
  });
await page.locator('#canvas').click({
    position: {
      x: 475,
      y: 364
    }
  });

   await page.getByRole('img', { name: 'pointer' }).click();
    await page.locator('body').press('ControlOrMeta+a');
   // await page.getByText('Count4').click();
    await expect(page.locator('#object_properties_panel').getByText('4', { exact: true })).toBeVisible();
   // await page.getByText('Count4').click();
    });
  
