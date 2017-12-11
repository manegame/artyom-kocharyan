<template>
  <div class="compilation" :class='{"compilation--blur": slideshowActive}'>
    <p class="compilation__title" v-html='content.title.rendered'></p>
    <ul class="compilation__circle" :class='"compilation__circle--" + content.acf.images.length + ""'>
      <li :class='"compilation__circle--" + content.acf.images.length + "__item"' @click='openSlideshow(0)' v-for='img in content.acf.images'>
        <img :class='"compilation__circle--" + content.acf.images.length + "__item__image"' :src='img.image.sizes["pwr-medium"]' alt="..."/>
      </li>
    </ul>
    <slideShow v-if='$route.hash.substring(1) === "images" && $route.params.id === content.title.rendered' :images='slideshowImages()' :count='0' :slideshow='content.acf.slideshow' @open='openSlideshow' @close='removeHash'/>
  </div>
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
      slideshowActive: false
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
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/_variables.scss';

.compilation {
  position: relative;
  width: 50vw;
  height: 50vh;

  @include screen-size('small') {
    width: 100vw;
    height: 100vmin;
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
