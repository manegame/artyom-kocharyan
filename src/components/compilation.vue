<template>
  <transition appear>
    <div class="compilation" :class='{"compilation--blur": slideshowActive}' v-if='!zoom'>
      <p class="compilation__title" v-html='content.title.rendered' @click='zoom = !zoom'></p>
      <ul class="compilation__circle" :class='"compilation__circle--" + content.acf.images.length + ""'>
        <li :class='"compilation__circle--" + content.acf.images.length + "__item"' @click='openSlideshow(0)' v-for='img in content.acf.images'>
          <img :class='"compilation__circle--" + content.acf.images.length + "__item__image"' :src='img.image.sizes["pwr-medium"]' alt="..."/>
        </li>
      </ul>

      <slideShow v-if='$route.hash.substring(1) === "images" && $route.params.id === content.title.rendered' :images='slideshowImages()' :count='0' :slideshow='content.acf.slideshow' @open='openSlideshow' @close='removeHash'/>
    </div>

    <div class="compilation--single" :class='{"compilation--blur": slideshowActive}' v-else>
      <ul class="compilation--single__circle" :class='"compilation--single__circle--" + content.acf.images.length + ""'>
        <li :class='"compilation--single__circle--" + content.acf.images.length + "__item"' @click='openSlideshow(0)' v-for='img in content.acf.images'>
          <img :class='"compilation--single__circle--" + content.acf.images.length + "__item__image"' :src='img.image.sizes["pwr-medium"]' alt="..."/>
        </li>
      </ul>

      <p class="compilation--single__text" v-if='content.acf.description !== ""'>
        <span class="compilation--single__text--body" v-if='showText' v-html='content.acf.description'></span><br/>
        <span class="compilation--single__text--call" v-html='textCall' @click='showText = !showText'></span>
      </p>
      <p class="compilation--single__title" v-html='content.title.rendered' @click='zoom = !zoom'></p>

      <slideShow v-if='$route.hash.substring(1) === "images" && $route.params.id === content.title.rendered' :images='slideshowImages()' :count='0' :slideshow='content.acf.slideshow' @open='openSlideshow' @close='removeHash'/>
    </div>
  </transition>
</template>

<script>
import {mapState} from 'vuex'
import slideShow from '../components/slide-show'

export default {
  name: 'compilation',
  components: {
    slideShow
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      count: 0,
      slideshowActive: false,
      zoom: false,
      showText: false,
      textCall: 'read'
    }
  },
  computed: {
    ...mapState(['main'])
  },
  methods: {
    openSlideshow(index) {
      this.slideshowActive = true
      this.$router.push({name: this.$route.name, hash: '#images', params: {id: this.content.title.rendered}})
    },
    removeHash() {
      this.$router.push({name: 'main', hash: '', params: {slug: this.$route.params.slug}})
      this.slideshowActive = false
    },
    enlarge() {
      console.log('colled')
      this.zoom = !this.zoom
    },
    slideshowImages() {
      console.log('preparing array')
      let result = []
      this.content.acf.images.map(img => {
        result.push({
          url: img.image.sizes['pwr-large']
        })
      })
      return result
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.$route.hash.substring(1) === 'images') {
        this.slideshowActive = true
      } else {
        this.slideshowActive = false
      }
    },
    showText() {
      if (this.showText) this.textCall = 'close'
      else this.textCall = 'read'
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/_variables.scss';

.v-enter-active,
.v-leave-active {
  transition: transform 1s ease-out;
}

.v-enter,
.v-leave-to {
  transform: scale(10) translateX(1000px);
}

.v-enter-to,
.v-leave {
  transform: scale(1) translateX(0);
}

.compilation {
  position: relative;
  width: 50vw;
  height: 50vh;

  @include screen-size('small') {
    width: 100vw;
    height: 100vmin;
  }

  &--single {
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 999;
    background-color: white;

    &__title {
      text-align: center;

      @include center;
    }

    &__text {
      width: 100vw;
      position: absolute;
      bottom: 0;
      z-index: 9999;

      &--call {
        text-align: center;
        display: block;
        padding-bottom: $line-height;
        background: white;
      }

      &--body {
        display: block;
        padding: $line-height 200px;
        background: white;
        box-shadow: 0 0 10px 0 rgba(255, 255, 255, 1);
      }
    }

    &__circle {
      margin-top: $line-height;

      @include center;

      @for $i from 1 through 20 {
        @include modifier($i) {
          @include on-circle($i, $circle-full, $item-full);
          @include in-circle;
        }
      }
    }
  }

  &--blur {
    *:not(.popup) {
      filter: blur(15px);
    }
  }

  &__title {
    display: block;
    font-style: italic;
    cursor: pointer;
    color: $black;
    z-index: 10;

    @include center;
    @include no-select;
  }

  &__circle {
    margin-top: $line-height;

    @include center;

    @for $i from 1 through 20 {
      @include modifier($i) {
        @include on-circle($i, $circle-l, $item-l);
        @include in-circle;
      }
    }
  }
}

</style>
