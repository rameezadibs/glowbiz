import { chromium, expect } from '@playwright/test';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ reducedMotion: 'reduce' });
const errors=[]; page.on('pageerror', e=>errors.push(e.message));
for(const [name,width,height] of [['desktop',1920,1080],['tablet',820,1180],['mobile',390,844],['small',320,740]]) {
 await page.setViewportSize({width,height});
 await page.goto('http://localhost:5199/services',{waitUntil:'networkidle'});
 await expect(page.locator('h1')).toHaveCount(1);
 await expect(page.locator('.strategy-art img')).toBeVisible();
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw Error(name+' overflow');
 await page.screenshot({path:`screenshots/strategy-${name}.png`});
 await page.getByRole('link',{name:'Explore Our Services',exact:true}).click();
 await expect(page.locator('#services-heading')).toBeInViewport();
 await page.getByRole('link',{name:'Book a Consultation',exact:true}).click();
 await expect(page).toHaveURL(/\/contact$/);
 await page.getByRole('button',{name:'Prepare a consultation inquiry'}).click();
 await expect(page.getByRole('dialog')).toBeVisible();
 console.log(name+' passed');
}
if(errors.length) throw Error(errors.join('\n'));
await browser.close();
