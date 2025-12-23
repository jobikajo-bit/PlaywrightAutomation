import { test, expect } from '@playwright/test';
test('test_1', async ({ page }) => {
   
      await page.goto('https://www.saucedemo.com/');
      await page.locator('[data-test="username"]').click();
      await page.locator('[data-test="username"]').fill('visual_user');
      await page.locator('[data-test="password"]').click();
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      await expect(page.getByText('Swag Labs')).toBeVisible({ timeout: 15000 });
      await page.locator('div').filter({ hasText: 'Swag Labs' }).nth(5).click();
      
      await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
      await page.locator('[data-test="shopping-cart-link"]').click();
      await page.locator('[data-test="checkout"]').click();
      await page.locator('[data-test="firstName"]').click();
      await page.locator('[data-test="firstName"]').fill('jo');
      await page.locator('[data-test="lastName"]').click();
      await page.locator('[data-test="lastName"]').fill('k');
      await page.locator('[data-test="postalCode"]').click();
      await page.locator('[data-test="postalCode"]').fill('626001');
      await page.locator('[data-test="continue"]').click();
      await page.locator('[data-test="finish"]').click();
      await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
      await page.getByRole('button', { name: 'Open Menu' }).click();
      await page.locator('[data-test="logout-sidebar-link"]').click();
      
})