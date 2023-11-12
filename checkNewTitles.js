const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const url = "https://zelenka.guru/forums/21/?node_id=21&order=post_date&direction=desc";

  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36");

  await page.goto(url, { waitUntil: 'domcontentloaded' });
	
  let currentTitles = [];

  const checkForNewTitles = async () => {
	await page.reload({ waitUntil: 'domcontentloaded' });  
	
	await page.waitForSelector('.latestThreads');
	
    const titles = await page.evaluate(() => {
      const titleElements = document.querySelectorAll('.latestThreads .title');
      const titles = [];
      for (const titleElement of titleElements) {
        titles.push(titleElement.textContent.trim());
      }
      return titles;
    });

    if (currentTitles.length > 0) {
      for (const title of titles) {
        if (!currentTitles.includes(title)) {
          console.log("Новый заголовок:", title);
        }
      }
    }

    currentTitles = titles;
  };

  // Периодически проверяем новые заголовки (например, каждые 10 секунд)
  setInterval(checkForNewTitles, 10000);

  // Используйте этот код для однократной проверки при загрузке страницы
  // await checkForNewTitles();

  //await browser.close();
})();
