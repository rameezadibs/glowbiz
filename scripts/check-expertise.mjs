import { chromium, expect } from '@playwright/test';
import { expertiseServices } from '../src/expertise-data.js';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [name,width,height] of [['desktop',1672,1000],['tablet',820,1180],['mobile',390,844],['small-mobile',320,740]]) {
 await page.setViewportSize({width,height});
 await page.goto('http://localhost:5199/services',{waitUntil:'networkidle'});
 await page.getByRole('link',{name:'Explore Our Services',exact:true}).click();
 await expect(page.locator('#services-heading')).toBeInViewport();
 await expect(page.getByRole('tab',{selected:true})).toHaveText(/Business Structuring/);
 await page.locator('#services').screenshot({path:`screenshots/expertise-${name}.png`});
 for(const [i,service] of expertiseServices.entries()) {
  await page.getByRole('tab').nth(i).click();
  await expect(page.getByRole('tab').nth(i)).toHaveAttribute('aria-selected','true');
  await expect(page.locator('.expertise-copy h3')).toHaveText(service.heading.join(''));
  await expect(page.locator('.expertise-areas li')).toHaveCount(service.areas.length);
  await expect(page.locator('.expertise-visual img.is-active')).toHaveAttribute('src',service.image);
  const loaded=await page.locator('.expertise-visual img.is-active').evaluate(img=>img.complete&&img.naturalWidth>0);
  if(!loaded) throw Error('Image failed '+service.id);
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw Error(name+' overflow');
  await page.locator('.expertise-cta:visible').click();
  await expect(page).toHaveURL(new RegExp('/services/'+service.id+'$'));
  await expect(page.locator('h1')).toContainText(service.id === 'business-structuring' ? 'Build the Right' : service.heading[0]);
  await page.goBack();
 }
 console.log(name+': all five states, images, key areas and routes passed');
}
await page.setViewportSize({width:1672,height:1000});
await page.goto('http://localhost:5199/services');
await page.getByRole('tab').nth(1).hover();
await expect(page.getByRole('tab').nth(1)).toHaveAttribute('aria-selected','true');
await page.getByRole('tab').nth(1).focus();
await page.keyboard.press('ArrowDown');
await expect(page.getByRole('tab').nth(2)).toBeFocused();
await expect(page.getByRole('tab').nth(2)).toHaveAttribute('aria-selected','true');
await page.keyboard.press('End');
await expect(page.getByRole('tab').nth(4)).toBeFocused();
await page.locator('#services').screenshot({path:'screenshots/expertise-family-desktop.png'});
if(errors.length) throw Error(errors.join('\n'));
console.log('Hover, keyboard and runtime checks passed');
await browser.close();
