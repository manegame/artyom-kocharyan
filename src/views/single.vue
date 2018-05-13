<template>
  <div class="main single"
       v-if='main.single.acf'>
    <!-- HEADER -->
    <headbar v-if='$route.name !== "lightbox"'/>
    <!-- TITLE -->
    <div class='main__cluster'
         :class='"main__cluster--" + main.single.index'>
      <p v-html='main.single.title.rendered' />
    </div>
    <!-- IMAGES -->
    <template v-for='(image, index) in main.single.acf.images'>
      <div  :key='index' 
            v-if='(index + 1) < main.single.index'
            :class='"main__cluster--" + (index + 1)'>
        <router-link v-if='image.image !== false' 
          tag='img'
          class='main__cluster__image'
          :to='{name: "lightbox", params: {index: index}}'
          :src='image.image.sizes["pwr-small"]' />
      </div>
      <!-- Jump title -->
      <div  :key='index' 
            v-else
            :class='"main__cluster--" + (index + 2)'>
        <router-link v-if='image.image !== false' 
          tag='img'
          class='main__cluster__image'
          :to='{name: "lightbox", params: {index: index}}'
          :src='image.image.sizes["pwr-small"]' />
      </div>
    </template>
    <!-- INFO BUTTON -->
    <div v-if='main.single.acf.description'
         class='main__cluster main__cluster--bottom_right'>
      <router-link v-if='$route.name === "single"' :to='{name: "info", params: {slug: main.single.slug}}'>Info</router-link>
      <router-link v-if='$route.name === "info"' :to='{name: "single", params: {slug: main.single.slug}}'>Close</router-link>
    </div>
    <!-- info panel -->
    <div class="single__info"
          :class='{"single__info--active": $route.name === "info"}'
          v-html='main.single.acf.description'>
    </div>
    <!-- slideshow popup -->
    <template v-if='$route.name === "lightbox"'>
    <lightbox />
      <div class='main__cluster main__cluster--home'>
        <router-link :to='{name: "single", params: {slug: main.single.slug}}'>Close</router-link>
      </div>
      <template v-if='main.single.acf.slideshow === "user"'>
        <div class='main__cluster main__cluster--bottom_left'>
          <router-link v-if='$route.params.index > 0' :to='{name: "lightbox", params: {index: prevIndex}}'>Previous</router-link>
        </div>
        <div class='main__cluster main__cluster--bottom_right'>
          <router-link v-if='$route.params.index < main.single.acf.images.length - 1' :to='{name: "lightbox", params: {index: nextIndex}}'>Next</router-link>
        </div>
      </template>
      <template v-else></template>
    </template>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import headbar from '../components/headbar'
import lightbox from '../components/lightbox'

export default {
  name: 'single',
  components: {
    headbar,
    lightbox
  },
  computed: {
    ...mapState(['main']),
    nextIndex() {
      if (this.$route.name === 'lightbox') {
        // console.log(this.main.single.acf.images.length)
        return this.$route.params.index + 1
      }
    },
    prevIndex() {
      if (this.$route.name === 'lightbox') {
        return this.$route.params.index - 1
      }
    }
  },
  methods: {
    blackFeedback() {
      console.log('display a black square')
    }
  },
  watch: {
    // ''(oldV, newV) {
    //   console.log(oldV, newV)
    // }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_cluster.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/_variables.scss';
@import '../style/_main.scss';

.single {
  &__info {
    background: $white;
    width: 40vw;
    height: 100vh;
    position: absolute;
    left: -40vw;
    top: 0;
    overflow: hidden;
    padding: 20px 40px 60px;
    transition: left 0.3s ease-out;
    -moz-transition: left 0.3s ease-out;
    -webkit-transition: left 0.3s ease-out;

    @include screen-size('medium') {
      width: 80vw;
      left: -80vw;
    }

    &--active {
      left: 0;
    }
  }
}

.main__cluster__image {
  cursor: pointer;
}
</style>
