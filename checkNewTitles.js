const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const url = "https://zelenka.guru/forums/21/?node_id=21&order=post_date&direction=desc";

  // Установите пользовательский User-Agent заголовок
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36");

  await page.goto(url, { waitUntil: 'domcontentloaded' });
  
  await page.waitForSelector('.discussionListItems');
	
  const titles = await page.evaluate(() => {
    const titleElements = document.querySelectorAll('.latestThreads .title');
    const titles = [];
    for (const titleElement of titleElements) {
      titles.push(titleElement.textContent.trim());
    }
    return titles;
  });

  for (const title of titles) {
    console.log(title);
  }	

  await browser.close();
})();
