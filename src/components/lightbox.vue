<template>
  <div class='lightbox main__cluster--lightbox'
      v-if='main.single.acf'>
    <tiny-slider  :mouse-drag="true" 
                  :loop="false"
                  :autoplay="true"
                  :autoplayTimeout="3000" 
                  gutter="20">
      <div v-for='(image, index) in main.single.acf.images'
           :key='index'>
        <img class='lightbox__image' 
            v-if='image.image !== false' 
            :src='image.image.sizes["pwr-large"]'>
        <p class='lightbox__text' v-else>Hey guys, seems to be no pic here. ¯\_(ツ)_/¯</p>
      </div>
    </tiny-slider>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import VueTinySlider from 'vue-tiny-slider'

export default {
  name: 'lightbox',
  components: {
    'tiny-slider': VueTinySlider
  },
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
@import '../style/vendor/tiny-slider.css';

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
