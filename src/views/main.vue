<template>
  <div class="main">
    <headbar />
    <router-link v-if='main.posts.length'
          v-for='(post, index) in main.posts'
          tag='div'
          class="main__cluster main__link"
          :to='{name: "single", params: {slug: post.slug}}'
          :key='post.id'
          :class='"main__cluster--" + (post.index)'>
          <a  class='main__link__title'
              @click.prevent 
              :style='{ backgroundImage: "url(" + post.acf.images[Math.floor(Math.random() * post.acf.images.length)].image.sizes["medium"] + ")" }'>
              <span class='main__link__title__inner'
                    v-html='post.title.rendered' />
          </a>
    </router-link>
    <loading v-else/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import headbar from '../components/headbar'
import loading from '../components/loading'

export default {
  name: 'main',
  components: {
    headbar,
    loading
  },
  computed: {
    ...mapState(['main'])
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

.main__link__title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center 1000px;
  border: 20px solid $white;

  &:hover {
    background-position: center center;
    color: $white;
  }
}
</style>
