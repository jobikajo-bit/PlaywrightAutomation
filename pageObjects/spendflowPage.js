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
   this.procuredBySpendfloValue = page.locator('//*[text()="Procured by Spendflo"]//following::span[text()="Yes"]');
   this.paymentTerms =page.locator('//*[text()="Payment Terms"]//following::span[text()="Net 30"]');
   this.billingFrequency=page.locator('//*[text()="Billing Frequency"]//following::span[text()="Annual"]');
   this.autoRenew =page.locator('//*[text()="Does this auto renew?"]//following::span[text()="No"]');
   //this.lineitemtype=page.locator('//span[text()="Line Item Type"]//following::span[text()="License Info"])[1]');
const valueLocator = page.locator(`//span[text()="Line Item Type"]//following::span[text()="License Info"]`).first();
this.offeringNameInput = page.locator('//span[text()="Offering Name"]//following::input').first();
  this.planinput=page.locator('//span[text()="Plan"]//following::input[@value="Business+"]').first();
 // this.pricing=page.locator('(//span[text()="Pricing Model"]//following::span[text()="User-based: Per Seat"]').first();
  this.pricingModelValue = this.page
    .locator('//span[text()="Pricing Model"]//following::span')
    .first();

  this.startdate=page.locator('(//span[text()="Start Date"]//following::input[@value="31/01/2025"])').first();
  this.endDate=page.locator('//span[text()="End Date"]//following::input[@value="31/01/2027"]').first();
  this.quantity=page.locator('//span[text()="Quantity"]//following::input[@value="200"]');
  this.unitmeasure=page.locator('//span[text()="Unit of Measure"]//following::span[text()="Per Seat"]').first();
  this.costperunit=page.locator('//*[text()="Cost Per Unit"]//following::input[@value="135"]');
  this.duration=page.locator('//span[text()="Duration"]//following::span[text()="Per Year"]').first();
  this.amount=page.locator('//*[text()="Amount"]//following::input[@value="27000.00000"]');


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

