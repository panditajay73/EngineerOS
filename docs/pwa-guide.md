# PWA Guide

EngineerOS is configured as an installable Progressive Web App.

## Manifest

Generated manifest values:

- App Name: EngineerOS
- Short Name: EngineerOS
- Description: 90-Day Software Engineer Study Planner
- Theme Color: `#0F172A`
- Background Color: `#020617`
- Display: standalone
- Orientation: portrait
- Start URL: `/` locally or the GitHub Pages base path in production

## Icons

Configured assets:

- `icon-192.png`
- `icon-512.png`
- `maskable-icon-192.png`
- `maskable-icon-512.png`
- `apple-touch-icon.png`
- `favicon.svg`
- `favicon-32x32.png`
- `favicon-16x16.png`
- Windows tile PNGs

## Service Worker

The Workbox service worker caches:

- HTML
- CSS
- JavaScript
- Images
- Icons
- Fonts
- Manifest
- Static assets

The custom notification script handles:

- Start Session action
- Snooze action
- Opening the app to the calendar session path

## Updates

When a new build is available, EngineerOS shows:

```text
New Version Available
Update Now
```

Clicking Update Now refreshes the app through the service worker update flow.

## Install Button

The floating install button appears when the browser exposes the install prompt. If the browser does not support automatic prompts, EngineerOS displays manual install guidance.
