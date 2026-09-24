import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await fs.mkdir('screenshots', { recursive: true });
for (const [name, width, height] of [['desktop', 1652, 952], ['tablet', 820, 1180], ['mobile', 390, 844], ['small-mobile', 320, 740]]) {
  await page.setViewportSize({width, height});
  await page.goto('http://127.0.0.1:5199/', {waitUntil: 'networkidle'});
  await page.screenshot({path: `screenshots/${name}.png`, fullPage: true});
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  if (overflow) throw new Error(`${name}: horizontal overflow`);
  await page.getByRole('button', {name: 'Explore Services', exact:true}).click();
  await page.waitForURL('**/services');
  await page.goto('http://127.0.0.1:5199/', {waitUntil: 'networkidle'});
  if (width < 961) {
    await page.getByRole('button', {name: 'Open menu', exact:true}).click();
    await page.getByRole('navigation', {name:'Mobile navigation'}).getByRole('button', {name: 'Book Consultation'}).click();
  } else await page.getByRole('button', {name: 'Book Consultation', exact:true}).first().click();
  await page.getByLabel('Full name').fill('Test Client');
  await page.getByLabel('Email address').fill('test@example.com');
  await page.getByLabel('How can we help?').fill('I would like to discuss establishing a business.');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', {name:'Prepare inquiry'}).click();
  await downloadPromise;
  await page.getByRole('status').waitFor();
  await page.keyboard.press('Escape');
  console.log(`${name}: layout, dialogs, consultation download passed`);
}
if(errors.length) throw new Error(errors.join('\n'));
await browser.close();
