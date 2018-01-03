<template>
  <div class="headbar">
    <router-link :to="{ name: 'main' }">Artyom Kocharyan</router-link>
  </div>
</template>

<script>
export default {
  name: 'headbar'
}
</script>

<style>
.headbar {
  position: fixed;
}
</style>
