<template>
  <div class='popup' @touchmove.stop.prevent :class='{"popup--left": user && left, "popup--right": user && !left}'>

    <div class="popup__slideshow" @click='userTakeOver'>
      <img class="popup__slideshow__image" :src='images[index].url'/>
      <span class="popup__slideshow__close" @click='$emit("close")'>esc</span>
    </div>

  </div>
</template>

<script>
// import GIF from 'gif.js.optimized'

export default {
  name: 'slide-show',
  data() {
    return {
      index: this.count,
      interval: '',
      user: false,
      left: true,
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
    }
  },
  methods: {
    go () {
      const self = this
      this.interval = setInterval(() => {
        self.next()
      }, 1000)
    },
    arrows(event) {
      if (event.clientX > this.w / 2) this.left = false
      else this.left = true
    },
    userTakeOver(event) {
      if (!this.user) {
        window.addEventListener('mousemove', this.arrows)
        clearInterval(this.interval)
        this.user = true
      } else {
        if (event.clientX > this.w / 2) {
          this.next()
        } else {
          this.previous()
        }
      }
    },
    navigation(event) {
      if (event.keyCode === 37) this.previous()
      if (event.keyCode === 39) this.next()
      if (event.keyCode === 27) {
        this.$emit('close')
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
    this.go()
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
  cursor: url('../../static/pause@2x.png'), pointer;

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
