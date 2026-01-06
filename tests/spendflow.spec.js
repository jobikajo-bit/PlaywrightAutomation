import { test } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginpage';
import { SpendflowPage } from '../pageObjects/spendflowpage';
import credentials from '../testdatas/credentials.json';

test('Spendflow test flow - POM', async ({ page }) => {
    test.setTimeout(90000);

    const loginPage = new LoginPage(page);
    const spendflowPage = new SpendflowPage(page);

    await page.goto(credentials.url, { waitUntil: 'domcontentloaded' });

    // Login using credentials from JSON
    await loginPage.gotoLogin();
    await loginPage.login(credentials.email, credentials.password);

    // Navigate and add agreement
    await spendflowPage.navigateToAgreements();
    await spendflowPage.addAgreement('C:/Users/TD/Downloads/aggrement/Order_Agreement.pdf');
    await spendflowPage.verifyVendorName(credentials.vendorName);
    await spendflowPage.clickSaveAndContinue();
<<<<<<< HEAD
   // await page.waitForLoadState('networkidle');
=======
    await page.waitForLoadState('networkidle');
>>>>>>> ffe6a29c25fbf473f0df36e19a2cb716326a4352
    await spendflowPage.verifyAgreementDetailsText(credentials.agreementDetailsText);
    await spendflowPage.verifyAgreementStartDate(credentials.agreementstartdate);
    await spendflowPage.verifyAgreementEndDate(credentials.agreementenddate);
   //await spendflowPage.verifyContractedValue(credentials.contractedValue);
   await spendflowPage.verifyAgreementDuration(credentials.agreementDuration);
<<<<<<< HEAD
  await spendflowPage.verifyProcuredBySpendflo(credentials.procuredBySpendflo );
   await spendflowPage.verifyPaymentTerm(credentials.paymentTerms);
   await spendflowPage.verifyBillingFrequency(credentials.billingFrequency);
   await spendflowPage.verifyAutoRenewal(credentials.autorenewal);
   await spendflowPage.verifyLineItemType(credentials.lineitemtype);
   await spendflowPage.verifyOfferingName(credentials.offeringName);
   await spendflowPage.verifyPlan(credentials.planinput);
   await spendflowPage.verifyPricingModel(credentials.pricingmodel);
   await spendflowPage.verifyStartDate(credentials.startDate);
   await spendflowPage.verifyEndDate(credentials.endDate);
   await spendflowPage.verifyQuantity(credentials.quantity);
   await spendflowPage.verifyUnitOfMeasure(credentials.unitofmeasure);
   await spendflowPage.verifyCostPerUnit(credentials.costperunit);
   await spendflowPage.verifyDuration(credentials.duration);
  await spendflowPage.verifyAmount(credentials.amount);
  


=======
   //await spendflowPage.verifyProcuredBySpendflo(credentials.procuredBySpendflo);
>>>>>>> ffe6a29c25fbf473f0df36e19a2cb716326a4352

});
