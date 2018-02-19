<template>
  <div class="single"
       @click.self='router.push({name: "main"})'>
    <div class="single__content dragscroll"
         :class='{"single__content--collapse": $route.hash.substring(1) === "description"}'>
      <div class='single__content__description'
         :class='{"single__content__description--active": $route.hash.substring(1) === "description"}'
         @click='description = !description'>
         <p class='single__content__description__text'
            v-html='main.single.acf.description' />
       </div>
      <div class='single__content__images'>
        <img class='single__content__images__image'
             :class='"single__content__images__image--" + Math.ceil(Math.random() * 4) + ""'
             v-for='(image, index) in main.single.acf.images'
             v-if='image.image'
             :src='image.image.sizes["pwr-medium"]'
             :key='image.image.id'
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
  background: $white;
  height: 100%;
  overflow: hidden;

  @include hide-scroll;

  &__content {
    position: absolute;
    width: 100%;
    right: 0;
    height: 100%;
    overflow: scroll;
    padding: $top-bar-height 0 0;
    transition: width 0.3s ease-out;

    &--collapse {
      width: calc(100% + 500px);
      right: -500px;
    }

    &__text {
      width: auto;
      position: fixed;
      text-align: center;

      @include center;
    }

    &__description {
      position: absolute;
      width: 500px;
      height: 100vh;
      top: 0;
      left: -500px;
      background: $black;
      overflow: scroll;
      transition: left 0.3s ease-out;

      &__text {
        text-align: left;
        max-width: 80ch;
        padding: $line-height 40px;
      }

      &--active {
        left: 0;
        height: auto;
      }
    }

    &__images {
      width: 100%;
      padding: 0 120px;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: center;

      &::after {
        content: '';
        flex: auto;
      }

      &__image {
        margin: 0 $line-height;
        width: 300px;
        height: 300px;
        object-fit: contain;
        object-position: 0 50%;

        &--1 {
          padding-left: 20px;
        }

        &--2 {
          padding-right: 20px;
        }

        &--3 {
          padding-top: 20px;
        }

        &--4 {
          padding-bottom: 20px;
        }
      }
    }
  }
}

</style>
