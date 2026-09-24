import { chromium, expect } from '@playwright/test';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
for (const [name, width, height, columns] of [['desktop',1652,952,4],['tablet',820,1180,2],['mobile',390,844,1],['small-mobile',320,740,1]]) {
  await page.setViewportSize({width,height});
  await page.goto('http://127.0.0.1:5199/', {waitUntil:'networkidle'});
  const section = page.locator('#services');
  await section.scrollIntoViewIfNeeded();
  for (const card of await page.locator('.service-card').all()) await card.scrollIntoViewIfNeeded();
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(850);
  await expect(page.locator('.service-card')).toHaveCount(4);
  const actualColumns = await page.locator('.services-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
  if (actualColumns !== columns) throw new Error(`${name}: wrong column count`);
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error(`${name}: overflow`);
  const brokenImages = await section.locator('img').evaluateAll(images => images.filter(img => !img.complete || !img.naturalWidth).length);
  if (brokenImages) throw new Error(`${name}: broken images`);
  await section.screenshot({path:`screenshots/services-${name}.png`});
  await page.getByRole('link',{name:'View All Services',exact:true}).click();
  await expect(page).toHaveURL(/\/services$/);
  for (const service of ['professional-banking','kyc-compliance','investment-solutions','visas']) {
    await page.locator(`a[href="/services/${service}"]`).click();
    await expect(page.locator('.service-detail h1')).toBeVisible();
    await page.getByRole('link',{name:'All services',exact:true}).click();
  }
  console.log(`${name}: grid, images, overflow, index and all four detail routes passed`);
}
await page.reload();
await expect(page.locator('#services-heading')).toBeVisible();
if(errors.length) throw new Error(errors.join('\n'));
await browser.close();
