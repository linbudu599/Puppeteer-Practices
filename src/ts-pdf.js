const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const rm = require("rimraf");
// const removeSpItems = require("../helper/removeSpItems");

function resolve(dir, dir2 = "") {
  return path.posix.join(__dirname, "./", dir, dir2);
}

(async () => {
  const browser = await puppeteer.launch({});
  let page = await browser.newPage();

  console.log("Starting Load Cover Page...");

  await page.goto("https://ts.xcatliu.com/");
  await page.waitFor(2000);

  // 简单配置
  const config = {
    // 输出路径
    outputPath: "../output/ts",
    // 生成pdf时的页边距
    margin: {
      top: "60px",
      right: "0px",
      bottom: "60px",
      left: "0px"
    },
    // 生成pdf时是否显示页眉页脚
    displayHeaderFooter: true,
    // 生成pdf页面格式
    format: "A4"
  };

  let wh = await page.evaluate(() => {
    const content = document.querySelector(
      "#__GITBOOK__ROOT__CLIENT__ .reset-3c756112--wholeContentPage-6c3f1fc5"
    );
    const div = document.createElement("div");
    div.innerHTML = `
			<p>Test!</p>
		`;
    content.appendChild(div);
    return {
      width: 1920,
      height: document.body.clientHeight
    };
  });

  await page.setViewport(wh);

  await page.waitFor(2000);

  const outputPath = resolve(config.outputPath);

  const isExists = fs.existsSync(outputPath);

  console.log("isExists: ", isExists, "outputPath: ", outputPath);

  function mkdirOutputpath() {
    try {
      fs.mkdirSync(outputPath);
      console.log("mkdir is successful!");
    } catch (e) {
      console.log("mkdir is failed!", e);
    }
  }
  // 如果不存在 则创建
  if (!isExists) {
    mkdirOutputpath();
  } else {
    // 存在，则删除该目录下的文件再重新生成目录
    rm(outputPath, err => {
      if (err) throw err;
      console.log("remove the files is successful!");
      mkdirOutputpath();
    });
  }

  console.log("outputPath", outputPath);

  console.log("Creating the Cover");

  await page.pdf({
    // 注意文件名需要带上 ".pdf" 后缀
    path: resolve(config.outputPath, "TypeScript 入门教程.pdf"),
    margin: config.margin,
    displayHeaderFooter: config.displayHeaderFooter,
    format: config.format
  });

  console.log("created pdf for fisrt page is successful!");

  console.log("Starting Generate Content Page...");

  await page.waitFor(2000);

  // FIXME: 引用问题
  // await page.exposeFunction("removeSpItems", (arr, idxArr) =>
  //   removeSpItems(arr, idxArr)
  // );

  let aLinkArr = await page.evaluate(() => {
    const linkUl = document.querySelectorAll("ul.list-20526648")[4];
    let aLinks = [
      ...linkUl.querySelectorAll(
        "a.link-a079aa82--primary-53a25e66--link-faf6c434"
      )
    ];

    function removeSpItems(arr, idxArr = []) {
      const len = idxArr.length;

      if (!Array.isArray(idxArr) || len === 0) {
        throw new Error("IdxArr Must Be An Array With At Least A Member!");
      }
      if (len === 1) {
        arr.splice(idxArr[0], 1);
        return arr;
      } else {
        let newIdx = idxArr.map((val, idx) => {
          return val - idx;
        });

        newIdx.forEach(idx => {
          arr.splice(idx, 1);
        });
        return arr;
      }
    }
    // window.removeSpItems(aLinks, [0, 1, 5, 16, 26]);
    removeSpItems(aLinks, [0, 1, 5, 16, 26]);

    return aLinks.map(a => {
      // 处理方法相同
      return {
        href: a.href.trim(),
        text: a.innerText.trim()
      };
    });
  });

  console.log("章节数: ", aLinkArr.length);
  for (let i = 1; i < aLinkArr.length; i++) {
    let a = aLinkArr[i];

    await page.goto(a.href);

    await page.waitFor(2000);

    console.log("go to ", a.href);

    let wh = await page.evaluate(a => {
      // 给标题加上序号，便于查看
      let h1Node = document.querySelector(".post__title h1");
      if (h1Node) {
        h1Node.innerText = a.text;
      }
      // 设置title 加上序号 页眉使用。
      document.title = `${a.text} | TypeScript 入门教程`;

      return {
        width: 1920,
        height: document.body.clientHeight
      };
    }, a);

    await page.setViewport(wh);

    await page.waitFor(2000);

    console.log(`Now, Creating the ${a.text}.pdf`);

    await page.pdf({
      path: resolve(config.outputPath, `${a.text}.pdf`),
      margin: config.margin,
      displayHeaderFooter: config.displayHeaderFooter,
      format: config.format
    });
  }

  console.log("all is successful!");

  browser.close();
})();
