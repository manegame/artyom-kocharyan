<template>
  <div class="main single"
       :class='{"single--squashed": $route.name === "info"}'
       v-if='main.single.acf'>
    <!-- HEADER -->
    <headbar v-if='$route.name !== "lightbox"'/>
    <!-- TITLE -->
    <div class='main__cluster'
         :class='"main__cluster--" + main.single.index'>
      <p v-html='main.single.title.rendered' />
    </div>
    <!-- SVG -->
    <svgView  v-if='hasSvg'
              :svg='svgSources[0]'/>
    <!-- IMAGES -->
    <template v-else
              v-for='(image, index) in main.single.acf.images'>
      <div  :key='index' 
            v-if='(index + 1) < main.single.index'
            :class='"main__cluster--" + (index + 1)'>
        <router-link v-if='image.image !== false' 
          tag='img'
          class='main__cluster__image'
          :to='{name: "lightbox", params: {index: index}}'
          :src='image.image.sizes["pwr-small"]' />
      </div>
      <!-- Skip the title -->
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
         class='main__cluster main__cluster--top_left'>
      <router-link v-if='$route.name === "single"' :to='{name: "info", params: {slug: main.single.slug}}'>Info</router-link>
      <router-link v-if='$route.name === "info"' :to='{name: "single", params: {slug: main.single.slug}}'>Close</router-link>
    </div>
    <!-- INFO PANEL -->
    <div class="single__info"
          :class='{"single__info--active": $route.name === "info"}'
          v-html='main.single.acf.description'>
    </div>    
    <!-- LIGHTBOX -->
    <lightbox v-if='$route.name === "lightbox"' />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import headbar from '../components/headbar'
import lightbox from '../components/lightbox'
import svgView from '../components/ak-svg'

export default {
  name: 'single',
  components: {
    headbar,
    lightbox,
    svgView
  },
  computed: {
    ...mapState(['main']),
    hasSvg() {
      if (this.svgSources !== null) return true
      else return false
    },
    svgSources() {
      let svgArray = this.main.single.acf.images.filter(image => { return image.svg })
      if (svgArray.length) return svgArray.map(item => { return item.svg.url })
      else return null
    }
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
  position: absolute;
  right: 0;
  transition: width 0.3s ease-out;
  -moz-transition: width 0.3s ease-out;
  -webkit-transition: width 0.3s ease-out;

  &--squashed {
    width: 60vw;

    @include screen-size('small') {
      width: initial;
    }
  }

  &__info {
    background: $white;
    width: 40vw;
    height: 100vh;
    position: fixed;
    left: -40vw;
    top: 0;
    overflow: hidden;
    padding: 20px 40px 60px;
    transition: left 0.3s ease-out;
    -moz-transition: left 0.3s ease-out;
    -webkit-transition: left 0.3s ease-out;

    @include screen-size('medium') {
      width: 100vw;
      left: -100vw;
      top: 20vh;
      height: 80vh;
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
