// const puppeteer = require('puppeteer');

// async function scrapeWebPage(url, username) {
//   const browser = await puppeteer.launch({
//     headless: 'new',
// }); // Launch a headless browser
//   const page = await browser.newPage();      // Create a new page

//   // Navigate to the URL
//   await page.goto(url);

//   // Type the username into the input box and press Enter
//   await page.type('input[type="text"]', username);
//   await page.keyboard.press('Enter');

//   // Wait for the page to load (you may need to adjust the timeout as needed)
//   await page.waitForTimeout(3000);

//   // Get the HTML content of the page
//   const htmlContent = await page.content();

//   // Close the browser
//   await browser.close();

//   return htmlContent;
// }

// // Usage
// const targetURL = 'https://cfviz.netlify.app/'; // Replace with the URL you want to scrape
// const inputUsername = 'ravikjha7';    // Replace with the desired username
// scrapeWebPage(targetURL, inputUsername)
//   .then(htmlContent => {
//     console.log(htmlContent); // Output the HTML content
//   })
//   .catch(err => {
//     console.error(err);
//   });
