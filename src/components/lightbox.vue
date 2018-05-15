<template>
  <div class='lightbox'
      v-if='main.single.acf'>
    <tiny-slider  ref='tinySlider'
                  class='lightbox__slider'
                  :mouse-drag="false"
                  :controls='false'
                  :autoplayHoverPause='true'
                  :autoplayButtonOutput='false'
                  :loop="main.single.acf.slideshow === 'autoplay'"
                  :autoplay="main.single.acf.slideshow === 'autoplay'"
                  :autoplayTimeout="3000"
                  gutter="0">
      <div  class='lightbox__slider__slide'
            v-for='(image, index) in main.single.acf.images'
            :key='index'>
        <img  class='lightbox__slider__slide__image'
              :src='small ? image.image.sizes["pwr-medium"] : image.image.sizes["pwr-large"]'
              @click='handleNav($event)' />
      </div>
    </tiny-slider>
    <!-- CONTROLS -->
    <div class='lightbox__close'>
      <router-link :to='{name: "single", params: {slug: main.single.slug}}'>Close</router-link>
    </div>
    <template v-if='main.single.acf.slideshow === "user" && small'>
      <div class='lightbox__previous'>
        <router-link v-if='$route.params.index > 0' :to='{name: "lightbox", params: {index: prevIndex}}'>Previous</router-link>
      </div>
      <div class='lightbox__next'>
        <router-link v-if='$route.params.index < main.single.acf.images.length - 1' :to='{name: "lightbox", params: {index: nextIndex}}'>Next</router-link>
      </div>
    </template>
    <!-- <template v-else-if='main.single.acf.slideshow === "autoplay"'>
      <div class='lightbox__playback'>
        <a @click.prevent='handlePlayback'>Stop</a>
      </div>
    </template> -->
    <template v-else>
      arrows
    </template>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import VueTinySlider from 'vue-tiny-slider'

export default {
  name: 'lightbox',
  data () {
    return {
      small: null
    }
  },
  components: {
    'tiny-slider': VueTinySlider
  },
  computed: {
    ...mapState(['main']),
    nextIndex() {
      if (this.$route.name === 'lightbox') {
        let max = this.main.single.acf.images.length - 1 // base 0
        let next = Number(this.$route.params.index + 1)
        console.log(next, max)
        if (next <= max) return next
        else return max
      }
    },
    prevIndex() {
      if (this.$route.name === 'lightbox') {
        let min = 0
        let prev = Number(this.$route.params.index - 1)
        if (prev >= min) return prev
        else return 0
      }
    }
  },
  methods: {
    handleNav(event) {
      if (event.clientX < window.innerWidth / 2) {
        this.$router.push({
          name: 'lightbox', params: { index: this.prevIndex }
        })
      } else {
        this.$router.push({
          name: 'lightbox', params: { index: this.nextIndex }
        })
      }
    },
    checkWindow() {
      if (window.innerWidth < 900) this.small = true
      else this.small = false
    }
  },
  mounted() {
    this.checkWindow()
    this.$refs.tinySlider.slider.goTo(this.$route.params.index)
    window.addEventListener('resize', this.checkWindow)
  },
  beforeUpdate() {
    this.$refs.tinySlider.slider.goTo(this.$route.params.index)
  },
  destroyed() {
    window.removeEventListener('resize', this.checkWindow)
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';
@import '../style/vendor/tiny-slider.css';

.lightbox {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: $white;

  &__close,
  &__playback {
    position: absolute;
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__close {
    top: 0;
    right: 0;
    width: 20vw;

    @include screen-size('small') {
      width: 40vw;
    }
  }

  &__playback {
    bottom: 0;
    right: 0;
    width: 40vw;
  }

  &__slider {
    width: 100vw;
    height: 60vh;
    position: absolute;
    top: 20vh;

    &:hover {
      background: #e4e4e4;
      cursor: pointer;
    }

    &__slide {
      height: 100%;
      padding: $line-height;

      &__image {
        width: calc(100% - #{$line-height});
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
