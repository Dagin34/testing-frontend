import { it } from "mocha";
import { data } from "react-router-dom";
import { Builder, Browser, By, until } from "selenium-webdriver";
import assert from "assert";

let loginTestCases = [
  {
    testname: "Correct Login",
    expectation: "login",
    error_message: null,
    data: {
      email: "bereket@gmail.com",
      password: "b123456789",
    },
  },
  {
    testname: "Handled Incorrect Email",
    expectation: "error message",
    error_message: "Invalid credentials",
    data: {
      email: "bereket123@gmail.com",
      password: "b123456789",
    },
  },
  {
    testname: "Handled Incorrect Password",
    expectation: "error message",
    error_message: "Invalid credentials",
    data: {
      email: "kanekashay@gmail.com",
      password: "b12323345564",
    },
  },
  {
    testname: "Handled Incorrect Password and Email",
    expectation: "error message",
    error_message: "Invalid credentials",
    data: {
      email: "bereket123@gmail.com",
      password: "b1299859438",
    },
  },
  {
    testname: "Handled Missing Password",
    expectation: "error message",
    error_message: "required",
    data: {
      email: "bereket123@gmail.com",
      password: "",
    },
  },
  {
    testname: "Handled Missing Email",
    expectation: "error message",
    error_message: "required",
    data: {
      email: "",
      password: "b123456789",
    },
  },
  {
    testname: "Handled Short Password",
    expectation: "error message",
    error_message: "Password must be at least 6 characters long",
    data: {
      email: "bereket@gmail.com",
      password: "123",
    },
  },
];

const signUpTestCases = [
  {
    testname: "Missing Password",
    expectation: "error message",
    error_message: "required",
    data: {
      fullname: "bereket",
      email: "bereket@gmail.com",
      password: "",
    },
  },
  {
    testname: "Missing Email",
    expectation: "error message",
    error_message: "required",
    data: {
      fullname: "bereket",
      email: "",
      password: "b123456789",
    },
  },
  {
    testname: "Missing Full Name",
    expectation: "error message",
    error_message: "required",
    data: {
      fullname: "",
      email: "bereket@gmail.com",
      password: "b123456789",
    },
  },
  {
    testname: "Missing All Fields",
    expectation: "error message",
    error_message: "required",
    data: {
      fullname: "",
      email: "",
      password: "",
    },
  },
  {
    testname: "Missing Full Name and Password",
    expectation: "error message",
    error_message: "required",
    data: {
      fullname: "",
      email: "bereket@gmail.com",
      password: "",
    },
  },
  {
    testname: "Missing Full Name and Email",
    expectation: "error message",
    error_message: "required",
    data: {
      fullname: "",
      email: "",
      password: "b123456789",
    },
  },
  {
    testname: "Short Password",
    expectation: "error message",
    error_message: "Password must be at least 6 characters long",
    data: {
      fullname: "bereket",
      email: "bereket@gmail.com",
      password: "b1234",
    },
  },
  {
    testname: "Correct Sign Up",
    expectation: "sign in",
    error_message: "",
    data: {
      fullname: "bereket51",
      email: "bereket51@gmail.com",
      password: "b123456789",
    },
  },
  {
    testname: "Using Already Registered Email",
    expectation: "error message",
    error_message: "Email already exists",
    data: {
      fullname: "bereket4",
      email: "bereket4@gmail.com",
      password: "b1234567890",
    },
  },
  {
    testname: "Using Already Registered Name",
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
describe("Login Tests", () => {
  before(async () => {
    // Opens browser before any test begins
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });
  loginTestCases.forEach(({ testname, data, expectation, error_message }) => {
    it(testname, async () => {
      // Navigate to login page
      await driver.get("http://localhost:5173/login");

      // Find entries in the UI
      const email = driver.findElement(By.name("email"));
      const password = driver.findElement(By.name("password"));
      const send_btn = driver.findElement(By.id("submit-button"));

      // Insert data into the respective fields
      email && (await email.sendKeys(data.email));
      password && (await password.sendKeys(data.password));

      // Login
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
  it("Verifies That The Logged In Account Matches The User's Account", async () => {
    // Navigate to login
    await driver.get("http://localhost:5173/login");

    // Login
    const useremail = "bereket@gmail.com";
    const userpassword = "b123456789";
    const email = driver.findElement(By.name("email"));
    const password = driver.findElement(By.name("password"));
    const send_btn = driver.findElement(By.id("submit-button"));

    email && (await email.sendKeys(useremail));
    password && (await password.sendKeys(userpassword));

    await send_btn.click();

    // Navigate to profile
    const profile_link = await driver.wait(
      until.elementLocated(By.name("profile")),
      1000
    );

    await profile_link.click();

    // Validate that the email used for login matches the profile email
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

describe("Sign Up Tests", async () => {
  signUpTestCases.forEach(({ testname, data, expectation, error_message }) => {
    it(testname, async () => {
      // Navigate to sign up page
      await driver.get("http://localhost:5173/signup");

      // Find entries in the UI
      const fullname = driver.findElement(By.name("fullName"));
      const email = driver.findElement(By.name("email"));
      const password = driver.findElement(By.name("password"));
      const send_btn = driver.findElement(By.id("submit-button"));

      // Insert data into the respective fields
      fullname && (await fullname.sendKeys(data.fullname));
      email && (await email.sendKeys(data.email));
      password && (await password.sendKeys(data.password));

      // Sign up
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
  it("Verifies That The Signed Up Account Matches The User's Account", async () => {
    // Navigate to sign up page
    await driver.get("http://localhost:5173/signup");

    // Login via sign up flow
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
    const userFullName = "bereket136";
    const userEmail = "bereket136@gmail.com";
    fullname && (await fullname.sendKeys(userFullName));
    email && (await email.sendKeys(userEmail));
    password && (await password.sendKeys("bb123456789"));

    // Sign up
    await send_btn.click();

    // Navigate to profile
    const profile_link = await driver.wait(
      until.elementLocated(By.name("profile")),
      1000
    );

    await profile_link.click();

    // Validate that the email used for sign up matches the profile email
    const profile_email = driver.wait(
      until.elementLocated(By.name("email")),
      1000
    );

    assert.strictEqual(userEmail, await profile_email.getText());
  });

  after(() => {
    // Close the browser after all tests are run
    driver.quit();
  });
});
