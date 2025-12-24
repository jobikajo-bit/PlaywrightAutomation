// pageObjects/spendflowPage.js
import { expect } from '@playwright/test';
export class SpendflowPage {

  constructor(page) {
    this.page = page;

    this.vendorManagement = page.locator('//h5[text()="Vendor Management"]');
    this.agreements = page.locator('(//h5[text()="Agreements"])[1]');
    this.addAgreementBtn = page.locator('//p[text()="+ Add Agreement"]');
    this.continueBtn = page.locator('//p[text()="Continue"]');
    this.fileInput = page.locator('input[type="file"]');
    this.vendorNameField = page.locator('//*[text()="Vendor Name"]//following::input');
    this.saveAndContinueBtn = page.locator( 'button:has(p:has-text("Save & Continue"))');
    this.agreementDetailsText = page.locator('//p[text()="Agreement Details"]');
    this.agreementstartDate = page.locator('input#startDate').first();
    this.agrementendDate = page.locator('input#endDate').first();
    //this.contractedvalue = page.getByPlaceholder('Enter Cost').first();
    this.agreementduration = page.locator( '//span[normalize-space()="Agreement Duration"]/ancestor::label/following-sibling::p');
   //this.procuredBySpendfloValue = this.page.locator("text=Procured by Spendflo");


  
  }

  async navigateToAgreements() {
    await this.vendorManagement.click();
    await this.agreements.click();
  }

  async addAgreement(filePath) {
    await this.addAgreementBtn.click();
    await this.fileInput.setInputFiles(filePath);
    await this.continueBtn.click();

    /*const vendorName = await this.vendorNameField.getAttribute('value');

    if (vendorName.includes('ABC Technologies Pvt Ltd')) {
      console.log('Vendor name verified:', vendorName);
    } else {
      throw new Error('Vendor name does not match. Found: ' + vendorName);
    }
  } */
}

async verifyVendorName(expectedVendorName) {
  const 
  actualVendorName = await this.vendorNameField.inputValue();
  console.log('Vendor name found:', actualVendorName);

  await expect(actualVendorName).toContain(expectedVendorName);
}

 async clickSaveAndContinue() {
        // Scroll into view
        await this.saveAndContinueBtn.scrollIntoViewIfNeeded();

        // Wait until visible
        await this.saveAndContinueBtn.waitFor({
            state: 'visible',
            timeout: 20000
        });

        // Ensure button is enabled and click
        await expect(this.saveAndContinueBtn).toBeEnabled({
            timeout: 20000
        });
        await this.page.evaluate((btn) => btn.click(), await this.saveAndContinueBtn.elementHandle());

        // Wait for navigation / api calls
        await this.page.waitForLoadState('networkidle');
    }




async verifyAgreementDetailsText(expectedText) {
  await expect(this.agreementDetailsText).toBeVisible();
  await expect(this.agreementDetailsText).toHaveText(expectedText);
}


 async verifyAgreementStartDate(expectedDate) {
    await this.agreementstartDate.scrollIntoViewIfNeeded();
    await expect(this.agreementstartDate).toBeVisible({ timeout: 15000 });
    const actualDate = await this.agreementstartDate.inputValue();


    console.log('Agreement Start Date (UI):', actualDate);
    console.log('Agreement Start Date (Expected):', expectedDate);

    
    await expect(this.agreementstartDate).toHaveValue(expectedDate);
}

async verifyAgreementEndDate(expectedEndDate) {
    await this.agrementendDate.scrollIntoViewIfNeeded();
    await expect(this.agrementendDate).toBeVisible({ timeout: 15000 });

    //  Read & print value
    const actualEndDate = await this.agrementendDate.inputValue();
    console.log('Agreement End Date (UI):', actualEndDate);
    console.log('Agreement End Date (Expected):', expectedEndDate);

    //  Assertion
    await expect(this.agrementendDate).toHaveValue(expectedEndDate);
}

/*

async verifyContractedValue(expectedValue) {
    this.contractedvalue = page.getByPlaceholder('Enter Cost');
    await this.contractedvalue.scrollIntoViewIfNeeded();
    await expect(this.contractedvalue).toBeVisible({ timeout: 15000 });

    const actualValue = await this.contractedvalue.inputValue();
    console.log('Contracted Value (UI):', actualValue);

    await expect(this.contractedvalue).toHaveValue(expectedValue);
} */



async verifyAgreementDuration(expectedDuration) {
    await this.agreementduration.scrollIntoViewIfNeeded();
    await expect(this.agreementduration).toBeVisible({ timeout: 15000 });

    const actualDuration = (await this.agreementduration.textContent()).trim();
    console.log('Agreement Duration (UI):', actualDuration);

    await expect(this.agreementduration).toHaveText(expectedDuration);
}

async verifyProcuredBySpendflo(expectedValue) {
  await this.procuredBySpendfloValue.scrollIntoViewIfNeeded();
  await expect(this.procuredBySpendfloValue).toBeVisible();

  const actualValue = await this.procuredBySpendfloValue.inputValue();
  console.log(`Procured by Spendflo (UI): ${actualValue}`);
  console.log(`Procured by Spendflo (Expected): ${expectedValue}`);

  await expect(actualValue).toBe(expectedValue);
}
/*
async verifyProcuredBySpendflo(expectedValue) {
    // Wait for the element to exist in DOM first
    await this.procuredBySpendfloValue.waitFor({ state: 'attached', timeout: 30000 });

    // Scroll into view if needed
    await this.procuredBySpendfloValue.scrollIntoViewIfNeeded();

    // Wait for it to become visible
    await this.procuredBySpendfloValue.waitFor({ state: 'visible', timeout: 30000 });

    // Get the actual text and trim it
    const actualValue = (await this.procuredBySpendfloValue.textContent())?.trim();

    // Assert the value
    if (actualValue !== expectedValue) {
        throw new Error(`Procured by Spendflo mismatch! Expected: "${expectedValue}", Found: "${actualValue}"`);
    }

    console.log(`Procured by Spendflo value verified: ${actualValue}`);
}*/


}

