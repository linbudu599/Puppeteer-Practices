import puppeteer from "puppeteer";
import chalk from "chalk";
import path from "path";
import config from "./config";

console.log(config);

const log = (message: string, color?: string): void => {
  let printColor = color || "green";
  // @ts-ignore
  console.log(chalk[printColor](message));
};

const {
  todayURL,
  trackForenoon,
  trackAfternoon,
  trackNight,
  name,
  class: class_info,
  remark,
} = config;

(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
  });

  const page = await browser.newPage();

  log("Open New Page Successfully");

  await page.goto(todayURL);

  log(`Open ${todayURL} Successfully`);

  await page.waitFor(2000);

  // const dateInput = await page.waitForSelector("textarea#q1");

  // await dateInput.click();

  const todayVal = new Date()
    .toLocaleString()
    .slice(0, 10)
    .trim()
    // 淦突然忘记这个正则怎么写了
    .replace("/", "-")
    .replace("/", "-");

  // await page.evaluate(() => {
  //   console.log(1111);
  //   const area = document.querySelector("#q1")!;

  //   area?.setAttribute("readonly", "false");
  //   area?.removeAttribute("readonly");

  //   area?.setAttribute("value", "111");
  // });

  // @ts-ignore
  // dateInput.value = todayVal;

  // 得先移除readonly

  dateInput.type(todayVal);

  await page.waitFor(1000);

  const nameInput = await page.waitFor("#q2");
  await page.focus("#q2");
  await page.keyboard.type(name);

  const classInput = await page.waitFor("#q3");
  await page.focus("#q3");
  await page.keyboard.type(class_info);

  const traceForeNoonInput = await page.waitFor("#q4");
  await page.focus("#q4");
  await page.keyboard.type(trackForenoon);

  const traceAfterNoonInput = await page.waitFor("#q5");
  await page.focus("#q5");
  await page.keyboard.type(trackAfternoon);

  const traceNightInput = await page.waitFor("#q6");
  await page.focus("#q6");
  await page.keyboard.type(trackNight);
})();
