import { it } from "mocha";
import { data } from "react-router-dom";
import { Builder, Browser, By, until } from "selenium-webdriver";
import assert from "assert";

let login_test_cases = [
  {
    testname: "correct loggin",
    expectation: "login",
    error_message: null,
    data: {
      email: "bereket@gmail.com",
      password: "b123456789",
    },
  },
  {
    testname: "handeled incorrect email",
    expectation: "error message",
    error_message: "Invalid credentials",
    data: {
      email: "bereket123@gmail.com",
      password: "b123456789",
    },
  },
  {
    testname: "handeled incorrect password",
    expectation: "error message",
    error_message: "Invalid credentials",
    data: {
      email: "kanekashay@gmail.com",
      password: "b12323345564",
    },
  },
  {
    testname: "handeled incorrect password and email",
    expectation: "error message",
    error_message: "Invalid credentials",
    data: {
      email: "bereket123@gmail.com",
      password: "b1299859438",
    },
  },
  {
    testname: "handeled missing password",
    expectation: "error message",
    error_message: "required",
    data: {
      email: "bereket123@gmail.com",
      password: "",
    },
  },
  {
    testname: "handeled missing email",
    expectation: "error message",
    error_message: "required",
    data: {
      email: "",
      password: "b123456789",
    },
  },
  {
    testname: "short password",
    expectation: "error message",
    error_message: "Password must be at least 6 characters long",
    data: {
      email: "bereket@gmail.com",
      password: "123",
    },
  },
];

const signin_testcase = [
  {
    testname: "missing password",
    expectation: "error message",
    error_message: "required",
    data: {
      fullname: "bereket",
      email: "bereket@gmail.com",
      password: "",
    },
  },
  {
    testname: "missing email",
    expectation: "error message",
    error_message: "required",
    data: {
      fullname: "bereket",
      email: "",
      password: "b123456789",
    },
  },
  {
    testname: "missing fullname",
    expectation: "error message",
    error_message: "required",
    data: {
      fullname: "",
      email: "bereket@gmail.com",
      password: "b123456789",
    },
  },
  {
    testname: "missing everything",
    expectation: "error message",
    error_message: "required",
    data: {
      fullname: "",
      email: "",
      password: "",
    },
  },
  {
    testname: "missing fullname and password",
    expectation: "error message",
    error_message: "required",
    data: {
      fullname: "",
      email: "bereket@gmail.com",
      password: "",
    },
  },
  {
    testname: "missing fullname and email",
    expectation: "error message",
    error_message: "required",
    data: {
      fullname: "",
      email: "",
      password: "b123456789",
    },
  },
  {
    testname: "short password",
    expectation: "error message",
    error_message: "Password must be at least 6 characters long",
    data: {
      fullname: "bereket",
      email: "bereket@gmail.com",
      password: "b1234",
    },
  },
  {
    testname: "correct sign in",
    expectation: "sign in",
    error_message: "",
    data: {
      fullname: "bereket51",
      email: "bereket51@gmail.com",
      password: "b123456789",
    },
  },
  {
    testname: "using already regestered email",
    expectation: "error message",
    error_message: "Email already exists",
    data: {
      fullname: "bereket4",
      email: "bereket4@gmail.com",
      password: "b1234567890",
    },
  },
  {
    testname: "using already regestered name",
    expectation: "error message",
    error_message: "user's name already exists",
    data: {
      fullname: "bereket4",
      email: "bereket2@gmail.com",
      password: "b123456789",
    },
  },
];

