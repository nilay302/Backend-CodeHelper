// const puppeteer = require('puppeteer');

// const getQuotes = async () => {
//   // Start a Puppeteer session with:
//   // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
//   // - no default viewport (`defaultViewport: null` - website page will in full width and height)
//   const browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: null,
//   });

//   // Open a new page
//   const page = await browser.newPage();

//   // On this new page:
//   // - open the "http://quotes.toscrape.com/" website
//   // - wait until the dom content is loaded (HTML is ready)
//   await page.goto("http://quotes.toscrape.com/", {
//     waitUntil: "domcontentloaded",
//   });
// };

// // Start the scraping
// getQuotes();

// // async function scrapeWebPage(url, username) {
// //   const browser = await puppeteer.launch({
// //     headless: false,
// //     defaultViewport: null,
// //   }); // Launch a headless browser
// //   const page = await browser.newPage();      // Create a new page

// //   // Navigate to the URL
// //   await page.goto(url);

// //   // Type the username into the input box and press Enter
// //   await page.type('input[type="text"]', username);
// //   await page.keyboard.press('Enter');

// //   // Wait for the page to load (you may need to adjust the timeout as needed)
// //   await page.waitForTimeout(3000);

// //   // Get the HTML content of the page
// //   const htmlContent = await page.content();

// //   // Close the browser
// //   await browser.close();

// //   return htmlContent;
// // }

// // // Usage
// // const targetURL = 'https://cfviz.netlify.app/'; // Replace with the URL you want to scrape
// // const inputUsername = 'ravikjha7';    // Replace with the desired username
// // scrapeWebPage(targetURL, inputUsername)
// //   .then(htmlContent => {
// //     console.log(htmlContent); // Output the HTML content
// //   })
// //   .catch(err => {
// //     console.error(err);
// //   });
