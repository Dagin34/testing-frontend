import { Builder, Browser, By } from "selenium-webdriver";

export const firstTest = async () => {
  let driver;

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get('http://localhost:5173/login');

    let title = await driver.getTitle();

    await driver.manage().setTimeouts({ implicit: 500 });

    let textBox = await driver.findElement(By.name('email'));
    let textBox2 = await driver.findElement(By.name('password'));
    let submitButton = await driver.findElement(By.id('submit-button'));

    await textBox.sendKeys('johndoe@example.com');
    await textBox2.sendKeys('123456');
    await submitButton.click();

    let message = await driver.findElement(By.id('message'));
    let value = await message.getText();
    console.log(value)
  } catch (error) {
    console.error(error);
  } finally {
    if (driver) {
      await driver.quit(); // Close the browser after the test, regardless of the outcome
    }
  }
};