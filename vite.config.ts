import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "StudyPlanner";
const isUserSite = repositoryName.endsWith(".github.io");
const isGitHubPagesBuild =
  process.env.GITHUB_PAGES === "true" ||
  process.env.npm_lifecycle_event === "build:github";
const appBase = isGitHubPagesBuild && !isUserSite ? `/${repositoryName}/` : "/";
const appVersion = process.env.npm_package_version ?? "0.1.0";

export default defineConfig({
  base: appBase,
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  },
  plugins: [
    react(),
    VitePWA({
      manifestFilename: "manifest.webmanifest",
      registerType: "prompt",
      includeAssets: [
        "favicon.svg",
        "favicon-16x16.png",
        "favicon-32x32.png",
        "apple-touch-icon.png",
        "browserconfig.xml",
        "sw-notifications.js",
        "icon-192.png",
        "icon-512.png",
        "maskable-icon-192.png",
        "maskable-icon-512.png",
        "mstile-70x70.png",
        "mstile-150x150.png",
        "mstile-310x310.png",
        "mstile-310x150.png",
        "splash-1170x2532.png"
      ],
      manifest: {
        name: "EngineerOS",
        short_name: "EngineerOS",
        description: "90-Day Software Engineer Study Planner",
        theme_color: "#0F172A",
        background_color: "#020617",
        display: "standalone",
        orientation: "portrait",
        scope: appBase,
        start_url: appBase,
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "maskable-icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "maskable-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        globPatterns: ["**/*.{js,css,html,svg,png,ico,json,webmanifest,woff,woff2}"],
        importScripts: ["sw-notifications.js"],
        navigateFallback: `${appBase}index.html`,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "engineeros-pages",
              networkTimeoutSeconds: 3
            }
          },
          {
            urlPattern: ({ request }) =>
              ["script", "style", "worker"].includes(request.destination),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "engineeros-assets"
            }
          },
          {
            urlPattern: ({ request }) =>
              ["image", "font"].includes(request.destination),
            handler: "CacheFirst",
            options: {
              cacheName: "engineeros-static",
              expiration: {
                maxEntries: 120,
                maxAgeSeconds: 60 * 60 * 24 * 180
              }
            }
          },
          {
            urlPattern: ({ request }) => request.destination === "manifest",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "engineeros-manifest"
            }
          },
          {
            urlPattern: ({ url }) => url.origin === "https://fonts.googleapis.com",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "engineeros-font-styles"
            }
          },
          {
            urlPattern: ({ url }) => url.origin === "https://fonts.gstatic.com",
            handler: "CacheFirst",
            options: {
              cacheName: "engineeros-font-files",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
