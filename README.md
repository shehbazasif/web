# Shehbaz Asif — UI/UX Portfolio

A portfolio built with **Nuxt 4** and **Tailwind CSS 4**, statically generated for Netlify.

The page looks like a design file. The hero headline sits inside a selection box, and **Spec mode** (the toggle in the header, or press `S`) shows redline annotations the way a design handoff would.

## Edit your content

All copy lives in [`app/data/site.ts`](app/data/site.ts): name, email, links, case studies, process, skills and experience. RantevouOS is a real project; the other four case studies are sample content to replace with your own work.

Design tokens (colors and fonts) are in [`app/assets/css/main.css`](app/assets/css/main.css).

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # static build in .output/public
```

## Deploy to Netlify

1. In Netlify, choose **Add new site → Import an existing project** and pick this repository.
2. The settings come from `netlify.toml` (build command `npm run generate`, publish directory `dist`).
3. The contact form uses **Netlify Forms**. Submissions show up under *Forms* in the Netlify dashboard once the site is deployed.
