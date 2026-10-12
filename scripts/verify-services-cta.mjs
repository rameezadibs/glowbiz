import { chromium, expect } from '@playwright/test';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ reducedMotion: 'reduce' });

for (const [name, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  await page.setViewportSize({ width, height });
  await page.goto('http://localhost:5111/services', { waitUntil: 'networkidle' });
  
  const cta = page.locator('.cta-section');
  await expect(cta).toBeVisible();
  await expect(cta.locator('.cta-eyebrow')).toContainText('YOUR UAE JOURNEY, STRUCTURED WITH PURPOSE');
  await expect(cta.locator('#cta-heading')).toHaveText('Build Your UAE Presence with the Right Strategy');
  await expect(cta.locator('.cta-description')).toContainText('Whether you are planning to establish a business in the UAE');
  
  const btn = cta.getByRole('link', { name: 'Book a Consultation' });
  await expect(btn).toBeVisible();
  await expect(btn).toHaveAttribute('href', '/contact');
  
  console.log(`${name}: Services CTA assertions verified!`);
}

await browser.close();
console.log('All CTA assertions passed successfully!');
