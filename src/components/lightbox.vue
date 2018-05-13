<template>
  <div class='lightbox main__cluster--lightbox'
      v-if='main.single.acf'>
    <img class='lightbox__image' 
        v-if='main.single.acf.images[$route.params.index].image !== false' 
        :src='main.single.acf.images[$route.params.index].image.sizes["pwr-large"]'>
    <p class='lightbox__text' v-else>Hey guys, seems to be no pic here. ¯\_(ツ)_/¯</p>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'lightbox',
  computed: {
    ...mapState(['main'])
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.lightbox {
  background: $white;
  z-index: 10;

  &__next,
  &__prev {
    z-index: 11;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__text {
    text-align: center;
    vertical-align: center;
  }
}
</style>