/*
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



// pageObjects/spendflowpage.js
async verifyProcuredBySpendflo(expectedValue) {
    // Dynamic locator using expected value from JSON
    const valueLocator = this.page.locator(`//*[text()="Procured by Spendflo"]//following::span[text()="${expectedValue}"]`);

    // Scroll into view
    await valueLocator.scrollIntoViewIfNeeded();

    // Wait until visible
    await expect(valueLocator).toBeVisible({ timeout: 15000 });

    // Get text content
    const actualValue = (await valueLocator.textContent()).trim();
    console.log('Procured by Spendflo value from UI:', actualValue);

    // Assert against expected value
    await expect(valueLocator).toHaveText(expectedValue);
}

async verifyPaymentTerm(expectedValue) {
    // Dynamic locator using expected value from JSON
    const valueLocator = this.page.locator(`//*[text()="Payment Terms"]//following::span[text()="${expectedValue}"]`);

    // Scroll into view safely
    await valueLocator.scrollIntoViewIfNeeded();

    // Wait until visible
    await expect(valueLocator).toBeVisible({ timeout: 15000 });

    // Get text content from UI
    const actualValue = (await valueLocator.textContent()).trim();
    console.log('Payment Terms value from UI:', actualValue);

    // Assert the actual value matches the expected value
    await expect(valueLocator).toHaveText(expectedValue);
}

async verifyBillingFrequency(expectedValue) {
    // Dynamic locator using expected value (e.g., Annual, Monthly)
    const valueLocator = this.page.locator(
        `//*[text()="Billing Frequency"]//following::span[text()="${expectedValue}"]`
    );

    // Scroll into view
    await valueLocator.scrollIntoViewIfNeeded();

    // Wait until visible
    await expect(valueLocator).toBeVisible({ timeout: 15000 });

    // Fetch UI text
    const actualValue = (await valueLocator.textContent()).trim();
    console.log('Billing Frequency value from UI:', actualValue);

    // Assertion
    await expect(valueLocator).toHaveText(expectedValue);
}


async verifyAutoRenewal(expectedValue) {
    // Dynamic locator using expected value (Yes / No)
    const valueLocator = this.page.locator(
        `//*[text()="Does this auto renew?"]//following::span[text()="${expectedValue}"]`
    );

    // Scroll into view
    await valueLocator.scrollIntoViewIfNeeded();

    // Wait until visible
    await expect(valueLocator).toBeVisible({ timeout: 15000 });

    // Get UI text
    const actualValue = (await valueLocator.textContent()).trim();
    console.log('Auto Renewal value from UI:', actualValue);

    // Assertion
    await expect(valueLocator).toHaveText(expectedValue);
}

async verifyLineItemType(expectedValue) {
    // Dynamic locator using expected value
    const valueLocator = this.page
        .locator(`//span[text()="Line Item Type"]//following::span[text()="${expectedValue}"]`)
        .first(); // or .nth(1) if required

    // Scroll into view
    await valueLocator.scrollIntoViewIfNeeded();

    // Wait until visible
    await expect(valueLocator).toBeVisible({ timeout: 15000 });

    // Get UI text
    const actualValue = (await valueLocator.textContent()).trim();
    console.log('Line Item Type value from UI:', actualValue);

    // Assertion
    await expect(valueLocator).toHaveText(expectedValue);
}


async verifyOfferingName(expectedValue) {
    // Dynamic locator using expected value (input value)
    const valueLocator = this.page
        .locator(`//span[text()="Offering Name"]//following::input[@value="${expectedValue}"]`)
        .first(); // equivalent to [1]

    // Scroll into view
    await valueLocator.scrollIntoViewIfNeeded();

    // Wait until visible
    await expect(valueLocator).toBeVisible({ timeout: 15000 });

    // Get value from input field
    const actualValue = await valueLocator.inputValue();
    console.log('Offering Name value from UI:', actualValue);

    // Assertion
    await expect(valueLocator).toHaveValue(expectedValue);
}


async verifyPlan(expectedValue) {
    // Scroll into view
    await this.planinput.scrollIntoViewIfNeeded();

    // Wait until visible
    await expect(this.planinput).toBeVisible({ timeout: 15000 });

    // Read input value
    const actualValue = await this.planinput.inputValue();
    console.log('Plan value from UI:', actualValue);

    // Assertion
    await expect(this.planinput).toHaveValue(expectedValue);
}
async verifyPricingModel(expectedValue) {
    // Scroll safely
    await this.pricingModelValue.scrollIntoViewIfNeeded();

    // Wait until visible
    await expect(this.pricingModelValue).toBeVisible({ timeout: 15000 });

    // Read text
    const actualValue = (await this.pricingModelValue.textContent()).trim();
    console.log('Pricing Model value from UI:', actualValue);

    // Assertion
    await expect(this.pricingModelValue).toHaveText(expectedValue);
}


async verifyStartDate(expectedValue) {
    // Scroll into view
    await this.startDateInput.scrollIntoViewIfNeeded();

    // Wait until visible
    await expect(this.startDateInput).toBeVisible({ timeout: 15000 });

    // Read value from input
    const actualValue = await this.startDateInput.inputValue();
    console.log('Start Date value from UI:', actualValue);

    // Assertion
    await expect(this.startDateInput).toHaveValue(expectedValue);
}

async verifyEndDate(expectedValue) {
    // Scroll into view
    await this.endDateInput.scrollIntoViewIfNeeded();

    // Wait until visible
    await expect(this.endDateInput).toBeVisible({ timeout: 15000 });

    // Read value from input field
    const actualValue = await this.endDateInput.inputValue();
    console.log('End Date value from UI:', actualValue);

    // Assertion
    await expect(this.endDateInput).toHaveValue(expectedValue);
}


async verifyQuantity(expectedValue) {
    // Scroll into view
    await this.quantityInput.scrollIntoViewIfNeeded();

    // Wait until visible
    await expect(this.quantityInput).toBeVisible({ timeout: 15000 });

    // Read value from input
    const actualValue = await this.quantityInput.inputValue();
    console.log('Quantity value from UI:', actualValue);

    // Assertion
    await expect(this.quantityInput).toHaveValue(expectedValue);
}
async verifyUnitOfMeasure(expectedValue) {
    // Scroll into view
    await this.unitOfMeasure.scrollIntoViewIfNeeded();

    // Wait until visible
    await expect(this.unitOfMeasure).toBeVisible({ timeout: 15000 });

    // Get UI text
    const actualValue = (await this.unitOfMeasure.textContent()).trim();
    console.log('Unit of Measure value from UI:', actualValue);

    // Assertion
    await expect(this.unitOfMeasure).toHaveText(expectedValue);
}

async verifyCostPerUnit(expectedValue) {
    // Scroll into view
    await this.costperunit.scrollIntoViewIfNeeded();

    // Wait until visible
    await expect(this.costperunit).toBeVisible({ timeout: 15000 });

    // Read value from input
    const actualValue = await this.costperunit.inputValue();
    console.log('Cost Per Unit value from UI:', actualValue);

    // Assertion
    await expect(this.costperunit).toHaveValue(expectedValue);
}

async verifyDuration(expectedValue) {
    // Scroll into view
    await this.durationValue.scrollIntoViewIfNeeded();

    // Wait until visible
    await expect(this.durationValue).toBeVisible({ timeout: 15000 });

    // Get UI text
    const actualValue = (await this.durationValue.textContent()).trim();
    console.log('Duration value from UI:', actualValue);

    // Assertion
    await expect(this.durationValue).toHaveText(expectedValue);
}

async verifyAmount(expectedValue) {
    // Scroll into view
    await this.amountInput.scrollIntoViewIfNeeded();

    // Wait until visible
    await expect(this.amountInput).toBeVisible({ timeout: 15000 });

    // Read value from input
    const actualValue = await this.amountInput.inputValue();
    console.log('Amount value from UI:', actualValue);

    // Assertion
    await expect(this.amountInput).toHaveValue(expectedValue);
}


}




  

