class PracticeFormPage {
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.mobileInput = page.locator('#userNumber');
    this.subjectInput = page.locator('#subjectsInput');
    this.addressInput = page.locator('#currentAddress');

    this.uploadPictureInput = page.locator('#uploadPicture');

    this.stateDropdown = page.locator('#state');
    this.cityDropdown = page.locator('#city');

    this.submitButton = page.locator('#submit');
    this.modalTitle = page.locator('#example-modal-sizes-title-lg');
  }

  // NAVIGATION
  async navigate() {
    await this.page.goto('https://demoqa.com/automation-practice-form');
  }

  //  Add remove
  async removeAds() {
    await this.page.evaluate(() => {
      const ad = document.querySelector('#fixedban');
      if (ad) ad.remove();
    });
  }

  //  gender
  async selectGender(gender) {
    await this.page.locator(`label[for="gender-radio-${gender}"]`).click();
  }

  //  Subject
  async enterSubjects(subjects) {
    for (const subject of subjects) {
      await this.subjectInput.click();
      await this.subjectInput.fill(subject);
      await this.page.waitForTimeout(400);
      await this.page.keyboard.press('Enter');
    }

    // dropdown
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(500);
  }

  // Hobbies
  async selectHobbies(hobbyNumbers) {
    await this.removeAds();

    for (const hobby of hobbyNumbers) {
      const label = this.page.locator(
        `label[for="hobbies-checkbox-${hobby}"]`
      );

      await label.scrollIntoViewIfNeeded();

      //  REAL DOM CLICK (BYPASSES ALL BLOCKERS)
      await this.page.evaluate(el => el.click(), await label.elementHandle());
    }
  }

  async selectState(state) {
    await this.stateDropdown.click();
    await this.page.getByText(state, { exact: true }).click();
  }

  async selectCity(city) {
    await this.cityDropdown.click();
    await this.page.getByText(city, { exact: true }).click();
  }

  async uploadPicture(filePath) {
    await this.uploadPictureInput.setInputFiles(filePath);
  }

  async submitForm() {
    await this.page.evaluate(() => {
      document.querySelector('#submit').click();
    });
  }

//j son
  async fillForm(data) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);

    await this.selectGender(data.gender);
    await this.mobileInput.fill(data.mobile);

    if (data.subjects) await this.enterSubjects(data.subjects);
    if (data.hobbies) await this.selectHobbies(data.hobbies);
    if (data.picturePath) await this.uploadPicture(data.picturePath);

    await this.addressInput.fill(data.address);
    await this.selectState(data.state);
    await this.selectCity(data.city);
  }

  async getSubmissionMessage() {
    await this.modalTitle.waitFor({ timeout: 15000 });
    return await this.modalTitle.textContent();
  }
}

module.exports = { PracticeFormPage };
