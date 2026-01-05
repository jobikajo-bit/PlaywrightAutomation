// pages/loginPage.js
import { expect } from '@playwright/test';

export class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('[data-test-id="input-identifier"]');
        this.passwordInput = page.locator('[data-test-id="input-password"]');
        this.submitButton = page.locator('[data-test-id="submit-btn"]');
    }

    async gotoLogin() {
        await this.page.goto('https://test.spendflo.com/account/login', { waitUntil: 'domcontentloaded' });
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.submitButton.click();
        await this.passwordInput.fill(password);
        await this.submitButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}