let driver;
describe("this are login tests", () => {
  before(async () => {
    //opens browser before any test begins
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  })
  login_test_cases.forEach(({ testname, data, expectation, error_message }) => {
    it(testname, async () => {
      //navigate to login page
      await driver.get("http://localhost:5173/login");

      //find enteries in the ui
      const email = driver.findElement(By.name("email"));
      const password = driver.findElement(By.name("password"));
      const send_btn = driver.findElement(By.id("submit-button"));

      //insert data to the respective enteries if available
      email && (await email.sendKeys(data.email));
      password && (await password.sendKeys(data.password));

      //login
      await send_btn.click();

      if (expectation === "login") {
        const heading = await driver.wait(
          until.elementLocated(By.name("heading")),
          1000
        );

        assert.ok(heading);
        const logout_btn = await driver.wait(
          until.elementLocated(By.name("logout")),
          1000
        );
        await logout_btn.click();
      } else if (expectation === "error message") {
        const error = await driver.wait(
          until.elementLocated(
            By.xpath(`//div[contains(text(),'${error_message}')]`)
          ),
          1000
        );

        assert.ok(error);
      }
    });
  });
  it("checks whethere the account the user logged in to is the users account", async () => {
    //navigate to login
    await driver.get("http://localhost:5173/login");

    //loggin
    const useremail = "bereket@gmail.com"
    const userpassword = "b123456789"
    //find enteries in the ui
    const email = driver.findElement(By.name("email"));
    const password = driver.findElement(By.name("password"));
    const send_btn = driver.findElement(By.id("submit-button"));

    //insert data to the respective enteries if available
    email && (await email.sendKeys(useremail));
    password && (await password.sendKeys(userpassword));

    //login

    await send_btn.click();

    //navigate to profile
    const profile_link = await driver.wait(
      until.elementLocated(By.name("profile")),
      1000
    );

    await profile_link.click();
    //validate that the email the user used to login is the same as the email in the profile

    const profile_email = driver.wait(
      until.elementLocated(By.name("email")),
      1000
    );

    assert.strictEqual(useremail, await profile_email.getText());

    const logout_btn = await driver.wait(
      until.elementLocated(By.name("logout")),
      1000
    );
    await logout_btn.click();
  });
});

describe("this are tests for sign in", async () => {
  signin_testcase.forEach(({ testname, data, expectation, error_message }) => {
    it(testname, async () => {
      //navigate to signin page
      await driver.get("http://localhost:5173/signup");

      //find enteries in the ui
      const fullname = driver.findElement(By.name("fullName"));
      const email = driver.findElement(By.name("email"));
      const password = driver.findElement(By.name("password"));
      const send_btn = driver.findElement(By.id("submit-button"));

      //insert data to the respective enteries if available
      fullname && (await fullname.sendKeys(data.fullname));
      email && (await email.sendKeys(data.email));
      password && (await password.sendKeys(data.password));

      //sign in
      send_btn.click();

      if (expectation === "sign in") {
        const heading = await driver.wait(
          until.elementLocated(By.name("heading")),
          2000
        );

        assert.ok(heading);
        const logout_btn = await driver.wait(
          until.elementLocated(By.name("logout")),
          1000
        );
        await logout_btn.click();
      } else if (expectation === "error message") {
        const error = await driver.wait(
          until.elementLocated(
            By.xpath(`//div[contains(text(),'${error_message}')]`)
          ),
          1000
        );

        assert.ok(error);
      }
    });
  });
  it("checks whethere the account the user signed in into is the users account", async () => {
    //navigate to login
    await driver.get("http://localhost:5173/signup");

    //loggin

    //find enteries in the ui
    const fullname = driver.wait(
      until.elementLocated(By.name("fullName")),
      1000
    );
    const email = driver.wait(until.elementLocated(By.name("email")), 1000);
    const password = driver.wait(
      until.elementLocated(By.name("password")),
      1000
    );
    const send_btn = driver.wait(
      until.elementLocated(By.id("submit-button")),
      1000
    );
    const userfull_name = "bereket136"
    const useremail = "bereket136@gmail.com"
    //insert data to the respective enteries if available
    fullname && (await fullname.sendKeys(userfull_name));

    email && (await email.sendKeys(useremail));
    password && (await password.sendKeys("bb123456789"));

    //login

    await send_btn.click();

    //navigate to profile
    const profile_link = await driver.wait(
      until.elementLocated(By.name("profile")),
      1000
    );

    await profile_link.click();
    //validate that the email the user used to login is the same as the email in the profile

    const profile_email = driver.wait(
      until.elementLocated(By.name("email")),
      1000
    );

    assert.strictEqual(useremail, await profile_email.getText());



  });

  after(() => {
    //closes browser after all tests are run
    driver.quit();
  })


});
