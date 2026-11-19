import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const screenshotDir = path.resolve('..', 'screenshots');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function capture() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: 'ko-KR',
  });
  const page = await context.newPage();

  // 1. Home page (산사 테마 일주문 홈)
  console.log('Capturing Home page (http://127.0.0.1:4173/)...');
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotDir, '01-home-sansa.png'), fullPage: false });
  console.log('Saved 01-home-sansa.png');

  // 2. Search page (경장 검색 화면)
  console.log('Capturing Search page...');
  await page.goto('http://127.0.0.1:4173/search?q=%E5%BF%83%E7%B6%93', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(screenshotDir, '02-search-sutra.png'), fullPage: false });
  console.log('Saved 02-search-sutra.png');

  // 3. Reader page (법당 경전 본문 리더)
  console.log('Capturing Reader page...');
  await page.goto('http://127.0.0.1:4173/texts/9/read?juan=1', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(screenshotDir, '03-reader-sutra.png'), fullPage: false });
  console.log('Saved 03-reader-sutra.png');

  await browser.close();
  console.log('All screenshots captured successfully.');
}

capture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
