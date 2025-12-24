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
    await page.waitForLoadState('networkidle');
    await spendflowPage.verifyAgreementDetailsText(credentials.agreementDetailsText);
    await spendflowPage.verifyAgreementStartDate(credentials.agreementstartdate);
    await spendflowPage.verifyAgreementEndDate(credentials.agreementenddate);
   //await spendflowPage.verifyContractedValue(credentials.contractedValue);
   await spendflowPage.verifyAgreementDuration(credentials.agreementDuration);
   //await spendflowPage.verifyProcuredBySpendflo(credentials.procuredBySpendflo);

});
