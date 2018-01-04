<template>
  <div class="footbar">
    <router-link :to="{ name: 'main', hash: '#burial' }">Burial Artyomovich</router-link>
  </div>
</template>

<script>
export default {
  name: 'footbar'
}
</script>

<style lang="scss">
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/_variables.scss';

.footbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  text-align: right;
  font-family: 'Times New Roman';
  font-size: $font-size;
  line-height: $line-height * 1.5;
  height: $line-height * 1.5;
  cursor: pointer;
}
</style>
