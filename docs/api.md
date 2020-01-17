# 常用API/功能/技巧 整理

## api

> 只列出功能，具体调用方式见官方文档

### puppeteer

- puppeteer.launch([options])，启动 Chromium，创建一个 [Browser](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v2.0.0&show=api-class-browser) 类的实例

### browser

- [browser.close()](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v2.0.0&show=api-browserclose)，关闭所有页面
- [browser.createIncognitoBrowserContext()](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v2.0.0&show=api-browsercreateincognitobrowsercontext)，创建一个匿名浏览器上下文
- [browser.disconnect()](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v2.0.0&show=api-browserdisconnect)，断开 Puppeteer 和浏览器的连接，但 Chromium 进程仍然在运行。在调用 `disconnect` 之后，[Browser](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v2.0.0&show=api-class-browser) 对象本身被认为是处理过的并不能再被使用。
- [browser.newPage()](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v2.0.0&show=api-browsernewpage)，返回一个新的 [Page](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v2.0.0&show=api-class-page) 对象。[Page](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v2.0.0&show=api-class-page) 在一个默认的浏览器上下文中被创建。
- [browser.pages()](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v2.0.0&show=api-browserpages)，返回一个浏览器中所有页面的数组。 在多个浏览器上下文的情况下， 该方法将返回一个包含所有浏览器上下文中所有页面的数组。
- [browser.userAgent()](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v2.0.0&show=api-browseruseragent)，返回浏览器原始的 user-agent
- [browser.wsEndpoint()](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v2.0.0&show=api-browserwsendpoint)，返回浏览器 websocket 的地址

### page

> 太常用了太多了，见官方文档

#### waitFor

- `page.waitFor(selectorOrFunctionOrTimeout[, options[, …args]])`, ·下面三个的综合 API
- `page.waitForFunction(pageFunction[, options[, …args]])`， 等待 pageFunction 执行完成之后
- `page.waitForNavigation(options)`， 等待页面基本元素加载完之后，比如同步的 HTML, CSS, JS 等代码
- `page.waitForSelector(selector[, options]) `，等待某个选择器的元素加载之后，这个元素可以是异步加载的

### getMetrics

通过 page.getMetrics() 可以得到一些页面性能数据， 捕获网站的时间线跟踪，以帮助诊断性能问题。

- `Timestamp` 度量标准采样的时间戳
- `Documents` 页面文档数
- Frames 页面 frame 数
- JSEventListeners 页面内事件监听器数
- Nodes 页面 DOM 节点数
- LayoutCount 页面布局总数
- RecalcStyleCount 样式重算数
- LayoutDuration 所有页面布局的合并持续时间
- RecalcStyleDuration 所有页面样式重新计算的组合持续时间。
- ScriptDuration 所有脚本执行的持续时间
- TaskDuration 所有浏览器任务时长
- JSHeapUsedSize JavaScript 占用堆大小
- JSHeapTotalSize JavaScript 堆总量

## 功能/技巧

- 伪装用户设备信息
  
>通过page.emulate(options)来进行模拟。options有两个配置项，userAgent，viewport(可以设置宽度(width)、高度(height)、屏幕缩放(deviceScaleFactor)、是否是移动端(isMobile)、有无touch事件(hasTouch))。

  ```javascript
  const puppeteer = require('puppeteer');
  const devices = require('puppeteer/DeviceDescriptors');
  const iPhone = devices['iPhone 6'];
  
  puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.emulate(iPhone);
    await page.goto('https://www.example.com');
    // other actions...
    await browser.close();
  });
  ```

- 对于需要登陆的网站

  1. 让puppeteer去输入账号密码
      常用方法：点击可以使用 `page.click(selector[, options])` 方法，也可以选择聚焦 `page.focus(selector)`。
      输入可以使用 `page.type(selector, text[, options])` 输入指定的字符串，还可以在 `options` 中设置 `delay` 缓慢输入更像真人一些。也可以使用`keyboard.down(key[, options])` 来一个字符一个字符的输入。
  2. 如果是通过cookie判断登录状态的可以通过 `page.setCookie(...cookies)`，想要维持cookie可以定时访问。

  ##### Tip：有些网站需要扫码，但是相同域名的其他网页却有登录，就可以尝试去可以登录的网页登录完利用cookie访问跳过扫码。