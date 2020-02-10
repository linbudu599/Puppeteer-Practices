const puppeteer = require("puppeteer");
require("dotenv").config();

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  let page = await browser.newPage();

  console.log("Going to Index Page");

  await page.goto("http://erya.mooc.chaoxing.com/");

  const loginBtn = await page.waitForSelector("a.login");

  console.log("Login Button Rendered");

  await loginBtn.click();

  console.log("Going to Login Page");

  await page.waitForSelector("div.g_left_form");

  console.log(`Current Login Page Url: ${page.url()}`);

  await page.focus("input.g_tel");

  await page.keyboard.type("17689609062");

  console.log("Tel number input accomplished");

  await page.focus("input.g_check");

  await page.keyboard.type(process.env.PWD);

  console.log("Password input accomplished");

  await page.click("div.g_submit");

  await page.waitFor(1000);

  await page.goto("http://i.mooc.chaoxing.com");

  console.log("Going to main page now");
  
})();

