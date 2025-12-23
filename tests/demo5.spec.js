import { test, expect } from '@playwright/test';
test('test_1', async ({ page }) => {

    await page.goto('https://demoqa.com/automation-practice-form');
    await page.fill('input[id="firstName"]',"Jobi");
    await page.fill('input[id="lastName"]',"jo");
    await page.fill('input[id="userEmail"]',"jobika+12mailinator.com");
    await page.check('label[for="gender-radio-2"]');
    await page.fill('input[id="userNumber"]',"7766554433");
   // await page.('input[@id="dateOfBirthInput"])[1]').click();
    //await page.locator('input[@id="dateOfBirthInput"]').click();
    //await page.locator('select[@class="react-datepicker__month-select"]');
 //await page.fill('div[class="subjects-auto-complete__value-container subjects-auto-complete__value-container--is-multi css-1hwfws3"])[1]',"Maths");
   //await page.fill('input[id="subjectsInput"]',"Maths")
 //await page.selectOption('div[text()="Maths"]');
   

//await page.fill('input[id="subjectsInput"]',"Maths");
    await page.check('label[for="hobbies-checkbox-3"]');
    const filePath = "C:\Users\TD\Desktop\test images";
    await page.locator('input[id="uploadPicture"]').setInputFiles("C:/Users/TD/Desktop/test images/t1.jpeg");


    await page.fill('textarea[id="currentAddress"]',"84 ss street");
    await page.locator('div[contains(class,"css-1hwfws3")])[2]');
    await expect (page.locator('button[id="submit"]')).toBeEnabled();
    await page.locator('#state').click();
    await page.getByText('NCR', { exact: true }).click();

    await page.locator('#city').click();
    await page.getByText('Delhi', { exact: true }).click();
    await page.click('button[id="submit"]');
    
;






})



