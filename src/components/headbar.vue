<template>
  <div class="main__cluster main__cluster--home">
    <router-link class='headbar__item'
                 :to="{ name: 'main' }">
                 Artyom Kocharyan
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'headbar'
}
</script>

<style lang="scss">
.headbar {
  text-align: center;
}
</style>
