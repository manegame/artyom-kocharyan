<template>
  <div class='lightbox main__cluster--lightbox'
      v-if='main.single.acf'>
    <img class='lightbox__image' :src='main.single.acf.images[$route.params.index].image.sizes["pwr-large"]'>
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
  overflow: hidden;

  &__next,
  &__prev {
    z-index: 11;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
