# GitHub Pages Guide

EngineerOS is a single-page Vite application. GitHub Pages needs the correct base path and a Pages workflow.

## Required Files

- `.github/workflows/deploy.yml`
- `vite.config.ts`
- `public/.nojekyll`

## Why `.nojekyll` Exists

GitHub Pages uses Jekyll by default. `.nojekyll` disables Jekyll processing so Vite assets are served exactly as built.

## Pages Source

Set GitHub Pages Source to:

```text
GitHub Actions
```

## Deployment URL

Project repository:

```text
https://<user>.github.io/<repository>/
```

User site repository:

```text
https://<user>.github.io/
```

## SPA Routing

The PWA service worker and Vite build are configured so the app shell is cached and navigable after first load. For direct deep links on GitHub Pages, open the app root first if GitHub Pages returns a static 404 before the service worker has been installed.
