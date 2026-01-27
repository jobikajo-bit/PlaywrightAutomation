import { test, expect } from '@playwright/test';
import AllureReporter, { allure } from 'allure-playwright';
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


/*await page.mouse.move(661, 397);
 await page.mouse.down();
 await page.mouse.move(425, 261);
 await page.mouse.up();
 AllureUtils.takeScreenshot(page, 'Snaptrude shape selected');*/

const localCamPos3D = {
   "position": {
    "_x": 78.64918099445589,
    "_y": 118.44318909890183,
    "_z": -256.4532316315323
  },
  "alpha": -1.5191543989706937,
  "beta": 1.0555309099612435,
  "radius": 253.7831051371598,
  "target": {
    "_x": 67.25003814058526,
    "_y": -6.612451319692582,
    "_z": -35.915228569132665
  },
  "isOrtho": false,
  "orthoLeft": -205.29208203658294,
  "orthoRight": 205.29208203658294,
  "orthoBottom": -115.47679614557791,
  "orthoTop": 115.47679614557791
};


// later
await page.evaluate((cam) => {
  window.store.exposed.automationCamera.setCamera(cam);
}, localCamPos3D);



await page.locator('//div[text()="BIM"]').click();
await page.getByRole('img', { name: 'rectangle' }).click();
await page.getByRole('img', { name: 'Wall', exact: true }).click();
await page.locator('#canvas').click({
    position: {
      x: 501,
      y: 299
    }
  });
await page.locator('#canvas').click({
    position: {
      x: 677,
      y: 358
    }
  });
 
AllureUtils.takeScreenshot(page, 'Snaptrude Wall Drawn');
//await page.pause();

await page.getByRole('img', { name: 'addLayer3d' }).click();
await page.locator('#canvas').click({
    position: {
      x: 574,
      y: 326
    }
  });
await page.locator('#canvas').click({
     position: {
      x: 576,
      y: 354
    }
  });
AllureUtils.takeScreenshot(page, 'Snaptrude Split Added');
})


