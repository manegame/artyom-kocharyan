<template>
  <div class='lightbox main__cluster--lightbox'
      v-if='main.single.acf'
      @click='$emit("navigate", $event)'>
    <tiny-slider  ref='tinySlider'
                  :mouse-drag="false"
                  :controls='false'
                  :loop="main.single.acf.slideshow === 'autoplay'"
                  :autoplay="main.single.acf.slideshow === 'autoplay'"
                  :autoplayTimeout="3000"
                  gutter="0">
      <div  class='lightbox__slide'
            v-for='(image, index) in main.single.acf.images'
            :key='index'>
        <img  class='lightbox__slide__image'
              :src='image.image.sizes["pwr-large"]'>
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
  mounted() {
    this.$refs.tinySlider.slider.goTo(this.$route.params.index)
  },
  beforeUpdate() {
    this.$refs.tinySlider.slider.goTo(this.$route.params.index)
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

  &__text {
    text-align: center;
    vertical-align: center;
  }

  &__slide {
    height: 100%;
    background: $white;
    padding: $line-height;

    &__image {
      width: calc(100% - #{$line-height});
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
