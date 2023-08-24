<script setup>
const autorization = ref(Notification.permission)
const erreur = ref('')
const { $pwa } = useNuxtApp()

onMounted(() => {
  if ($pwa.offlineReady) {
    // Pas encore réussi à l'afficher
    console.log('App ready to work offline')
  }
})

function activateNotifications() {
  if (!('Notification' in window)) {
    erreur.value = 'Votre navigateur ne supporte pas les notifications'
  } else {
    Notification.requestPermission().then((permission) => {
      autorization.value = permission
    })
  }
}

function createNotification() {
  // Envoyer une notification basique
  const notification = new Notification('Notif de test', {
    body: `Ma première notification`,
    icon: '/icons/icon_144x144.png',
  })
}

function createNotificationSW() {
  // Envoyer un msg au service worker pour que ce dernier affiche une notification
  if (navigator.serviceWorker) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.active.postMessage({
        action: 'showNotification',
        title: 'Notification SW',
        message: 'Notification déclenchée par le service worker.',
      })
    })
  }
}
</script>

<template>
  <div>
    <VitePwaManifest />
    <div v-if="erreur">{{ erreur }}</div>
    <div v-else>
      <div v-if="autorization === 'default'">
        <label for="notif_autorization">Voulez-vous autoriser les notifications ?</label>
        <button id="notif_autorization" @click="activateNotifications()">Oui</button>
      </div>
      <div v-if="autorization === 'granted'">
        <div>
          <button @click="createNotification()">Lancer une notification</button>
        </div>
        <br />
        <div>
          <button @click="createNotificationSW()">Lancer un msg au wervice worker</button>
        </div>
      </div>
      <div v-if="autorization === 'denied'">Vous avez refusé les notifications</div>
      <!-- Pas encore réussi à l'afficher -->
      <div v-show="$pwa.needRefresh">
        <span> New content available, click on reload button to update. </span>
        <button @click="$pwa.updateServiceWorker()">Reload</button>
      </div>
    </div>
  </div>
</template>
