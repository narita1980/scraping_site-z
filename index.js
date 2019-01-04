const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();

  var pageNo = 31
  for (let i = pageNo; i > 0; i--) {
    await page.goto('https://www.site-z.com/list.html?pageNo=' + i);
    const rows = await page.$$('#result > table > tbody > tr');

    // 1行目はタイトル行なので削除する
    rows.shift()

    for (const row of rows) {
      process.stdout.write(await (await row.getProperty('innerText')).jsonValue())
      process.stdout.write('\n')
    }
  }

  browser.close();
})();