<template>
  <div class="single">
    <p v-html='main.single.acf.description'>
    <div class="images">
      <img v-for='(image, index) in main.single.acf.images'
           v-if='image.image'
           :src='image.image.sizes["pwr-medium"]'
           @click='openSlideshow(index)'/>
    </div>
    <slideshow v-if='$route.hash.substring(1) === "images"'
               :images='main.single.acf.images'
               :slideshow='main.single.acf.slideshow'
               :count='this.index'
               @open='openSlideshow'
               @close='removeHash'/>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import slideshow from '../components/slideshow'

export default {
  name: 'ak-single',
  components: {
    slideshow
  },
  data() {
    return {
      index: 0
    }
  },
  computed: {
    ...mapState(['main'])
  },
  methods: {
    ...mapActions(['GET_SINGLE_EXHIBITION']),
    openSlideshow() {
      this.$router.push({
        name: 'single',
        hash: '#images',
        params: {slug: this.$route.params.slug}
      })
    },
    removeHash() {
      this.$router.push({
        name: 'single',
        hash: '',
        params: {slug: this.$route.params.slug}
      })
    }
  },
  mounted() {
    this.GET_SINGLE_EXHIBITION(this.$route.params.slug)
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/_variables.scss';

.single {
  color: $black;
}
</style>
