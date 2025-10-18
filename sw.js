let lastKnownStates = {};
let notificationSubscriptions = [];

self.addEventListener('install', () => {
    // Force the waiting service worker to become the active service worker.
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    // Take control of all clients as soon as the service worker activates.
    event.waitUntil(clients.claim());
});

self.addEventListener('message', event => {
    const { type, payload } = event.data;

    if (type === 'UPDATE_SUBSCRIPTIONS') {
        notificationSubscriptions = payload || [];
    }

    if (type === 'UPDATE_STATES') {
        const newStates = payload;
        if (notificationSubscriptions.length > 0 && Object.keys(lastKnownStates).length > 0) {
            notificationSubscriptions.forEach(gameName => {
                const currentState = newStates[gameName];
                const previousState = lastKnownStates[gameName];

                // Check for the specific transition from 'low' to 'high' phase
                if (currentState && previousState && previousState.phase === 'low' && currentState.phase === 'high') {
                    const title = '🚀 Oportunidade Detectada!';
                    const options = {
                        body: `O jogo ${gameName} acabou de entrar em fase de alta! Abra o app e gere um sinal.`,
                        icon: '/vite.svg',
                        badge: '/vite.svg',
                        tag: `phase-change-${gameName}`, // Use a tag to prevent duplicate/stale notifications
                        data: {
                            url: self.location.origin 
                        }
                    };
                    self.registration.showNotification(title, options);
                }
            });
        }
        // Always update to the latest state
        lastKnownStates = newStates;
    }
});


self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
          // If a window for the app is already open, focus it.
          if (clientList.length > 0) {
              let client = clientList[0];
              for (let i = 0; i < clientList.length; i++) {
                  if (clientList[i].focused) {
                      client = clientList[i];
                  }
              }
              return client.focus();
          }
          // Otherwise, open a new window.
          return clients.openWindow(event.notification.data.url || '/');
      })
  );
});