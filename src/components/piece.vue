<template>
  <div class="scatter__cell__inner"
       :style='{
          transform: "rotate(" + randomRotation + "deg) translate(" + animatedTranslation + "px) rotate(-" + randomRotation + "deg)"
         }'>
    <!-- burial -->
    <div class="scatter__cell__inner__video"
         v-if='type === "burial"'>
      <akYoutubeEmbed :video='video'/>
    </div>
    <!-- images -->
    <img v-if='type === "images"'
        class="scatter__cell__inner__image"
        :src='image.image.sizes["artyom-small"]'/>
    <!-- svg -->
    <img v-if='type === "svg"'
        class="scatter__cell__inner__image"
        :src='image'/>
  </div>
</template>

<script>
import TWEEN from 'tween.js'
import akYoutubeEmbed from '../components/ak-youtube-embed'

export default {
  name: 'piece',
  components: {
    akYoutubeEmbed
  },
  data() {
    return {
      translation: 400,
      animatedTranslation: 0
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
    image: {
      type: [Object, String],
      required: false
    },
    video: {
      type: String,
      required: false
    }
  },
  methods: {
    randomTranslation(min, max) {
      return min + Math.floor(Math.random() * max)
    }
  },
  computed: {
    randomRotation() {
      return Math.floor(Math.random() * 360)
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === 'single') {
        // this.translation = this.randomTranslation(300, 400)
      }
      if (to.name === 'akMain') {
        this.translation = this.randomTranslation(20, 120)
      }
    },
    translation(newValue, oldValue) {
      let vm = this
      function animate() {
        if (TWEEN.update()) {
          window.requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween({ tweenTranslation: oldValue })
        .easing(TWEEN.Easing.Exponential.InOut)
        .to({ tweenTranslation: newValue }, 5000 + Math.floor(Math.random() * 3000))
        .onUpdate(function () {
          vm.animatedTranslation = this.tweenTranslation.toFixed(0)
        })
        .start()
      animate()
    }
  },
  mounted() {
    this.translation = this.randomTranslation(20, 120)
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_transitions.scss';
@import '../style/_variables.scss';

.scatter__cell__inner {
  position: absolute;
  height: 60px;
  width: 100px;
  margin: -30px -50px;
  top: 50%;
  left: 50%;

  &--large {
    $height: calc(400px * (9 / 16));

    width: 400px;
    height: $height;
    margin: -200px calc(-1 * (#{$height} / 2));
  }

  &__image {
    height: 100%;
    width: auto;
    display: block;
    margin: 0 auto;
    object-fit: contain;
  }
}
</style>
