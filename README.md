# GlowBiz Solutions

Responsive homepage hero built with React, Vite, Tailwind CSS and Framer Motion.

## Our Process

The homepage's process section follows the supplied reference with four photographic stages, animated curved SVG connections, numbered badges, translucent panels and three trust indicators. It uses a reusable `ProcessSection` component and `processStages` array in `src/process.jsx`, with scoped styles in `src/process.css`. Layout switches from four desktop columns to two tablet columns and one vertical mobile sequence. Reduced-motion preferences disable entrance displacement and drawing animations.

Verification: `node scripts/check-process.mjs` checks five viewport sizes, image loading, column counts, equal panel heights, overflow and hover behavior against the local server on port 5199.

Artwork was created with the built-in imagegen tool. Original assets: `artwork/process-background.png` and `artwork/process-photos.png`. Responsive files: `public/assets/process-background-{1280,1920}.webp` and `public/assets/process-{discovery,structuring,execution,support}-{320,640}.webp`. Regenerate delivery sizes with `node scripts/prepare-process-assets.mjs`.

Background prompt: Edit the exact process reference into a clean background only. Remove typography, circular photos, badges, icons, panels, connecting arrows and trust indicators. Preserve Dubai skyline across upper right, Burj Khalifa, golden horizon, waterfront reflections, right luxury glass terrace, left pale-blue negative space and flowing white ice-blue architectural ribbons. Seamlessly reconstruct removed elements; no text, icons, circles or people. Preserve composition, colors and bright photographic lighting.

Photography prompt: Four equal-width photographs edge-to-edge in one horizontal 3:1 sheet, each photograph 3:4. Match the process reference: professionals reviewing and signing documents with Dubai windows; hands examining financial reports and strategy charts; laptop with blue rising financial analytics and a working professional; dark-suited business handshake with blurred Dubai skyline. Center each subject for circular cropping. Cohesive pale sky-blue, navy and natural daylight, luxury corporate editorial photography. No labels, numbers, panels, icons, badges or borders.

## Run

```sh
npm install
npm run dev
```

`npm run build` creates the production site in `dist`. `npm run preview` serves that build.

The layout includes keyboard-accessible navigation, native modal dialogs, reduced-motion support, responsive WebP imagery and mobile navigation. Google Fonts serves DM Sans and Libre Caslon Display, with local system fallbacks.

## Integration notes

The supplied reference is the only logo source supplied. The header displays its original logo using a CSS crop. Replace it with a dedicated brand asset when available.

The consultation form downloads an inquiry locally. It does not transmit personal information or book appointments. Connect an approved booking provider before launch. About and Insights open local informational dialogs. Services uses React Router with an index at `/services` and four individual detail pages. Configure production hosting to serve `index.html` for client-side routes.

The homepage includes exactly four featured services, with 4/2/1 responsive columns, staggered scroll reveals, reduced-motion support, photographic panels, curved transitions and keyboard-accessible detail links. Service data and reusable components are in `src/services.jsx`; section styles are in `src/services.css`.

Run `node scripts/check-services.mjs` against the dev server on port 5199 to check responsive grids, image loading, horizontal overflow and every service route. `node scripts/check-ui.mjs` checks the hero, navigation and consultation download.

## Services artwork

Built-in imagegen was used to derive `artwork/services-background.png` and `artwork/services-photos.png` from the supplied services reference. WebP assets are saved under `public/assets/services-background-{1280,1920}.webp` and `public/assets/service-{banking,compliance,investment,visa}-{400,800}.webp`. `node scripts/prepare-services-assets.mjs` splits the four-photo asset sheet and generates delivery sizes.

Background prompt: Edit this exact reference into a clean background asset only. Remove all four service panels and all heading text, descriptions, buttons and labels. Preserve panoramic Dubai skyline at top right with Burj Khalifa at 64% across, luxury curved glass terrace, soft sunlight, left pale blue-white negative space, flowing white and ice blue ribbons along left and bottom. Reconstruct removed panels as pale luminous ice blue and white. No foreground objects, cards, text or icons. Match original photo aesthetic and wide 1.74:1 composition.

Photo prompt: Create four equal-width photographs in one edge-to-edge row, no gaps or borders, overall 3:1 with each photograph 3:4. Match the reference's pale blue luxury corporate art direction. Classical bank columns with blue glass towers; hand signing corporate paperwork with blurred Dubai skyline; ascending silver coin stacks and blue upward financial graph; navy UAE passport against Dubai skyline and waterfront with Burj Khalifa and a small airplane. Subjects contained within each quarter. No panel text, numbers, icons, headings or buttons. Crisp premium realism, soft daylight, lightly colored uncluttered upper-left space for HTML numbers.

## Artwork

`public/assets/dubai-source.png` was derived from the supplied reference using the built-in imagegen tool. Responsive versions are `public/assets/dubai-{1280,1920,2560}.webp`; regenerate with `node scripts/prepare-assets.mjs`.

Final image prompt: Create a clean website hero background from this exact reference. Remove the entire top navigation header (extend sky), all text, letters, labels, logos, buttons, icons, badges and the standing man. Retain the Dubai skyline composition with Burj Khalifa at 72% from left, translucent white dotted globe, connection arcs, soft sunlight, waterfront, glass railing terrace, sofa at far right and subtle white flowing bottom ribbons. Left 48% remains seamless pale ice blue and white negative space for HTML copy. Preserve architectural photographic realism, bright airy appearance and original colors. No added elements, text or people.
