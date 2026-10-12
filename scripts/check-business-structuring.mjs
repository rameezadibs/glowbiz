import { chromium, expect } from '@playwright/test';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [name,width,height] of [['desktop',1672,1000],['tablet',820,1180],['mobile',390,844],['small-mobile',320,740]]) {
 await page.setViewportSize({width,height});
 await page.goto('http://localhost:5199/services/business-structuring',{waitUntil:'networkidle'});
 await expect(page).toHaveTitle('Business Structuring — GlowBiz Solutions');
 await expect(page.locator('h1')).toHaveCount(1);
 await expect(page.locator('.business-structuring-page > section')).toHaveCount(6);
 await expect(page.locator('.bs-help li')).toHaveCount(5);
 await expect(page.locator('.bs-solution')).toHaveCount(4);
 await expect(page.locator('.bs-framework-steps li')).toHaveCount(6);
 await expect(page.locator('.bs-considerations li')).toHaveCount(8);
 await expect(page.locator('.bs-faq-item button')).toHaveCount(7);
 await expect(page.locator('.bs-faq-item button[aria-expanded=true]')).toHaveCount(0);
 for(const section of await page.locator('.business-structuring-page > section').all()) await section.scrollIntoViewIfNeeded();
 await page.waitForFunction(()=>Array.from(document.querySelectorAll('.business-structuring-page img')).every(img=>img.complete&&img.naturalWidth>0));
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw Error(name+' horizontal overflow');
 await page.locator('.bs-hero').screenshot({path:`screenshots/business-hero-${name}.png`});
 await page.screenshot({path:`screenshots/business-full-${name}.png`,fullPage:true});
 for(let i=0;i<7;i++) {
  const button=page.locator('.bs-faq-item button').nth(i);
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded','true');
  await expect(button.locator('.lucide-minus')).toHaveCount(1);
  await expect(page.locator(`#bs-answer-${i}`)).toBeVisible();
  await expect(page.locator('.bs-faq-item button[aria-expanded=true]')).toHaveCount(1);
 }
 await page.locator('.bs-faq-item button').last().focus();
 await page.keyboard.press('Enter');
 await expect(page.locator('.bs-faq-item button[aria-expanded=true]')).toHaveCount(0);
 for(const name of ['Discuss Your Structure','Book a Consultation','Schedule a Consultation']) {
  await page.locator('main').getByRole('link',{name,exact:true}).click();
  await expect(page).toHaveURL(/\/contact$/);
  await page.goBack();
 }
 console.log(name+': sections, images, overflow, FAQ and CTA checks passed');
}
await page.goto('http://localhost:5199/services');
await page.locator('.expertise-desktop-cta').evaluate(el=>el.click());
await expect(page.locator('.business-structuring-page')).toBeVisible();
await page.reload();
await expect(page.locator('.business-structuring-page')).toBeVisible();
if(errors.length) throw Error(errors.join('\n'));
await browser.close();
