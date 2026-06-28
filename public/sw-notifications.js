/* global self, setTimeout */

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const notificationData = event.notification.data || {};
  const targetUrl = notificationData.url || self.registration.scope;
  const iconUrl = `${self.registration.scope}icon-192.png`;
  const badgeUrl = `${self.registration.scope}maskable-icon-192.png`;

  if (event.action === "snooze") {
    event.waitUntil(
      new Promise((resolve) => {
        setTimeout(() => {
          self.registration
            .showNotification("Time to Study", {
              body: "Your scheduled EngineerOS study session starts now.",
              icon: iconUrl,
              badge: badgeUrl,
              data: { url: targetUrl },
              actions: [
                { action: "start-session", title: "Start Session" },
                { action: "snooze", title: "Snooze" }
              ]
            })
            .finally(resolve);
        }, 10 * 60 * 1000);
      })
    );
    return;
  }

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      const existingClient = clients.find((client) => client.url.includes(self.registration.scope));

      if (existingClient) {
        existingClient.focus();
        existingClient.navigate(targetUrl);
        return;
      }

      self.clients.openWindow(targetUrl);
    })
  );
});
