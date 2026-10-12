import { chromium, expect } from '@playwright/test';
import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync('src/service-detail-data.json','utf8'));
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [width,height] of [[1440,1000],[820,1180],[390,844],[320,740]]){
 await page.setViewportSize({width,height});
 for(const d of data){
  await page.goto(`http://localhost:5199/services/${d.id}`,{waitUntil:'networkidle'});
  await expect(page.locator('main h1')).toHaveText(d.heading);
  const content=await page.locator('main').textContent();
  const strings=[...d.intro,...d.help,...d.faqs.flatMap(f=>[f.question,...f.answer]),...(d.solutions||[]).flatMap(s=>[s.title,...s.paragraphs]),...(d.documents||[]),...(d.service||[]),...(d.benefits||[]).flatMap(b=>[b.title,b.text]),...(d.considerations||[]),...(d.returns||[]),...(d.support||[]).flatMap(s=>[s.title,...s.paragraphs]),d.cta];
  for(const text of strings)if(!content.includes(text.replace(/^• /gm,'').replace(/\n/g,'')))throw Error('Missing content: '+text);
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow '+d.id+' '+width);
  const buttons=page.locator('.sd-faq-item button');await expect(buttons).toHaveCount(d.faqs.length);await expect(page.locator('.sd-faq-item button[aria-expanded=true]')).toHaveCount(0);
  for(let i=0;i<d.faqs.length;i++){await buttons.nth(i).focus();await page.keyboard.press(i%2?'Space':'Enter');await expect(buttons.nth(i)).toHaveAttribute('aria-expanded','true');await expect(page.locator(`#sd-a-${i}`)).toBeVisible();await page.keyboard.press('Enter');await expect(buttons.nth(i)).toHaveAttribute('aria-expanded','false');}
  await page.locator('.sd-final a').click();await expect(page).toHaveURL(/\/contact$/);await page.goBack();
  await page.screenshot({path:`screenshots/detail-${d.kind}-${width}.png`,fullPage:true});
  console.log(d.id,width,'content, overflow, keyboard FAQs, CTA passed; title:',await page.title());
 }
}
await page.setViewportSize({width:1440,height:1000});await page.goto('http://localhost:5199/services');
for(let i=0;i<5;i++){await page.locator(`#expertise-tab-${i}`).focus();await page.keyboard.press('Enter');await page.locator('.expertise-desktop-cta').click();await expect(page.locator('main h1')).toHaveCount(1);await page.goBack();}
if(errors.length)throw Error(errors.join('\n'));await browser.close();
