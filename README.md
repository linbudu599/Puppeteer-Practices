# Puppeteer-Pratice

## 简介

Puppeteer 是一个 node 库，他提供了一组用来操纵 Chrome 的 API, 通俗来说就是一个 headless chrome 浏览器 (当然你也可以配置成有 UI 的，默认是没有的)。
既然是浏览器，那么我们手工可以在浏览器上做的事情 Puppeteer 都能胜任:

- 生成网页截图或者 PDF
- 高级爬虫，可以爬取大量异步渲染内容的网页
- 模拟键盘输入、表单自动提交、登录网页等，实现 UI 自动化测试
- 捕获站点的时间线，以便追踪你的网站，帮助分析网站性能问题

## Demo

- 使用 `Puppeteer` 截取 [TypeScript 入门教程](https://ts.xcatliu.com/) 全书为PDF并合并
  
  > ~~待解决：调用外部模块方法到 `evaluate()` 方法内而不是在内部声明~~
  > （Issue已回复，见[#5320](https://github.com/puppeteer/puppeteer/issues/5320)），入参为 **DOM元素** 的函数无法被抽取到到第三方。

## 学习资源

- [Puppeteer 常见异常处理](https://www.codercto.com/a/34024.html)
- [Puppeteer 中文文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#/)
