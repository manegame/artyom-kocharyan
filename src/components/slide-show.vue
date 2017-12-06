<template>
  <div class='popup' @touchmove.stop.prevent>

    <div class="popup__slideshow">
      <img class="popup__slideshow__image" :src='images[index].url'/>
      <span class="popup__slideshow__close" @click='$emit("close")'>escape</span>
    </div>

  </div>
</template>

<script>
// import GIF from 'gif.js.optimized'

export default {
  name: 'slide-show',
  data() {
    return {
      index: this.$route.params.count,
      interval: ''
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
    navigation(event) {
      if (event.keyCode === 37) this.previous()
      if (event.keyCode === 39) this.next()
      if (event.keyCode === 27) {
        this.$emit('close')
        console.log('ja')
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
  z-index: 100;

  &__slideshow {
    width: 100vw;
    height: 100vh;
    background: $black;

    &__close {
      color: $white;
      padding: 6px 3px;
      background-color: rgb(113, 49, 7);
      border-radius: 3px;

      @include no-select;
    }

    &__image {
      max-width: 90vmin;

      @include center;
    }
  }
}
</style>
