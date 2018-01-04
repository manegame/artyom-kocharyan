<template>
  <div class="scatter__cell__inner"
       :style='{
          transform: "rotate(" + randomRotation + "deg) translate(" + animatedTranslation + "px) rotate(-" + randomRotation + "deg)"
         }'>
    <img class="scatter__cell__inner__image"
        :src='image.image.sizes["pwr-medium"]'/>
  </div>
</template>

<script>
import TWEEN from 'tween.js'

export default {
  name: 'piece',
  data() {
    return {
      translation: 0,
      animatedTranslation: 0
    }
  },
  props: {
    image: {
      type: Object,
      required: true
    }
  },
  methods: {
    done() {
      this.translation = this.randomTranslation()
    },
    randomTranslation() {
      return Math.floor(Math.random() * 120)
    }
  },
  computed: {
    randomRotation() {
      return Math.floor(Math.random() * 360)
    }
  },
  watch: {
    translation(newValue, oldValue) {
      let vm = this
      function animate() {
        if (TWEEN.update()) {
          window.requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween({ tweenTranslation: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweenTranslation: newValue }, 1000 + Math.floor(Math.random() * 1000))
        .onUpdate(function () {
          vm.animatedTranslation = this.tweenTranslation.toFixed(0)
        })
        .start()
        // .onComplete(this.done)
      animate()
    }
  },
  mounted() {
    this.translation = this.randomTranslation()
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.scatter__cell__inner {
  height: 60px;
  width: 100px;
  margin: -30px -50px;
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid transparent;

  &__image {
    height: 100%;
    width: auto;
    display: block;
    margin: 0 auto;
    object-fit: contain;
  }
}
</style>
