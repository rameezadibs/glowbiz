import sharp from 'sharp';
await Promise.all([1280,1920,2560].map(width => sharp('public/assets/dubai-source.png').resize({width}).webp({quality:85}).toFile(`public/assets/dubai-${width}.webp`)));
await sharp('public/assets/reference.png').webp({quality:95}).toFile('public/assets/reference.webp');
