export type PwaInstallState = "installed" | "installable" | "manual" | "unknown";

export type PwaStatus = {
  installationStatus: PwaInstallState;
  pwaStatus: string;
  notificationPermission: NotificationPermission | "unsupported";
  offlineCacheStatus: string;
  currentVersion: string;
  lastUpdate: string;
};

function isIosSafari() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIos = /iphone|ipad|ipod/.test(userAgent);
  const isSafari = /safari/.test(userAgent) && !/crios|fxios|edgios/.test(userAgent);
  return isIos && isSafari;
}

export function isStandaloneDisplay() {
  const navigatorWithStandalone = window.navigator as Navigator & {
    standalone?: boolean;
  };

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    navigatorWithStandalone.standalone === true
  );
}

export function getManualInstallMessage() {
  if (isIosSafari()) {
    return "On iPhone Safari, tap Share, then Add to Home Screen to install EngineerOS.";
  }

  return "If the install prompt is unavailable, open your browser menu and choose Install app or Add to Home screen.";
}

export async function getPwaStatus(): Promise<PwaStatus> {
  const cacheNames = "caches" in window ? await caches.keys() : [];
  const hasController = Boolean(navigator.serviceWorker?.controller);
  const notificationPermission =
    "Notification" in window ? Notification.permission : "unsupported";

  return {
    installationStatus: isStandaloneDisplay() ? "installed" : "unknown",
    pwaStatus: "serviceWorker" in navigator
      ? hasController
        ? "Controlled by service worker"
        : "Service worker supported"
      : "Service worker unsupported",
    notificationPermission,
    offlineCacheStatus:
      cacheNames.length > 0
        ? `${cacheNames.length} cache ${cacheNames.length === 1 ? "bucket" : "buckets"} ready`
        : "Cache warming after first production load",
    currentVersion: __APP_VERSION__,
    lastUpdate: new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date(__BUILD_TIME__))
  };
}
