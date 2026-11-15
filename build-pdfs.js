// Regenerates the PDFs in pdfs/ from cards.html.  Run: node build-pdfs.js
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const out = path.join(__dirname, 'pdfs');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.join(__dirname, 'cards.html'));
  await page.evaluate(() => document.fonts.ready);
  const pdf = (name, pageRanges) =>
    page.pdf({ path: path.join(out, name), format: 'A5', printBackground: true, pageRanges });
  await pdf('gentlemens-lunch-full-pack.pdf', '1-3');
  await pdf('invitation.pdf', '1');
  await pdf('menu.pdf', '2');
  await pdf('order-of-events.pdf', '3');
  await browser.close();
})();
