<template>
  <div class="head-bar">
    <router-link :to="{ name: 'main' }">Artyom Kocharyan</router-link>
  </div>
</template>

<script>
export default {
  name: 'head-bar'
}
</script>

<style>
.head-bar {
  z-index: 1000;
}
</style>
