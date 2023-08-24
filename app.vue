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
  const notification = new Notification('Test', {
    body: `Ma première notification`,
    icon: '/icons/icon_144x144.png',
  })
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
        <button @click="createNotification()">Lancer une notification</button>
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
