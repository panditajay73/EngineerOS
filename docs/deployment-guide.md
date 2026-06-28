# Deployment Guide

EngineerOS is configured for GitHub Pages deployment through GitHub Actions.

## One-Time GitHub Setup

1. Push the project to a GitHub repository.
2. Open the repository on GitHub.
3. Go to Settings -> Pages.
4. Under Build and deployment, set Source to GitHub Actions.
5. Push to the `main` branch.

The workflow at `.github/workflows/deploy.yml` deploys automatically.

## Deployment Workflow

On every push to `main`, GitHub Actions runs:

```bash
npm ci
npm run lint
npm run build:github
```

Then it uploads `dist` and deploys it to GitHub Pages.

## Vite Base Path

The Vite config automatically detects the GitHub repository name through `GITHUB_REPOSITORY`.

For a project repository:

```text
https://<user>.github.io/<repo>/
```

The generated base path becomes:

```text
/<repo>/
```

For a user site repository ending in `.github.io`, the base path remains:

```text
/
```

## Manual Build Check

Before pushing, you can verify locally:

```bash
npm run lint
npm run build:github
```

## No Manual Deployment Needed

Do not copy files to `gh-pages` manually. The GitHub Actions workflow is the source of truth.
