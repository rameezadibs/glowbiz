import sharp from 'sharp';
import fs from 'node:fs/promises';
const {assets}=JSON.parse(await fs.readFile('artwork/structuring-generation.json','utf8'));
for(const asset of assets) await sharp(asset.source).resize({width:1600,withoutEnlargement:true}).webp({quality:90}).toFile(asset.output);
