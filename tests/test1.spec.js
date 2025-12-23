const { test, expect } = require('@playwright/test');
const { PracticeFormPage } = require('../pageObjects/login1');

const formData = require('../testdatas/test1.json');

test('Practice Form Automation using JSON (POM)', async ({ page }) => {
  const formPage = new PracticeFormPage(page);

  await formPage.navigate();
  await formPage.fillForm(formData);
  await formPage.submitForm();

  const message = await formPage.getSubmissionMessage();
  await expect(message).toContain('Thanks for submitting the form');
});
