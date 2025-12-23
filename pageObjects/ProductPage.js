
const { expect } = require('@playwright/test');

class ProductPage {
  constructor(page, testData) {
    this.page = page;
    this.data = testData;
    this.loc = testData.locators;
  }

  async addToCart() {
    const addToCartBtn = this.page.locator(this.loc.addToCartBtn);
    await addToCartBtn.waitFor({ state: 'visible', timeout: 60000 });
    await addToCartBtn.click();
  }

  async handlePincode() {
    const pincodeInput = this.page.locator(this.loc.pincodeInput);
    if (await pincodeInput.isVisible({ timeout: 5000 })) {
      await pincodeInput.fill(this.data.pincode);
      await this.page.keyboard.press('Enter');

      const applyBtn = this.page.locator(this.loc.pincodeApplyBtn);
      await expect(applyBtn).toBeEnabled({ timeout: 10000 });
      await applyBtn.click();
    }
  }

  async verifyItemAdded() {
    await this.page.locator(this.loc.addedToast).waitFor({ state: 'visible', timeout: 15000 });
  }

  async openCart() {
    await this.page.click(this.loc.cartIcon);
  }

  async verifyCartItem() {
    const cartItem = this.page.locator(this.loc.cartItem);
    await expect(cartItem).toBeVisible({ timeout: 20000 });
  }

  async proceedToCheckout() {
    const checkoutBtn = this.page.locator(this.loc.checkoutBtn);
    await checkoutBtn.waitFor({ state: 'visible', timeout: 30000 });
    await checkoutBtn.click();
  }
}

module.exports = { ProductPage };
