<template>
  <div class='popup' @touchmove.stop.prevent>
    <div class='popup__slideshow'>

      <div class="popup__slideshow__nav" v-if="max > 1">
        <a class='popup__slideshow__nav__button--previous' @click='previous'></a>
        <a class='popup__slideshow__nav__button--next' @click='next'></a>
      </div>

      <div class="popup__slideshow__top">
        <img class='popup__slideshow__top__image' :src='images[index].url'>
      </div>

      <div class="popup__slideshow__bottom">
        <div class="popup__slideshow__bottom__caption">
          <p class="popup__slideshow__bottom__caption__text">
            <span class="popup__slideshow__bottom__caption__text--counter" v-if="max > 1">
              <span v-html='index+1'></span>
              /
              <span v-html='max'></span>
            </span>
            <span class="popup__slideshow__bottom__caption__text--caption" v-html='captions[index]'></span>
          </p>
        </div>

        <bacShare />
      </div>

    </div>

    <p class="popup__close--slideshow" @click='$emit("close")'>
      <a>close</a>
    </p>

  </div>
</template>

<script>
import reframe from 'reframe.js'

export default {
  name: 'slide-show',
  data() {
    return {
      index: this.count
    }
  },
  props: {
    images: {
      type: Array,
      required: false
    },
    count: {
      type: Number,
      required: false
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
    window.addEventListener('keydown', this.navigation)
  },
  mounted() {
    this.$nextTick(() => reframe('iframe'))
  },
  watch: {
    index: function() {
      console.log('Im watching u')
      this.$nextTick(() => reframe('iframe'))
    }
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
</style>
