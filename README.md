# EngineerOS

EngineerOS is a production-ready React + TypeScript Progressive Web App for a 90-day software engineering study plan. It includes a generated study calendar, DSA document access, interview preparation, resume-aware planning, offline support, install prompts, update handling, and local-first progress storage.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand
- React Query
- FullCalendar
- Recharts
- IndexedDB
- Workbox PWA
- GitHub Pages

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173/
```

## Production Build

```bash
npm run build
```

GitHub Pages build:

```bash
npm run build:github
```

## GitHub Pages Deployment

Deployment is automatic. Push to the `main` branch and GitHub Actions will:

1. Install dependencies with `npm ci`.
2. Run `npm run lint`.
3. Build the PWA with the correct GitHub Pages base path.
4. Upload `dist`.
5. Deploy to GitHub Pages.

In GitHub, set:

- Repository Settings
- Pages
- Build and deployment
- Source: GitHub Actions

See [Deployment Guide](docs/deployment-guide.md) and [GitHub Pages Guide](docs/github-pages-guide.md).

## Installing the App

Supported install flows:

- Android Chrome
- Desktop Chrome
- Desktop Edge
- Samsung Internet
- Microsoft Edge
- Safari on iPhone via Share -> Add to Home Screen

EngineerOS shows a floating `Install StudyOS` button when install is available. If the browser does not expose the install prompt, it shows manual install guidance.

See [Installation Guide](docs/installation-guide.md).

## PWA Capabilities

- `manifest.webmanifest`
- Service worker
- Offline caching
- App icons
- Maskable icons
- Apple touch icon
- Windows tile icons
- Theme color
- Background color
- Standalone display
- Portrait orientation
- App update detection
- Offline-ready toast
- Install prompt
- Browser notifications

See [PWA Guide](docs/pwa-guide.md) and [Offline Guide](docs/offline-guide.md).

## Notifications

Study reminders are local browser notifications. They are requested only when reminders are enabled in Settings.

Default reminder schedule:

- Weekdays: 11:00 PM
- Weekends: 10:00 AM, 2:00 PM, 11:00 PM

The notification opens EngineerOS to the calendar/focus session path. Snooze is handled by the service worker when notification actions are supported by the browser.

## Local Data

No backend is required. EngineerOS stores study progress, interview preparation, calendar session state, settings, and notes locally using Local Storage and IndexedDB.

## Suggested Repository Setup

```bash
git init
git add .
git commit -m "Build EngineerOS PWA"
git branch -M main
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```

After the push, the workflow in `.github/workflows/deploy.yml` handles deployment.
