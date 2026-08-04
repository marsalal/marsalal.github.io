# Marco Salazar — portfolio and writing

Source for [marsalal.github.io](https://marsalal.github.io), a static personal portfolio and engineering blog.

## Technology

- [Astro](https://astro.build/) for static rendering and content collections
- Markdown and optional MDX for articles
- Vue for the interactive search and tag-filter island
- [Pagefind](https://pagefind.app/) for a static full-text search index
- Modern, dependency-light CSS with no runtime styling framework
- GitHub Pages and GitHub Actions for automated hosting

The site is statically generated. JavaScript is only shipped for the article search/filter experience.

## Local development

Requires Node.js 22 or newer.

```bash
pnpm install
pnpm dev
```

Production validation:

```bash
pnpm check
pnpm build
```

`pnpm build` creates the Astro output and then generates the Pagefind index in `dist/pagefind`.

## Content

Published articles live in `src/content/blog`. Each Markdown or MDX entry uses this front matter:

```yaml
---
title: "Article title"
description: "A concise summary used in cards and social metadata."
date: 2026-08-04
tags: ["development"]
draft: false
featured: false
---
```

Existing article routes remain under `/post/<file-name>/`.

### Existing `about_me` authoring flow

For backwards compatibility, `marsalal/about_me` remains the content-authoring repository. A push to `about_me/content/post` on its `master` branch synchronizes articles and media into this repository. The sync commit then triggers the Pages deployment below.

New code and design changes should be made directly in this repository. New articles may continue to be written in `about_me/content/post`.

## Deployment

`.github/workflows/deploy-pages.yml` runs after every push to `main`:

1. Install dependencies from `pnpm-lock.yaml`.
2. Build the Astro site.
3. Generate the Pagefind search index.
4. Upload the static artifact.
5. Deploy it through GitHub Pages.

In **Settings → Pages**, the publishing source must be set to **GitHub Actions**.
