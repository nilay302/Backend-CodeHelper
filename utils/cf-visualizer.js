const puppeteer = require('puppeteer');

// // const getQuotes = async () => {
// //   // Start a Puppeteer session with:
// //   // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
// //   // - no default viewport (`defaultViewport: null` - website page will in full width and height)
// //   const browser = await await puppeteer.launch({
// //     executablePath: '/usr/bin/chromium-browser'
// //   })

// //   // Open a new page
// //   const page = await browser.newPage();

// //   // On this new page:
// //   // - open the "http://quotes.toscrape.com/" website
// //   // - wait until the dom content is loaded (HTML is ready)
// //   await page.goto("http://quotes.toscrape.com/", {
// //     waitUntil: "domcontentloaded",
// //   });
// // };

// // // Start the scraping
// // getQuotes();

async function scrapeWebPage(url, username) {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  }); // Launch a headless browser
  const page = await browser.newPage();      // Create a new page

  // Navigate to the URL
  await page.goto(url);

  // Type the username into the input box and press Enter
  await page.type('input[type="text"]', username);
  await page.keyboard.press('Enter');

  // Wait for the page to load (you may need to adjust the timeout as needed)
  await page.waitForTimeout(3000);

  // Get the HTML content of the page
  const htmlContent = await page.content();

  // Close the browser
  await browser.close();

  return htmlContent;
}

// scrapeWebPage('https://cfviz.netlify.app/', 'ravikjha7');

// Usage
module.exports = {
    scrapeWebPage
}