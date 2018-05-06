<template>
  <div class="main single"
       v-if='main.single.acf'>
    <div class='main__cluster main__cluster--1'>
      <p v-html='main.single.title.rendered' />
    </div>
    <div v-for='(image, index) in main.single.acf.images'
        :key='image.id'
        :class='"main__cluster--" + (index + 2)'>
        <img class='main__cluster__image' :src='image.image.sizes["pwr-small"]' />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import field from '../components/field'

export default {
  name: 'single',
  components: {
    field
  },
  computed: {
    ...mapState(['main'])
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_grid.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/_variables.scss';
@import '../style/_main.scss';
</style>
