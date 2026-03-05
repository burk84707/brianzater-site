# Brian Zater — Official Site

Author site for Brian Zater: Tree of Life, clemency advocacy, and structured personal growth.

**Live:** [brianzater.com](https://brianzater.com)

## Tech

- [Astro](https://astro.build) (static site)
- Deployed via Cloudflare Pages (GitHub integration)

## Commands

| Command         | Action                          |
| :-------------- | :------------------------------ |
| `npm install`   | Install dependencies            |
| `npm run dev`   | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally        |
| `npm run deploy` | Build and deploy to Cloudflare Pages |

## Structure

- `src/pages/` — Pages and routes
- `src/layouts/` — Layouts (MainLayout)
- `src/components/` — Reusable components (Navbar)
- `src/content/blog/` — Blog posts (Markdown)
- `public/` — Static assets (images, favicon, robots.txt)
- `functions/` — Cloudflare Pages Functions (petition count API)
