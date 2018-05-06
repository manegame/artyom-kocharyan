<template>
  <div class="main single"
       v-if='main.single.acf'>
    <headbar />
    <div class='main__cluster main__cluster--1'>
      <p v-html='main.single.title.rendered' />
    </div>
    <div v-for='(image, index) in main.single.acf.images'
        :key='image.id'
        :class='"main__cluster--" + (index + 2)'>
        <img v-if='image.image !== false' class='main__cluster__image' :src='image.image.sizes["pwr-small"]' />
    </div>
    <div v-if='main.single.acf.description'
         class='main__cluster main__cluster--bottom_right'>
      <router-link v-if='$route.name === "single"' :to='{name: "info", params: {slug: main.single.slug}}'>Info</router-link>
      <router-link v-else :to='{name: "single", params: {slug: main.single.slug}}'>Info</router-link>
    </div>
    <!-- info panel -->
    <div class="single__info"
          :class='{"single__info--active": $route.name === "info"}'
          v-html='main.single.acf.description'>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import headbar from '../components/headbar'

export default {
  name: 'single',
  components: {
    headbar
  },
  computed: {
    ...mapState(['main'])
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_grid.scss';
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
</style>
