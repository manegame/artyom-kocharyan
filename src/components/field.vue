<template>
  <div class="field">
    <router-link v-if='$route.name === "new single" || $route.name === "info"' class="temp" :to="{ name: 'info', params: {slug: post.slug} }">{{post.title.rendered}} info</router-link>
    <div class="field__items"
         :class='{"field__items--collapsed": this.$route.name === "info"}'>
      <img class="field__items__image"
           v-if='post.acf.images !== undefined'
           v-for='i in post.acf.images'
           :src='i.image.sizes["medium"]'/>
    </div>
    <template v-if='$route.name === "new single" || $route.name === "info"'>
      <div class="field__info"
           :class='{"field__info--active": $route.name === "info"}'>
        <p v-html='post.acf.description' />
      </div>
    </template>
  </div>
</template>

<script>
import TWEEN from 'tween.js'

export default {
  name: 'field',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      translation: 400,
      animatedTranslation: 0
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
@import '../style/helpers/_reset.css';
@import '../style/_variables.scss';

.temp {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
}

.field {
  color: black;
  width: 100%;
  height: 100%;
  padding: 20px;
  cursor: pointer;
  background: $white;
  transition: background 0.3s ease-in;

  &:hover {
    background: rgb(255, 247, 232);
  }

  &__items {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease-in;

    &__image {
      width: 20%;
      height: auto;
    }

    &--collapsed {
      width: 50%;
      right: 0;
    }
  }

  &__info {
    position: absolute;
    width: 50%;
    height: 100%;
    background: $white;
    top: 0;
    left: -50%;
    transition: left 0.3s ease-in;
    z-index: 9999999;

    &--active {
      left: 0;
    }
  }
}
</style>
