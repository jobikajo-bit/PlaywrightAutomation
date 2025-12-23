export class keyword{
    async AllureScreenshot(stepName) {
    const screenshot = await browser.takeScreenshot();
    allureReporter.addAttachment(
      stepName,
      Buffer.from(screenshot, "base64"),
      "image/png"
    );
  }
  
 

}