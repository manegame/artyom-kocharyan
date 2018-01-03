<template>
  <div class='popup' @touchmove.stop.prevent
                    :class='{
                      "popup--single": !left,
                      "popup--left": !autoplay && left,
                      "popup--right": !autoplay && !left,
                      "popup--autoplay": autoplay,
                      "popup--autoplay--paused": autoplay && paused}'>
    <div    class="popup__slideshow"
            @click='navigation'>
      <img  class="popup__slideshow__image"
            :src='images[index].url'/>
      <span class="popup__slideshow__close"
            @click='$emit("close")'
            v-html='"esc"'/>
    </div>
  </div>
</template>

<script>
// import GIF from 'gif.js.optimized'

export default {
  name: 'slideshow',
  data() {
    return {
      index: this.count,
      interval: '',
      left: true,
      user: false,
      paused: false,
      w: window.innerWidth
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
    },
    slideshow: {
      type: String,
      required: true
    }
  },
  methods: {
    go () {
      const self = this
      this.interval = setInterval(() => {
        if (!this.paused) {
          self.next()
        }
      }, 1000)
    },
    arrows(event) {
      if (this.images !== 1) {
        if (event.clientX > this.w / 2) this.left = false
        else this.left = true
      }
    },
    navigation(event) {
      if (this.autoplay) {
        this.paused = !this.paused
      } else {
        if (event.keyCode === 37 || event.clientX < this.w / 2) this.previous()
        if (event.keyCode === 39 || event.clientX > this.w / 2) this.next()
        if (event.keyCode === 27) this.$emit('close')
      }
    },
    previous() {
      console.log(this.index)
      if (this.index > 0) {
        this.index--
      } else {
        this.index = this.max - 1
      }
    },
    next() {
      console.log(this.index)
      if (this.index < this.max - 1) {
        this.index++
      } else {
        this.index = 0
      }
    }
  },
  computed: {
    autoplay() {
      if (this.slideshow === 'autoplay') return true
      else if (this.images.length === 1) return false
      else {
        window.addEventListener('mousemove', this.arrows)
        return false
      }
    },
    max() {
      return this.images.length
    }
  },
  created() {
    window.addEventListener('keydown', this.navigation)
    if (!this.$route.params.count) {
      this.$route.params.count = 0
    }
  },
  mounted() {
    if (this.autoplay) this.go()
    else this.user = true
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.arrows)
    window.removeEventListener('keydown', this.navigation)
    clearInterval(this.interval)
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.popup {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.4);

  &--autoplay {
    cursor: url('../../static/pause@2x.png'), pointer;

    &--paused {
      cursor: pointer;
    }
  }

  &--right {
    cursor: e-resize;
  }

  &--left {
    cursor: w-resize;
  }

  &__slideshow {
    width: 100vw;
    height: 100vh;
    background: transparent;

    &__close {
      color: $black;
      display: block;
      padding-top: 12px;
      padding-left: $line-height;
      cursor: nw-resize;

      @include no-select;
    }

    &__image {
      max-width: 90vmin;
      max-height: 90vh;

      @include center;
    }
  }
}
</style>
