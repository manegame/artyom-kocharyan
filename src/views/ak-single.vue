<template>
  <div class="single"
       @click.self='router.push({name: "main"})'>
    <div class="single__content dragscroll">
      <div class='single__content__description'
         :class='{"single__content__description--active": $route.hash.substring(1) === "description"}'
         @click='description = !description'>
         <p class='single__content__description__text'
            v-html='main.single.acf.description' />
       </div>
      <div class='single__content__images'>
        <img class='single__content__images__image'
             v-for='(image, index) in main.single.acf.images'
             v-if='image.image'
             :src='image.image.sizes["pwr-medium"]'
             @click='openSlideshow(index)'/>
      </div>
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
      index: 0,
      description: false
    }
  },
  computed: {
    ...mapState(['main'])
  },
  methods: {
    ...mapActions([
      'GET_SINGLE_EXHIBITION',
      'CLEAR_SINGLE_EXHIBITION'
    ]),
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
  beforeMount() {
    this.GET_SINGLE_EXHIBITION(this.$route.params.slug)
  },
  beforeDestroy() {
    this.CLEAR_SINGLE_EXHIBITION()
  },
  mounted() {
    if (this.main.single.acf.only_slideshow) {
      this.openSlideshow()
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/helpers/_transitions.scss';
@import '../style/_variables.scss';

.single {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: $black;
  overflow-y: scroll;
  background: $white;

  @include hide-scroll;

  &__content {
    position: relative;
    width: 100%;
    height: auto;
    min-height: 100%;
    padding: $line-height 0 0;

    &__text {
      width: auto;
      position: fixed;
      text-align: center;

      @include center;

      &__title,
      &__button,
      &__back {
        display: block;
        cursor: pointer;
      }

      &__button,
      &__back {
        color: rgb(194, 194, 194);
        text-decoration: none;
      }
    }

    &__description {
      position: relative;
      width: 100%;
      text-align: left;
      top: 0;
      height: 0;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;

      &__text {
        text-align: left;
        max-width: 80ch;
        padding: $line-height 0;
      }

      &--active {
        height: auto;
        background: $white;
      }
    }

    &__images {
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-items: center;

      &__image {
        margin: 0 $line-height $line-height;
        width: 360px;
        height: 360px;
        object-fit: contain;
        object-position: 50% 50%;
      }
    }
  }
}

</style>
