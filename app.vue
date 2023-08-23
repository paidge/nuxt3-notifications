<template>
  <div>
    <VitePwaManifest />
    <div :style="{ display: autorization ? 'block' : 'none' }">
      <button @click="createNotification()">Lancer une notification</button>
    </div>
  </div>
</template>

<script setup>
const autorization = ref(false)

onMounted(() => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications.')
  } else {
    Notification.requestPermission().then((permission) => {
      autorization.value = Notification.permission === 'granted'
    })
  }
})

function createNotification() {
  console.log('launch notif')
  const img = '/icons/icon_144x144.png'
  const text = `Ma première notification`
  const notification = new Notification('Test', {
    body: text,
    icon: img,
  })
}
</script>
