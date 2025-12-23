import { test, expect } from '@playwright/test';

test('test_1', async ({ page }) => {
    await page.goto("https://lrpv2atesting.solverminds.net/main")

 await page.getByRole('textbox', { name: 'Username' }).click();

 await page.getByRole('textbox', { name: 'Username' }).press('CapsLock');
 await page.getByRole('textbox', { name: 'Username' }).fill('S');
 await page.getByRole('textbox', { name: 'Username' }).press('CapsLock');
 await page.getByRole('textbox', { name: 'Username' }).fill('Super');
 await page.getByRole('textbox', { name: 'Username' }).press('CapsLock');
 await page.getByRole('textbox', { name: 'Username' }).fill('SuperU');
 await page.getByRole('textbox', { name: 'Username' }).press('CapsLock');
 await page.getByRole('textbox', { name: 'Username' }).fill('SuperUser');

 await page.getByRole('textbox', { name: 'Password' }).click();
 await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
 await page.getByRole('textbox', { name: 'Password' }).fill('P');
 await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
 await page.getByRole('textbox', { name: 'Password' }).fill('P@ssw0rd');
 await page.getByRole('button', { name: 'Login' }).click();
 await expect(page.getByText('SUPERUSER [ Line/SVM ]')).toBeVisible();
 
});