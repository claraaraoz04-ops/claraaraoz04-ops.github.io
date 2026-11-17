# Portfolio — Clara Fernández de Araoz Serra

Web portfolio built with [Astro](https://astro.build) and plain CSS. It follows the PDF portfolio's look: a cream page, charcoal ruled grid, Playfair Display + Manrope.

## Run it locally

You need [Node.js](https://nodejs.org) 22 or newer.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:4321. Edits reload automatically.

- `npm run build` builds the final site into `dist/`.
- `npm run preview` serves that build so you can check it before deploying.

## Where things live

| What | File |
| --- | --- |
| **All projects** (texts, images, layout of each page) | `src/data/projects.ts` |
| Contact details (emails, phone) | `src/data/site.ts` |
| Interface texts in ES/EN (menu, buttons, "Sobre mí" text…) | `src/i18n/ui.ts` |
| Project images | `src/assets/images/<project-slug>/` |
| Portrait on "Sobre mí" | `src/assets/images/about/clara-retrato.jpg` |
| Colours, fonts, grid lines | `src/styles/global.css` (variables at the top) |
| Share image (Open Graph) | `public/og.jpg` (1200×630) |
| Favicon | `public/favicon.svg`, `favicon.png`, `apple-touch-icon.png` |

> **Why images are in `src/assets/` and not `public/`:** Astro only optimizes images inside `src/`. Each image is turned into WebP in several sizes, so pages stay fast (Lighthouse). Drop JPG/PNG files in and the optimizing happens on its own.

## Add a new project

1. Create a folder `src/assets/images/my-project/` and add the images (JPG or PNG). Export renders and photos **at least 2400 px wide** (full-width images) or **1600 px** (half-width images) so they stay sharp on retina screens. The site never enlarges an image beyond its real size: a full-width image narrower than 1920 px is shown centred inside the margins instead of edge to edge.
2. Open `src/data/projects.ts`, copy an existing `{ ... }` block in the `projects` array and paste it where it should appear in the index. Array order = index order and numbering (01, 02…).
3. Change:
   - `slug`: the URL (`/proyectos/my-project/`). Lowercase, no accents or spaces.
   - `category`: `'industrial'` or `'ux-ui'` (this drives the index filters).
   - `title`, `subtitle` (optional), `keywords` (exactly 3 words, for the cascade), `description`.
   - `hero`: the large image next to the title. `heroSide: 'left' | 'right'`.
   - `introImages` (optional): up to 2 small sketches under the cascade.
   - `spreads`: the blocks that follow (see below).
4. Every text has `{ es: '…', en: '…' }`. Fill in both.
5. Every image needs an `alt`, a short description of what it shows, in both languages.

If an image file doesn't exist yet, the page shows a box with the expected file name, so the layout still works.

### Images: `photo` vs `sketch`

The helper functions build images for you:

```ts
photo('my-project/render.jpg', 'Spanish description', 'English description')
sketch('my-project/sketch.jpg', 'Spanish description', 'English description')
```

- **photo** fills its whole cell edge to edge, cropping if needed. Add a fourth argument to choose the crop point, e.g. `'center 30%'`.
- **sketch** is never cropped, and its white paper blends into the cream background. Scans with yellowish or grey paper look better if you whiten them first (Levels / Curves in Photoshop or similar).

### Spread layouts

```ts
// Text + large image (~50/50). reverse: true puts the image on the left.
{ layout: 'text-hero', text: [{ es, en }], image: photo(...), reverse?: true }

// Two images side by side
{ layout: 'two-images', images: [photo(...), photo(...)] }

// One full-width image (a sketch stays inside the margins)
{ layout: 'full-bleed', image: photo(...) }

// Text + reference image + secondary image with caption (3 cells, like Tabu p. 9)
{ layout: 'text-ref-secondary', text: [...], reference: photo(...), caption: [...], secondary: photo(...), body?: [...] }

// Embedded Figma prototype (UX/UI)
{ layout: 'figma', url: 'https://www.figma.com/proto/…', title: { es, en }, text?: [...] }

// Screenshot sequence (UX/UI): device 'phone' or 'desktop'
{ layout: 'screens', device: 'phone', images: [photo(...), ...], text?: [...] }
```

Empty ruled bands are added automatically between spreads, like the blank cells in the PDF.

### Publishing the UX/UI project

The `proximamente` project is a template:

1. Change `slug`, `title`, texts and `keywords`.
2. Paste the Figma link (Share → Copy link) into `url` in the `figma` spread.
3. Put the screenshots in `src/assets/images/<slug>/` and update the names.
4. Delete the `comingSoon: true` line.

## Edit texts and translations

- Project texts: in each project in `src/data/projects.ts`.
- The "Sobre mí" text: `about` in `src/i18n/ui.ts`.
- Menu, buttons, labels: the `ui.es` and `ui.en` objects in `src/i18n/ui.ts`.
- Spanish lives at `/`, English at `/en/`. The ES/EN toggle in the header goes to the same page in the other language.

## Contact form

Right now the form opens the visitor's email app with the message pre-filled (`mailto:`). To receive messages directly, use Formspree; the steps are in the comment inside `src/views/ContactView.astro`.

## Deploy

The site is published with **GitHub Pages** from the repository `<username>.github.io`. The workflow in `.github/workflows/deploy.yml` builds and publishes it automatically.

### Publishing a change

1. Edit the content (for example `src/data/projects.ts`) and check it with `npm run dev`.
2. Save the change to GitHub:

   ```bash
   git add -A
   ```

   ```bash
   git commit -m "Describe the change"
   ```

   ```bash
   git push
   ```

3. In 1–2 minutes the new version is live. You can follow it in the repository's **Actions** tab; a red ✗ means the build failed and the live site stays as it was.

If you move to another domain, change `site` in `astro.config.mjs` (it's used for canonical links and share images).

### Alternatives

#### Option A: Vercel

1. Upload the project to GitHub (e.g. with GitHub Desktop: *Add local repository* → *Publish*).
2. Go to https://vercel.com, sign in with GitHub and click **Add New → Project**.
3. Import the repository. Vercel detects Astro automatically (build: `npm run build`, output: `dist`). Click **Deploy**.
4. Every `git push` publishes a new version. Add your own domain under *Settings → Domains*.

#### Option B: Netlify

1. Upload the project to GitHub.
2. At https://app.netlify.com: **Add new site → Import an existing project** → choose the repository.
3. Build command `npm run build`, publish directory `dist`. **Deploy**.

Without GitHub: run `npm run build` and drag the `dist/` folder onto https://app.netlify.com/drop.
