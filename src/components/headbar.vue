<template>
  <div class="main__cluster main__cluster--home">
    <router-link class='headbar__item'
                 :to="{ name: 'main' }">
                 Artyom <br>
                 Kocharyan
    </router-link>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'headbar'
}
</script>

<style lang="scss">
.headbar {
  text-align: center;
}
</style>
