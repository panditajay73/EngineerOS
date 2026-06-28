# Offline Guide

EngineerOS is local-first and works offline after the first successful production load.

## What Is Cached

The service worker caches:

- HTML
- CSS
- JavaScript
- Images
- Icons
- Fonts
- Manifest
- Static assets

## Local Study Data

Previously loaded study data is stored locally:

- Calendar session state: IndexedDB
- Interview preparation progress: IndexedDB
- DSA document URL setting: Local Storage
- Study progress: Local Storage
- Notes and revision metadata: IndexedDB

## First Load Requirement

Open EngineerOS online once after deployment. The service worker installs and caches the application shell.

After that, the app can open offline from:

- Browser history
- Installed app icon
- Home screen shortcut

## External Links

External resources such as YouTube, Microsoft Learn, Google Docs, and official documentation still require internet access. The app itself and previously stored progress remain available offline.

## Notifications Offline

Local browser notifications can fire while the app is open and permission is granted. Browser behavior varies for closed PWAs, especially on iOS. For the best behavior, install EngineerOS and allow notifications at the operating-system level.
