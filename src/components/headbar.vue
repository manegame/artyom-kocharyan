<template>
  <div class="headbar">
    <router-link :to="{ name: 'main' }">Artyom Kocharyan</router-link>
    <!-- <router-link :to="{ name: 'burial' }">Burial Artyomovich</router-link> -->
  </div>
</template>

<script>
export default {
  name: 'headbar'
}
</script>

<style lang="scss">
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/_variables.scss';

.headbar {
  position: fixed;
  width: 100%;
  padding: 0 20px;
  text-align: right;
  font-family: 'Times New Roman';
  font-size: $font-size;
  line-height: $line-height * 1.5;
  cursor: pointer;
}
</style>
