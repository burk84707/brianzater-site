# Blog System Instructions

This document explains how to create, preview, and deploy blog posts for the Brian Zater site.

---

## How to Create a New Blog Post

1. **Create a new Markdown file** in `src/content/blog/`

2. **Use the filename format:** `YYYY-MM-DD-title-slug.md`
   - Example: `2026-03-18-first-post.md`
   - The date in the filename is for organization; the **date in frontmatter** is the official publish date used for sorting.

3. **Include the required frontmatter** at the top of the file:

   ```yaml
   ---
   title: "Your Post Title"
   description: "Short summary for the blog index (1-2 sentences)."
   date: 2026-03-18
   ---
   ```

4. **Write your content** in Markdown below the frontmatter.

5. **The `date` field controls publish order** — posts are sorted by date descending (newest first).

---

## How to Preview Locally

Run the development server:

```bash
npm run dev
```

Then visit:
- **Blog index (latest 5):** http://localhost:4321/blog/
- **All posts:** http://localhost:4321/blog/all
- **Individual post:** http://localhost:4321/blog/2026-03-18-first-post

---

## How to Push to Production

1. Stage your changes:
   ```bash
   git add .
   ```

2. Commit with a descriptive message:
   ```bash
   git commit -m "Add blog post: [Your Post Title]"
   ```

3. Push to your remote:
   ```bash
   git push
   ```

---

## Cloudflare Auto-Deploy

When connected to Cloudflare Pages:

- Pushing to your main branch triggers an automatic build and deploy.
- Cloudflare builds the Astro site and publishes the updated content.
- No manual deployment step is required after `git push`.

---

## Notes

- **Only the latest 5 posts** appear on `/blog`
- **All posts** are listed at `/blog/all`
- **Date controls order** — the `date` field in frontmatter determines sort order (newest first)
- Individual post URLs use the filename (without `.md`) as the slug, e.g. `/blog/2026-03-18-first-post`
