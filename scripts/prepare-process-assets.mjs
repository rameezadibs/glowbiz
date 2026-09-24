import sharp from 'sharp';
const source = 'artwork/process-photos.png';
const {width,height} = await sharp(source).metadata();
await Promise.all(['discovery','structuring','execution','support'].flatMap((name,index) => [320,640].map(size => sharp(source).extract({left:Math.round(width*index/4),top:0,width:Math.floor(width/4),height}).resize(size,size,{fit:'cover'}).webp({quality:90}).toFile(`public/assets/process-${name}-${size}.webp`))));
await Promise.all([1280,1920].map(width => sharp('artwork/process-background.png').resize({width}).webp({quality:88}).toFile(`public/assets/process-background-${width}.webp`)));
