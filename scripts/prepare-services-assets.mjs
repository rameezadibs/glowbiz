import sharp from 'sharp';
const source = 'artwork/services-photos.png';
const { width, height } = await sharp(source).metadata();
const names = ['banking', 'compliance', 'investment', 'visa'];
await Promise.all(names.flatMap((name, index) => [400, 800].map(size => sharp(source).extract({left: Math.round(width * index / 4), top: 0, width: Math.floor(width / 4), height}).resize(size, size, {fit: 'cover'}).webp({quality: 90}).toFile(`public/assets/service-${name}-${size}.webp`))));
await Promise.all([1280,1920].map(size => sharp('artwork/services-background.png').resize({width: size}).webp({quality: 88}).toFile(`public/assets/services-background-${size}.webp`)));
