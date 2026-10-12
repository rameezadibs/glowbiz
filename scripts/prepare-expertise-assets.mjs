import sharp from 'sharp';
import fs from 'node:fs/promises';
const data=JSON.parse(await fs.readFile('artwork/expertise-generation.json','utf8'));
for(const item of data.assets) await sharp(item.path).webp({quality:90}).toFile(`public/assets/expertise-${item.name}.webp`);
