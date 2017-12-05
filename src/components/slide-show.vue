<template>
  <div class='popup' @touchmove.stop.prevent>

    <div class="popup__slideshow">
      {{index}}
      <img class="popup__slideshow__image" :src='images[index].url'/>
      <span class="popup__close--slideshow" @click='$emit("close")'>close</span>
    </div>

  </div>
</template>

<script>
import GIF from 'gif.js.optimized'

export default {
  name: 'slide-show',
  data() {
    return {
      index: this.$route.params.count
    }
  },
  props: {
    images: {
      type: Array,
      required: false
    },
    count: {
      type: Number,
      required: true
    }
  },
  methods: {
    navigation(event) {
      if (event.keyCode === 37) this.previous()
      if (event.keyCode === 39) this.next()
      if (event.keyCode === 27) this.$emit('close')
    },
    previous() {
      if (this.index > 0) {
        this.index--
      } else {
        this.index = this.max
      }
    },
    next() {
      if (this.index < this.max - 1) {
        this.index++
      } else {
        this.index = 0
      }
    }
  },
  computed: {
    max() {
      return this.images.length
    }
  },
  created() {
    if (!this.$route.params.count) {
      this.$route.params.count = 0
    }
  },
  mounted() {
    let gif = new GIF({
      workers: 2,
      quality: 10
    })
    for (let i = 0; i < this.images.length; i++) {
      let img = document.createElement('img')
      img.src = this.images[i].url
      gif.addFrame(img)
    }
    gif.on('finished', function(blob) {
      console.log('gif finished!')
      window.open(window.URL.createObjectURL(blob))
    })
    gif.render()
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.navigation)
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.popup {
  position: fixed;

  &__slideshow {
    width: 100vw;
    height: 100vh;

    &__image {
      max-width: 90vmin;

      @include center;
    }
  }
}
</style>
