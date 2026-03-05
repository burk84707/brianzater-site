# Favicon Diagnostic Report — Brian Zater Site

## 1. Files Found

| Path | Exists | Notes |
|------|--------|------|
| `public/favicon.svg` | ✅ Yes | 203 bytes. Custom Z design (stroke-based, brand blue #1e3a8a). |
| `public/favicon.ico` | ✅ Yes | 655 bytes. **PNG-format ICO containing Astro default rocket logo** (purple gradient). |
| `dist/favicon.svg` | ✅ Yes | Build copy of public/favicon.svg |
| `dist/favicon.ico` | ✅ Yes | Build copy of public/favicon.ico |
| `src/assets/*` | ❌ None | No favicon files in src/assets |

**Finding:** `public/favicon.ico` is the **default Astro starter favicon**, not the custom Z.

---

## 2. Layout Files

| Path | Exists |
|------|--------|
| `src/layouts/MainLayout.astro` | ✅ Yes |
| `src/layouts/Layout.astro` | ❌ No |

**Only layout:** `MainLayout.astro`

---

## 3. Layout Used by Pages

All pages use `MainLayout`:

- `src/pages/index.astro` → MainLayout
- `src/pages/tree-of-life.astro` → MainLayout
- `src/pages/tree-of-life/goal-cards.astro` → MainLayout
- `src/pages/clemency.astro` → MainLayout
- `src/pages/projects.astro` → MainLayout
- `src/pages/media.astro` → MainLayout
- `src/pages/blog/index.astro` → MainLayout
- `src/pages/blog/all.astro` → MainLayout
- `src/pages/blog/[slug].astro` → MainLayout
- `src/pages/privacy.astro` → MainLayout
- `src/pages/terms.astro` → MainLayout
- `src/pages/disclaimer.astro` → MainLayout

---

## 4. Favicon Tags in Active Layout

From `src/layouts/MainLayout.astro` (lines 21–22):

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2" />
<link rel="icon" href="/favicon.ico?v=2" />
```

- `rel="icon"` (SVG) — present
- `rel="icon"` (ICO fallback) — present
- `rel="shortcut icon"` — not present
- `rel="apple-touch-icon"` — not present

---

## 5. Explicit References

- Layout references `/favicon.svg?v=2` (primary)
- Layout references `/favicon.ico?v=2` (fallback)
- Both paths resolve to `public/` at build time

---

## 6. Final Rendered `<head>` (from dist/index.html)

```html
<head>
  <meta charset="utf-8">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" href="/favicon.ico">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="generator" content="Astro v5.18.0">
  <title>Brian Zater</title>
  ...
</head>
```

**Note:** The built `dist/` output uses `/favicon.svg` and `/favicon.ico` without `?v=2`, so it was produced from an older layout. The current layout includes `?v=2`.

---

## 7. Astro Default Favicon Injection

- Astro does **not** inject favicon tags.
- The layout defines both favicon links.
- `astro.config.mjs` has no favicon-related config.

**Root cause:** The favicon tags are correct. The problem is the **content** of `public/favicon.ico`, which is still the default Astro favicon. When a browser uses the ICO fallback (or requests `/favicon.ico` directly), it shows the Astro logo instead of the custom Z.

---

## 8. Exact Fix

**Root cause:** `public/favicon.ico` is the Astro default favicon. The SVG is correct; the ICO fallback is wrong.

**Fix:** Replace `public/favicon.ico` with an ICO generated from the custom Z design.

### Option A: Generate ICO from SVG (recommended)

```bash
npx svg-to-ico public/favicon.svg public/favicon.ico
```

Then rebuild and redeploy.

### Option B: Remove ICO fallback

If you only need SVG support, remove the ICO link and delete the file:

1. In `MainLayout.astro`, remove:
   ```html
   <link rel="icon" href="/favicon.ico?v=2" />
   ```
2. Delete `public/favicon.ico`.

Some older browsers may not show a favicon, but most will use the SVG.

### Corrected `<head>` block (if keeping both)

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2" />
<link rel="icon" href="/favicon.ico?v=2" />
```

The tags are fine; the fix is replacing the ICO file content.
